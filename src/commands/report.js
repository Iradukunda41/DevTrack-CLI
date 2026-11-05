import { readData } from '../storage/dataStore.js';
import { calculateStats, progressBar } from '../services/stats.js';
import { title, info, displayTable } from '../utils/formatter.js';

export async function showReport() {
    const data = await readData();
    const stats = calculateStats(data);

    title('DevTrack Productivity Report');

    // Projects section
    console.log('Projects');

    if (data.projects.length === 0) {
        info('No projects yet.');
    } else {
        displayTable(
            ['#', 'Project', 'Created'],
            data.projects.map((project, index) => [
                String(index + 1),
                project.name,
                project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString()
                    : 'N/A',
            ])
        );
    }

    // Tasks section
    console.log('\nTasks');

    if (data.tasks.length === 0) {
        info('No tasks yet.');
    } else {
        displayTable(
            ['#', 'Task', 'Status'],
            data.tasks.map((task, index) => [
                String(index + 1),
                task.title,
                task.completed ? 'Completed' : 'Pending',
            ])
        );
    }

    // Summary section
    console.log('\nSummary');
    console.log(`Projects: ${stats.totalProjects}`);
    console.log(
        `Tasks: ${stats.completedTasks} completed, ${stats.pendingTasks} pending (of ${stats.totalTasks})`
    );
    console.log(
        `Progress: ${progressBar(stats.taskProgress)} ${stats.taskProgress}%\n`
    );
}