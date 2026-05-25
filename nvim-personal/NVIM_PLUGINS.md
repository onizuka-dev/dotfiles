# Plugins de Neovim - Documentación

Esta es una documentación completa de todos los plugins instalados en tu configuración de Neovim, organizados por categorías.

---

## 📚 LSP y Autocompletado

### nvim-lspconfig
**Repositorio:** `neovim/nvim-lspconfig`
**Descripción:** Configuración de Language Server Protocol para múltiples lenguajes.

**LSP Servers configurados:**
- **PHP:** Intelephense
- **Vue/JavaScript/TypeScript:** Volar + ts_ls
- **Tailwind CSS:** tailwindcss
- **JSON:** jsonls (con schemastore)
- **Lua:** lua_ls

**Keymaps:**
- `<Leader>d` - Abrir diagnósticos flotantes
- `gd` - Ir a definición (Telescope)
- `ga` - Acciones de código
- `gi` - Ir a implementaciones (Telescope)
- `gr` - Ver referencias (Telescope)
- `<Leader>lr` - Reiniciar LSP
- `K` - Mostrar hover documentation
- `<Leader>rn` - Renombrar símbolo

### mason.nvim
**Repositorio:** `williamboman/mason.nvim`
**Descripción:** Gestor de instalación automática de LSP servers.

### nvim-cmp
**Repositorio:** `hrsh7th/nvim-cmp`
**Descripción:** Motor de autocompletado.

**Fuentes de completado:**
- `cmp-nvim-lsp` - Completado del LSP
- `cmp-nvim-lsp-signature-help` - Ayuda de firma de funciones
- `cmp-buffer` - Completado desde el buffer
- `cmp-path` - Completado de rutas de archivos
- `cmp_luasnip` - Snippets

**Keymaps:**
- `<Tab>` - Siguiente sugerencia / expandir snippet
- `<S-Tab>` - Sugerencia anterior
- `<CR>` - Confirmar selección

### LuaSnip
**Repositorio:** `L3MON4D3/LuaSnip`
**Descripción:** Motor de snippets para Neovim.

### lspkind-nvim
**Repositorio:** `onsails/lspkind-nvim`
**Descripción:** Iconos visuales para el menú de autocompletado.

### schemastore.nvim
**Repositorio:** `b0o/schemastore.nvim`
**Descripción:** Esquemas JSON para validación de archivos de configuración.

---

## 🔍 Búsqueda y Navegación

### telescope.nvim
**Repositorio:** `nvim-telescope/telescope.nvim`
**Descripción:** Fuzzy finder altamente extensible.

**Keymaps:**
- `<leader>f` - Buscar archivos
- `<leader>F` - Buscar todos los archivos (incluyendo ignorados)
- `<leader>b` - Listar buffers
- `<leader>g` - Grep en el proyecto
- `<leader>G` - Grep en todos los archivos
- `<leader>h` - Buscar en help tags
- `<leader>s` - Símbolos del documento (LSP)

**Extensiones:**
- `telescope-fzf-native.nvim` - Algoritmo FZF nativo para mejor performance
- `telescope-live-grep-args.nvim` - Grep con argumentos
- `telescope-ui-select.nvim` - UI select usando Telescope

### neo-tree.nvim
**Repositorio:** `nvim-neo-tree/neo-tree.nvim`
**Descripción:** Explorador de archivos en árbol con soporte para git, buffers y símbolos.

**Keymaps:**
- `<A-1>` - Toggle Neo-tree

**Características:**
- Posición: lado derecho
- Auto-cierre al abrir archivo
- Window picker integrado

### oil.nvim
**Repositorio:** `stevearc/oil.nvim`
**Descripción:** Explorador de archivos que permite editar directorios como buffers.

**Keymaps:**
- `-` - Abrir directorio padre

---

## 🎨 Git

### vim-fugitive
**Repositorio:** `tpope/vim-fugitive`
**Descripción:** Integración completa con Git, el mejor plugin de Git para Vim.

**Dependencias:**
- `vim-rhubarb` - Soporte para GitHub

### gitsigns.nvim
**Repositorio:** `lewis6991/gitsigns.nvim`
**Descripción:** Indicadores Git en el gutter, git blame y navegación entre hunks.

**Keymaps:**
- `]h` - Siguiente hunk
- `[h` - Hunk anterior
- `gs` - Stage hunk
- `gS` - Unstage hunk
- `gp` - Preview hunk
- `gb` - Git blame de la línea

**Características:**
- Git blame en la línea actual (activado por defecto)
- Delay de 1000ms para mostrar blame

---

## 🎨 UI y Temas

### Temas de Color

#### gruvbox.nvim
**Repositorio:** `ellisonleao/gruvbox.nvim`
**Descripción:** Tema Gruvbox con soporte para Treesitter.

#### catppuccin
**Repositorio:** `catppuccin/nvim`
**Descripción:** Tema Catppuccin con variantes Latte, Frappé, Macchiato y Mocha.

#### nightfox.nvim
**Repositorio:** `EdenEast/nightfox.nvim`
**Descripción:** Familia de temas Nightfox altamente personalizables.

#### everforest
**Repositorio:** `sainnhe/everforest`
**Descripción:** Tema inspirado en bosques con variantes clara y oscura.

### lualine.nvim
**Repositorio:** `nvim-lualine/lualine.nvim`
**Descripción:** Statusline rápida y personalizable escrita en Lua.

**Secciones mostradas:**
- Modo actual
- Branch de Git y diff
- Número de LSP servers activos
- Diagnósticos
- Nombre de archivo
- Actualizaciones de Lazy
- Tipo de archivo, encoding, formato
- Posición del cursor y progreso

### bufferline.nvim
**Repositorio:** `akinsho/bufferline.nvim`
**Descripción:** Visualización de buffers como pestañas en la parte superior.

**Características:**
- Integración con Neo-tree
- Indicador de archivos modificados
- Diagnósticos en línea
- Hover habilitado

### dashboard-nvim
**Repositorio:** `nvimdev/dashboard-nvim`
**Descripción:** Pantalla de inicio personalizada con logo ASCII de "Onizuka".

**Atajos:**
- `u` - Actualizar plugins (Lazy update)
- `f` - Buscar archivos
- `a` - Apps
- `d` - Dotfiles

### barbecue.nvim
**Repositorio:** `utilyre/barbecue.nvim`
**Descripción:** Breadcrumbs en la parte superior mostrando contexto del archivo y LSP.

**Dependencias:**
- `nvim-navic` - Navegación de contexto LSP

### indent-blankline.nvim
**Repositorio:** `lukas-reineke/indent-blankline.nvim`
**Descripción:** Guías de indentación visuales.

**Características:**
- No muestra inicio de scope
- Deshabilitado en dashboard

---

## ✏️ Edición de Texto

### nvim-treesitter
**Repositorio:** `nvim-treesitter/nvim-treesitter`
**Descripción:** Resaltado de sintaxis avanzado mediante Tree-sitter.

**Parsers instalados:**
Arduino, Bash, Blade, CSS, Dockerfile, Git configs, Go, HTML, JavaScript, JSON, Lua, Markdown, PHP, Python, Ruby, Rust, SQL, TypeScript, Vue, YAML, y más.

**Extensiones:**
- `playground` - Explorador del árbol de sintaxis
- `nvim-ts-context-commentstring` - Comentarios contextuales
- `nvim-treesitter-textobjects` - Text objects basados en sintaxis

**Text Objects:**
- `if` - Inner function
- `af` - Around function
- `ia` - Inner argument
- `aa` - Around argument

### vim-surround
**Repositorio:** `tpope/vim-surround`
**Descripción:** Manipula fácilmente caracteres que rodean texto (paréntesis, comillas, tags HTML, etc.).

**Ejemplos:**
- `cs"'` - Cambiar comillas dobles por simples
- `ds"` - Eliminar comillas
- `ysiw)` - Rodear palabra con paréntesis

### vim-commentary
**Repositorio:** `tpope/vim-commentary`
**Descripción:** Comentar y descomentar código fácilmente.

**Keymaps:**
- `gc` - Toggle comentario (motion/visual)
- `gcap` - Comentar párrafo (mantiene posición del cursor)

### nvim-autopairs
**Repositorio:** `windwp/nvim-autopairs`
**Descripción:** Cierre automático de paréntesis, corchetes, comillas, etc.

### treesj
**Repositorio:** `Wansmer/treesj`
**Descripción:** Divide o une estructuras de código (arrays, métodos, etc.) usando Tree-sitter.

**Keymaps:**
- `gJ` - Join (unir líneas)
- `gS` - Split (dividir en múltiples líneas)

### vim-abolish
**Repositorio:** `tpope/vim-abolish`
**Descripción:** Trabajo avanzado con variantes de palabras (camelCase, snake_case, etc.).

### vim-repeat
**Repositorio:** `tpope/vim-repeat`
**Descripción:** Permite repetir comandos de plugins con el comando `.`

### visual-star-search
**Repositorio:** `nelstrom/vim-visual-star-search`
**Descripción:** Permite buscar con `*` usando texto seleccionado visualmente.

### vim-textobj-xmlattr
**Repositorio:** `whatyouhide/vim-textobj-xmlattr`
**Descripción:** Text objects para atributos HTML/XML.

**Dependencias:**
- `vim-textobj-user` - Framework para text objects

### vim-unimpaired
**Repositorio:** `tpope/vim-unimpaired`
**Descripción:** Pares de mappings con corchetes (`[` y `]`) para navegación y comandos.

**Ejemplos:**
- `[b` / `]b` - Buffer anterior/siguiente
- `[q` / `]q` - Quickfix anterior/siguiente
- `[<Space>` / `]<Space>` - Añadir líneas en blanco

---

## 🧪 Testing y Desarrollo

### vim-test
**Repositorio:** `vim-test/vim-test`
**Descripción:** Ejecutor de tests para múltiples frameworks.

**Keymaps:**
- `<Leader>tn` - Test nearest (test más cercano)
- `<Leader>tf` - Test file (archivo completo)
- `<Leader>ts` - Test suite (toda la suite)
- `<Leader>tl` - Test last (último test)
- `<Leader>tv` - Test visit (ir al último test)

**Configuración:**
- Estrategia: floaterm
- Soporte para PHPUnit, Pest y Jest

### vim-floaterm
**Repositorio:** `voldikss/vim-floaterm`
**Descripción:** Terminal flotante.

**Keymaps:**
- `<C-t>` - Toggle terminal flotante (normal/insert/terminal)
- `<C-g>` - Abrir lazygit

### github/copilot.vim
**Repositorio:** `github/copilot.vim`
**Descripción:** GitHub Copilot - Asistente de código con IA.

**Keymaps:**
- `<M-CR>` - Aceptar sugerencia (Alt+Enter)

---

## 🔧 Formateo y Linting

### conform.nvim
**Repositorio:** `stevearc/conform.nvim`
**Descripción:** Formateo de código automático al guardar.

**Formateadores configurados:**
- **PHP:** pint
- **JavaScript/TypeScript:** eslint_d

**Características:**
- Format on save habilitado
- Timeout: 1000ms

### nvim-lint
**Repositorio:** `mfussenegger/nvim-lint`
**Descripción:** Linting asíncrono.

**Linters configurados:**
- **JavaScript/TypeScript:** eslint_d
- **PHP:** phpstan

**Características:**
- Lint automático al guardar (BufWritePost)

---

## 🐘 PHP Específico

### phpactor
**Repositorio:** `phpactor/phpactor`
**Descripción:** Herramientas de refactoring y análisis para PHP.

**Keymaps:**
- `<Leader>pm` - Menú contextual de Phpactor
- `<Leader>pn` - Crear nueva clase PHP

### vim-projectionist
**Repositorio:** `tpope/vim-projectionist`
**Descripción:** Navegación entre archivos relacionados en proyectos (Laravel, etc.).

**Configuración:**
- Proyectos Laravel
- Proyectos con estructura src/ y tests/
- Alternancia entre código fuente y tests

**Dependencias:**
- `vim-dispatch` - Ejecución asíncrona de comandos

---

## 🛠️ Utilidades

### nvim-colorizer.lua
**Repositorio:** `NvChad/nvim-colorizer.lua`
**Descripción:** Visualiza colores hexadecimales inline.

### neoscroll.nvim
**Repositorio:** `karb94/neoscroll.nvim`
**Descripción:** Scroll suave para evitar saltos bruscos.

**Keymaps personalizados:**
- `<C-u>` - Scroll up (duración: 100ms)
- `<C-d>` - Scroll down (duración: 100ms)
- `<C-b>` - Page up (duración: 250ms)
- `<C-f>` - Page down (duración: 250ms)

### vim-tmux-navigator
**Repositorio:** `christoomey/vim-tmux-navigator`
**Descripción:** Navegación fluida entre ventanas de Vim y paneles de Tmux.

### vim-rooter
**Repositorio:** `airblade/vim-rooter`
**Descripción:** Establece automáticamente el directorio de trabajo a la raíz del proyecto.

**Configuración:**
- Modo manual (ejecuta solo al inicio)
- Patrones: `.git`, `composer.json`

### vim-heritage
**Repositorio:** `jessarcher/vim-heritage`
**Descripción:** Crea automáticamente directorios padre al guardar archivos.

### vim-lastplace
**Repositorio:** `farmergreg/vim-lastplace`
**Descripción:** Salta automáticamente a la última posición al abrir un archivo.

### vim-sleuth
**Repositorio:** `tpope/vim-sleuth`
**Descripción:** Detecta automáticamente la configuración de indentación.

### vim-eunuch
**Repositorio:** `tpope/vim-eunuch`
**Descripción:** Comandos útiles de Unix como `:Rename`, `:SudoWrite`, `:Delete`, etc.

### bufdelete.nvim
**Repositorio:** `famiu/bufdelete.nvim`
**Descripción:** Cierra buffers sin cerrar las ventanas/splits.

**Keymaps:**
- `<Leader>q` - Cerrar buffer actual
- `<Leader>Q` - Cerrar todos los buffers

### codesnap.nvim
**Repositorio:** `mistricky/codesnap.nvim`
**Descripción:** Genera capturas de pantalla estilizadas de código.

**Configuración:**
- Font: JetBrainsMono Nerd Font
- Sin watermark
- Sin barra de ventana macOS

### peek.nvim
**Repositorio:** `toppair/peek.nvim`
**Descripción:** Preview de Markdown en tiempo real.

**Comandos:**
- `:PeekOpen` - Abrir preview
- `:PeekClose` - Cerrar preview

### which-key.nvim
**Repositorio:** `folke/which-key.nvim`
**Descripción:** Muestra keybindings disponibles en popups.

**Nota:** Actualmente deshabilitado (`enabled = false`)

---

## 📦 Gestor de Plugins

### lazy.nvim
**Descripción:** Gestor de plugins moderno y rápido para Neovim.

Todos los plugins están configurados para carga perezosa (lazy loading) cuando es apropiado, mejorando el tiempo de inicio de Neovim.

---

## 🔗 Dependencias Comunes

- **plenary.nvim** - Librería de utilidades Lua usada por múltiples plugins
- **nvim-web-devicons** - Iconos para archivos y tipos
- **nui.nvim** - Componentes UI para Neovim

---

## 📝 Notas

- La mayoría de los plugins usan lazy loading para optimizar el tiempo de inicio
- Los keymaps principales usan `<Leader>` que típicamente está mapeado a `<Space>`
- Algunos plugins comentados en el código están deshabilitados pero conservados para referencia futura
