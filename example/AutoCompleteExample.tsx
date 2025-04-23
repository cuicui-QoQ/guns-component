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

function AutoCompleteGithubExample() {
    const handleFetchGithub = (val: string) => {
        return fetch(`https://api.github.com/search/users?q=${val}`)
            .then(res => res.json())
            .then(({ items }) => {
                const formatItems = items.slice(0, 10).map((it: any) => {
                    return {
                        value: it.login,
                        ...it,
                    }
                })
                return formatItems
            })
    }

    return (
        <AutoComplete
            prepand="异步调用github"
            fetchSuggestions={handleFetchGithub}
        ></AutoComplete>
    )
}

function AutoCompleteExample() {
    const renderOpt = (it: DataSourceType<Email>) => {
        return (
            <p>
                {it.value}@{it.append}
            </p>
        )
    }

    const handleFetch: (str: string) => Promise<DataSourceType<Email>[]> = (
        val: string,
    ) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(
                    email.filter(it => {
                        return it.value.indexOf(val) !== -1
                    }),
                )
            }, 400)
        })
    }

    return (
        <>
            <AutoCompleteGithubExample />
            <AutoComplete
                prepand="异步的"
                fetchSuggestions={handleFetch}
                renderOption={renderOpt}
            ></AutoComplete>
            <AutoComplete
                prepand="非异步的"
                fetchSuggestions={(str: string) => {
                    return email.filter(it => {
                        return it.value.indexOf(str) !== -1
                    })
                }}
                renderOption={renderOpt}
            ></AutoComplete>
        </>
    )
}

export default AutoCompleteExample
