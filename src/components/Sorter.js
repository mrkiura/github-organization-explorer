import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useDropdownToggle} from '../hooks/useDropdownToggle';


export const Sorter = () => {

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
            <DropdownItem>Contributions</DropdownItem>
            <DropdownItem>Followers</DropdownItem>
            <DropdownItem>Repositories</DropdownItem>
            <DropdownItem>Gists</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
  )};
