--- Floating terminal

return {
  'voldikss/vim-floaterm',
  keys = {
    { '<C-t>', ':FloatermToggle<CR>' },
    { '<C-t>', '<Esc>:FloatermToggle<CR>', mode = 'i' },
    { '<C-t>', '<C-\\><C-n>:FloatermToggle<CR>', mode = 't' },
    { '<C-g>', ':FloatermNew lazygit<CR>' },
    { '<C-g>', '<C-\\><C-n>:FloatermToggle<CR>', mode = 't' },
  },
  cmd = { 'FloatermToggle', 'FloatermNew' },
  init = function()
    -- vim.g.floaterm_width = 0.8
    vim.g.floaterm_height = 0.6
    vim.g.floaterm_wintype = 'split'
  end,
}
