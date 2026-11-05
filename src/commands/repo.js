
import { getRepository } from '../services/github.js';

export async function inspectRepository(ownerAndRepo) {
    // Validate the repository format
    if (!ownerAndRepo || !/^[^/\s]+\/[^/\s]+$/.test(ownerAndRepo)) {
        console.error('Error: Please provide a repository in owner/repo format.');
        console.log('Example: devtrack repo inspect facebook/react');
        process.exitCode = 1;
        return;
    }

    try {
        const repository = await getRepository(ownerAndRepo);

        console.log('\nGitHub Repository Details\n');

        console.log(`Name: ${repository.name}`);
        console.log(`Description: ${repository.description || 'No description available'}`);
        console.log(`Language: ${repository.language || 'Not specified'}`);
        console.log(`Stars: ${repository.stars.toLocaleString()}`);
        console.log(`Forks: ${repository.forks.toLocaleString()}`);
        console.log(`Open Issues: ${repository.openIssues.toLocaleString()}`);
        console.log(`Last Updated: ${new Date(repository.lastUpdated).toLocaleString()}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
    }
}
