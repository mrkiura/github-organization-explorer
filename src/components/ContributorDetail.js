import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import { useSelectedContributor } from '../hooks/useSelectedContributor';
import { NestedRepositoriesList } from './NestedRepositoriesList';
import { useRepoContributors } from '../hooks/useRepoContributors';
import { useRepositories } from '../hooks/useRepositories';
import { Spinner } from 'reactstrap';


export const ContributorDetail = () => {
    const { getSelectedContributor } = useSelectedContributor();
    const activeContributor = getSelectedContributor();
    const { getRepositories } = useRepositories();
    const repositories = getRepositories();
    const finalRepos = repositories.filter((repo) => {
        repo.contributors.filter(contributor => {
            if (contributor.username === activeContributor.username) {
                return repo;
            }
        });
    });

    return (
        <Container>
            <div className="center">
                <Jumbotron fluid="md">
                    <Container fluid="md">
                        <h1 className="display-3">Contributor</h1>
                        <p className="lead">@{activeContributor.username}</p>
                        <p className="lead">Followers: {activeContributor.followers}</p>
                        <p className="lead">Gists: {activeContributor.gists}</p>
                        <a
                            className="username"
                            href={activeContributor.htmlUrl}
                            target="_blank"
                            rel="noreferrer"
                        >Visit Github profile</a>

                    </Container>
                </Jumbotron>
            </div>
            <h1 className="display-3">Repositories contributed to:</h1>
            <NestedRepositoriesList repositories={finalRepos}/>
        </Container>
    );
};
