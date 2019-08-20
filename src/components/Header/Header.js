import React from 'react';
import classes from './Header.module.css';

const header = props => {
    return (
        <header className={classes.Header}>
            <div className={classes.Logo}>
                b<br />
                b<br />
                b<br />
                b<br />
                b<br />
                <div></div>
                <div></div>
            </div>
        </header>
    );
}

export default header;