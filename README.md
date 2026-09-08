# 💻dotfiles

## 📦 Dependencies

| Package | Needed by | Required |
|---|---|---|
| `zsh` | `./install` | yes |
| `fzf` | `scripts/t` | yes |
| `tmux` | `scripts/t`, `tmux/tmux.conf` | yes |
| `wl-clipboard` (Wayland) / `xclip` (X11) | `PREFIX y` in tmux | to copy the tmux buffer |
| `neovim` | `nvim-personal` | if you use the nvim config |
| `ripgrep` | telescope's grep pickers | if you use nvim |
| `gcc`, `make`, `cmake` | treesitter, telescope-fzf-native | if you use nvim |
| `nodejs`, `npm` | Mason installs the LSP servers | if you use nvim |
| `lazygit` | `<C-g>` in floaterm | optional |
| DankMono Nerd Font | `kitty.conf`, `ghostty/config` | for the fonts to render |

On Fedora:

```
sudo dnf install zsh fzf tmux wl-clipboard neovim ripgrep gcc gcc-c++ make cmake nodejs npm lazygit
```

## 👷‍♂️ Installation

Make the scripts executable:

```
chmod +x ./scripts/t ./scripts/kitty-toggle ./scripts/ghostty-toggle
```

Then install:

```
./install
```

On GNOME this also links the `terminal-toggle@cardus` shell extension that the
toggle scripts depend on. See below.

## ⌨️ Toggling the terminal with a global hotkey

`scripts/kitty-toggle` and `scripts/ghostty-toggle` show the terminal when it is
hidden and hide it when it is already focused. They detect the platform and take
one of two paths.

### 🐧 Linux (GNOME Wayland)

GNOME deliberately gives other processes no control over windows: `Eval` is
disabled, `Shell.Introspect` denies `GetWindows`, and `wmctrl`/`xdotool` do not
see Wayland-native windows. Ghostty's own quick terminal does not help either —
it needs the `wlr-layer-shell-v1` protocol, which Mutter does not implement.

So the toggle runs *inside* the shell. `gnome-extension/terminal-toggle@cardus`
is a small extension that exports one D-Bus method, and the scripts call it.

After running `./install`:

1. **Log out and back in.** GNOME on Wayland cannot pick up a newly added
   extension without restarting the session — `ReloadExtension` is deprecated
   and does nothing.
2. Enable it:

   ```
   gnome-extensions enable terminal-toggle@cardus
   ```

3. Point a shortcut at the script in **Settings > Keyboard > Keyboard Shortcuts
   > Custom Shortcuts**, with the command `kitty-toggle` and whatever key you
   like, for example `Ctrl + ;`.

To check that the extension is answering:

```
gdbus call --session --dest org.gnome.Shell \
  --object-path /org/gnome/Shell/Extensions/TerminalToggle \
  --method org.gnome.Shell.Extensions.TerminalToggle.Toggle kitty
```

It replies `minimized`, `activated`, or `none` when no window exists yet, in
which case the script launches the application.

> The extension pins `"shell-version": ["50"]` in `metadata.json`. Bump it after
> a GNOME major upgrade, or GNOME will refuse to load it.

### 🍎 macOS (Automator)

Use Automator to assign a global keyboard shortcut to `~/.local/bin/kitty-toggle`.

1. Open **Automator.app**.
2. **File > New**, then select **Quick Action** (or **Service** on older macOS).
3. At the top of the workflow, set **Workflow receives** to `no input`, **in**
   `any application`.
4. Search for **Run Shell Script** in the left panel and drag it into the
   workflow.
5. Replace the script content with:

   ```
   ~/.local/bin/kitty-toggle
   ```

6. Open **System Settings > Keyboard > Keyboard Shortcuts > Services** (or
   **Quick Actions**), find the Quick Action you just created, and assign it a
   shortcut such as **`Control + ;`**.
