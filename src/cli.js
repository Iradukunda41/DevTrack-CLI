
import { parseArgs } from 'node:util';

export function runCLI() {
    const { values, positionals } = parseArgs({
        options: {
            help: {
                type: 'boolean',
                short: 'h',
            },
        },
        allowPositionals: true,
        strict: false,
    });

    // Display help instructions
    if (values.help || positionals[0] === 'help') {
        showHelp();
        return;
    }

    const command = positionals[0];

    const validCommands = [
        'project',
        'task',
        'repo',
        'dashboard',
        'report',
    ];

    if (!command) {
        showHelp();
        return;
    }

    if (!validCommands.includes(command)) {
        console.error(`Error: Unknown command "${command}".`);
        console.log('Run "devtrack --help" to see available commands.');
        process.exitCode = 1;
        return;
    }

    console.log(`Command received: ${command}`);
    console.log(`Arguments received: ${positionals.slice(1).join(' ')}`);
}

function showHelp() {
    console.log(`
DevTrack CLI
A toolkit for managing developer projects and tasks.

Usage:
  devtrack <command> [arguments]

Commands:
  project    Manage your development projects
  task       Manage your development tasks
  repo       Inspect public GitHub repositories
  dashboard  View your productivity dashboard
  report     Generate a productivity report

Options:
  -h, --help    Display help instructions

Examples:
  devtrack project add "BookNest"
  devtrack task list
  devtrack repo inspect facebook/react
`);
}
