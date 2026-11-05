#!/usr/bin/env node

import { runCLI } from '../src/cli.js';

runCLI().catch(error => {
    console.error('Unexpected error:', error.message);
    process.exitCode = 1;
});
