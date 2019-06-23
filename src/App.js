import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/project/ProjectDetails';
import CreateProject from './components/project/CreateProject';
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Today from './components/layout/Today';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/today' component={Today} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;