import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = React.memo(props => {

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.ModalContainer} onClick={props.modalClosed}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
                }}
            >
                <div
                        // prevent from executing onClick on .ModalContainer
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