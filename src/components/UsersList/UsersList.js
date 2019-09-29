import React from 'react';
import classes from './UsersList.module.css';
import Checkbox from '../UI/Checkbox/Checkbox';

const usersList = ({ users, selectedUsers, checkUser }) => {
    const userCheckHandler = (ev, id) => {
        checkUser(id, ev.target.checked);
    }

    const list = users.map(x => {
        return (
            <li key={x.id} className={classes.ListElement} >
                <Checkbox 
                    onChange={(ev) => userCheckHandler(ev, x.id)} 
                    checked={selectedUsers.includes(x.id)} 
                    readOnly={x.id === "-Lp_4GjjKpyiAaMVy7Hb"} 
                    disabled={x.id === "-Lp_4QT-N3p_0vqShcbS"}
                    label={x.name} />
            </li>
        );
    })


    return (
        <div className={classes.UsersList}>
            <ul className={classes.List} >
                {list}
            </ul>
        </div>
    )
}

export default usersList;