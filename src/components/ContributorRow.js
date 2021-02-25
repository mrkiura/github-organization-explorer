import { ProfileInfo } from './ProfileInfo';
import { Badge } from 'reactstrap';

export const ContributorRow = ( { contributor } ) => {
    return (
      <tr>
        <td>
          <ProfileInfo
            username={contributor.login}
            avatarUrl={contributor.avatar_url}
            profileUrl={contributor.html_url}/>
          </td>
        <td><Badge pill>{contributor.contributions}</Badge></td>
        <td><Badge pill>{contributor.followers}</Badge></td>
        <td><Badge pill>{contributor.repos}</Badge></td>
        <td><Badge pill>{contributor.gists}</Badge></td>
      </tr>
    )
  }