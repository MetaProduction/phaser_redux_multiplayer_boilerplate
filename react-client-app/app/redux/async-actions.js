import { asteroid } from '../asteroid/asteroid';
import { addTodo, getAllTodo, removeTodo, editTodo, addActor, moveActor, removeActor, getAllActor } from './actions';


/**
*** Account Actions
**/
export function callRegister(data) {
	return dispatch => asteroid.createUser(data)
		.then(result => dispatch(register({data})))
}
export function callLogin(data) {
	return dispatch => asteroid.createUser(data)
		.then(result => dispatch(register({data})))
}
export function callLogout(data) {
	return dispatch => asteroid.createUser(data)
		.then(result => dispatch(register({data})))
}

/**
*** Actor Actions
**/
export function callAddActor(name,password) {
  return dispatch => asteroid.createUser({username: name, password: password})
  	  .then(result => asteroid.call('addActor', name, result))
      .then(result => dispatch(addActor({ _id: result, name })));
}

export function callGetAllActor() {
  return dispatch => asteroid.call('getActors')
      .then((result) => dispatch(getAllActor(result)));
}

export function callRemoveActor(_id) {
  return dispatch => asteroid.call('removeActor', _id)
      .then(() => dispatch(removeActor(_id)));
}
export function callEditActor(_id, data) {

  return dispatch => asteroid.call('editActor', _id, data)
      .then(() => dispatch(editActor(_id, data)));
}

//possibly better in the future to have a "velocity" on the server, and send "ismoving" / "stopmoving" / "update direction" messages
//with predicive movement on the client

export function callMoveActor(_id, distanceX, distanceY) {
	
  return dispatch => asteroid.call('moveActor', _id, distanceX, distanceY)
      .then(() => dispatch(moveActor(_id, distanceX, distanceY)));
}

export function callAddTodo(message) {
  return dispatch => asteroid.call('addTodo', message)
      .then(result => dispatch(addTodo({ _id: result, message })));
}

export function callGetAllTodo() {
  return dispatch => asteroid.call('getTodos')
      .then((result) => dispatch(getAllTodo(result)));
}

export function callRemoveTodo(_id) {
  return dispatch => asteroid.call('removeTodo', _id)
      .then(() => dispatch(removeTodo(_id)));
}

export function callEditTodo(_id, finished) {
  return dispatch => asteroid.call('editTodo', _id, finished)
      .then(() => dispatch(editTodo(_id, finished)));
}
