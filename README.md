# DevTrack-CLI

A Node.js command-line toolkit for managing developer projects, tasks, and GitHub repository insights.

## Overview

DevTrack CLI is a small productivity tool that runs in the terminal. It lets a developer keep a list of projects and tasks, mark tasks as done, see a dashboard and a report of their progress, and look up public GitHub repositories, all without leaving the command line.

### The problem it solves

Developers often keep track of their work in scattered notes, browser tabs, or in their heads. Opening a full project-management website just to add a task or check progress slows them down. DevTrack keeps everything in one place, close to where the work happens: your terminal. It saves your data locally in a simple JSON file, needs no account and no internet (except for GitHub lookups), and gives you a quick summary of how much work is done and how much is left.

## Features

- Manage projects: add, list, show, and remove
- Manage tasks: add, list, complete, and delete
- Dashboard with project and task statistics and a progress bar
- Productivity report with project and task tables and a summary
- Inspect any public GitHub repository (`owner/repo`)
- Colored output and tables in the dashboard and report, and clear error messages with exit codes for invalid input
- Data saved locally in a JSON file

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

You can also run the CLI without linking it:

```bash
npm start -- --help
npm start -- dashboard
```

### Uninstall

```bash
npm unlink -g devtrack-cli
```

### Troubleshooting

- **`devtrack` is not recognized:** close the terminal and open a new one, then try again. Run `npm config get prefix` and make sure that folder is in your `PATH`.
- **PowerShell says "running scripts is disabled on this system" (Windows):** run this once, then try again:

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```

  You can also run `devtrack.cmd` instead of `devtrack`.
- **Changes in the code do not appear:** `npm link` points to your project folder, so no re-install is needed. Make sure you saved the file and run the command again.

## Usage

```
devtrack <command> [arguments]
```

Use quotes around names that contain spaces.

### Help

```bash
devtrack --help
devtrack -h
```

### Project commands

| Command | Description |
|---|---|
| `devtrack project add "<name>"` | Add a new project (names must be unique, not case-sensitive) |
| `devtrack project list` | List all projects |
| `devtrack project show "<name>"` | Show the details of a project |
| `devtrack project remove "<name>"` | Remove a project |

```bash
devtrack project add "BookNest"
devtrack project list
devtrack project show "BookNest"
devtrack project remove "BookNest"
```

Example output of `project show`:

```
Project Details

Name: Docs Demo
ID: 1793921918432
Created: 11/6/2026, 1:38:38 AM
```

### Task commands

| Command | Description |
|---|---|
| `devtrack task add "<title>"` | Add a new task |
| `devtrack task list` | List all tasks with their status |
| `devtrack task complete <number>` | Mark a task as completed |
| `devtrack task delete <number>` | Delete a task |

The `<number>` is the position of the task in `devtrack task list`.

```bash
devtrack task add "Build login page"
devtrack task list
devtrack task complete 1
devtrack task delete 1
```

Example output of `task list`:

```
Your Tasks:

1. Build login page - Completed
2. Write README - Pending
3. Try the commands - Pending
```

### Dashboard

```bash
devtrack dashboard
```

Shows the total number of projects and tasks, how many tasks are completed and pending, and the task progress in percent. If there is no data yet, it shows a friendly message instead of an error.

### Report

```bash
devtrack report
```

Prints a report with a table of projects, a table of tasks with their status, and a summary (projects, completed and pending tasks, progress). It uses the saved data, and handles empty data without errors.

### GitHub repository inspection

```bash
devtrack repo inspect <owner>/<repo>
```

Example:

```bash
devtrack repo inspect facebook/react
```

Example output (the numbers change over time):

```
GitHub Repository Details

Name: react/react
Description: The library for web and native user interfaces.
Language: JavaScript
Stars: 252,021
Forks: 51,733
Open Issues: 1,512
Last Updated: 11/6/2026, 1:37:24 AM
```

If the repository is not given in the `owner/repo` format, DevTrack shows an error message and an example.

## How progress is calculated

Progress is the percentage of completed tasks:

```
progress = completed tasks / total tasks x 100
```

The result is rounded. When there are no tasks, the progress is 0% (no division by zero).

## Data persistence (JSON)

DevTrack saves your projects and tasks in a JSON file in your home directory:

```
~/.devtrack/data.json
```

The file is created automatically the first time you run a command. Its structure is:

```json
{
  "projects": [
    { "id": 1793921918432, "name": "Docs Demo", "createdAt": "2026-11-06T01:38:38.000Z" }
  ],
  "tasks": [
    { "id": 1793921950000, "title": "Try the commands", "completed": false, "createdAt": "2026-11-06T01:39:10.000Z" }
  ]
}
```

Because the file lives in your home directory, your data is the same no matter which folder you run `devtrack` from. To start fresh, delete `data.json`.

## GitHub API

The `repo inspect` command asks the public GitHub REST API (`https://api.github.com/repos/<owner>/<repo>`) for information about a repository and displays the name, description, main language, stars, forks, open issues, and last update time. It does not use a token. It needs an internet connection and only works with public repositories. GitHub may limit how many requests you can make in a short time.

## Project structure

```
DevTrack-CLI/
|-- bin/
|   `-- devtrack.js        CLI entry point (shebang, calls runCLI)
|-- src/
|   |-- cli.js             Reads the command line and runs the right command
|   |-- commands/
|   |   |-- project.js     project add / list / show / remove
|   |   |-- task.js        task add / list / complete / delete
|   |   |-- repo.js        repo inspect
|   |   |-- dashboard.js   dashboard command
|   |   `-- report.js      report command
|   |-- services/
|   |   |-- github.js      GitHub API requests
|   |   `-- stats.js       Statistics and progress calculations
|   |-- storage/
|   |   `-- dataStore.js   Reads and writes ~/.devtrack/data.json
|   `-- utils/
|       |-- errors.js      Error handling
|       |-- formatter.js   Colors, messages, and tables
|       `-- spinner.js     Loading spinner
|-- test-errors.js
|-- test-formatter.js
|-- test-spinner.js
|-- test-stats.js
|-- package.json
`-- README.md
```

## Tests

```bash
npm test
```

This runs the Node.js built-in test runner (`node --test`) on the `test-*.js` files.

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk): colored terminal text
- [cli-table3](https://www.npmjs.com/package/cli-table3): tables in the terminal
- [ora](https://www.npmjs.com/package/ora): loading spinners

## Known limitations

- Tasks are not linked to projects, so progress is calculated from all tasks together, not per project.
- Tasks are identified by their position in the list, so the numbers change after a task is deleted.
- Projects and tasks cannot be renamed or edited yet.
- Data is stored for one user on one computer; there is no sync.
- `repo inspect` needs internet access, works only with public repositories, and may be limited by GitHub request limits.
- When GitHub returns an error, `repo inspect` shows only the HTTP status (for example `GitHub API error: 404` for a repository that does not exist).
- The spinner and error-handling helpers in `src/utils` are not used by every command yet.

## Future improvements

- Link tasks to projects and show progress for each project
- Edit and rename projects and tasks
- Task priorities, due dates, and filters
- Optional GitHub token to avoid request limits
- Friendlier GitHub error messages and a loading spinner for `repo inspect`
- Use the formatter, spinner, and error helpers in all commands
- Export the report to a file
- More automated tests for the commands

## Contributors

This project was built by two developers:

| Developer | GitHub |
|---|---|
| Iradukunda41 | [@Iradukunda41](https://github.com/Iradukunda41) |
| marquise-ange | [@marquise-ange](https://github.com/marquise-ange) |

## License

MIT