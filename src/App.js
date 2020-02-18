import React from 'react';
import logo from './logo.svg';
import CheckLink from './Check_Link_Exist'
import {Route, Link, Switch, Router} from 'react-router-dom'

export const DefaultComp = ({children}) => <div>{children}</div>
export const Acomp = ({location}) => (<div>{location.pathname}</div>)
 

function App({history}) {
  
  const routeToDefaultRoute = () => {
    history.push('/')
  }
  
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' render={ () => <DefaultComp>Hello Wordl</DefaultComp> } />
        <Route path='/compA' render={ props => <Acomp {...props} onRoute={routeToDefaultRoute} />} />
      </Switch>
    </Router>
  );
}

export default App;
