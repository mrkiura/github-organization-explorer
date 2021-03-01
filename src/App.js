import './App.css';
import { Provider} from './store';
import ListContributors from './components/ListContributors';
import { RepoDetail } from './components/RepoDetail';
import ListRepositories from './components/ListRepositories';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap';

import { useState } from 'react';
import classnames from 'classnames';

const App = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
  return (

    <Provider>
      <Container fluid="sm">
    <div className="center">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            >
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
            >
            Repositories
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ListContributors toggle={toggle}/>
        </TabPane>
        <TabPane tabId="2">
          {/* <RepoDetail /> */}
          <ListRepositories toggleScreen={() => { toggle('3'); }}/>
        </TabPane>
      </TabContent>
    </div>
    </Container>
    </Provider>
  );
}

export default App;
