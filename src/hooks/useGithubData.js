import { parseLink } from '../utils';

import { useMemo } from 'react';
const { REACT_APP_GITHUB_AUTH_TOKEN } = process.env;

const authHeaders = {
    'User-Agent': 'Angular-Rank',
    'Authorization': `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`
}

export async function* fetchRepositories(organization) {
    let repoUrl = `https://api.github.com/orgs/${organization}/repos`;
    while (repoUrl) {
        const response = await fetch(repoUrl, {
            headers: authHeaders,
        });
        try {
            const body = await response.json();
            const link = parseLink(response.headers.get('Link'))
            repoUrl = link.next
            for await (let repo of body) {
                yield repo
            }
        } catch(err) {
            console.error(err);
            return;
        }
    }
}

export const fetchContributorDetails = (contributors) => {
    // const getContributorDetail = useMemo(() => {
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
            const contributor = {username, gists, htmlUrl, avatarUrl, followers, contributions, publicRepos}
            return contributor
        });
        return updatedContributors;
    // }, [contributors]
    // );
//    return { getContributorDetail }
}

export const getRepoContributorStream = async (repoFullName) => {
    let interval;
    const stream = new ReadableStream({
        async start(controller) {
        },
        pull(controller) {
        interval = setInterval(async () => {
            let contributorsUrl = `https://api.github.com/repos/${repoFullName}/contributors`;
            while (contributorsUrl) {
                const response = await fetch(contributorsUrl, {
                    headers: authHeaders,
                });
                try {
                    const body = await response.json();
                    const link = parseLink(response.headers.get('Link'))
                    contributorsUrl = link.next
                    controller.enqueue(body);
                } catch(err) {
                    return;
                }
            }
        }, 5000)
    },
    cancel() {
        clearInterval(interval)
        return;
    }
  });
  return stream;
};