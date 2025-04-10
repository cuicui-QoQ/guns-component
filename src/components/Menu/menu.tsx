import React, { useCallback, useState } from 'react'
import cn from 'classnames'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    defaultIndex?: number
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties
    onSelect?: (selectedIndex: number) => void
    children?: React.ReactNode
}

export const MenuContext = React.createContext({
    activeIndex: 0,
    onClick: (index: number) => {
        console.log('click', index)
    },
})

const Menu: React.FC<MenuProps> = ({
    className = '',
    mode = 'horizontal',
    style = {},
    children,
    defaultIndex = 0,
    onSelect = () => {},
}) => {
    const classes = cn('tums-menu', className, {
        'tums-menu--vertical': 'vertical' === mode,
        'tums-menu--horizontal': mode !== 'vertical',
    })
    const [activeIndex, setActiveIndex] = useState(defaultIndex)
    const handleSelect = useCallback(
        (index: number) => {
            setActiveIndex(index)
            onSelect(index)
        },
        [onSelect],
    )

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider
                value={{ activeIndex, onClick: handleSelect }}
            >
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu
