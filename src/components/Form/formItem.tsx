import React, { useContext, useEffect } from 'react'
import cn from 'classnames'
import { FormContext } from './form.tsx'
import { FormActionType } from './useStore.ts'

export interface FormItemProps {
    className?: string
    styles?: React.CSSProperties
    children: React.ReactNode
    label?: string
    name: string
}

const FormItem: React.FC<FormItemProps> = ({
    className,
    styles,
    children,
    ...restProps
}) => {
    const { label, name } = restProps
    const { dispatch, fields } = useContext(FormContext)
    // 拿到对应控件的状态
    const fieldState = fields[name]
    const value = fieldState?.value
    console.log('传递给input的 value', value)
    useEffect(() => {
        dispatch({
            type: FormActionType.addField,
            name: name,
            value: '',
        })
    }, [])
    const rowClassName = cn('guns-form-item__row', className)
    const labelClassName = cn('guns-form-item__label')
    const childrenClassName = cn('guns-form-item__children')
    // todo： 这里需要适配不同的事件和change函数
    const controlProps = {
        value: value,
        onChange: (e: any) => {
            const newV = e.target.value
            dispatch({
                type: FormActionType.updateField,
                name: name,
                value: newV,
            })
        },
    }
    const childList = React.Children.toArray(children)
    // TODO: 这里需要对对于children进行检查，避免奇怪的类型混入
    const child = childList[0] as React.ReactElement
    const newChild = React.cloneElement(child, {
        ...child.props,
        ...controlProps,
    })
    console.log('controlProps', controlProps)
    return (
        <div className={rowClassName} style={styles}>
            {label && (
                <div className={labelClassName}>
                    <label title={label}>{label}</label>
                </div>
            )}
            <div className={childrenClassName}>{newChild}</div>
        </div>
    )
}

export default FormItem
