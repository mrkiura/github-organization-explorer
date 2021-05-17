# Github Organization Explorer

An application that provides information for an Organization's repositories and contributors on Github.

The default organization provided is Angular, but the app is flexible enough to allow you to use it to search for any organization you would like to see.

You can test it out [here](https://sleepy-roentgen-69d6c8.netlify.app)


## Scope: Repository

* Get all contributors for a repository
* Rank contributors by:
    * contributions
    * followers,
    * public repos
    * gists
* Get details of each repository

## Scope: Contributors
* Get all contributors
* Get details of each contributor
* Get all repositories a contributor has contributed to

## Setup

```
$ git clone git@github.com:mrkiura/github-organization-explorer.git
$ cd github-organization-explorer
$ yarn install
```

## Authentication

We need to get a Github Auth token to authenticate our results. We can access the API unauthenticated, but we will quickly hit the 60 requests per minute limit imposed by Github on unauthenticated requests.

Follow [this guide ](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to get started with Github auth tokens.

## Environment variables

Create a .env in the root directory and add the token you created as follows:
```bash
REACT_APP_GITHUB_AUTH_TOKEN=your_flashy_new_auth_token_here

```

Everything is now in place, let's run the app.

To start the development server:
```
$ yarn start
```
