import React, { useEffect } from 'react';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Table,
    Container,
    Row,
    Col
} from 'reactstrap';
import { usePaginate } from '../hooks/usePaginate';
import { usePageInfo } from '../hooks/usePageInfo';
import { useContributors } from '../hooks/useContributors';
import { useRepositories } from '../hooks/useRepositories';
import { useSortData } from '../hooks/useSortData';
import { useGithubOrg } from '../hooks/useGithubOrg';
import {
    fetchContributorDetails, requestRepoContributors, fetchRepos
} from '../hooks/useGithubData';
import { Sorter } from './Sorter';
import { ContributorRow } from './ContributorRow';
import { Paginator } from './Paginator';
import { getClassNamesFor } from '../utils';
import { useRepoContributors } from '../hooks/useRepoContributors';
import { ContributorDetail } from './ContributorDetail';


const ListContributors = () => {
    const { getGithubOrg, setGithubOrg } = useGithubOrg();
    const { addContributors, getContributors } = useContributors();
    const { addRepositories, setRepositories } = useRepositories();
    const { addContributorsToRepo } = useRepoContributors();
    const githubOrg = getGithubOrg();
    const contributors = getContributors();
    useEffect(async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        console.log("state conts", contributors);
        // if (Array.from(contributors.length > 100)) {
        //     // co
        //     return;
        // }
        let repos = await fetchRepos(githubOrg, signal);
        repos = repos.reverse();
        setRepositories(repos);
        for (let repo of repos) {
            const repoContributors = await requestRepoContributors(repo.full_name);
            const contributorDetails = await fetchContributorDetails(repoContributors);
            addContributorsToRepo(contributorDetails, repo);
            addContributors(contributorDetails);
            console.log("updated", contributorDetails);
        }

        return function cleanup () {
            abortController.abort();
        };

        // repos.then(resuls => {
        // });
        // const repoStreamPromise = getRepoStream(githubOrg);
        // repoStreamPromise
        //     .then((repoStream) => repoStream.getReader().read())
        //     .then(({ done, value }) => {
        //         return new Promise((resolve, reject) => resolve([value]));
        //     })
        //     .then(groupedRrepos => {
        //         const flattened = groupedRrepos.flat().flat();
        //         addRepositories(flattened);
        //         return flattened;
        //     }).then(repos => {
        //         for (let repo of repos) {
        //             console.log("repo man", repo);
        //             const contributorStreamPromise = getRepoContributorStream(repo.full_name);
        //             contributorStreamPromise.then((contrbutorStream) => {
        //                 const reader = contrbutorStream.getReader();
        //                 reader.read().then(async ({ done, value }) => {
        //                     if (done) {
        //                         return;
        //                     }
        //                     return await fetchContributorDetails(value);
        //                 }).then(contributors => {
        //                 });
        //             });
        //         }
        //     });
    }, [addContributors, githubOrg, addRepositories, addContributorsToRepo]);

    const { getPageInfo, setPageInfo } = usePageInfo();
    let { selectedPage, pageLimit, pageCount } = getPageInfo();
    pageCount = Math.ceil(contributors.length / pageLimit);
    const { page } = usePaginate(contributors, pageLimit, selectedPage);

    const { sortedData, sortConfig, setSortConfig } = useSortData(page);

    return (
        <Container>
            <div className="center">
                <Row>
                    <Col sm={{ size: 6, offset: 1 }}>
                        <div className="org_search">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Organization</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    defaultValue={getGithubOrg()}
                                    onChange={(e) => {
                                        setGithubOrg(e.target.value);
                                    }}
                                />
                            </InputGroup>
                            <br></br>
                        </div>
                    </Col>
                    <Col sm={{ size: 1, offset: 1 }}>
                        <Sorter handleSort={setSortConfig} sortConfig={sortConfig} />
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Table hover>
                        <thead className="profile-info">
                            <tr>
                                <th>Contributor</th>
                                <th className={getClassNamesFor('contributions', sortConfig)}>
                                    Contributions
                                </th>
                                <th className={getClassNamesFor('followers', sortConfig)}>
                                    Followers
                                </th>
                                <th className={getClassNamesFor('publicRepos', sortConfig)}>
                                    Public Repos
                                </th>
                                <th className={getClassNamesFor('gists', sortConfig)}>Gists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((contributor, index) => (
                                <ContributorRow contributor={contributor} key={index} />
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Paginator
                            pageCount={pageCount}
                            onPageChange={(data) => {
                                setPageInfo(data.selected + 1, pageCount);
                            }}
                        />
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ListContributors;
