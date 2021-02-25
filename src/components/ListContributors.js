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
import { Sorter } from './Sorter';
import { ContributorRow } from './ContributorRow';


const ListContributors = () => {
  const contributors = useContributorList();
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
              <Col sm={{ size: 1, offset: 1 }}><Sorter /></Col>
            </Row>
            <Row className="justify-content-between">
              <Table hover >
                <thead className="profile-info">
                  <tr>
                    <th>Contributor</th>
                    <th>Contributions</th>
                    <th>Followers</th>
                    <th>Repositories</th>
                    <th>Gists</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((contributor, index)  => (
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