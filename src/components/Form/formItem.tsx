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
    // 用哪个value去控制子组件中的value
    valuePropName?: string
    // 触发值
    trigger?: string
    // 用e中取出哪个值
    getValueFromEvent?: (event: any) => any
}

const FormItem: React.FC<FormItemProps> = ({
    className,
    styles,
    children,
    valuePropName = 'value',
    trigger = 'onChange',
    getValueFromEvent = e => e.target.value,
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
    const controlProps = {
        [valuePropName]: value,
        [trigger]: (e: any) => {
            const newV = getValueFromEvent(e)
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
