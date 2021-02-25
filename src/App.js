import './App.css';
import { Provider} from './store';
import ListContributors from './components/ListContributors';


const App = () => {
  return (
    <Provider>
      <ListContributors/>
    </Provider>
  );
}

export default App;
