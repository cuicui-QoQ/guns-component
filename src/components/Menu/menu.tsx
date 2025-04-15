import React, { useCallback, useState } from 'react'
import cn from 'classnames'
import { MenuItemProps } from './menuItem'

export type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    defaultIndex?: string
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties
    onSelect?: (selectedIndex: string) => void
    children?: React.ReactNode
}

export const MenuContext = React.createContext({
    activeIndex: '0',
    onClick: (index: string) => {
        console.log('click', index)
    },
    mode: 'horizontal' as MenuMode,
})

const Menu: React.FC<MenuProps> = ({
    className = '',
    mode = 'horizontal',
    style = {},
    children,
    defaultIndex = '0',
    onSelect = () => {},
}) => {
    const classes = cn('guns-menu', className, {
        'guns-menu--vertical': 'vertical' === mode,
        'guns-menu--horizontal': mode !== 'vertical',
    })
    const [activeIndex, setActiveIndex] = useState(defaultIndex)
    const handleSelect = useCallback(
        (index: string) => {
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
            if ('MenuItem' === name || 'SubMenu' === name) {
                return React.cloneElement(childElement, {
                    index: index.toString(),
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
                value={{ activeIndex, onClick: handleSelect, mode }}
            >
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

export default Menu
