import React, { useEffect } from 'react';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Table,
    Container,
    Row,
    Col,
} from 'reactstrap';
import { usePaginate } from '../hooks/usePaginate';
import { usePageInfo } from '../hooks/usePageInfo';
import { useRepositories } from '../hooks/useRepositories';
import { useSortData } from '../hooks/useSortData';
import { useGithubOrg } from '../hooks/useGithubOrg';
import { fetchRepositories } from '../hooks/useGithubData';

import { Sorter } from './Sorter';
import { RepositoryRow } from './RepositoryRow';
import { Paginator } from './Paginator';
import { getClassNamesFor } from '../utils';

const ListRepositories = () => {
    const { getGithubOrg, setGithubOrg } = useGithubOrg();
    const { getRepositories, setRepositories } = useRepositories();
    const githubOrg = getGithubOrg();

    const { getPageInfo, setPageInfo } = usePageInfo();
    const repositories = getRepositories();
    let { selectedPage, pageLimit, pageCount } = getPageInfo();
    pageCount = Math.ceil(repositories.length / pageLimit);
    const { page } = usePaginate(repositories, pageLimit, selectedPage);

    const { sortedData, sortConfig, setSortConfig } = useSortData(page);
    useEffect(() => {
        (async () => {
            let repos = [];
            repos = await fetchRepositories(githubOrg);
            setRepositories(repos);
            return;
        })();
    });

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
                            <br />
                        </div>
                    </Col>
                    <Col sm={{ size: 1, offset: 1 }}>
                        <Sorter handleSort={setSortConfig} sortConfig={sortConfig} />
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Table hover>
                        <thead className="profile-info">
                            <tr className="left">
                                <th className={getClassNamesFor('repositories', sortConfig)}>
                                    Repository
                                </th>
                                <th className={getClassNamesFor('description', sortConfig)}>
                                    Description
                                </th>
                                <th className={getClassNamesFor('language', sortConfig)}>
                                    Language
                                </th>
                                <th className={getClassNamesFor('forks', sortConfig)}>Forks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((repo, index) => (
                                <RepositoryRow repo={repo} key={index} />
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

export default ListRepositories;
