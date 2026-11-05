
export async function getRepository(ownerAndRepo) {
    const url = `https://api.github.com/repos/${ownerAndRepo}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repository = await response.json();

    return {
        name: repository.full_name,
        description: repository.description,
        language: repository.language,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        openIssues: repository.open_issues_count,
        lastUpdated: repository.updated_at,
    };
}
