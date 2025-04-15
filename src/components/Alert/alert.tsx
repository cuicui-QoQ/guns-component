import React, { useState } from 'react'
import cn from 'classnames'
import Icon from '../Icon/icon'
export enum AlertType {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

const getIconByType = (type: AlertType | undefined) => {
    switch (type) {
        case AlertType.Success:
            return <Icon icon="check-circle" theme="success" />
        case AlertType.Info:
            return <Icon icon="info-circle" theme="info" />
        case AlertType.Warning:
            return <Icon icon="exclamation-triangle" theme="warning" />
        case AlertType.Error:
            return <Icon icon="xmark-circle" theme="danger" />
        default:
            return <Icon icon="check-circle" theme="success" />
    }
}

interface BaseAlertProps {
    action?: React.ReactNode
    afterClose?: () => void
    closable?: boolean
    className?: string
    type?: AlertType
    message?: React.ReactNode
    description?: React.ReactNode
    icon?: React.ReactNode
    showIcon?: boolean
    onClose?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

const Alert: React.FC<BaseAlertProps> = ({
    className,
    type = AlertType.Success,
    action,
    message,
    description,
    afterClose,
    closable = false,
    showIcon = false,
    icon,
    onClose,
}) => {
    const [show, setShow] = useState(true)

    const classes = cn('guns-alert', className, {
        [`guns-alert--${type}`]: type,
    })

    const textViewClass = cn('guns-alert__text')

    const descClass = cn('guns-alert__description')

    return (
        <>
            {show && (
                <div className={classes}>
                    {showIcon && (
                        <div className="guns-alert__icon">
                            {icon ? icon : getIconByType(type)}
                        </div>
                    )}
                    <div className={textViewClass}>
                        <div>{message}</div>
                        {description && (
                            <div className={descClass}>{description}</div>
                        )}
                    </div>
                    {action}
                    {closable && (
                        <div className="guns-alert__closeIcon">
                            <Icon
                                icon="xmark"
                                onClick={e => {
                                    setShow(false)
                                    if (afterClose) {
                                        afterClose()
                                    }
                                    if (onClose) {
                                        onClose(e)
                                    }
                                }}
                            ></Icon>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Alert
