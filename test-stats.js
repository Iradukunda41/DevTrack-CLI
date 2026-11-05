import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateStats, calculatePercentage } from './src/services/stats.js';

test('empty data gives zeros without errors', () => {
    const stats = calculateStats({ projects: [], tasks: [] });

    assert.deepEqual(stats, {
        totalProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        taskProgress: 0,
    });
});

test('missing projects and tasks are handled', () => {
    const stats = calculateStats({});

    assert.equal(stats.totalProjects, 0);
    assert.equal(stats.totalTasks, 0);
    assert.equal(stats.taskProgress, 0);
});

test('task statistics and progress are correct', () => {
    const stats = calculateStats({
        projects: [{ name: 'A' }],
        tasks: [
            { completed: true },
            { completed: false },
            { completed: true },
            { completed: false },
        ],
    });

    assert.equal(stats.totalProjects, 1);
    assert.equal(stats.totalTasks, 4);
    assert.equal(stats.completedTasks, 2);
    assert.equal(stats.pendingTasks, 2);
    assert.equal(stats.taskProgress, 50);
});

test('percentage is rounded and safe', () => {
    assert.equal(calculatePercentage(1, 3), 33);
    assert.equal(calculatePercentage(2, 3), 67);
    assert.equal(calculatePercentage(0, 0), 0);
    assert.equal(calculatePercentage(5, 5), 100);
});