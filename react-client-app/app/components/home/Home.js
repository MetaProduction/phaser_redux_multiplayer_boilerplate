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
      const elem = e.currentTarget;
      e.preventDefault();
      console.log(elem);
      dispatchCallAddActor(elem[0].value, elem[1].value);
      elem[0].value = '';
      elem[1].value = '';
      //Is there a better/faster/more idomatic way to update the list once a change is made?
      dispatchCallUpdateActors();
    }
  };


  return (
    <div styleName="game-wrapper">
      <div>
        <form onKeyPress={handleAddActor}>
          <input
            type="text"
            name="name"
            styleName="add-game-input"
            placeholder="name"          
          />

          <input type="text"
          name="password"
          placeholder="password"
          />
        </form>

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
  dispatchCallAddActor: (name, password) => dispatch(callAddActor(name, password)),
  dispatchCallUpdateActors: () => dispatch(callGetAllActor()),
  dispatchCallMoveActor: (_id, distanceX, distanceY) => dispatch(callMoveActor(_id, distanceX, distanceY)),
});

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Home, style));
