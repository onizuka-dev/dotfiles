-- Color scheme

return {
  'EdenEast/nightfox.nvim',
  lazy = false,
  priority = 1000,
  opts = {
  },
  config = function (plugin, opts)
    require('nightfox').setup(opts)

    vim.cmd("colorscheme nightfox")
  end,
}
