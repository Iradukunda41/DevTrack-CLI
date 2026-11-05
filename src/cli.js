
import { parseArgs } from 'node:util';
import { addProject, listProjects, showProject, removeProject, } from './commands/project.js';
import { inspectRepository } from './commands/repo.js';

export async function runCLI() {
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
    const action = positionals[1];
    const argument = positionals.slice(2).join(' ');

    // Check whether a command was provided
    if (!command) {
        showHelp();
        return;
    }

    // Handle project commands
    if (command === 'project') {
        if (action === 'remove') {
            await removeProject(argument);
            return;
        }
        if (action === 'add') {
            await addProject(argument);
            return;
        }

        if (action === 'list') {
            await listProjects();
            return;
        }

        if (action === 'show') {
            await showProject(argument);
            return;
        }

        console.error('Error: Unknown project action.');
        console.log('Available actions: add, list, show, remove');
        process.exitCode = 1;
        return;
    }

    // Handle GitHub repository commands
    if (command === 'repo') {
        if (action === 'inspect') {
            await inspectRepository(argument);
            return;
        }

        console.error('Error: Unknown repository action.');
        console.log('Available actions: inspect');
        process.exitCode = 1;
        return;
    }

    // Handle commands not implemented yet
    const validCommands = [
        'task',
        'dashboard',
        'report',
    ];

    if (validCommands.includes(command)) {
        console.log(`The "${command}" command is not implemented yet.`);
        return;
    }

    // Handle unknown commands
    console.error(`Error: Unknown command "${command}".`);
    console.log('Run "devtrack --help" to see available commands.');
    process.exitCode = 1;
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
  devtrack project list
  devtrack project show "BookNest"
  devtrack repo inspect facebook/react
`);
}
