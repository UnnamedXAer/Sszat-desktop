import React from 'react';
import classes from './App.module.css';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

function App() {
  return (
    <div className={classes.App}>
      <Settings />
      <Communicator />
      <Users />
      <Rooms />
    </div>
  );
}

export default App;