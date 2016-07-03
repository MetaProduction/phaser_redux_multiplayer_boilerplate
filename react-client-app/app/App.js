import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
require('../vendor/phaser/phaser.js');
import PIXI from '../vendor/phaser/pixi.js';
 
 var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });
 	  var t;
 	  var actors = {};
 	  var gameStore;
 	  
 	  store.subscribe(() => {
 	  	gameStore = store.getState();
 	  });
      function create() {
          gameStore = store.getState();
          game.time.desiredFps = 30;
          var text = "- phaser -\n with a sprinkle of \n pixi dust."
          var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

          t = game.add.text(game.world.centerX-300, 0, text, style);
  		}
  		function update() {
			
			 if (gameStore.actors.length > 0) {
			 	var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
			 	for (var actor of gameStore.actors) {
			 		if (!actors[actor.name]) {
			 			actors[actor.name] = game.add.text(game.world.centerX+actor.posX, game.world.centerY+actor.posY, actor.name, style);
			 		}
			 		else {
			 			actors[actor.name].x = game.world.centerX+actor.posX;
			 			actors[actor.name].y = game.world.centerY+actor.posY;
			 		}
			 	}
			 t.destroy();
			 }
			 
  		}
  ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
, document.getElementById('app'));