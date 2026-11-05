# DevTrack-CLI
A Node.js command-line toolkit for managing developer projects, tasks, and GitHub repository insights.

## Installation

### Requirements

- [Node.js](https://nodejs.org/) version 20 or higher
- npm (comes with Node.js)
- Git

### Install locally with `npm link`

1. Clone the repository and open the project folder:

   ```bash
   git clone https://github.com/marquise-ange/DevTrack-CLI.git
   cd DevTrack-CLI
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Link the package so the `devtrack` command is available everywhere:

   ```bash
   npm link
   ```

4. Check that the command works, from any folder:

   ```bash
   devtrack --help
   devtrack dashboard
   ```

### Uninstall

```bash
npm unlink -g devtrack-cli
```

### Where your data is saved

DevTrack saves your projects and tasks in a JSON file in your home directory:
```
~/.devtrack/data.json
```

### Troubleshooting

- **`devtrack` is not recognized:** close the terminal and open a new one, then try again. Run `npm config get prefix` and make sure that folder is in your `PATH`.
- **PowerShell says "running scripts is disabled on this system" (Windows):** run this once, then try again:

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```

  You can also run `devtrack.cmd` instead of `devtrack`.
- **Changes in the code do not appear:** `npm link` points to your project folder, so no re-install is needed. Make sure you saved the file and run the command again.