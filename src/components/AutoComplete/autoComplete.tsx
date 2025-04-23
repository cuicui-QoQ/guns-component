import React, { FC, useState, ChangeEvent, useEffect, useRef } from 'react'
import cn from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../hooks/useDebounce'
import useClickOutside from '../hooks/useClickOutside'

export interface DataSourceObject {
    value: string
}

export type DataSourceType<T = object> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (
        str: string,
    ) => Promise<DataSourceType[]> | DataSourceType[]
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => React.ReactNode
}

const formatVal = (val: string | number | readonly string[] | undefined) => {
    if (val === undefined) {
        return ''
    } else {
        return String(val)
    }
}

const AutoComplete: FC<AutoCompleteProps> = props => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        onChange,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState<string>(formatVal(value))
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])

    const [hightlightIndex, setHightlightIndex] = useState<number>(-1)

    const [loading, setLoading] = useState(false)

    const debounceInputValue = useDebounce(inputValue, 400)

    const triggerSearch = useRef(false)

    const componentRef = useRef<HTMLDivElement>(null)

    useClickOutside(componentRef, () => {
        setSuggestions([])
    })
    const handleFetch = async (str: string) => {
        if (str.length !== 0 && !triggerSearch.current) {
            setLoading(true)
            const res = await fetchSuggestions(str)
            setSuggestions(res)
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetch(debounceInputValue)
    }, [debounceInputValue])

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        triggerSearch.current = false
        onChange?.(e)
        const val = e.target.value.trim()
        setInputValue(val)
        if (val) {
            // 这里要防抖，不然会频繁调用接口
        } else {
            setSuggestions([])
        }
    }

    const handleClickItem = (it: DataSourceType) => {
        setInputValue(it.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(it)
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        const dropdownClassName = cn('guns-auto-complete__dropdown')
        return (
            <div className={dropdownClassName} ref={componentRef}>
                {!loading &&
                    suggestions.length > 0 &&
                    suggestions.map((it, idx) => {
                        return (
                            <div
                                className={cn(
                                    'guns-auto-complete__dropdown-item',
                                    {
                                        'is-active': hightlightIndex === idx,
                                    },
                                )}
                                key={idx}
                                onClick={() => {
                                    handleClickItem(it)
                                }}
                            >
                                {renderTemplate(it)}
                            </div>
                        )
                    })}
                {loading && (
                    <div>
                        <Icon icon="spinner" spin></Icon>
                    </div>
                )}
            </div>
        )
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key } = e
        if ('ArrowDown' === key) {
            if (hightlightIndex < suggestions.length - 1) {
                setHightlightIndex(hightlightIndex + 1)
            }
            e.preventDefault()
        } else if ('ArrowUp' === key) {
            if (hightlightIndex > 0) {
                setHightlightIndex(hightlightIndex - 1)
            }
            e.preventDefault()
        } else if ('Enter' === key) {
            if (hightlightIndex > -1) {
                triggerSearch.current = true
                setHightlightIndex(-1)
                handleClickItem(suggestions[hightlightIndex])
            }
        } else if ('Escape' === key) {
            setHightlightIndex(-1)
            setSuggestions([])
        }
    }

    const autoCompleteClassName = cn('guns-auto-complete', restProps.className)

    return (
        <div className={autoCompleteClassName} onKeyDown={handleKeyDown}>
            <Input value={inputValue} {...restProps} onChange={handleChange} />
            {generateDropdown()}
        </div>
    )
}

export default AutoComplete
