import React from 'react'
import cn from 'classnames'
import { IconProps } from '../Icon/icon'

export enum InputSize {
    Large = 'lg',
    Small = 'sm',
    Standard = 'std',
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    className?: string
    disabled?: boolean
    size?: InputSize
    prepand?: React.ReactNode | string
    append?: React.ReactNode | string
    icon?: IconProps
}

const Input: React.FC<InputProps> = ({
    disabled = false,
    size = InputSize.Standard,
    ...resetProps
}) => {
    const classes = cn('tums-input', resetProps.className, {
        [`tums-input--${size}`]: size,
    })

    return (
        <div className={classes}>
            <input disabled={disabled} {...resetProps} />
        </div>
    )
}

export default Input
