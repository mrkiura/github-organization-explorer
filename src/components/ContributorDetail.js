import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import { useSelectedContributor } from '../hooks/useSelectedContributor';
import { NestedRepositoriesList } from './NestedRepositoriesList';


export const ContributorDetail = () => {
    const { getSelectedContributor } = useSelectedContributor();
    const actveContributor = getSelectedContributor();
    const repos = Array.from(actveContributor.repositories);
    const contributorDetail = actveContributor.contributorDetail;
    return (
        <Container>
            <div className="center">
                <Jumbotron fluid="md">
                    <Container fluid="md">
                        <h1 className="display-3">Contributor</h1>
                        <p className="lead">@{contributorDetail.username}</p>
                        <a
                            className="username"
                            href={contributorDetail.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >Visit Github profile</a>
                    </Container>
                </Jumbotron>
            </div>
            <h1 className="display-3">Repositories contributed to</h1>
            <NestedRepositoriesList repositories={repos}/>
        </Container>
    );
};
