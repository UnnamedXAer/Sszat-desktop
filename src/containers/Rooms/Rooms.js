import React from 'react';
import classes from './Rooms.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from '../../components/SidePanel/Row/Row'
import Room from '../../components/Room/Room';
import AddRoom from './AddRoom/AddRoom';
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const Rooms = ({ 
	publicRoom,
	rooms,
	setActiveRoom,
	prepareStateForRoomSelect,
	activeRoom, 
	isOpened, 
	loggedUser, 

	createRoom,
    setCreateRoomLoading,
    createRoomError,
	createRoomLoading,
	showCreateRoom,
	setShowCreateRoom,
	leaveRoom,
	deleteRoom

}) => {
    const newRoomButtonClickHandler = ev => {
		setShowCreateRoom(true);
    }

	const selectRoomHandler = id => {
		prepareStateForRoomSelect(id);
		setActiveRoom(id);
	};

    const addRoomHandler = room => {

        // do nothing when new room creat action is in progress 
		if (createRoomLoading) {
            return;
        }

        // cancel 
        if (!room) {
			return setShowCreateRoom(false);
        }

        setCreateRoomLoading(true);

		createRoom(room);
    }

    const roomList = rooms.map(room => {
        const myRoom = room.owner === loggedUser.id

        const roomMenuItems = [
            {
                label: myRoom ? "Delete room" : "Leave room",
                click: () => {
                    if (myRoom) {
                        deleteRoom(room.id);
                    }
                    else {
						leaveRoom(room.id, loggedUser.id);
                    }
                },
            },
        ];

        return <Room 
            key={room.id} 
            text={room.name} 
            active={room.id === activeRoom} 
            isOpened={isOpened} 
            clicked={ev => selectRoomHandler(room.id)}
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
            <Room 
                text={publicRoom.name}
                active={publicRoom.id === activeRoom}
                isOpened={isOpened}
				clicked={ev => selectRoomHandler(publicRoom.id)}
                menuItems={[]}
            />
			{roomList}
			<Modal show={showCreateRoom} modalClosed={() => addRoomHandler(false)}>
                <AddRoom 
                    loggedUser={loggedUser} 
                    onExit={addRoomHandler} 
                    loading={createRoomLoading} 
                    shouldSetFocus={showCreateRoom}
                    error={createRoomError} />
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
	loggedUser: state.auth.loggedUser,
	createRoomLoading: state.rooms.createRoomLoading,
	showCreateRoom: state.rooms.showCreateRoom,
	createRoomError: state.rooms.createRoomError
});

const mapDispatchToProps = dispatch => ({
	createRoom: (data) => dispatch(actions.createRoom(data)),
	deleteRoom: (id) => dispatch(actions.deleteRoom(id)),
	leaveRoom: (roomId, userId) => dispatch(actions.leaveRoom(roomId, userId)),
	setCreateRoomLoading: (isLoading) => dispatch(actions.setCreateRoomLoading(isLoading)),
	setShowCreateRoom: (show) => dispatch(actions.setShowCreateRoom(show)),
	prepareStateForRoomSelect: (roomId) => dispatch(actions.prepareStateForRoomSelect(roomId)),
	setActiveRoom: (id) => dispatch(actions.setActiveRoom(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);