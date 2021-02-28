import { ProfileInfo } from './ProfileInfo';
import { Badge } from 'reactstrap';

export const ContributorRow = ( { contributor } ) => {
    return (
      <tr>
        <td>
          <ProfileInfo
            username={contributor.username}
            avatarUrl={contributor.avatarUrl}
            profileUrl={contributor.htmlUrl}/>
          </td>
        <td><Badge pill>{contributor.contributions}</Badge></td>
        <td><Badge pill>{contributor.followers}</Badge></td>
        <td><Badge pill>{contributor.publicRepos}</Badge></td>
        <td><Badge pill>{contributor.gists}</Badge></td>
      </tr>
    )
  }