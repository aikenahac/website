import { Switch, Route } from 'react-router-dom';
import { Home, Contact } from './pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
    </Switch>
  );
};

export default Routes;
