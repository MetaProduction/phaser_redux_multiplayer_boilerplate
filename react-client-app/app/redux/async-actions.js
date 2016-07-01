import { asteroid } from '../asteroid/asteroid';
import { addTodo, getAllTodo, removeTodo, editTodo, addActor, removeActor, getAllActor } from './actions';

//possibly better in the future to have a "velocity" on the server, and send "ismoving" / "stopmoving" / "update direction" messages

export function callAddActor(name) {
  return dispatch => asteroid.call('addActor', name)
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

export function callMoveActor(_id) {
  return dispatch => asteroid.call('MoveActor', _id, distanceX, distanceY)
      .then(() => dispatch(MoveActor(_id, distanceX, distanceY)));
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
