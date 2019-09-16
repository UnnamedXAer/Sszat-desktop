import React, { useState }  from 'react';
import classes from './App.module.css';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';


import useWindowDimensions from './hooks/useWindowDimensions';

function App() {

  const [isDragOver, setIsDragOver] = useState(false);

  const dragEnterHandler = ev => {
    ev.stopPropagation();
    console.log('dragEnter', ev);
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const dragEndHandler = ev => {
    ev.stopPropagation();
    console.log('drag-End', ev);
    if (isDragOver) {
      setIsDragOver(false);
    }
  };

  const dropHandler = ev => {
    console.log("drop", ev);
    ev.stopPropagation();
    ev.preventDefault();
    if (isDragOver) {
      setIsDragOver(false);
    }
  }

  const windowDimensions = useWindowDimensions();
  return (
    <div 
      className={classes.App}
      onDragEnter={dragEnterHandler}
      onDragEnd={dragEndHandler}
      onDrop={dropHandler}
      onDragOver={ev => ev.preventDefault()}
    >
      <Settings />  
      <Communicator dragOver={isDragOver} />
      <div className={classes.SidePanelsContainer}>
        <Users windowDimensions={windowDimensions} />
        <Rooms windowDimensions={windowDimensions} />
      </div>
    </div>
  );
}

export default App;