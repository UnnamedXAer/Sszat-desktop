import React, { useState }  from 'react';
import classes from './App.module.css';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';


import useWindowDimensions from './hooks/useWindowDimensions';

function App() {

  const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);

  const dragStartHandler = ev => {
    // console.log("APP = dragStartHandler");
    ev.stopPropagation();
    // ev.preventDefault();
    if (!isDraggedOverApp) {
      setIsDraggedOverApp(true);
    }
  };

  const dragOverHandler = ev => {
    // console.log("APP = dragOverHandler");
    ev.stopPropagation();
    ev.preventDefault();
    if (!isDraggedOverApp) {
      setIsDraggedOverApp(true);
    }
  };

  const dragEndHandler = ev => {
    // console.log("APP = dragEndHandler");
    ev.stopPropagation();
    ev.preventDefault();
    if (isDraggedOverApp) {
      setIsDraggedOverApp(false);
    }
  };

  const dropHandler = ev => {
    // console.log("APP = dropHandler");
    ev.stopPropagation();
    ev.preventDefault();
    if (isDraggedOverApp) {
      setIsDraggedOverApp(false);
    }
  };

  const windowDimensions = useWindowDimensions();
  return (
    <div 
      className={classes.App}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <Settings />  
      <Communicator draggedOverApp={isDraggedOverApp} />
      <div className={classes.SidePanelsContainer}>
        <Users windowDimensions={windowDimensions} />
        <Rooms windowDimensions={windowDimensions} />
      </div>
    </div>
  );
}

export default App;