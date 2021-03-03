import React from 'react';
import {
    Table,
    Container,
    Row,
    Col
} from 'reactstrap';
import { usePaginate } from '../hooks/usePaginate';
import { usePageInfo } from '../hooks/usePageInfo';
import { useSortData } from '../hooks/useSortData';
import { RepositoryRow } from './RepositoryRow';
import { Paginator } from './Paginator';
import { getClassNamesFor } from '../utils';


export const NestedRepositoriesList = ({ repositories }) => {
    const { getPageInfo, setPageInfo } = usePageInfo();
    let { selectedPage, pageLimit, pageCount } = getPageInfo();
    pageCount = Math.ceil(repositories.length / pageLimit);
    const { page } = usePaginate(repositories, pageLimit, selectedPage);

    const { sortedData, sortConfig } = useSortData(page);
    return (
        <Container>
            <div className="center">
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
                            {sortedData.length > 1 ? sortedData.map((repo, index) => (
                                <RepositoryRow repo={repo} key={index}/>
                            )) : null}
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
