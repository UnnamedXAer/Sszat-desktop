import { useEffect } from 'react';
/**
 * This hook allow to trigger given function when user
 * clicked outside of given component
 *
 * @param {HTMLElement} ref
 * @param {Function} onClickOutside
 */
const useComponentClickOutside = (ref, onClickOutside) => {

    const clickOutsideHandler = (ev) => {
        if (ref.current && !ref.current.contains(ev.target)){
            onClickOutside();
        }
    }

    useEffect(() => {
        document.addEventListener("click", clickOutsideHandler);
        return () => {
            document.removeEventListener("click", clickOutsideHandler);
        };
    });
}

export default useComponentClickOutside;