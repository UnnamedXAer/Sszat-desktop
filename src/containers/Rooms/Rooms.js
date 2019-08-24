import React, { useState } from 'react';
import classes from './Rooms.module.css';

import SidePanel from '../SidePanel/SidePanel';
import Row from '../../components/SidePanel/Row/Row';

const Rooms = props => {

    const rooms = (isOpened) => (
        <div className={classes.Rooms}>
                <Row text="cykablat111_1" showCloseBtn isOpened={isOpened}/>
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
            </div>
    );

    return (
        <SidePanel headerTitle="Rooms">
            {rooms}
        </SidePanel>
    );
}

export default Rooms;