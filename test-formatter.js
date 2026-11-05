import {
    success,
    error,
    warning,
    info,
    title,
    displayTable
} from './src/utils/formatter.js';

success('Project created successfully!');
error('Project not found!');
warning('No tasks available.');
info('Loading projects...');

title('DEVTRACK CLI');

displayTable(
    ['ID', 'Project', 'Status'],
    [
        ['1', 'BookNest', 'Active'],
        ['2', 'DevTrack', 'In Progress'],
        ['3', 'TaskFlow', 'Completed']
    ]
);