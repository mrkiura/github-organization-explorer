const { REACT_APP_GITHUB_AUTH_TOKEN } = process.env;

const autHeaders = {
	'User-Agent': 'Angular-Rank',
	'Authorization': `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`
}

async function* fetchRepositories(organization) {
	let url = `https://api.github.com/orgs/${organization}/repos`;
	const search_params = new URLSearchParams({
		per_page: 5,
		page: 1
	})
	while (url) {
		const response = await fetch(url + `?${search_params}`, {
			headers: autHeaders,
		});

		const body = await response.json();
		const link = response.headers.get('Link')
		if ( link ) {
			let nextPage = link.match(/<(.*?)>; rel="next"/);
			nextPage = nextPage?.[1];
			if (nextPage.includes('next')) {
				url = nextPage
			} else {
				url = null;
			}
		} else {
			url = null
		}
		for (let repo of body) {
			yield repo.full_name
		}
	}
}


async function fetchRepoContributors(repoFullName) {
	let repoContributors = [];
	let url = `https://api.github.com/repos/${repoFullName}/contributors`;
	const search_params = new URLSearchParams({
		per_page: 100,
	});

	while (url) {
		const response = await fetch(url + `?${search_params}`, {
			headers: autHeaders,
		});

		const body = await response.json();
		const link = response.headers.get('Link')
		if ( link ) {
			let nextPage = link.match(/<(.*?)>; rel="next"/);
			nextPage = nextPage?.[1];
			if (nextPage.includes('next')) {
				url = nextPage
			} else {
				url = null;
			}
		} else {
			url = null
		}

		repoContributors = repoContributors.concat(body)
	}
	return repoContributors;
};


export const fetchContributorDetails = async (contributors) => {
	const updatedContributors = contributors.map(async (repoContributor) => {
		const response = await fetch(repoContributor.url, {
			headers: autHeaders,
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
}

export const updateContributors = async (organization) => {
	let contributors = [];
	for await (let repo of fetchRepositories(organization)) {
		const repoContributors = await fetchRepoContributors(repo)
		contributors = [...contributors, ...repoContributors];
	}
	const conts = Array.from(new Set(contributors));
	return conts
}
