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
import { ContributorRow } from './ContributorRow';
import { Paginator } from './Paginator';
import { getClassNamesFor } from '../utils';


export const NestedContributorList = ({ contributors }) => {
    const { getPageInfo, setPageInfo } = usePageInfo();
    let { selectedPage, pageLimit, pageCount } = getPageInfo();
    pageCount = Math.ceil(contributors.length / pageLimit);
    const { page } = usePaginate(contributors, pageLimit, selectedPage);

    const { sortedData, sortConfig } = useSortData(page);
    return (
        <Container>
            <div className="center">
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
