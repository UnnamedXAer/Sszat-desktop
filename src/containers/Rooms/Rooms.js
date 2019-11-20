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
	selectRoom, 
	activeRoom, 
	isOpened, 
	loggedUser, 
	allUsers,

	createRoom,
	setCreateRoomLoading,
	createRoomLoading,
	showCreateRoom,
	setShowCreateRoom,
	leaveRoom,
	deleteRoom

}) => {
    const newRoomButtonClickHandler = ev => {
		setShowCreateRoom(true);
    }

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

        const members = {};

        // convert members to object for firebase
        room.members.forEach(x => {
            members[x] = true
        });

        const data = {
            name: room.name,
            owner: room.owner,
            createDate: room.createData,
			createdBy: loggedUser.id,
            members: members
        };

		createRoom(data);
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
            clicked={ev => selectRoom(room.id)}
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
                clicked={ev => selectRoom(publicRoom.id)}
                menuItems={[]}
            />
			{roomList}
			<Modal show={showCreateRoom} modalClosed={() => addRoomHandler(false)}>
				<AddRoom loggedUser={loggedUser} allUsers={allUsers} onExit={addRoomHandler} loading={createRoomLoading} shouldSetFocus={showCreateRoom} />
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
	loggedUser: state.auth.loggedUser,
	createRoomLoading: state.rooms.createRoomLoading,
	showCreateRoom: state.rooms.showCreateRoom
});

const mapDispatchToProps = dispatch => ({
	createRoom: (data) => dispatch(actions.createRoom(data)),
	deleteRoom: (id) => dispatch(actions.deleteRoom(id)),
	leaveRoom: (roomId, userId) => dispatch(actions.leaveRoom(roomId, userId)),
	setCreateRoomLoading: (isLoading) => dispatch(actions.setCreateRoomLoading(isLoading)),
	setShowCreateRoom: (show) => dispatch(actions.setShowCreateRoom(show))
});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);