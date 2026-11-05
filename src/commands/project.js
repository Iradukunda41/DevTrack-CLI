
import { readData, writeData } from '../storage/dataStore.js';

export async function addProject(name) {
    if (!name) {
        console.error('Error: Please provide a project name.');
        process.exitCode = 1;
        return;
    }

    const data = await readData();

    const existingProject = data.projects.find(
        project => project.name.toLowerCase() === name.toLowerCase()
    );

    if (existingProject) {
        console.error(`Error: "${name}" already exists.`);
        process.exitCode = 1;
        return;
    }

    const newProject = {
        id: Date.now(),
        name,
        createdAt: new Date().toISOString(),
    };

    data.projects.push(newProject);

    await writeData(data);

    console.log(`Project "${name}" added successfully!`);
}

export async function listProjects() {
    const data = await readData();

    if (data.projects.length === 0) {
        console.log('No projects found. Add your first project!');
        return;
    }

    console.log('\nYour Projects:\n');

    data.projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name}`);
    });
}



export async function showProject(name) {
    if (!name) {
        console.error('Error: Please provide a project name.');
        process.exitCode = 1;
        return;
    }

    const data = await readData();

    const project = data.projects.find(
        project => project.name.toLowerCase() === name.toLowerCase()
    );

    if (!project) {
        console.error(`Error: Project "${name}" was not found.`);
        process.exitCode = 1;
        return;
    }

    console.log('\nProject Details\n');
    console.log(`Name: ${project.name}`);
    console.log(`ID: ${project.id}`);
    console.log(
        `Created: ${project.createdAt
            ? new Date(project.createdAt).toLocaleString()
            : 'Not available'}`
    );
}


export async function removeProject(name) {
    if (!name) {
        console.error('Error: Please provide a project name.');
        process.exitCode = 1;
        return;
    }

    const data = await readData();

    const projectIndex = data.projects.findIndex(
        project => project.name.toLowerCase() === name.toLowerCase()
    );

    if (projectIndex === -1) {
        console.error(`Error: Project "${name}" was not found.`);
        process.exitCode = 1;
        return;
    }

    const removedProject = data.projects[projectIndex];

    data.projects.splice(projectIndex, 1);

    await writeData(data);

    console.log(`Project "${removedProject.name}" removed successfully!`);
}
