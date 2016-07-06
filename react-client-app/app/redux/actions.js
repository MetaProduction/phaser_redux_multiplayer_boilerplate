/*
 * action types
 */

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const ADD_ACTOR = 'ADD_ACTOR';
export const EDIT_ACTOR = 'EDIT_ACTOR';
export const REMOVE_ACTOR = 'REMOVE_ACTOR';
export const GET_ALL_ACTOR = 'GET_ALL_ACTOR';
export const MOVE_ACTOR = 'MOVE_ACTOR';
export const STOP_ACTOR = 'STOP_ACTOR';

/*
 * Account actions
 */
export function register(data) {
  return {
      type: REGISTER,
      data,
  };
}
export function login(data) {
  return {
    type: LOGIN,
    data,
  };
}
export function logout(data) {
  return {
    type: LOGOUT,
    data,
  };
}

/*
 * Actor actions
 */
export function addActor(data) {
  return {
    type: ADD_ACTOR,
    data,
  };
}
export function moveActor(data) {
  return {
    type: MOVE_ACTOR,
    _id,
    directionX,
    directionY,
  };
}
export function stopActor(data) {
  return {
    type: STOP_ACTOR,
    _id,
    shouldStopX,
    shouldStopY,
  };
}
export function removeActor(_id) {
  return {
    type: REMOVE_ACTOR,
    _id,
  };
}
export function getAllActor(data) {
  return {
    type: GET_ALL_ACTOR,
    data,
  };
}
export function editActor(_id, data) {
  return {
    type: EDIT_ACTOR,
    _id,
    data,
  };
}

