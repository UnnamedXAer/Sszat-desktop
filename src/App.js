import React, { useState }  from 'react';
import classes from './App.module.css';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';


import useWindowDimensions from './hooks/useWindowDimensions';

function App() {

  const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);

  const dragOverHandler = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy"
    if (!isDraggedOverApp) {
      setIsDraggedOverApp(true);
    }
  };

  const dragEndHandler = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    console.log('drag-End', ev);
    if (isDraggedOverApp) {
      setIsDraggedOverApp(false);
    }
  };

  const dropHandler = ev => {
    console.log("drop", ev, ev.dataTransfer.dropEffect);
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
      // onDragStart={dragStartHandler}
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