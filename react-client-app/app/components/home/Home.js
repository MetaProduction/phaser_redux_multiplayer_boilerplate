import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import style from './styles.styl';
import Actor from './Actor';

import { callAddActor, callGetAllActor } from '../../redux/async-actions';

const Home = (props) => {
  const { actors, dispatchCallAddActor, dispatchCallUpdateActors } = props;
  const handleAddActor = (e) => {
    if (e.key === 'Enter') {
      const elem = e.target;
      e.preventDefault();
      dispatchCallAddActor(elem.value);
      elem.value = '';
      dispatchCallUpdateActors();
    }
  };
  console.log(actors);
  return (
    <div styleName="todo-wrapper">
      <div>
        <input
          type="text"
          styleName="add-todo-input"
          placeholder="Add actor item ..."
          onKeyPress={handleAddActor}
        />
      </div>
      <div>
        {actors.map((t, i) => <Actor id={t._id} name={t.name} health={t.health} posX={t.posX} posY={t.posY} key={i} />)}
      </div>
    </div>
  );
};

Home.propTypes = {
  actors: React.PropTypes.array.isRequired,
  dispatchCallAddActor: React.PropTypes.func.isRequired,
  dispatchCallUpdateActors: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ actors: state.actors });
const mapDispatchToProps = (dispatch) => ({
  dispatchCallAddActor: data => dispatch(callAddActor(data)),
  dispatchCallUpdateActors: () => dispatch(callGetAllActor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Home, style));
