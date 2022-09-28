import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/ui/Header/Header';
import Login from './page/Login/Login';
import Signup from './page/Signup/Signup';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <main className="container mt-3">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/login"/>
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </main>
        {/* Footer goes here */}
      </div>

    </div>
  );
}

export default App;
