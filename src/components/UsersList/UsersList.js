import React from 'react';
import classes from './UsersList.module.css';
import Checkbox from '../UI/Checkbox/Checkbox';
import { connect } from 'react-redux';

const usersList = ({ users, loggedUser, selectedUsers, checkUser, error }) => {
    const userCheckHandler = (ev, id) => {
        checkUser(id, ev.target.checked);
    }

    const list = users.map(x => {
        return (
            <li key={x.id} className={classes.ListElement} >
                <Checkbox 
                    onChange={(ev) => userCheckHandler(ev, x.id)} 
                    checked={selectedUsers.includes(x.id)} 
					readOnly={x.id === loggedUser.id} 
					disabled={x.id === loggedUser.id}
                    label={x.userName} />
            </li>
        );
    })

    return (
        <>
            <div className={classes.UsersList}>
                <ul className={classes.List} >
                    {list}
                </ul>
            </div>
            <p className={classes.Error}>{error}</p>
        </>
    )
}

const mapStateToProps = (state) => ({
	users: state.users.users,
	loggedUser: state.auth.loggedUser
});

export default connect(mapStateToProps)(usersList);