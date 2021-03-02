import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import { NestedContributorList } from './NestedContributorList';
import { useSelectedRepo } from '../hooks/useSelectedRepo';

export const RepoDetail = () => {
    const { getSelectedRepo } = useSelectedRepo();
    const repoInfo = getSelectedRepo();
    const repoContributors = Array.from(repoInfo.contributors);
    return (
        <div className="center">
            <Jumbotron fluid>
                <Container fluid="md">
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
            <NestedContributorList contributors={repoContributors}/>
        </div>
    );
};
