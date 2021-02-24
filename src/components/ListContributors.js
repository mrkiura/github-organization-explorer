import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Table
} from 'reactstrap';


const ListContributors = ({ contributors}) => {
  console.log("Num repositories", contributors.length)

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
        <Table hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Contributions</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>@twitter</td>
              <td>2000</td>
              <td>Larry</td>
              <td>the Bird</td>
            </tr>
            <tr>
              <td>@mdo</td>
              <td>200</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>@fat</td>
              <td>10000</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          </tbody>
        </Table>
      </div>)

}

export default ListContributors;