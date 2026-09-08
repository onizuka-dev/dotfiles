// Toggle a window from outside the shell.
//
// GNOME on Wayland deliberately exposes no window control to other processes:
// org.gnome.Shell.Eval is disabled and Shell.Introspect denies GetWindows, so a
// script cannot ask what is focused, let alone raise or hide it. This extension
// runs inside gnome-shell, where all of that is available, and hands a single
// Toggle method back out over D-Bus for scripts/kitty-toggle and friends.

import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const DBUS_PATH = '/org/gnome/Shell/Extensions/TerminalToggle';

const DBUS_INTERFACE = `
<node>
  <interface name="org.gnome.Shell.Extensions.TerminalToggle">
    <method name="Toggle">
      <arg type="s" direction="in" name="id"/>
      <arg type="s" direction="out" name="result"/>
    </method>
  </interface>
</node>`;

// The window slides through the top edge of its monitor, Quake style. Tune the
// feel here: easing in pulls away, easing out settles back.
const ANIMATION_TIME = 180;
const HIDE_MODE = Clutter.AnimationMode.EASE_IN_QUAD;
const SHOW_MODE = Clutter.AnimationMode.EASE_OUT_QUAD;

// Actors already on their way out. Toggling again mid-flight would restart the
// animation and minimize a second time, so those presses are dropped.
const slidingOut = new Set();

// A window carries several names and none of them is consistent between
// toolkits: kitty reports the wm class `kitty`, Ghostty reports
// `com.mitchellh.ghostty`. Take a plain name like `ghostty` and compare it
// against every name the window has, as a whole and as the last dot-separated
// segment, so callers never have to know which form an application uses.
function matches(window, id) {
    const app = Shell.WindowTracker.get_default().get_window_app(window);

    const names = [
        window.get_wm_class(),
        window.get_wm_class_instance(),
        app?.get_id(),
        app?.get_name(),
    ];

    return names.some(name => {
        if (!name)
            return false;

        const value = name.toLowerCase().replace(/\.desktop$/, '');
        return value === id || value.split('.').pop() === id;
    });
}

// Left alone, the shell shrinks the window into the top-left of the monitor:
// its minimize effect flies the actor at the icon geometry, and a window with
// no icon in a dock has none, so windowManager.js falls back to the monitor
// origin at scale 0. Main.wm.skipNextEffect is how the shell itself opts out of
// that - altTab.js does the same - which leaves the motion below in charge.

function slideOut(actor, onHidden) {
    const monitor = Main.layoutManager.monitors[actor.meta_window.get_monitor()];
    const [x, y] = actor.get_position();

    slidingOut.add(actor);
    actor.remove_all_transitions();
    actor.ease({
        y: (monitor ? monitor.y : y) - actor.height,
        opacity: 0,
        duration: ANIMATION_TIME,
        mode: HIDE_MODE,
        onStopped: () => {
            slidingOut.delete(actor);

            if (actor.is_destroyed())
                return;

            onHidden();

            // The skipped minimize handler is what normally restores opacity
            // and position, so do it here instead - after the actor is hidden,
            // so putting it back never flashes on screen.
            actor.set_position(x, y);
            actor.opacity = 255;
        },
    });
}

function slideIn(actor) {
    const monitor = Main.layoutManager.monitors[actor.meta_window.get_monitor()];
    const rect = actor.meta_window.get_buffer_rect();

    actor.remove_all_transitions();
    actor.set_position(rect.x, (monitor ? monitor.y : rect.y) - rect.height);
    actor.opacity = 0;
    actor.show();

    actor.ease({
        y: rect.y,
        opacity: 255,
        duration: ANIMATION_TIME,
        mode: SHOW_MODE,
    });
}

class ToggleService {
    // Focused means the user wants it out of the way, anything else means they
    // want it in front. The return value tells the caller whether a window was
    // found at all, so the script can launch the application when there is none.
    Toggle(id) {
        const needle = id.toLowerCase();
        const focused = global.display.focus_window;

        if (focused && matches(focused, needle))
            return this._hide(focused);

        // get_tab_list returns most-recently-used first and includes minimized
        // windows, which is exactly the one we want to bring back.
        const [window] = global.display
            .get_tab_list(Meta.TabList.NORMAL, null)
            .filter(candidate => matches(candidate, needle));

        return window ? this._show(window) : 'none';
    }

    _hide(window) {
        if (!window.can_minimize())
            return 'focused';

        // No actor means nothing to animate - minimize and be done.
        const actor = window.get_compositor_private();
        if (!actor) {
            window.minimize();
            return 'minimized';
        }

        if (slidingOut.has(actor))
            return 'minimized';

        slideOut(actor, () => {
            Main.wm.skipNextEffect(actor);
            window.minimize();
        });

        return 'minimized';
    }

    _show(window) {
        const actor = window.get_compositor_private();
        const wasMinimized = window.minimized;

        if (wasMinimized && actor)
            Main.wm.skipNextEffect(actor);

        window.activate(global.get_current_time());

        // Only a window coming back from minimized slides in. One that merely
        // sat behind another is already in place and just takes focus.
        // BEFORE_REDRAW runs once mutter has mapped and positioned the actor
        // but before anything is painted, so it never flashes at its final
        // spot before the slide starts.
        if (wasMinimized && actor) {
            global.compositor.get_laters().add(Meta.LaterType.BEFORE_REDRAW, () => {
                if (!actor.is_destroyed())
                    slideIn(actor);

                return GLib.SOURCE_REMOVE;
            });
        }

        return 'activated';
    }
}

export default class TerminalToggleExtension extends Extension {
    enable() {
        this._dbus = Gio.DBusExportedObject.wrapJSObject(
            DBUS_INTERFACE, new ToggleService());

        // gnome-shell already owns the org.gnome.Shell bus name, so exporting
        // the object is enough - there is no separate name to acquire.
        this._dbus.export(Gio.DBus.session, DBUS_PATH);
    }

    disable() {
        this._dbus?.unexport();
        this._dbus = null;
        slidingOut.clear();
    }
}
