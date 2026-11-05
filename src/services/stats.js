// Calculate a percentage safely (no division by zero)
export function calculatePercentage(done, total) {
    if (total === 0) {
        return 0;
    }

    return Math.round((done / total) * 100);
}

// Calculate all statistics from saved data
export function calculateStats(data) {
    const projects = data.projects ?? [];
    const tasks = data.tasks ?? [];

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    return {
        totalProjects: projects.length,
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks,
        taskProgress: calculatePercentage(completedTasks, totalTasks),
    };
}

// Draw a progress bar, e.g. ██████░░░░
export function progressBar(percent, width = 20) {
    const filled = Math.round((percent / 100) * width);

    return '█'.repeat(filled) + '░'.repeat(width - filled);
}