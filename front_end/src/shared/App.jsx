import React from 'react';

import { Route } from 'react-router-dom';
import { Home } from '../pages';
// eslint-disable-next-line
class App extends React.Component {
  render() {
    return(
      <div className="all">
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}
export default App;
