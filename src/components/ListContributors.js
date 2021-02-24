import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Table,
  Badge
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


const ListContributors = ({ contributors}) => {
      return (<div className="center">
        <div className="org_search">
          <InputGroup>
            <Input defaultValue="angular"/>
            <InputGroupAddon addonType="append">
              <InputGroupText>Submit</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <br></br>

        </div>
        <Table hover className="table table-fit">
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
      </div>)
}

export default ListContributors;