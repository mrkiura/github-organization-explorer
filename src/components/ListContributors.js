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
import { useContributors } from '../hooks/useContributors'
import { useSortData } from '../hooks/useSortData';
import { useGithubOrg } from '../hooks/useGithubOrg';
import { updateContributors, fetchContributorDetails } from '../hooks/useGithubData';

import { Sorter } from './Sorter';
import { ContributorRow } from './ContributorRow';
import { Paginator } from './Paginator';
import { getClassNamesFor } from '../utils';


const ListContributors = () => {
  const { getGithubOrg, setGithubOrg } = useGithubOrg()
  const { getContributors, addContributors } = useContributors();

  useEffect(() => {
    const contributors = updateContributors('angular');
    contributors.then((results) => {
      const contributorPromises = fetchContributorDetails(results)
      contributorPromises.then((contributorTasks) => {
        Promise.all(contributorTasks).then((contributors) => {
          addContributors(contributors.values());
        })
      })
    })

  }, [ addContributors ]);

  const { getPageInfo, setPageInfo } = usePageInfo()
  const contributors = getContributors();
  let  { selectedPage, pageLimit, pageCount } = getPageInfo();
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
                  <Input defaultValue={getGithubOrg()} onChange={(e) => {setGithubOrg(e.target.value)}}/>
                </InputGroup>
                <br></br>
              </div>
          </Col>
          <Col sm={{ size: 1, offset: 1 }}>
            <Sorter
              handleSort={setSortConfig}
              sortConfig={sortConfig}
            />
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Table hover >
            <thead className="profile-info">
              <tr>
                <th>Contributor</th>
                <th className={getClassNamesFor('contributions', sortConfig)}>Contributions</th>
                <th className={getClassNamesFor('followers', sortConfig)}>Followers</th>
                <th className={getClassNamesFor('publicRepos', sortConfig)}>Public Repos</th>
                <th className={getClassNamesFor('gists', sortConfig)}>Gists</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((contributor, index)  => (
                <ContributorRow contributor={contributor} key={index}/>
                ))}
            </tbody>
          </Table>
        </Row>
        <Row >
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Paginator
              pageCount={pageCount}
              onPageChange={(data) => {setPageInfo(data.selected + 1, pageCount)}}/>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default ListContributors;