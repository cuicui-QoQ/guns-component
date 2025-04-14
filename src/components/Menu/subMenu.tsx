import React, { useContext, useState } from 'react'
import cn from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
    index?: string
    title: string
    className?: string
    children?: React.ReactNode
}

let timer: NodeJS.Timeout
const handleMouse = (
    e: React.MouseEvent,
    toggle: boolean,
    cb: (toggle: boolean) => void,
) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
        cb(toggle)
    }, 300)
}

const isPre = (str: string, subStr: string) => {
    if (!str || !subStr) {
        return false
    }
    return 0 === str.indexOf(subStr)
}

const SubMenu: React.FC<SubMenuProps> = ({
    index,
    title,
    className,
    children,
}) => {
    const [isOpen, setOpen] = useState(false)

    const { mode, activeIndex } = useContext(MenuContext)
    const classes = cn('tums-sub-menu', className, {
        'tums-sub-menu--vertical': 'vertical' === mode,
        'tums-sub-menu--horizontal': mode !== 'vertical',
        'is-active': isPre(activeIndex, index!),
    })

    const childrenClassName = cn('tums-sub-menu__children', {
        'is-open': isOpen,
    })

    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as React.ReactElement<MenuItemProps>
            const { name } = childElement.type as { name?: string }
            if ('MenuItem' === name) {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`,
                })
            } else {
                console.error(
                    'MenuItem component must be used as a child of Menu component',
                )
            }
        })
    }

    const mouseEvents =
        mode !== 'vertical'
            ? {
                  onMouseEnter: (event: React.MouseEvent) => {
                      handleMouse(event, true, setOpen)
                  },
                  onMouseLeave: (event: React.MouseEvent) => {
                      handleMouse(event, false, setOpen)
                  },
              }
            : {}

    return (
        <div className={classes} {...mouseEvents}>
            <div
                className="tums-sub-menu__title"
                onClick={() => {
                    if (mode !== 'horizontal') {
                        setOpen(!isOpen)
                    }
                }}
            >
                {title}
            </div>
            <div className={childrenClassName}>{renderChildren()}</div>
        </div>
    )
}

export default SubMenu
