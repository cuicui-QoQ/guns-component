import React, { FC, useState } from 'react'
import Icon from '../Icon/icon'
export interface TreeSelectProps {
    initData: any[]
    onSelect: (node: any) => void
}

type NodeState = 'half' | 'all' | 'no'

const getIcon = (state: NodeState) => {
    switch (state) {
        case 'half':
            return <Icon icon="circle-half-stroke"></Icon>
        case 'all':
            return <Icon icon="circle"></Icon>
        case 'no':
            return <Icon icon="circle-notch"></Icon>
        default:
            return <Icon icon="circle-notch"></Icon>
    }
}

const data = {
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
                            value: 'selected',
                            key: '1-1-1-1',
                            label: '四级',
                        },
                        {
                            value: 'no-selected',
                            key: '1-1-1-2',
                            label: '四级',
                        },
                    ],
                },
            ],
        },
    ],
}

const TreeNode: FC<TreeNodeProps> = ({ node, onSelect }) => {
    const [expanded, setExpanded] = useState(false)
}

const TreeSelect: FC<TreeSelectProps> = ({ data, onSelect }) => {
    return <></>
}

export default TreeSelect
