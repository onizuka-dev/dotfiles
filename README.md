# 💻dotfiles
## 👷‍♂️ Installation
Make these files executable
```
chmod +x ./scripts/t
chmod +x ./scripts/open-kitty.sh
```

Then install the script:
```
./install
```

## 🔧 Creating a Global Hotkey to Run a Script on macOS (Automator Method)

You can use Automator to assign a **global keyboard shortcut** (like `Ctrl + ;`) to run any script, such as `~/.local/bin/kitty-toggle`. This works system-wide, without needing to open Raycast or any other app.

---

### 🥇 Step 1: Create an Automator Quick Action

1. Open **Automator.app**.
2. Go to **File > New**, then select **Quick Action** (or **Service** on older macOS versions).
3. At the top of the workflow, configure:
   - **Workflow receives**: `no input`
   - **in**: `any application`
4. In the left panel, search for **Run Shell Script**, then drag it into the workflow area.
5. Replace the script content with:

  ```
  ~/.local/bin/kitty-toggle
  ```

  ### 🥈 Step 2: Assign the Global Hotkey (`Ctrl + ;`)

1. Open **System Settings** (or **System Preferences**, depending on your macOS version).
2. Navigate to:
   **Keyboard > Keyboard Shortcuts > Services** (or **Quick Actions**).
3. Scroll through the list until you find your newly created Quick Action (e.g., `Toggle Kitty`).
4. Click on it to add a keyboard shortcut.
5. Press the keys you want to assign — for example:
   **`Control + ;`**
6. Close the settings window. That’s it!

You can now run your script globally with just `Ctrl + ;`, from anywhere in the system.
