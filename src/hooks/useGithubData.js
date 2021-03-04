import { parseLink } from '../utils';
import { fetchWithLimit } from './fetchWithLimit';

const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;


const githubAuthHeaders = {
    'User-Agent': 'Angular-Rank',
    'Authorization': `token ${REACT_APP_GITHUB_AUTH_TOKEN}`
};


function getIntRange (start, end) {
    let nums = [];
    for (let i = start; i <= end; i++) {
        nums = [...nums, i];
    }
    return nums;
}

const getParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const getPageUrls = (linkHeader, url) => {
    const urls = [];
    const link = parseLink(linkHeader);

    if (link.last) {
        const lastPage = getParameterByName('page', link.last);
        const pageRange = getIntRange(2, parseInt(lastPage, 10));
        for (let page of pageRange) {
            urls.push(`${url}?page=${page}`);
        }
        return urls;
    }
};

const fetchPage = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const repsonse = await fetch(url, { headers: githubAuthHeaders });
            const body = await repsonse.json();
            resolve(body);
        } catch (err) {
            resolve([]);
        }
    });
};

export const fetchContributorDetails = async (contributors) => {
    const userUrls = contributors.map(contributor => contributor.url);

    const fetchContributor = async (contributor) => {
        return new Promise(async (resolve, reject) => {
            const contributorUrl = contributor.url;
            const response = await fetch(contributorUrl, {
                headers: githubAuthHeaders
            });
            const user = await response.json();
            const username = user.login;
            const followers = user.followers;
            const publicRepos = user.public_repos;
            const gists = user.public_gists;
            const avatarUrl = user.avatar_url;
            const htmlUrl = user.html_url;
            const contributions = contributor.contributions;
            const repoContributor = {
                username,
                gists,
                htmlUrl,
                avatarUrl,
                followers,
                publicRepos,
                contributions
            };
            resolve(repoContributor);
        });
    };
    return new Promise((resolve, reject) => {
        fetchWithLimit(contributors, 3, 20, fetchContributor).then((results) => {
            if (results) {
                resolve(results);
            }
        });
    });
};

export const getRepoContributorStream = async (repoFullName) => {
    let interval;
    const stream = new ReadableStream({
        async start(controller) { },
        async pull(controller) {
            interval = setInterval(async () => {
                let contributorsUrl = `https://api.github.com/repos/${repoFullName}/contributors`;

                const repsonse = await fetch(contributorsUrl, { headers: githubAuthHeaders });
                const body = await repsonse.json();
                const header = repsonse.headers.get('Link');
                const urlPromises = getPageUrls(header, contributorsUrl);
                urlPromises.then(urls => {
                    fetchWithLimit(urls, 1, 20, fetchPage).then((results) => {
                        if (results) {
                            const res = [...body, ...results];
                            controller.enqueue(res);
                        }
                    });
                });
            }, 1000);
        },
        cancel() {
            clearInterval(interval);
            return;
        }
    });
    return stream;
};

export const fetchRepos = async (organization, signal) => {
    return new Promise(async (resolve, reject) => {
        let repoUrl = `https://api.github.com/orgs/${organization}/repos`;
        const repsonse = await fetch(repoUrl, { headers: githubAuthHeaders, signal: signal });
        const body = await repsonse.json();
        const header = repsonse.headers.get('Link');
        const urls = getPageUrls(header, repoUrl);
        fetchWithLimit(urls, 5, 20, fetchPage).then((results) => {
            if (results) {
                results = [...body, ...results.flat()];
                resolve(results);
            }
        });
    });
};

export const requestRepoContributors = async (repoFullName, signal) => {
    return new Promise(async (resolve, reject) => {
        let contributorsUrl = `https://api.github.com/repos/${repoFullName}/contributors`;
        const repsonse = await fetch(contributorsUrl, { headers: githubAuthHeaders, signal: signal });
        const body = await repsonse.json();
        const header = repsonse.headers.get('Link');
        const urls = getPageUrls(header, contributorsUrl);
        if (!urls && body) { // no pages exist
            resolve(body);
        } else { // we have pages + initial response
            fetchWithLimit(urls, 3, 20, fetchPage).then((results) => {
                if (results) {
                    results = [...body, ...results.flat()];
                    resolve(results);
                }
            });
        }
    });
};
