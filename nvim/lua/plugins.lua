return {
    -- {
    --     'morhetz/gruvbox.nvim',
    --     lazy = true,
    --     config = function()
    --         vim.cmd('colorscheme gruvbox')
    --     end,
    -- },

    { "tpope/vim-commentary" },

    -- Add, change and delete surrounding text.
    { "tpope/vim-surround" },

    -- Useful commands like :Rename and :SudoWrite.
    { "tpope/vim-eunuch" },

    -- Pairs of handy bracket mappings, like [b and ]b.
    { "tpope/vim-unimpaired" },

    -- Indent autodetection with editorconfig support.
    { "tpope/vim-sleuth" },

    -- Allow plugins to enable repeating of commands.
    { "tpope/vim-repeat" },

    -- Add more languages
    --{ "sheerun/polyglot" },

    -- Navigate seamlessly between Vim windows and Tmux panes.
    { "christoomey/vim-tmux-navigator" },

    -- Jump to the last location when opening a fail.
    { "farmergreg/vim-lastplace" },

    -- Enable * searching with visually selected text.
    { "nelstrom/vim-visual-star-search" },

    -- Text objects for HTML attributes.
    {
        "whatyouhide/vim-textobj-xmlattr",
        dependencies = {
            "kana/vim-textobj-user"
        },
    },

    -- Automatically add closing brackets, quotes, etc.
    {
        "windwp/nvim-autopairs",
        event = "InsertEnter",
        config = true,
    },

    -- Add smooth scrolling to avoid jarring jumps
    {
        "karb94/neoscroll.nvim",
        config = true,
    },

    -- All closing buffers without closing the split window.
    {
        "famiu/bufdelete.nvim",
        lazy = true,
        config = function()
            vim.keymap.set('n', '<Leader>q', ':Bdelete<CR>')
        end,
    },

    -- Split arrays and methods onto multiple lines, or join them back up.
    -- Example: given { 'one', 'two', 'three'}
    -- type gS to split array into multiple lines
    -- type gJ to shrink array into single line
    {
        'AndrewRadev/splitjoin.vim',
        config = function()
            vim.g.splitjoin_html_attributes_bracket_on_new_line = 1
            vim.g.splitjoin_trailing_comma = 1
            vim.g.splitjoin_php_method_chain_full = 1
        end,
    },

    -- Automatically fix indentation when pasting code.
    {
      'sickill/vim-pasta',
      config = function()
        vim.g.pasta_disabled_filetypes = { 'fugitive' }
      end,
    },

    -- Fuzzy finder.
    {
        'nvim-telescope/telescope.nvim',
        tag = '0.1.8',
        -- branch = '0.1.x',
        dependencies = {
            'nvim-lua/plenary.nvim',
            'kyazdani42/nvim-web-devicons',
            'nvim-telescope/telescope-live-grep-args.nvim',
            {
                'nvim-telescope/telescope-fzf-native.nvim',
                lazy = true
            }
        },
        keys = {
            { '<Leader>f', '<cmd>Telescope find_files<cr>', desc = 'Find Files' },
        },
        opts = function()
            local actions = require('telescope.actions')

            vim.cmd([[
                highlight link TelescopePromptTitle PMenuSel
                highlight link TelescopePreviewTitle PMenuSel
                highlight link TelescopePromptNormal NormalFloat
                highlight link TelescopePromptBorder FloatBorder
                highlight link TelescopeNormal CursorLine
                highlight link TelescopeBorder CursorLineBg
            ]])

            -- require('telescope').load_extension('fzf')
            -- require('telescope').load_extension('live_grep_args')

            -- vim.keymap.set('n', '<leader>f', [[<cmd>lua require('telescope.builtin').find_files()<CR>]])
            -- vim.keymap.set('n', '<leader>F', [[<cmd>lua require('telescope.builtin').find_files({ no_ignore = true, prompt_title = 'All Files' })<CR>]])
            -- vim.keymap.set('n', '<leader>b', [[<cmd>lua require('telescope.builtin').buffers()<CR>]])
            -- vim.keymap.set('n', '<leader>g', [[<cmd>lua require('telescope').extensions.live_grep_args.live_grep_args()<CR>]])
            -- vim.keymap.set('n', '<leader>h', [[<cmd>lua require('telescope.builtin').oldfiles()<CR>]])
            -- vim.keymap.set('n', '<leader>s', [[<cmd>lua require('telescope.builtin').lsp_document_symbols()<CR>]])

            return {
                defaults = {
                    path_display = { truncate = 1 },
                    prompt_prefix = '   ',
                    selection_caret = '  ',
                    layout_config = {
                        prompt_position = 'top',
                    },
                    sorting_strategy = 'ascending',
                    mappings = {
                        i = {
                            ['<esc>'] = actions.close,
                            ['<C-Down>'] = actions.cycle_history_next,
                            ['<C-Up>'] = actions.cycle_history_prev,
                        },
                    },
                    file_ignore_patterns = { '.git/' },
                },
                pickers = {
                    find_files = {
                        hidden = true,
                    },
                    buffers = {
                        previewer = false,
                        layout_config = {
                            width = 80,
                        },
                    },
                    oldfiles = {
                        prompt_title = 'History',
                    },
                    lsp_references = {
                        previewer = false,
                    },
                },
            }
        end,
    }
}

