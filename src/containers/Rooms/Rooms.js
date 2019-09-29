import React, { useState } from 'react';
import classes from './Rooms.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from '../../components/SidePanel/Row/Row'
import Room from '../../components/Room/Room';
import axios from '../../axios/axios';
import AddRoom from './AddRoom/AddRoom';
import Modal from '../../components/UI/Modal/Modal';

const Rooms = props => {
    
    const [showAddRoom, setShowAddRoom] = useState(false);
    const [addRoomLoading, setAddRoomLoading] = useState(false);

    const newRoomButtonClickHandler = ev => {
        setShowAddRoom(true);
    }

    const addRoomHandler = room => {

        // do nothing when new room creat action is in progress 
        if (addRoomLoading) {
            return;
        }

        // cancel 
        if (!room) {
            return setShowAddRoom(false);
        }

        setAddRoomLoading(true);

        const members = {};

        // conver members to object for firebase
        room.members.forEach(x => {
            members[x] = true
        });

        const data = {
            name: room.name,
            owner: room.owner,
            createDate: room.createData,
            createdBy: "-Lp_4GjjKpyiAaMVy7Hb",
            members: members
        }

        axios.post("/rooms.json", data)
            .then(res => {
                console.log('Ta Da! New Room is Created!', res);
                props.addRoom({...data, id: res.data.name});
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setAddRoomLoading(false);
                setShowAddRoom(false);
            });
    }

    const rooms = props.rooms.map(room => {
        const myRoom = room.owner === "-Lp_4QT-N3p_0vqShcbS"//"-Lp_4GjjKpyiAaMVy7Hb";

        const roomMenuItems = [
            {
                label: myRoom ? "Delete room" : "Leave room",
                click: () => {
                    if (myRoom) {
                        props.deleteRoom(room.id);
                    }
                    else {
                        console.log("abandoned room: ", room);
                        props.leaveRoom(room.id);
                    }
                },
            },
        ];

        return <Room 
            key={room.id} 
            text={room.name} 
            active={room.id === props.activeRoom} 
            isOpened={props.isOpened} 
            clicked={ev => props.selectRoom(room.id)}
            menuItems={roomMenuItems}    
        />
    });

    return (
        <div className={classes.Rooms}>
            <Row>
                <button className={classes.AddRoom} title="Add Room" onClick={newRoomButtonClickHandler}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </Row>
            {rooms}
            <Modal show={showAddRoom} modalClosed={() => addRoomHandler(false)}>
                <AddRoom allUsers={props.allUsers} onExit={addRoomHandler} loading={addRoomLoading} shouldSetFocus={showAddRoom} />
            </Modal>
        </div>
    );
};

export default Rooms;