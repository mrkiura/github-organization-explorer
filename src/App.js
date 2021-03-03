import React from 'react';
import './App.css';
import { Provider } from './store';
import ListContributors from './components/ListContributors';
import { RepoDetail } from './components/RepoDetail';
import { ContributorDetail } from './components/ContributorDetail';
import ListRepositories from './components/ListRepositories';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import { useState } from 'react';
import classnames from 'classnames';

const App = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <Provider>
            <Router>
                <Container fluid="sm">
                    <div className="center">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => {
                                        toggle('1');
                                    }}
                                >
                                    <Link to="/">Home</Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => {
                                        toggle('2');
                                    }}
                                ><Link to="/repos">Repositories</Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <Switch>
                                <Route path="/repos">
                                    <TabPane tabId="2">
                                        <ListRepositories
                                            toggleScreen={() => {toggle('4');}}
                                        />
                                    </TabPane>
                                </Route>
                                <Route path="/repo">
                                    <RepoDetail />
                                </Route>
                                <Route exact path="/">
                                    <TabPane tabId="1">
                                        <ListContributors toggleScreen={() => {toggle('5');}}/>
                                    </TabPane>
                                </Route>
                                <Route path="/contributor">
                                    <ContributorDetail />
                                </Route>
                            </Switch>
                        </TabContent>
                    </div>
                </Container>
            </Router>
        </Provider>
    );
};

export default App;
