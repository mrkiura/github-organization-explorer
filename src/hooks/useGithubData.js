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

const getPageUrls = async (linkHeader, url) => {
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
    const userUrls = contributors.filter(contributor => contributor.url);

    const fetchContributor = async (contributorUrl) => {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(contributorUrl, {
                headers: githubAuthHeaders
            });
            const user = await response.json();
            const username = user.login;
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
                publicRepos
            };
            return contributor;
        });
    };

    fetchWithLimit(userUrls, 5, 5, fetchContributor).then((results) => {
        if (results) {
            return results;
        }
    });
};

export const getRepoContributorStream = async (repoFullName) => {
    let interval;
    const stream = new ReadableStream({
        async start (controller) {},
        async pull (controller) {
            interval = setInterval(async () => {
                let contributorsUrl = `https://api.github.com/repos/${repoFullName}/contributors`;

                const repsonse = await fetch(contributorsUrl, { headers: githubAuthHeaders });
                const body = await repsonse.json();
                const header = repsonse.headers.get('Link');
                const urlPromises = getPageUrls(header, contributorsUrl);
                urlPromises.then(urls => {
                    fetchWithLimit(urls, 7, 15, fetchPage).then((results) => {
                        if (results) {
                            const res = [...body, ...results];
                            controller.enqueue(res);
                        }
                    });
                });
            }, 1000);
        },
        cancel () {
            clearInterval(interval);
            return;
        }
    });
    return stream;
};

export const getRepoStream = async (organization) => {
    let interval;
    const stream = new ReadableStream({
        async start (controller) {},
        async pull (controller) {
            interval = setInterval(async () => {
                let repoUrl = `https://api.github.com/orgs/${organization}/repos`;
                const repsonse = await fetch(repoUrl, { headers: githubAuthHeaders });
                const body = await repsonse.json();
                const header = repsonse.headers.get('Link');
                const urlPromises = getPageUrls(header, repoUrl);
                urlPromises.then(urls => {
                    fetchWithLimit(urls, 7, 15, fetchPage).then((results) => {
                        if (results) {
                            results.push(body);
                            controller.enqueue(results);
                        }
                    });
                });
            }, 1000);
        },
        cancel () {
            clearInterval(interval);
            return;
        }
    });
    return stream;
};

export const requestRepoContributors = async (repo) => {
    return new Promise (async (resolve, reject) => {
        let contributorsUrl = `https://api.github.com/repos/${repoFullName}/contributors`;
        const repsonse = await fetch(contributorsUrl, { headers: githubAuthHeaders });
        const body = await repsonse.json();
        let contributors = [body];
        const header = repsonse.headers.get('Link');
        const urlPromises = getPageUrls(header, contributorsUrl);
        urlPromises.then(urls => {
            fetchWithLimit(urls, 75, 15, fetchPage).then((results) => {
                if (results) {
                    contributors.concat(results);
                }
            });
        });
        resolve(contributors);
    });
};
