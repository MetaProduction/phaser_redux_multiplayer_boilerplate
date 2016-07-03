import React from 'react';
import { connect } from 'react-redux';
import { callRemoveActor, callEditActor, callMoveActor, callAddActor } from '../../redux/async-actions';
import cssModules from 'react-css-modules';
import style from './styles.styl';

const Actor = (props) => {
  const { id, name, health, posX, posY, speed, dispatchCallRemoveActor, dispatchCallMoveActor} = props;
  const handleRemove = () => {
    dispatchCallRemoveActor(id);
  };
  const moveRight = () => {
    dispatchCallMoveActor(id, speed, 0);
  };
  const moveLeft = () => {
    dispatchCallMoveActor(id, -speed, 0);
  };
  const moveUp = () => {
    
    dispatchCallMoveActor(id, 0, -speed);
  };
  const moveDown = () => {
    dispatchCallMoveActor(id, 0, speed);
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
 //TODO NEXT: add buttons to move
  return (
    <div onKeyDown={handleKeyPress}>
      name:{name} health: {health} x: {posX} y: {posY} speed: {speed}
      <button type="button" onClick={handleRemove}>
        <i className="fa fa-times"></i>
      </button>
       <button type="button" onClick={moveDown}>
        <i className="fa fa-times">down</i>
      </button>
       <button type="button" onClick={moveLeft}>
        <i className="fa fa-times">left</i>
      </button>
       <button type="button" onClick={moveUp}>
        <i className="fa fa-times">up</i>
      </button>
       <button type="button" onClick={moveRight}>
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
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  dispatchCallRemoveActor: _id => dispatch(callRemoveActor(_id)),
  dispatchCallMoveActor: (_id, distanceX, distanceY) => dispatch(callMoveActor(_id, distanceX, distanceY))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(Actor, style, { allowMultiple: true }));
