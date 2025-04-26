import React from 'react'
import cn from 'classnames'

export interface FormItemProps {
    className?: string
    styles?: React.CSSProperties
    children: React.ReactNode
    label?: string
}

const FormItem: React.FC<FormItemProps> = ({
    className,
    styles,
    children,
    ...restProps
}) => {
    const { label } = restProps
    const rowClassName = cn('guns-form-item__row', className)
    const labelClassName = cn('guns-form-item__label')
    const childrenClassName = cn('guns-form-item__children')
    return (
        <div className={rowClassName} style={styles}>
            {label && (
                <div className={labelClassName}>
                    <label title={label}>{label}</label>
                </div>
            )}
            <div className={childrenClassName}>{children}</div>
        </div>
    )
}

export default FormItem
