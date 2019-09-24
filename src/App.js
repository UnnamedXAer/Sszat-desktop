import React, { useState }  from 'react';
import classes from './App.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

import useWindowDimensions from './hooks/useWindowDimensions';

// add selected fonts to library
library.add(fab, faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser);

function App() {

  const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);

  const dragStartHandler = ev => {
    ev.stopPropagation();
    // ev.preventDefault();
    if (!isDraggedOverApp) {
      setIsDraggedOverApp(true);
    }
  };

  const dragOverHandler = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    if (!isDraggedOverApp) {
      setIsDraggedOverApp(true);
    }
  };

  const dragEndHandler = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    if (isDraggedOverApp) {
      setIsDraggedOverApp(false);
    }
  };

  const dropHandler = ev => {
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