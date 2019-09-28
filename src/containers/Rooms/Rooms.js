import React, { useState } from 'react';
import classes from './Rooms.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from '../../components/SidePanel/Row/Row'
import Room from '../../components/Room/Room';
import axios from '../../axios/axios';
import AddRoom from './AddRoom/AddRoom';
import Modal from '../../components/UI/Modal/Modal';

const Rooms = props => {
    
    const [showAddRoom, setShowAddRoom] = useState(true);
    const [addRoomLoading, setAddRoomLoading] = useState(false);

    const newRoomButtonClickHandler = ev => {
        setShowAddRoom(true);
    }

    const addRoomHandler = async room => {

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

        room.members.forEach(x => members[x.id] = true);

        const data = {
            name: room.name,
            createData: room.createData,
            createdBy: "-Lp_4GjjKpyiAaMVy7Hb",
            members: members
        }
        console.log('Ta Da! New Room is Created!', data);
        /*
        axios.post("/rooms.json", data)
            .then(res => {
                Object.keys(members).forEach(userId => {
                    axios.patch(`/users/${userId}/rooms.json`, {[res.data.name]: true})
                        .then(updateUserRes => {
                            console.log(updateUserRes);
                        });
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.addRoom();
                setShowAddRoom(false);
            });*/
    }

    const rooms = props.rooms.map(room => 
        <Room key={room.id} text={room.name} active={room.id === props.activeRoom} isOpened={props.isOpened} clicked={ev => props.selectRoom(room.id)} />
    );

    return (
        <div className={classes.Rooms}>
            <Row>
                <button className={classes.AddRoom} title="Add Room" onClick={newRoomButtonClickHandler}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </Row>
            {rooms}
            <Modal show={showAddRoom} modalClosed={() => addRoomHandler(false)}>
                <AddRoom allUsers={props.allUsers} onExit={addRoomHandler} loading={addRoomLoading} />
            </Modal>
        </div>
    );
};

export default Rooms;