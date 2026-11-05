import { startSpinner } from './src/utils/spinner.js';

const spinner = startSpinner('Fetching GitHub projects...');

setTimeout(() => {
    spinner.succeed('Projects fetched successfully!');
}, 2000);