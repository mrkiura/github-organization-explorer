import { parseLink } from '../utils';

const { REACT_APP_GITHUB_AUTH_TOKEN } = process.env;

const authHeaders = {
    'User-Agent': 'Angular-Rank',
    'Authorization': `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
};

export async function fetchRepositories(organization) {
    let repoUrl = `https://api.github.com/orgs/${organization}/repos`;
    let repos = [];
    while (repoUrl) {
        const response = await fetch(repoUrl, {
            headers: authHeaders,
        });
        try {
            const body = await response.json();
            const link = parseLink(response.headers.get('Link'));
            repoUrl = link.next;
            for await (let repo of body) {
                repos.push(repo);
            }
        } catch (err) {
            console.error(err);
            return;
        }
    }
    return repos;
}

export const fetchContributorDetails = (contributors) => {
    const updatedContributors = contributors.map(async (repoContributor) => {
        const response = await fetch(repoContributor.url, {
            headers: authHeaders,
        });
        const user = await response.json();
        const username = user.login;
        const contributions = repoContributor.contributions;
        const followers = user.followers;
        const publicRepos = user.public_repos;
        const gists = user.public_gists;
        const avatarUrl = user.avatar_url;
        const htmlUrl = user.avatar_url;
        const contributor = {
            username,
            gists,
            htmlUrl,
            avatarUrl,
            followers,
            contributions,
            publicRepos,
        };
        return contributor;
    });
    return updatedContributors;
};

export const getRepoContributorStream = async (repoFullName) => {
    let interval;
    const stream = new ReadableStream({
        async start (controller) {},
        pull (controller) {
            interval = setInterval(async () => {
                let contributorsUrl = `https://api.github.com/repos/${repoFullName}/contributors`;
                while (contributorsUrl) {
                    const response = await fetch(contributorsUrl, {
                        headers: authHeaders,
                    });
                    try {
                        const body = await response.json();
                        const link = parseLink(response.headers.get('Link'));
                        contributorsUrl = link.next;
                        controller.enqueue(body);
                    } catch (err) {
                        return;
                    }
                }
            }, 5000);
        },
        cancel () {
            clearInterval(interval);
            return;
        },
    });
    return stream;
};

export const requestRepoContributors = async (repo) => {
    let contributorsUrl = `https://api.github.com/repos/${repo.full_name}/contributors`;
    let contributors = [];
    while (contributorsUrl) {
        const response = await fetch(contributorsUrl, {
            headers: authHeaders,
        });
        try {
            const body = await response.json();
            const link = parseLink(response.headers.get('Link'));
            contributorsUrl = link.next;
            contributors.push(body);
        } catch (err) {
        // We didn't find json so skip
            console.error(err);
            return new Promise((resolve, reject) => reject(err));
        }
    }
    return new Promise((resolve, reject) => {
        return resolve(contributors);
    });
};
