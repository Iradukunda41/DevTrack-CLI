import ora from 'ora';

// Start loading spinner
export function startSpinner(message) {
    return ora(message).start();
}