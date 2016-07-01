import { ADD_TODO, REMOVE_TODO, EDIT_TODO, EDIT_ACTOR, GET_ALL_TODO, ADD_ACTOR, REMOVE_ACTOR, MOVE_ACTOR, GET_ALL_ACTOR } from './actions';
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
  console.log("edit");
  console.log(action);
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
  console.log("MOVING");
  console.log(action);
  const elemToEditArray = state.slice().filter(item => item._id === action._id);
  if (Array.isArray(elemToEditArray) && elemToEditArray.length) {
    const elemToEditIndex = state.indexOf(elemToEditArray[0]);
    const newState = state.slice();
    newState[elemToEditIndex].posX = newState[elemToEditIndex].posX + action.distanceX;
    newState[elemToEditIndex].posY = newState[elemToEditIndex].posY + action.distanceY;
    return newState;
  }
  return state;
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return add(state, action);
    case REMOVE_TODO:
      return remove(state, action);
    case EDIT_TODO:
      return edit(state, action);
    case GET_ALL_TODO:
      return action.data;
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
    case EDIT_ACTOR:
      return edit(state, action);
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  todos, actors,
});

export default mainReducer;
