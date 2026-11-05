import { error as printError } from './formatter.js';

// Handle application errors
export function handleError(message, exitCode = 1) {
    printError(message);
    process.exitCode = exitCode;
}