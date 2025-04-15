import React, {
    useRef,
    useEffect,
    forwardRef,
    ReactNode,
    useState,
} from 'react'
import cn from 'classnames'
import { IconProps } from '../Icon/icon'
import useMergedState from '../hooks/useMergedState'

import BaseInput from './baseInput'

export enum InputSize {
    Large = 'lg',
    Small = 'sm',
    Standard = 'std',
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    autoComplete?: string
    className?: string
    disabled?: boolean
    size?: InputSize
    prepand?: ReactNode | string
    append?: ReactNode | string
    addonBefore?: ReactNode | string
    addonAfter?: ReactNode | string
    icon?: IconProps
    allowClear?: boolean | { clearIcon?: ReactNode }
    onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const isDebug = true

const myConsole = {
    log: (...args: any[]) => {
        if (isDebug) {
            // console.log('myConsole.log', ...args)
        }
    },
}

const Input: React.FC<InputProps> = ({
    disabled = false,
    size = InputSize.Standard,
    ...resetProps
}) => {
    const classes = cn('tums-input', resetProps.className, {
        [`tums-input--${size}`]: size,
    })

    // ====================== Value =======================
    const [value, setValue] = useMergedState(resetProps.defaultValue, {
        value: resetProps.value,
    })

    const formatValue =
        value === undefined || null === value ? '' : String(value)

    const [focused, setFocused] = useState(false)

    // 是一个简单的锁机制，用于确保 Enter 键按下事件只触发一次 onPressEnter 回调，直到 Enter 键被释放
    const keyEnterLockRef = useRef(false)

    useEffect(() => {
        if (keyEnterLockRef.current) {
            keyEnterLockRef.current = false
        }
        // setFocused((prev) => (prev && disabled ? false : prev));
    }, [disabled])

    const { prepand, append, type, autoComplete } = resetProps

    const { onPressEnter } = resetProps

    // 	规定以字符数计的 <input> 元素的宽度。默认值是 20
    const htmlSize: number = 20

    const height = {
        [InputSize.Large]: '40px',
        [InputSize.Small]: '24px',
        [InputSize.Standard]: '32px',
    }

    const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('onInternalChange', input?.value)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true)
        const { onFocus } = resetProps
        onFocus?.(e)
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('handleFocus', input?.value)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false)
        if (keyEnterLockRef.current) {
            keyEnterLockRef.current = false
        }
        const { onBlur } = resetProps
        onBlur?.(e)
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('handleBlur', input?.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onPressEnter && 'Enter' === e.key && !keyEnterLockRef.current) {
            keyEnterLockRef.current = true
            onPressEnter(e)
        }
        const { onKeyDown } = resetProps
        onKeyDown?.(e)
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('handleKeyDown', input?.value)
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ('Enter' === e.key) {
            keyEnterLockRef.current = false
        }
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('handleKeyUp', input?.value)
    }

    const onInternalCompositionEnd = (
        e: React.CompositionEvent<HTMLInputElement>,
    ) => {
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('onInternalCompositionEnd', input?.value)
    }

    const onCompositionStart = (
        e: React.CompositionEvent<HTMLInputElement>,
    ) => {
        const input = e.nativeEvent.target as HTMLInputElement
        myConsole.log('onCompositionStart', input?.value)
    }

    const inputRef = React.useRef<HTMLInputElement>(null)

    const getInputElement = () => {
        // Fix https://fb.me/react-unknown-prop
        const otherProps: React.InputHTMLAttributes<HTMLInputElement> =
            resetProps
        return (
            <input
                autoComplete={autoComplete}
                {...otherProps}
                onChange={onInternalChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                className={'tums-input__input'}
                // style={styles?.input}
                ref={inputRef}
                size={htmlSize}
                type={type}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onInternalCompositionEnd}
            />
        )
    }

    return (
        <BaseInput focused={focused} {...resetProps}>
            {getInputElement()}
        </BaseInput>
    )
}

export default Input
