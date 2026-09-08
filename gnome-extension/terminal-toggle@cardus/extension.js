// Toggle a window from outside the shell.
//
// GNOME on Wayland deliberately exposes no window control to other processes:
// org.gnome.Shell.Eval is disabled and Shell.Introspect denies GetWindows, so a
// script cannot ask what is focused, let alone raise or hide it. This extension
// runs inside gnome-shell, where all of that is available, and hands a single
// Toggle method back out over D-Bus for scripts/kitty-toggle and friends.

import Gio from 'gi://Gio';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

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

class ToggleService {
    // Focused means the user wants it out of the way, anything else means they
    // want it in front. The return value tells the caller whether a window was
    // found at all, so the script can launch the application when there is none.
    Toggle(id) {
        const needle = id.toLowerCase();
        const focused = global.display.focus_window;

        if (focused && matches(focused, needle)) {
            if (!focused.can_minimize())
                return 'focused';

            focused.minimize();
            return 'minimized';
        }

        // get_tab_list returns most-recently-used first and includes minimized
        // windows, which is exactly the one we want to bring back.
        const [window] = global.display
            .get_tab_list(Meta.TabList.NORMAL, null)
            .filter(candidate => matches(candidate, needle));

        if (!window)
            return 'none';

        window.activate(global.get_current_time());
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
    }
}
