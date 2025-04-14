import React, { useCallback, useState } from 'react'
import cn from 'classnames'
import { MenuItemProps } from './menuItem'

export type MenuMode = 'horizontal' | 'vertical'

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

    // 过滤掉其他不是 MenuItem 的子元素
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.ReactElement<MenuItemProps>
            const { name } = childElement.type as { name?: string }
            if ('MenuItem' === name) {
                return React.cloneElement(childElement, {
                    index,
                })
            } else {
                console.error(
                    'MenuItem component must be used as a child of Menu component',
                )
            }
        })
    }

    // data-testid="test-menu" 用于测试
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider
                value={{ activeIndex, onClick: handleSelect }}
            >
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu
