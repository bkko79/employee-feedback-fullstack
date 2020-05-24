import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import admin from './components/admin'
import review from './components/review'

const NoMatch = () => {
  return (
    <div>
      404 NOT FOUND
    </div>
  );
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={admin} />
      <Route path="/admin" exact component={admin} />
      <Route path="/review/:userid" component={review} />
      <Route component={NoMatch}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);