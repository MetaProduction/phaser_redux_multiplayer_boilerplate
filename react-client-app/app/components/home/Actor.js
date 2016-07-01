import React from 'react';
import { connect } from 'react-redux';
import { callRemoveActor, callEditActor, callAddActor } from '../../redux/async-actions';
import cssModules from 'react-css-modules';
import style from './styles.styl';

const Actor = (props) => {
  const { id, name, health, dispatchCallRemoveActor} = props;
  const handleRemove = () => {
    dispatchCallRemoveActor(id);
  };
 
  return (
    <div>
      name:{name} health: {health} x: {posX} y: {posY}
      <button type="button" onClick={handleRemove}>
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

Actor.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  health: React.PropTypes.number,
  dispatchCallRemoveActor: React.PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  dispatchCallRemoveActor: _id => dispatch(callRemoveActor(_id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cssModules(Actor, style, { allowMultiple: true }));
