import chalk from 'chalk';
import Table from 'cli-table3';

// Success message
export function success(message) {
    console.log(chalk.green(`✔ ${message}`));
}

// Error message
export function error(message) {
    console.log(chalk.red(`✖ ${message}`));
}

// Warning message
export function warning(message) {
    console.log(chalk.yellow(`⚠ ${message}`));
}

// Information message
export function info(message) {
    console.log(chalk.blue(`ℹ ${message}`));
}

// Display section title
export function title(message) {
    console.log(chalk.bold.cyan(`\n${message}\n`));
}

// Display data in a table
export function displayTable(headers, rows) {
    const table = new Table({
        head: headers.map(header => chalk.cyan(header)),
        style: {
            head: [],
            border: []
        }
    });

    rows.forEach(row => table.push(row));

    console.log(table.toString());
}