import { Route, Switch } from 'react-router-dom';
import Default from './layouts/Default';
import Authentication from './pages/Authentication';
import Bank from './pages/Bank';

function App() {
  return (
    <>
      <Default>
        <Switch>
          <Route path="/auth" component={Authentication} />
          <Route exact path="/" component={Bank} />
        </Switch>
      </Default>
    </>
  );
}

export default App;
