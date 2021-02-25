import React from 'react';
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
import { useContributorList } from '../hooks/useContributorList'
import { useSortData } from '../hooks/useSortData';
import { Sorter } from './Sorter';
import { ContributorRow } from './ContributorRow';


const ListContributors = () => {
  const contributors = useContributorList();
  const { sortedData, sortConfig, setSortConfig } = useSortData(contributors);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


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
                      <Input defaultValue="angular"/>
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
                    <th className={getClassNamesFor('contributions')}>Contributions</th>
                    <th className={getClassNamesFor('followers')}>Followers</th>
                    <th className={getClassNamesFor('repos')}>Repositories</th>
                    <th className={getClassNamesFor('gists')}>Gists</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((contributor, index)  => (
                    <ContributorRow contributor={contributor} key={index}/>
                    ))}
                </tbody>
              </Table>
            </Row>
          </div>
        </Container>
      )
}

export default ListContributors;