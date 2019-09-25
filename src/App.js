import React, { useState, useEffect, useCallback }  from 'react';
import classes from './App.module.css';

import axios from './axios/axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Settings from './containers/Settings/Settings';
import Communicator from './containers/Communicator/Communicator';
import Rooms from './containers/Rooms/Rooms';
import Users from './containers/Users/Users';

import useWindowDimensions from './hooks/useWindowDimensions';
import SidePanel from './containers/SidePanel/SidePanel';

// add selected fonts to library
library.add(fab, faDownload, faEnvelope, faCompress, faExpand, faBug, faGrin, faPaperclip, faUmbrellaBeach, faUser, faPlus);

const publicRoom = {
  id: "public",
  name: "Public",
  createDate: new Date().toUTCString(),
  members: {}
}

function App() {


  const [isDraggedOverApp, setIsDraggedOverApp] = useState(false);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(publicRoom.id);
  
  const selectRoomHandler = id => {
    setActiveRoom(id);
  };

  const getUsers = useCallback(() => {
    axios("/users.json")
      .then(res => {
        const users = [];
        // eslint-disable-next-line no-unused-vars
        for (const key in res.data) {
            users.push({
              ...res.data[key],
              id: key
            });
        }
        setUsers(users)
      })
      .catch(err => {
        console.log("err",err);
      });
  }, []);

  const getRooms = useCallback(() => {
    axios("/rooms.json")
    .then(res => {
      const rooms = [publicRoom];
      // eslint-disable-next-line no-unused-vars
      for (const key in res.data) {
          rooms.push({
            ...res.data[key],
            id: key
          });
      }
      setRooms(rooms);
    })
    .catch(err => {
      console.log("err",err);
    });
  }, []);

  const newRoomHandler = () => {
    getRooms();
  };

  useEffect(() => {
    getUsers();
    getRooms();
  }, [getUsers, getRooms]);

  const dragStartHandler = ev => {
    ev.stopPropagation();
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

      <SidePanel
        windowDimensions={windowDimensions}
        headerTitle="user name1 name2 ane m44"
        headerText="123 321 123"
      >
        <Users users={users}/>
      </SidePanel>

      <SidePanel 
        windowDimensions={windowDimensions}
        headerTitle="Users in RoomName"
        headerText="bl bla bla"
      >
        <Rooms rooms={rooms} addRoom={newRoomHandler} selectedUsers={users} selectRoom={selectRoomHandler} activeRoom={activeRoom} />
      </SidePanel>
      </div>
    </div>
  );
}

export default App;