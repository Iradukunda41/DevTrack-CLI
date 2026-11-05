import { readData, writeData } from '../storage/dataStore.js';

// Add a new task
export async function addTask(title) {
    if (!title) {
        console.error('Error: Please provide a task title.');
        process.exitCode = 1;
        return;
    }

    const data = await readData();

    const newTask = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    data.tasks.push(newTask);

    await writeData(data);

    console.log(`Task "${title}" added successfully!`);
}

// Display all tasks
export async function listTasks() {
    const data = await readData();

    if (data.tasks.length === 0) {
        console.log('No tasks found. Add your first task!');
        return;
    }

    console.log('\nYour Tasks:\n');

    data.tasks.forEach((task, index) => {
        const status = task.completed ? 'Completed' : 'Pending';

        console.log(`${index + 1}. ${task.title} - ${status}`);
    });
}

// Mark a task as completed
export async function completeTask(taskId) {
    if (!taskId || !Number.isInteger(Number(taskId)) || Number(taskId) < 1) {
        console.error('Error: Please provide a valid task number.');
        process.exitCode = 1;
        return;
    }

    const data = await readData();
    const taskIndex = Number(taskId) - 1;
    const task = data.tasks[taskIndex];

    if (!task) {
        console.error(`Error: Task "${taskId}" was not found.`);
        process.exitCode = 1;
        return;
    }

    if (task.completed) {
        console.log(`Task "${task.title}" is already completed.`);
        return;
    }

    task.completed = true;

    await writeData(data);

    console.log(`Task "${task.title}" marked as completed!`);
}

// Delete a task
export async function deleteTask(taskId) {
    if (!taskId || !Number.isInteger(Number(taskId)) || Number(taskId) < 1) {
        console.error('Error: Please provide a valid task number.');
        process.exitCode = 1;
        return;
    }

    const data = await readData();
    const taskIndex = Number(taskId) - 1;

    if (!data.tasks[taskIndex]) {
        console.error(`Error: Task "${taskId}" was not found.`);
        process.exitCode = 1;
        return;
    }

    const deletedTask = data.tasks.splice(taskIndex, 1)[0];

    await writeData(data);

    console.log(`Task "${deletedTask.title}" deleted successfully!`);
}