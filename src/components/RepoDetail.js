import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import { NestedContributorList } from './NestedContributorList';
import { useSelectedRepo } from '../hooks/useSelectedRepo';


export const RepoDetail = () => {
    const { getSelectedRepo } = useSelectedRepo();

    const repository = getSelectedRepo();


    return (
        <Container>
            <div className="center">
                <Jumbotron fluid="md">
                    <Container fluid="md">
                        <h1 className="display-3">Repository</h1>
                        <p className="lead">@{repository.name}</p>
                        <p className="lead">Language: {repository.language}</p>
                        <p className="lead">Default branch: {repository.default_branch}</p>
                        <a
                            className="username"
                            href={repository.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >Visit Github profile</a>

                    </Container>
                </Jumbotron>
            </div>
            <h1 className="display-3">Contributors:</h1>
            <NestedContributorList contributors={repository.contributors}/>
        </Container>
    );
};
