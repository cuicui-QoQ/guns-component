import { RefObject, useEffect } from 'react'

function useClickOutside(
    ref: RefObject<HTMLElement> | null,
    handler: Function,
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                null === ref ||
                !ref.current ||
                ref.current.contains(event.target as Node)
            ) {
                return
            }
            handler(event)
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
}

export default useClickOutside
