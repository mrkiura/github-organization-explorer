import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useDropdownToggle} from '../hooks/useDropdownToggle';


export const RepoSorter = ({ handleSort }) => {
    const { getDropdowntoggle, setDropdowntoggle } = useDropdownToggle();
    return (
      <div>
        <ButtonDropdown
        direction="right"
        isOpen={getDropdowntoggle()}
        toggle={() => {setDropdowntoggle()}}>
          <DropdownToggle caret>
            Sort by
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleSort('contributions')}>Contributions</DropdownItem>
            <DropdownItem onClick={() => handleSort('followers')}>Followers</DropdownItem>
            <DropdownItem onClick={() => handleSort('publicRepos')}>Public Repos</DropdownItem>
            <DropdownItem onClick={() => handleSort('gists')}>Gists</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
  )};
