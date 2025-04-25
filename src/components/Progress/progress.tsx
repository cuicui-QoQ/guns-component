import React from 'react'
import cn from 'classnames'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
    percent: number
    strokeHeight?: number
    showText?: boolean
    styles?: React.CSSProperties
    theme?: ThemeProps
}

const Progress: React.FC<ProgressProps> = ({
    strokeHeight = 30,
    showText = true,
    theme = 'primary',
    ...restProps
}) => {
    const { percent, styles } = restProps

    const classes = cn('guns-progress', {
        [`theme-${theme}`]: theme,
    })

    const innerClass = cn('guns-progress__bar-inner', {
        [`guns-progress__bar-inner--${theme}`]: theme,
    })

    return (
        <div
            className={classes}
            style={{
                height: strokeHeight,
                ...styles,
            }}
        >
            <div className="guns-progress__bar-outer">
                <div className={innerClass} style={{ width: `${percent}%` }}>
                    {showText && (
                        <div className="innner-text">{`${percent}`}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Progress
