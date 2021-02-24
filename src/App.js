import './App.css';

import ListContributors from './components/ListContributors';
import { contributors } from './store';


const App = () => {
  return (
    <ListContributors contributors={contributors}/>
  );
}

export default App;
