import cn from 'classnames'
import type { ReactElement, ReactNode } from 'react'
import React, { cloneElement, useRef } from 'react'
import { InputProps } from './input'

type BaseInputProps = InputProps & {
    inputElement?: ReactNode
    focused?: boolean
}

export function hasAddon(props: BaseInputProps) {
    return !!(props.addonBefore || props.addonAfter)
}

export function hasPrefixSuffix(props: BaseInputProps) {
    return !!(props.prepand || props.append || props.allowClear)
}

export interface HolderRef {
    /** Provider holder ref. Will return `null` if not wrap anything */
    nativeElement: HTMLElement | null
}

const BaseInput = React.forwardRef<HolderRef, BaseInputProps>((props, ref) => {
    const { inputElement: inputEl, children, value, focused } = props

    const { append, prepand, addonAfter, addonBefore } = props

    const inputElement = children ?? inputEl

    const element: ReactElement = cloneElement(
        inputElement as ReactElement<any>,
        {
            value,
        },
    )

    const inputClassName = cn('guns-input')

    const innerClassName = cn('guns-input__inner', {
        'is-focused': focused,
    })

    const inputContainer = cn('guns-input__container')

    return (
        <div className={inputContainer}>
            <span className={inputClassName}>
                {addonBefore && <span>{addonBefore}</span>}
                <span className={innerClassName}>
                    {prepand && <span>{prepand}</span>}
                    {element}
                    {append && <span>{append}</span>}
                </span>
                {addonAfter && <span>{addonAfter}</span>}
            </span>
        </div>
    )
})

// 添加 displayName
BaseInput.displayName = 'BaseInput'

export default BaseInput
