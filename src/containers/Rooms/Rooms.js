import React, { } from 'react';
import classes from './Rooms.module.css';

import Row from '../../components/SidePanel/Row/Row';

const Rooms = props => {

    const rooms = (
        <>
            <Row text="cykablat111_1" showCloseBtn isOpened={props.isOpened}/>
            <Row text="cykablat2323" showCloseBtn />
            {/* <Row text="cykablat11111" showCloseBtn />
            <Row text="cykablatJ" showCloseBtn /> */}
            <Row text="cykablat6666" showCloseBtn active />
            {/* <Row text="cykablat5" showCloseBtn/>
            <Row text="cykablat4" showCloseBtn/>
            <Row text="cykablat3" showCloseBtn/>
            <Row text="cykablat2" showCloseBtn/>
            <Row text="cykablat2" showCloseBtn/> */}
            <Row text="cykablat1_last" showCloseBtn/>
        </>
    );

    return (
        <div className={classes.Rooms}>
            {rooms}
        </div>
    );
};

export default Rooms;