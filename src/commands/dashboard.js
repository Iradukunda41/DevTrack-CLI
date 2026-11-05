import { readData } from '../storage/dataStore.js';
import { calculateStats, progressBar } from '../services/stats.js';
import { title, info, displayTable } from '../utils/formatter.js';

export async function showDashboard() {
    const data = await readData();
    const stats = calculateStats(data);

    title('DevTrack Dashboard');

    // Handle empty data without errors
    if (stats.totalProjects === 0 && stats.totalTasks === 0) {
        info('No data yet. Add a project or a task to see your dashboard.');
        return;
    }

    displayTable(
        ['Metric', 'Value'],
        [
            ['Total projects', String(stats.totalProjects)],
            ['Total tasks', String(stats.totalTasks)],
            ['Completed tasks', String(stats.completedTasks)],
            ['Pending tasks', String(stats.pendingTasks)],
        ]
    );

    console.log(
        `\nTask progress: ${progressBar(stats.taskProgress)} ${stats.taskProgress}%\n`
    );
}