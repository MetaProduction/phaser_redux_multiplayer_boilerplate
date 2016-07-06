import React from 'react';
import { connect } from 'react-redux';
import { callRemoveActor, callEditActor, callMoveActor, callStopActor, callAddActor } from '../../redux/async-actions';
import cssModules from 'react-css-modules';
import style from './styles.styl';

const Actor = (props) => {
  const { id, name, health, posX, posY, speed, dispatchCallRemoveActor, dispatchCallMoveActor, dispatchCallStopActor} = props;
  const handleRemove = () => {
    dispatchCallRemoveActor(id);
  };
  const stopX = () => {
    dispatchCallStopActor(id, true, false);
  };
  const stopY = () => {
    dispatchCallStopActor(id, false, true);
  }
  const moveRight = () => {
    dispatchCallMoveActor(id, 1, 0);
  };
  const moveLeft = () => {
    dispatchCallMoveActor(id, -1, 0);
  };
  const moveUp = () => {
    dispatchCallMoveActor(id, 0, -1);
  };
  const moveDown = () => {
    dispatchCallMoveActor(id, 0, 1);
  };
  const handleKeyPress = (e) => {
   
    switch(e.key) {
      case "s":
        moveDown();
        break;
      case "w":
        moveUp();
        break;
      case "a":
        moveLeft();
        break;
      case "d":
        moveRight();
        break;
    }
  };
  const handleKeyRelease = (e) => {
    switch(e.key) {
      case "s":
        stopY();
        break;
      case "w":
        stopY();
        break;
      case "a":
        stopX();
        break;
      case "d":
        stopX();
        break;
    }
  }
 //TODO NEXT: Update keypress actions to send "startmoving" and "endmoving" messages, with all actual movment handled serverside.
  return (
    <div onKeyDown={handleKeyPress} onKeyUp={handleKeyRelease}>
      name:{name} health: {health} x: {posX} y: {posY} speed: {speed}
      <button type="button" onClick={handleRemove}>
        <i className="fa fa-times"></i>
      </button>
       <button type="button" onMouseDown={moveDown} onMouseUp={stopY}>
        <i className="fa fa-times">down</i>
      </button>
       <button type="button" onMouseDown={moveLeft} onMouseUp={stopX}>
        <i className="fa fa-times">left</i>
      </button>
       <button type="button" onMouseDown={moveUp} onMouseUp={stopY}>
        <i className="fa fa-times">up</i>
      </button>
       <button type="button" onMouseDown={moveRight} onMouseUp={stopX}>
        <i className="fa fa-times">right</i>
      </button>
    </div>
  );
};

Actor.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  health: React.PropTypes.number,
  posX: React.PropTypes.number,
  posY: React.PropTypes.number,
  speed: React.PropTypes.number,
  dispatchCallRemoveActor: React.PropTypes.func.isRequired,
  dispatchCallMoveActor: React.PropTypes.func,
  dispatchCallStopActor: React.PropTypes.func,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  dispatchCallRemoveActor: _id => dispatch(callRemoveActor(_id)),
  dispatchCallMoveActor: (_id, directionX, directionY) => dispatch(callMoveActor(_id, directionX, directionY)),
  dispatchCallStopActor: (_id, shouldStopX, shouldStopY) => dispatch(callStopActor(_id, shouldStopX, shouldStopY))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(Actor, style, { allowMultiple: true }));
