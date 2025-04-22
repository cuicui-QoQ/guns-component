import AutoComplete, {
    DataSourceType,
} from '../src/components/AutoComplete/autoComplete'

const sugg = ['apple', 'people', 'shit', 'pic', 'move', 'download']
const append = [
    '162.com',
    '161.com',
    'qq.com',
    'gmail.com',
    'it.com',
    'scut.com',
]

type Email = {
    value: string
    append?: string
}

const email: Email[] = sugg.map((val, idx) => {
    return {
        value: val,
        append: append[idx],
    }
})

function AutoCompleteExample() {
    const renderOpt = (it: DataSourceType<Email>) => {
        return (
            <p>
                {it.value}@{it.append}
            </p>
        )
    }
    return (
        <>
            <AutoComplete
                fetchSuggestions={(val: string) => {
                    return email.filter(it => {
                        return it.value.indexOf(val) !== -1
                    })
                }}
                renderOption={renderOpt}
            ></AutoComplete>
        </>
    )
}

export default AutoCompleteExample
