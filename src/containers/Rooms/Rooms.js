import React from 'react';
import classes from './Rooms.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from '../../components/SidePanel/Row/Row'
import Room from '../../components/Room/Room';
import axios from '../../axios/axios';

const Rooms = props => {
    
    const addRoomHandler = async ev => {

        if(!window.confirm("Should create new room?")) {
            return window.alert("not created");
        }

        const members = {};

        props.selectedUsers.forEach(x => members[x.id] = true);

        const data = {
            name: "private room__"+new Date().toLocaleTimeString(),
            createData: new Date().toUTCString(),
            createdBy: members[0],
            members: members
        }
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
            });
    }

    const rooms = props.rooms.map(room => 
        <Room key={room.id} text={room.name} active={room.id === props.activeRoom} isOpened={props.isOpened} clicked={ev => props.selectRoom(room.id)} />
    );

    return (
        <div className={classes.Rooms}>
            <Row>
                <button className={classes.AddRoom} title="Add Room" onClick={addRoomHandler}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </Row>
            {rooms}
        </div>
    );
};

export default Rooms;