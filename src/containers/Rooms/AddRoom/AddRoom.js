import React, { useState, useEffect, useRef } from 'react';
import classes from './AddRoom.module.css';
import UsersList from '../../../components/UsersList/UsersList';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

const sanitizeRoomName = name => {
        //todo RegExp
    return name.trim();
}

const AddRoom = ({
	loggedUser,
	shouldSetFocus,
	onExit,
    loading,
    error
}) => {

    const [roomName, setRoomName] = useState("");
    // selectedUsers -> list of ids of selected users
    const [selectedUsers, setSelectedUsers] = useState([loggedUser.id]);
    const [inputValidationError, setInputValidationError] = useState(null);
    const [selectedUsersError, setSelectedUsersError] = useState(null);
    const [anythingTouched, setAnythingTouched] = useState(false);
    
    const inputRef = useRef();

    useEffect(() => {
        if (shouldSetFocus) {
            inputRef.current.focus();
        }
    }, [shouldSetFocus])

    const cancelHandler = ev => {
        cleanupState();
        onExit(false);
    };

    const cleanupState = () => {
        // element is not unmounted but is just moved from visible area.
        // therefore fields need to be cleared manually.
		setSelectedUsers([loggedUser.id]);
        setRoomName("");
        setInputValidationError(null);
        setSelectedUsersError(null);
        setAnythingTouched(false);
    }

    const inputBlurHandler = ev => {
        if (!anythingTouched) {
            return;
        }
        if (sanitizeRoomName(roomName) === "") {
            setInputValidationError("Room name is required.");
        } 
        else {
            setInputValidationError(null);
        }
    }

    const completeHandler = ev => {
        let isOk = true;
        if (selectedUsers.length <= 1 ) {
            setSelectedUsersError("Select at least two users to create room.");
            isOk = false;
        }
        const sanitizedRoomName = sanitizeRoomName(roomName);
        if (sanitizedRoomName === "") {
            isOk = false;
            setInputValidationError("Room name is required.");
        }

        if (!isOk) {
            return;
        }

        const room = {
            name: sanitizedRoomName,
            members: selectedUsers,
            owner: loggedUser.id,
            createBy: loggedUser.id
        }
        onExit(room);
        cleanupState();
    }

    const roomNameChangeHandler = ev => {
        setAnythingTouched(true);
        const sanitizedName = sanitizeRoomName(ev.target.value);
        setInputValidationError(sanitizedName === "" ? "Room name is required." : null);
        setRoomName(ev.target.value);
    }

    const userCheckedHandler = (id, isChecked) => {
        setAnythingTouched(true);
        if (isChecked) {
            setSelectedUsersError(null);
            setSelectedUsers(prevState => prevState.concat(id));
        }
        else {
            // 2 because we are about to unselect another user
            if (selectedUsers.length <= 2) {
                setSelectedUsersError("Select at least two users to create room.");
            }
            setSelectedUsers(prevState => prevState.filter(x => x !== id));
        }
    }

    const keyPressHandler = ev => {
        if (ev.keyCode === 27) {
            if (ev.target === inputRef.current && roomName !== "") {
                setRoomName("");
            }
            else {
                cleanupState();
                onExit(false);
            }
        }
    }

    return (
        <div className={classes.AddRoom} tabIndex="0" onKeyDown={keyPressHandler}>
            <h3>Create Room</h3>
            {error && <p className={classes.Error}>{error}</p>}
            <label className={classes.RoomNameLabel} htmlFor="roomName">
                    <Input
                        inputRef={inputRef}
                        name="roomName"
                        type="text" 
                        placeholder="Room Name"
                        onChange={roomNameChangeHandler}
                        onBlur={inputBlurHandler}
                        value={roomName}
                        error={inputValidationError}
                        />
                </label>
            <UsersList checkUser={userCheckedHandler} selectedUsers={selectedUsers} error={selectedUsersError}/>
            {loading && <Spinner />}
            <div className={classes.Buttons}>
                <Button btnType="Danger" clicked={cancelHandler} disabled={loading} >Cancel</Button>
                <Button btnType="Success"  clicked={completeHandler} disabled={loading} >Ok</Button>
            </div>
        </div>
    );
};

export default (AddRoom);
