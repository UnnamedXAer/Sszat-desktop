import React, { useState } from 'react';
import classes from './Rooms.module.css';

import SidePanel from '../SidePanel/SidePanel';
import Row from '../../components/SidePanel/Row/Row';

const Rooms = props => {

    const [isOpened, setIsOpened] = useState(true);


    return (
        <SidePanel opened={isOpened} headerTitle="Rooms">
            <div className={classes.Rooms}>
                <Row text="cykablat" />
                <Row text="cykablat" />
                <Row text="cykablat" />
                <Row text="cykablat" />
                <Row text="cykablat" />
                <Row text="cykablat5" />
                <Row text="cykablat4" />
                <Row text="cykablat3" />
                <Row text="cykablat2" />
                <Row text="cykablat2" />
                <Row text="cykablat1" />
            </div>
        </SidePanel>
    );
}

export default Rooms;