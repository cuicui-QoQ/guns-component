import React, { useContext, useEffect } from 'react'
import cn from 'classnames'
import { FormContext } from './form.tsx'
import { FormActionType } from './useStore.ts'
import { RuleItem } from 'async-validator'
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
    validateTrigger?: string
    rules?: RuleItem[]
}

const FormItem: React.FC<FormItemProps> = ({
    className,
    styles,
    children,
    valuePropName = 'value',
    trigger = 'onChange',
    validateTrigger = 'onBlur',
    rules = [],
    getValueFromEvent = e => e.target.value,
    ...restProps
}) => {
    const { label, name } = restProps
    const { dispatch, fields, initialValues, validateField } =
        useContext(FormContext)
    // 拿到对应控件的状态
    const fieldState = fields[name]
    const value = fieldState?.value
    console.log('传递给input的 value', value)
    useEffect(() => {
        dispatch({
            type: FormActionType.addField,
            name: name,
            value: initialValues?.[name] || '',
            rules,
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
                rules,
            })
        },
    }
    if (rules.length > 0) {
        controlProps[validateTrigger] = async () => {
            console.log('validateTrigger', validateTrigger)
            await validateField(name)
        }
    }
    const childList = React.Children.toArray(children)
    if (0 === childList.length) {
        console.error('No child element found in Form.Item')
    }
    if (childList.length > 1) {
        console.warn('Only support one child')
    }
    if (!React.isValidElement(childList[0])) {
        console.error('不合法的React组件')
    }
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
