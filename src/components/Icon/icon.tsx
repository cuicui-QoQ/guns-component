import React, { FC } from 'react'
import classNames from 'classnames'
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export type ThemeProps =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    /** 支持框架主题 根据主题显示不同的颜色 */
    theme?: ThemeProps
}

const Icon: FC<IconProps> = props => {
    // icon-primary
    const { className, theme, ...resetProps } = props
    const classes = classNames('guns-icon', className, {
        [`guns-icon--${theme}`]: theme,
    })
    return <FontAwesomeIcon className={classes} {...resetProps} />
}

export default Icon
