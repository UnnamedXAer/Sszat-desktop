import React, { } from 'react';
import classes from './Rooms.module.css';

import Row from '../../components/SidePanel/Row/Row';

const Rooms = props => {

    const rooms = ([
        <Row key={123} text="cykablat111_1"  isOpened={props.isOpened}/>
    ]);

    return (
        <div className={classes.Rooms}>
            {rooms}
        </div>
    );
};

export default Rooms;