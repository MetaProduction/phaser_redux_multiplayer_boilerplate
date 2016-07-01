/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const GET_ALL_TODO = 'GET_ALL_TODO';

export const ADD_ACTOR = 'ADD_ACTOR';
export const REMOVE_ACTOR = 'REMOVE_ACTOR';
export const GET_ALL_ACTOR = 'GET_ALL_ACTOR';
/*
 * action creators
 */

export function addActor(data) {
  return {
    type: ADD_ACTOR,
    data,
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

export function addTodo(data) {
  return {
    type: ADD_TODO,
    data,
  };
}

export function removeTodo(_id) {
  return {
    type: REMOVE_TODO,
    _id,
  };
}

export function editTodo(_id, finished) {
  return {
    type: EDIT_TODO,
    _id,
    finished,
  };
}

export function getAllTodo(data) {
  return {
    type: GET_ALL_TODO,
    data,
  };
}
