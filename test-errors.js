import test from 'node:test';
import assert from 'node:assert/strict';
import { handleError } from './src/utils/errors.js';

test('handleError should set the correct exit code', () => {
    const originalExitCode = process.exitCode;

    handleError('Project not found!', 2);

    assert.equal(process.exitCode, 2);

    process.exitCode = originalExitCode;
});