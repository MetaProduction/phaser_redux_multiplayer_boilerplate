import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import style from './styles.styl';
import Actor from './Actor';

import { callAddActor, callGetAllActor, callMoveActor} from '../../redux/async-actions';

const Home = (props) => {
  const { actors, dispatchCallAddActor, dispatchCallUpdateActors, dispatchCallMoveActor } = props;
  const handleAddActor = (e) => {
    if (e.key === 'Enter') {
      const elem = e.target;
      e.preventDefault();
      dispatchCallAddActor(elem.value);
      elem.value = '';
      //Is there a better/faster/more idomatic way to update the list once a change is made?
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
        {actors.map((t, i) => <Actor dispatchCallUpdateActors={dispatchCallUpdateActors} id={t._id} name={t.name} health={t.health} speed={t.speed} posX={t.posX} posY={t.posY} key={i} />)}
      </div>
    </div>
  );
};

Home.propTypes = {
  actors: React.PropTypes.array.isRequired,
  dispatchCallAddActor: React.PropTypes.func.isRequired,
  dispatchCallUpdateActors: React.PropTypes.func.isRequired,
  dispatchCallMoveActor: React.PropTypes.func
};

const mapStateToProps = (state) => ({ actors: state.actors });
const mapDispatchToProps = (dispatch) => ({
  dispatchCallAddActor: data => dispatch(callAddActor(data)),
  dispatchCallUpdateActors: () => dispatch(callGetAllActor()),
  dispatchCallMoveActor: (_id, distanceX, distanceY) => dispatch(callMoveActor(_id, distanceX, distanceY)),
});

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Home, style));
