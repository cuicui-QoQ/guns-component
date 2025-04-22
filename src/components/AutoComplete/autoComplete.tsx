import React, { FC, useState, ChangeEvent } from 'react'

import Input, { InputProps } from '../Input/input'

export interface DataSourceObject {
    value: string
}

export type DataSourceType<T = object> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[]
    onSelect?: (item: DataSourceType) => void
    renderOption?: (item: DataSourceType) => React.ReactNode
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

    const [inputValue, setInputValue] = useState(value)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        const val = e.target.value.trim()
        setInputValue(val)
        if (val) {
            const res = fetchSuggestions(val)
            setSuggestions(res)
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
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}

export default AutoComplete
