import React, { }  from 'react';
import classes from './App.module.css';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

import useWindowDimensions from './hooks/useWindowDimensions';

function App() {

  const windowDimensions = useWindowDimensions();

  return (
    <div className={classes.App}>
      <Settings />
      <Communicator />
      <Users windowDimensions={windowDimensions} />
      <Rooms windowDimensions={windowDimensions} />
    </div>
  );
}

export default App;