import { createClass } from 'asteroid';
import { addTodo, removeTodo, editTodo, editActor, addActor, removeActor } from '../redux/actions';
import store from '../redux/store';

const Asteroid = createClass();
// Connect to a Meteor backend
export const asteroid = new Asteroid({
  endpoint: 'ws://localhost:9000/websocket',
});

// if you want realitme updates in all connected clients
// subscribe to the publication
//asteroid.subscribe('todo');
asteroid.subscribe('actor');

asteroid.ddp.on('added', (doc) => {
	const docObj = Object.assign({}, doc.fields, {_id: doc.id});
	
	store.dispatch(addActor(docObj));
});

asteroid.ddp.on('removed', (doc) => {
	const docObj = Object.assign({}, doc.fields, {_id: doc.id});
	store.dispatch(removeActor(docObj));
});
asteroid.ddp.on('changed', ({collection, id, fields}) => {
	
  store.dispatch(editActor(id, fields));
});

asteroid.ddp.on('loggedIn', (data) => {
  store.dispatch(login(data));
});
asteroid.ddp.on('loggedOut', (data) => {
  store.dispatch(logout(data));
});
/**
asteroid.ddp.on('added', (doc) => {
  // we need proper document object format here
  const docObj = Object.assign({}, doc.fields, { _id: doc.id });
  store.dispatch(addTodo(docObj));
});

asteroid.ddp.on('removed', (removedDoc) => {
  store.dispatch(removeTodo(removedDoc.id));
});

;**/
