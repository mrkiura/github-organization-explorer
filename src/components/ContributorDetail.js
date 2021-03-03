import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';
import { useSelectedContributor } from '../hooks/useSelectedContributor';
import { NestedRepositoriesList } from './NestedRepositoriesList';
import { useRepoContributors } from '../hooks/useRepoContributors';
import { Spinner } from 'reactstrap';


export const ContributorDetail = () => {
    const { getSelectedContributor } = useSelectedContributor();
    const { getAllRepoContributors } = useRepoContributors();
    const activeContributor = getSelectedContributor();
    // const repos = Array.from(actveContributor.repositories);

    const contributorDetail = activeContributor;
    console.log("contributor", contributorDetail);
    const repoContributorMap = getAllRepoContributors();
    console.log("conts map", repoContributorMap);
    let contributionsByRepo = Object.fromEntries(
        Object.entries(repoContributorMap).map(([repoName, repoObj]) => [repoName, repoObj.contributors])
    );
    const repos = Object.entries(contributionsByRepo).map(([repoName, contributions]) => {
        if (contributions.includes(activeContributor.login)) {
            return repoContributorMap[repoName].repoDetail;
        }
    });

    console.log("repos", repos);

    return (
        <Container>
            <div className="center">
                <Jumbotron fluid="md">
                    <Container fluid="md">
                        (contributorDetail?<h1 className="display-3">Contributor</h1>
                        <p className="lead">@{contributorDetail.username}</p>
                        <a
                            className="username"
                            href={contributorDetail.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >Visit Github profile</a>: null)

                    </Container>
                </Jumbotron>
            </div>
            <h1 className="display-3">Repositories contributed to</h1>
            (repos?
            <NestedRepositoriesList repositories={repos}/>: <Spinner style={{ width: '3rem', height: '3rem' }} />)
        </Container>
    );
};
