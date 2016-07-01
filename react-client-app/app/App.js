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
      function create() {
          this.store = store.getState();
         
          var text = "- phaser -\n with a sprinkle of \n pixi dust."
          var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

          t = game.add.text(game.world.centerX-300, 0, text, style);
  		}
  		function update() {
  			console.log(t);
  			this.store = store.getState();
			 console.log("GAME STORE:");
			 console.log(this.store);
			 if (this.store.actors.length > 0) {
			 	var text = "- phaser -\n with a sprinkle of \n pixi dust."+this.store.actors[0].name;
			 t.text = text;
			 }
			 
  		}
  ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
, document.getElementById('app'));