-- Navigate seamlessly between Vim windows and Tmux or Herdr panes.
--
-- Under tmux it hands off to vim-tmux-navigator, as before. Under Herdr it
-- needs its Herdr half too: `herdr plugin install aimdevlee/herdr-nvim-nav`,
-- bound to ctrl+h/j/k/l in herdr/config.toml.

return {
  'aimdevlee/herdr-nvim-nav',
  dependencies = { 'christoomey/vim-tmux-navigator' },
  init = function()
    -- This plugin maps C-h/j/k/l itself and calls TmuxNavigate* under tmux.
    vim.g.tmux_navigator_no_mappings = 1
  end,
  config = function()
    require('herdr-nvim-nav').setup()
  end,
}
