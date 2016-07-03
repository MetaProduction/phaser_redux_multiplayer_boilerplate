import React from 'react';
import Main from './components/main/Main';
import Game from './components/game/Game';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Game} />
  </Route>
);
