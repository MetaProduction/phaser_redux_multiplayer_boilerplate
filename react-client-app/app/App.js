import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';
require('../vendor/phaser/phaser.js');
import PIXI from '../vendor/phaser/pixi.js';
 
   /**
  *** Create phaser game window
  **/ 
 var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

 	  //declare game variables to be accessible throughout the scope
 	  //todo: scope entire game better
 	  var loadingText;
 	  var actors = {};
 	  var gameStore;
 	  
 	  store.subscribe(() => {
 	  	// All game state comes from the redux store we just subscribed to.
 	  	gameStore = store.getState(); // Whenever the store changes we recieve the whole state, store the new state in gameStore
 	  });
      function create() {
          gameStore = store.getState(); 
          game.time.desiredFps = 30; // this \seems\ like it improves performance a little bit. Test more.


          //default text style
          var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

          loadingText = game.add.text(game.world.centerX-300, 0, "Loading...", style);
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
			 loadingText.destroy();
			 }
			 
  		}
  ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
, document.getElementById('app'));