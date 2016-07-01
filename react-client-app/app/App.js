import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
require('../vendor/phaser/phaser.js');
import PIXI from '../vendor/phaser/pixi.js';
ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
, document.getElementById('app'));
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

  function create() {

      var text = "- phaser -\n with a sprinkle of \n pixi dust.";
      var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

      var t = game.add.text(game.world.centerX-300, 0, text, style);

  }