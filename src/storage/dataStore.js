
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

// Find the user's home directory
const dataDirectory = path.join(homedir(), '.devtrack');

// Define where our JSON file will live
const dataFile = path.join(dataDirectory, 'data.json');

// Default structure for DevTrack data
const defaultData = {
    projects: [],
    tasks: [],
};

// Make sure the storage file exists
async function ensureDataFile() {
    await mkdir(dataDirectory, { recursive: true });

    try {
        await readFile(dataFile, 'utf-8');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }

        await writeFile(
            dataFile,
            JSON.stringify(defaultData, null, 2),
            'utf-8'
        );
    }
}

// Read saved information
export async function readData() {
    await ensureDataFile();

    const content = await readFile(dataFile, 'utf-8');

    return JSON.parse(content);
}

// Save information
export async function writeData(data) {
    await ensureDataFile();

    const content = JSON.stringify(data, null, 2);

    await writeFile(dataFile, content, 'utf-8');
}
