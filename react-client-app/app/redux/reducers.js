import {ADD_ACTOR, EDIT_ACTOR, REMOVE_ACTOR, MOVE_ACTOR, STOP_ACTOR,GET_ALL_ACTOR, LOGIN, LOGOUT, REGISTER } from './actions';
import { combineReducers } from 'redux';

// actions helpers
const remove = (state, action) => {
  const elemToRemoveArray = state.slice().filter(item => item._id === action._id);
  if (Array.isArray(elemToRemoveArray) && elemToRemoveArray.length) {
    const elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
    return [
      ...state.slice(0, elemToRemoveIndex),
      ...state.slice(elemToRemoveIndex + 1),
    ];
  }
  return state;
};

const edit = (state, action) => {
  const elemToEditArray = state.slice().filter(item => item._id === action._id);
  if (Array.isArray(elemToEditArray) && elemToEditArray.length) {
    const elemToEditIndex = state.indexOf(elemToEditArray[0]);
    const newState = state.slice();
    newState[elemToEditIndex] = Object.assign({}, newState[elemToEditIndex], action.data);
    return newState;
  }
  return state;
};

const add = (state, action) => {
  const newItemId = action.data._id;
  const isNotUniq = state.find(i => i._id === newItemId);
  if (!isNotUniq) {
    return state.concat([action.data]);
  }
  return state;
};

const move = (state, action) => {
  const elemToEditArray = state.slice().filter(item => item._id === action._id);
  if (Array.isArray(elemToEditArray) && elemToEditArray.length) {
    const elemToEditIndex = state.indexOf(elemToEditArray[0]);
    const newState = state.slice();
    newState[elemToEditIndex].posX = newState[elemToEditIndex].posX + action.directionX;
    newState[elemToEditIndex].posY = newState[elemToEditIndex].posY + action.directionY;
    return newState;
  }
  return state;
}
const stop = (state, action) => {
  const elemToEditArray = state.slice().filter(item => item._id === action._id);
  if (Array.isArray(elemToEditArray) && elemToEditArray.length) {
    const elemToEditIndex = state.indexOf(elemToEditArray[0]);
    const newState = state.slice();
    if (action.shouldStopX === true) {
      newState[elemToEditIndex].velX = 0;
    }
    if (action.shouldStopY === true) {
      newState[elemToEditIndex].velY = 0;
    }
    return newState;
  }
  return state;
}
const register = (state, action) => {
  //do nothing, we only update the state once logged in
  return state;
}
const login = (state, action) => {
  console.log(action);
  const newState = state.slice();
  newState.user = action.data;
  return newState;
}
const logout = (state, action) => {
  console.log(action);
  const newState = state.slice();
  newState.user = action.data;
  return newState;
}

function account(state = [], action) {
  switch (action.type) {
    case REGISTER:
      return register(state, action);
    case LOGIN:
      return login(state, action);
    case LOGOUT:
      return logout(state, action);
    default: 
      return state;
  }
}
function actors(state = [], action) {
  switch (action.type) {
    case ADD_ACTOR:
      return add(state, action);
    case REMOVE_ACTOR:
      return remove(state, action);
    case GET_ALL_ACTOR:
      return action.data;
    case MOVE_ACTOR:
      return move(state, action);
    case STOP_ACTOR:
      return stop(state, action);
    case EDIT_ACTOR:
      return edit(state, action);
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  actors,
});

export default mainReducer;
