import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import { NestedContributorList } from './NestedContributorList';
import { useSelectedRepo } from '../hooks/useSelectedRepo';
import { useRepoContributors } from '../hooks/useRepoContributors';
import { getRepoContributorStream } from '../hooks/useGithubData';

export const RepoDetail = () => {
    const { getSelectedRepo } = useSelectedRepo();
    const { getRepoContributors } = useRepoContributors();
    const repoInfo = getSelectedRepo();
    let contributors = [];
    if (repoInfo) {
        const repoContributors = getRepoContributors(repoInfo.name);
        contributors = repoContributors;
    }
    return (
        <div className="center">
            <Jumbotron fluid>
                <Container fluid="md">
                    <p>hii ndio hio</p>
                    <h1 className="display-3">{repoInfo.repoDetail.name}</h1>
                    <p className="lead">Owner: {repoInfo.repoDetail.owner.login}</p>
                    <p className="lead">Language: {repoInfo.repoDetail.language}</p>
                    <p className="lead">Default branch: {repoInfo.repoDetail.default_branch}</p>
                    <a
                        className="username"
                        href={repoInfo.repoDetail.html_url}
                        target="_blank"
                        rel="noreferrer"
                    >Visit Github profile</a>
                </Container>
            </Jumbotron>
            {contributors? <NestedContributorList contributors={contributors}/> : <Spinner style={{ width: '3rem', height: '3rem' }} />}
        </div>
    );
};
