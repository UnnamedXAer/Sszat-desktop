import React, { }  from 'react';
import classes from './App.module.css';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';
import ContextMenu from './containers/ContextMenu/ContextMenu';


import useWindowDimensions from './hooks/useWindowDimensions';

function App() {

  const windowDimensions = useWindowDimensions();

  return (
    <div className={classes.App}>
      <ContextMenu 
        options={[
          {
            type: "option",
            title: "Go to Browser",
            clickHandler: () =>{}
          },
          {
            type: "option",
            title: "Find in google",
            clickHandler: () =>{}
          },
          {
            type: "separator"
          },
          {
            type: "option",
            title: "Copy",
            clickHandler: () =>{}
          },
          {
            type: "option",
            title: "Paste",
            clickHandler: () =>{}
          },
          {
            type: "option",
            title: "Cut",
            clickHandler: () =>{}
          },
        ]}/>
      <Settings />
      <Communicator />
      <div className={classes.SidePanelsContainerPlaceholder}></div>
      <div className={classes.SidePanelsContainer}>
        <Users windowDimensions={windowDimensions} />
        <Rooms windowDimensions={windowDimensions} />
      </div>
    </div>
  );
}

export default App;