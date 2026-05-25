--- Floating terminal

return {
  'voldikss/vim-floaterm',
  keys = {
    { '<C-t>', ':FloatermToggle<CR>' },
    { '<C-t>', '<Esc>:FloatermToggle<CR>', mode = 'i' },
    { '<C-t>', '<C-\\><C-n>:FloatermToggle<CR>', mode = 't' },
    { '<C-g>', ':FloatermNew lazygit<CR>' },
    { '<C-g>', '<C-\\><C-n>:FloatermToggle<CR>', mode = 't' },
    { '<A-c>', ':FloatermNew claude<CR>' },
    { '<A-c>', '<C-\\><C-n>:FloatermToggle<CR>', mode = 't' },
  },
  cmd = { 'FloatermToggle', 'FloatermNew' },
  init = function()
    vim.g.floaterm_width = 0.95
    vim.g.floaterm_height = 0.95
    vim.g.floaterm_position = 'center'
    -- Terminal at bottom
    -- vim.g.floaterm_height = 0.6
    -- vim.g.floaterm_wintype = 'split'
  end,
}
