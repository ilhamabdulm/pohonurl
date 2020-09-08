import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import LinkPage from './pages/LinkPage';
import MainContext from './contexts';

function App() {
  return (
    <MainContext>
      <Switch>
        <Route exact path="/:username" component={LinkPage} />
        <Route exact path="/" component={AuthPage} />
        <Route exact path="/main/home" component={MainPage} />
      </Switch>
    </MainContext>
  );
}

export default App;
