import React from 'react'
import TreeSelect, {
    TreeNodeData,
} from '../src/components/TreeSelect/treeSelect'

const testData: TreeNodeData = {
    label: '一级',
    key: '1',
    children: [
        {
            label: '二级',
            key: '1-1',
            children: [
                {
                    label: '三级',
                    key: '1-1-1',
                    children: [
                        {
                            state: 'all',
                            key: '1-1-1-1',
                            label: '四级',
                        },
                        {
                            state: 'no',
                            key: '1-1-1-2',
                            label: '四级',
                        },
                    ],
                },
            ],
        },
        {
            label: '二级2',
            key: '1-2',
        },
    ],
}
function Example() {
    return (
        <TreeSelect
            onSelect={() => {
                console.log('select')
            }}
            data={testData}
        ></TreeSelect>
    )
}

export default Example
