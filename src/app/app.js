import React from 'react';
// import react router
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import pages
import Login from './login';
import Home from './home';


class App extends React.Component {
  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/Home" component={Home} />
        </div>
      </Router>
    )
  }
}
export default App;
