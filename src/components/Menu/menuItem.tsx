import React, { useCallback, useContext } from 'react'
import cn from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = ({
    index,
    disabled,
    className,
    style,
    children,
}) => {
    const { activeIndex, onClick } = useContext(MenuContext)
    const classes = cn('tums-menu-item', className, {
        'is-disabled': disabled,
        'is-active': activeIndex === index,
    })
    const handleClick = useCallback(() => {
        if (disabled) {
            return
        }
        if (onClick && 'string' === typeof index) {
            onClick(index)
        }
    }, [disabled, index, onClick])

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

export default MenuItem
