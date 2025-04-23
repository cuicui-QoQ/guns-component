import React, { FC, useState, ChangeEvent, useEffect } from 'react'

import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../hooks/useDebounce'

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

    const [loading, setLoading] = useState(false)

    const debounceInputValue = useDebounce(inputValue, 400)

    const handleFetch = async (str: string) => {
        if (str.length !== 0) {
            setLoading(true)
            const res = await fetchSuggestions(str)
            setSuggestions(res)
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log('inputValue', debounceInputValue)
        handleFetch(debounceInputValue)
    }, [debounceInputValue])

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
        return (
            <ul>
                {suggestions.map((it, idx) => {
                    return (
                        <li
                            key={idx}
                            onClick={() => {
                                handleClickItem(it)
                            }}
                        >
                            {renderTemplate(it)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div>
            <Input value={inputValue} {...restProps} onChange={handleChange} />
            {loading && (
                <div>
                    <Icon icon="spinner" spin></Icon>
                </div>
            )}
            {!loading && suggestions.length > 0 && generateDropdown()}
        </div>
    )
}

export default AutoComplete
