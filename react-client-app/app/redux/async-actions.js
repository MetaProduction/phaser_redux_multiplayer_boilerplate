import { asteroid } from '../asteroid/asteroid';
import { addActor, moveActor, removeActor, getAllActor, stopActor} from './actions';


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
export function callEditActor(_id, data) {

  return dispatch => asteroid.call('editActor', _id, data)
      .then(() => dispatch(editActor(_id, data)));
}

//possibly better in the future to have a "velocity" on the server, and send "ismoving" / "stopmoving" / "update direction" messages
//with predicive movement on the client

export function callMoveActor(_id, directionX, directionY) {
	
  return dispatch => asteroid.call('addActorVelocity', _id, directionX, directionY)
      .then(() => dispatch(moveActor(_id, directionX, directionY)));
}
export function callStopActor(_id, shouldStopX, shouldStopY) {
  
  return dispatch => asteroid.call('stopActor', _id, shouldStopX, shouldStopY)
      .then(() => dispatch(stopActor(_id, shouldStopX, shouldStopY)));
}


