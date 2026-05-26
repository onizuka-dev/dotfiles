# Ghostty config mirroring Kitty — Design

**Date:** 2026-05-25
**Status:** Approved (sections 1–4)

## Goal

Bring the existing Kitty configuration (font, behavior, padding, themes,
toggle script) to Ghostty as faithfully as possible, following the
conventions already established in this dotfiles repo (a directory per
app, symlinked from `install`).

## Scope

In scope:

- New `ghostty/` directory in the repo with `config` + `themes/`.
- Faithful mapping of every setting in `kitty/kitty.conf` to its Ghostty
  equivalent (with documented exceptions).
- Three theme files matching the Kitty themes already in the repo (Leaf
  Light, Aquarium Dark, Gruvbox Material Dark Soft), with Leaf Light
  active.
- `scripts/ghostty-toggle` analogous to `scripts/kitty-toggle`.
- `install` updated to symlink the new directory and script.
- Removal of the `ghostyy/` typo directory left by commit `33cf7f8`.

Out of scope:

- Touching the auto-generated template at
  `~/Library/Application Support/com.mitchellh.ghostty/config`. Ghostty
  prefers `$XDG_CONFIG_HOME/ghostty/config`, so the symlink wins.
- Removing the Kitty symlinks. Both terminals stay installed in parallel
  during the transition.
- A literal equivalent for `disable_ligatures cursor` — Ghostty has no
  per-cursor-line ligature toggle. Ligatures stay enabled globally (user
  preference).

## File layout

```
dotfiles/
├── ghostty/
│   ├── config
│   └── themes/
│       ├── leaf-light
│       ├── aquarium-dark
│       └── gruvbox-material-dark-soft
├── scripts/
│   └── ghostty-toggle
└── install                  # updated
```

The `ghostyy/` directory is removed via `git rm -r`.

## Settings mapping (kitty → ghostty)

| Kitty | Ghostty | Notes |
|---|---|---|
| `font_family "DankMono Nerd Font"` | `font-family = DankMono Nerd Font` | |
| `bold_font ... Bold` | `font-style-bold = Bold` | Ghostty derives variants from `font-family` + style hint |
| `italic_font ... Italic` | `font-style-italic = Italic` | |
| `bold_italic_font ... Bold Italic` | `font-style-bold-italic = Bold Italic` | |
| `font_size 18` | `font-size = 18` | |
| `adjust_line_height 175%` | `adjust-cell-height = 75%` | Kitty's 175% is the **total**; Ghostty adds the percentage to the default |
| `cursor_blink_interval 0` | `cursor-style-blink = false` | |
| `enable_audio_bell 0` | `audio-bell-volume = 0` | Explicit; default is already silent |
| `hide_window_decorations titlebar-only` | `macos-titlebar-style = tabs` | Closest macOS equivalent (compact integrated titlebar) |
| `window_padding_width 10` | `window-padding-x = 10` + `window-padding-y = 10` | |
| `macos_option_as_alt yes` | `macos-option-as-alt = true` | |
| `disable_ligatures cursor` | *(omitted)* | No granular equivalent; ligatures stay enabled |
| `include current-theme.conf` (Leaf Light) | `theme = leaf-light` | Ghostty resolves to `themes/leaf-light` |

## Themes

Three files in `ghostty/themes/`, each in Ghostty syntax (`background`,
`foreground`, `palette = N=#RRGGBB`). Colors are copied verbatim from
the corresponding Kitty `.conf` files:

- `leaf-light` — from `kitty/current-theme.conf`
- `aquarium-dark` — from `kitty/Aquarium Dark.conf`
- `gruvbox-material-dark-soft` — from `kitty/no-preference-theme.auto.conf`

Switching themes: edit the `theme = …` line in `config` and reload with
`Cmd+Shift+,`. No symlinks, no include indirection — this is Ghostty's
default theme mechanism.

## `config` file (final shape)

```
font-family = DankMono Nerd Font
font-style-bold = Bold
font-style-italic = Italic
font-style-bold-italic = Bold Italic
font-size = 18

adjust-cell-height = 75%

cursor-style-blink = false
audio-bell-volume = 0

macos-titlebar-style = tabs
macos-option-as-alt = true

window-padding-x = 10
window-padding-y = 10

theme = leaf-light
```

## `ghostty-toggle` script

Mirror of `scripts/kitty-toggle`, only `APP_NAME` changes:

```bash
#!/bin/bash
APP_NAME="ghostty"
FRONT_APP=$(osascript -e 'tell application "System Events" to get name of first application process whose frontmost is true')
if [[ "$FRONT_APP" == "$APP_NAME" ]]; then
  osascript -e 'tell application "System Events" to key code 48 using {command down}'
else
  open -a "$APP_NAME"
fi
```

Executable bit set (`chmod +x`).

## `install` changes

Append at the end, after the existing Kitty / tmux / nvim blocks:

```bash
rm -rf $HOME/.config/ghostty
ln -s $DOTFILES/ghostty $HOME/.config/ghostty

rm -rf $HOME/.local/bin/ghostty-toggle
ln -s $DOTFILES/scripts/ghostty-toggle $HOME/.local/bin/ghostty-toggle
```

Existing Kitty symlinks are kept; both terminals remain usable.

## Verification

After running `./install`:

1. `readlink ~/.config/ghostty` → points to `<repo>/ghostty`.
2. `readlink ~/.local/bin/ghostty-toggle` → points to
   `<repo>/scripts/ghostty-toggle`.
3. Launch Ghostty: font is DankMono Nerd Font 18, Leaf Light colors,
   padding visible, cursor static, titlebar in `tabs` mode, no audio bell.
4. Edit `theme = aquarium-dark` and `Cmd+Shift+,` reloads with the new
   palette.
5. `ghostty-toggle` brings Ghostty to front when hidden, sends it back
   when frontmost.

## Known trade-offs

- **Ligatures under cursor:** Kitty hides ligatures only on the cursor
  line. Ghostty can't do that. User chose to keep ligatures globally.
- **Titlebar:** Kitty's `titlebar-only` and Ghostty's
  `macos-titlebar-style = tabs` are visually different. `tabs` is the
  closest idiomatic Ghostty option on macOS.
- **Audio bell:** Setting `audio-bell-volume = 0` is redundant with the
  default but matches the explicit intent in `kitty.conf`.
