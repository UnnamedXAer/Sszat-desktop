import { useEffect } from 'react';

const useComponentClickOutside = (ref, onClickOutside) => {
    // const [isVisible, setIsVisible] = useState(false);

    const clickOutsideHandler = (ev) => {
        console.log("useComponentClickOutside.clickOutsideHandler", ref);
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