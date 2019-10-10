import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = React.memo(props => {

    const keyDownHandler = ev => {
        if (ev.keyCode === 27) {
            console.log(ev.target);
            props.modalClosed();
        }
    }

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div 
                className={classes.ModalContainer} 
                onClick={props.modalClosed}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
                }}
            >
                <div
                    tabIndex="-1"
                        // prevent from executing onClick on .ModalContainer
                    onKeyDown={keyDownHandler}
                    onClick={(ev) => {
                        ev.stopPropagation();
                        ev.nativeEvent.stopImmediatePropagation();
                    }}
                    className={classes.Modal}
                    style={{
                        opacity: props.show ? '1' : '0',
                        ...props.style
                    }}>
                    {props.children}
                </div>
            </div>
        </>
    );
}, (prevProps, nextProps) => !(nextProps.show !== prevProps.show || nextProps.children !== prevProps.children));

export default modal;