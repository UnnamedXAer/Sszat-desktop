import React, { useState } from 'react';
import classes from './AddRoom.module.css';
import UsersList from '../../../components/UsersList/UsersList';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

const AddRoom = (props) => {

    const [roomName, setRoomName] = useState("");
    // list of ids of selected users
    const [selectedUsers, setSelectedUsers] = useState(["-Lp_4GjjKpyiAaMVy7Hb"]);

    const cancelHandler = ev => {
        props.onExit(false);
    };

    const completeHandler = ev => {

        const room = {
            name: roomName,
            members: selectedUsers,
            owner: "-Lp_4GjjKpyiAaMVy7Hb",
            createDate: new Date().toUTCString()
        }
        props.onExit(room);
    }

    const roomNameChangeHandler = ev => {
        setRoomName(ev.target.value);
    }

    const userCheckedHandler = (id, isChecked) => {
        if (isChecked) {
            setSelectedUsers(prevState => prevState.concat(id));
        }
        else {
            setSelectedUsers(prevState => prevState.filter(x => x !== id));
        }
    }

    return (
        <div className={classes.AddRoom}>
            <h3>Create Room</h3>
            <label className={classes.RoomNameLabel} htmlFor="roomName">
                    <Input
                        name="roomName"
                        type="text" 
                        placeholder="Room Name"
                        onChange={roomNameChangeHandler}
                        value={roomName}
                        />
                </label>
            {props.loading ?  <Spinner /> :
            <UsersList users={props.allUsers} checkUser={userCheckedHandler} selectedUsers={selectedUsers} />}
            <div className={classes.Buttons}>
                <Button btnType="Danger" clicked={cancelHandler} disabled={props.loading} >Cancel</Button>
                <Button btnType="Success"  clicked={completeHandler} disabled={props.loading || selectedUsers.length <= 1} >Ok</Button>
            </div>
        </div>
    );
};

export default AddRoom;
