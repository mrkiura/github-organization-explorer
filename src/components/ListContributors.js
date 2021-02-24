import React, { useState } from 'react';
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Table,
  Badge,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col
} from 'reactstrap';


const ProfileLogo = ({username, avatarUrl, profileUrl}) => (
  <div className="profile-info">
    <img alt="avatar" src={avatarUrl} className="avatar"></img>
    <a
      className="username"
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      >@{username}</a>
  </div>
)

const Sorter = () => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <div>
      <ButtonDropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Sort by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Contributions</DropdownItem>
          <DropdownItem>Followers</DropdownItem>
          <DropdownItem>Repositories</DropdownItem>
          <DropdownItem>Gists</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </div>
)}

const ListContributors = ({ contributors}) => {
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
                  {contributors.map((contributor)  => (
                    <tr>
                      <td>
                        <ProfileLogo
                          username={contributor.login}
                          avatarUrl={contributor.avatar_url}
                          profileUrl={contributor.html_url}/>
                        </td>
                      <td><Badge pill>{contributor.contributions}</Badge></td>
                      <td><Badge pill>{contributor.followers}</Badge></td>
                      <td><Badge pill>{contributor.repos}</Badge></td>
                      <td><Badge pill>{contributor.gists}</Badge></td>
                    </tr>))}
                </tbody>
              </Table>
            </Row>
          </div>

        </Container>
      )
}

export default ListContributors;