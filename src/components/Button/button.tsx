import React from 'react'
import cn from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm',
    Standard = 'std',
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
}

interface BaseButtonProps {
    className?: string
    disabled?: boolean
    size?: ButtonSize
    btnType?: ButtonType
    children: React.ReactNode
    href?: string
}

type WebButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps &
    React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<WebButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = ({
    btnType = ButtonType.Default,
    disabled = false,
    size,
    children,
    href,
    className,
    ...resetProps
}) => {
    const classes = cn('guns-button', className, {
        [`guns-button--${btnType}`]: btnType,
        [`guns-button--${size}`]: size,
        'is-disabled': btnType === ButtonType.Link && disabled,
    })
    if (ButtonType.Link === btnType) {
        return (
            <a className={classes} href={href} {...resetProps}>
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} {...resetProps}>
                {children}
            </button>
        )
    }
}

export default Button
