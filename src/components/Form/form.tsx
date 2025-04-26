import React from 'react'
import cn from 'classnames'

export interface FormProps {
    className?: string
    styles?: React.CSSProperties
    children: React.ReactNode
    name?: string
}

const Form: React.FC<FormProps> = ({ className, styles, children, name="guns-form" }) => {
    const formClassName = cn('guns-form', className)
    return (
        <form className={formClassName} style={styles} name={name}>
            {children}
        </form>
    )
}

export default Form
