import { RefObject } from "react";
import { ref } from "yup";

export function useClickOutSide() {
    const onClickOutSide = (ref: RefObject<HTMLElement>, state: boolean, setState: (value: boolean) => void) => {

        document.addEventListener('click', handleClickOutSide)
        
        function handleClickOutSide(event: any) {
                if (ref.current !== null && event.target != null) {
                    if (!ref.current.contains(event.target)) {
                        setState(!state)
                        document.removeEventListener('click', handleClickOutSide)
                    }
                }
            }
        }

    return { onClickOutSide }
}