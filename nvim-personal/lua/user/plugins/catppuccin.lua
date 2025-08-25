-- Color scheme

return {
  "catppuccin/nvim",
  lazy = false,
  priority = 1000,
  opts = {
  },
  config = function (plugin, opts)
    require('catppuccin').setup(opts)
  end,
}
