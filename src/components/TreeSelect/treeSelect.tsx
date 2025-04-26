import React, { FC, useState } from 'react'
import Icon from '../Icon/icon'
export interface TreeNodeProps {
    data: TreeNodeData
    onSelect: (node: TreeNodeData) => void
}

type NodeState = 'half' | 'all' | 'no'

const getIcon = (state?: NodeState) => {
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

export interface TreeNodeData {
    label: string
    key: string
    children?: TreeNodeData[]
    state?: NodeState
}

// 向上更新数据
const HeapifyUpData = (data: TreeNodeData) => {
    if (data.children) {
        data.children?.forEach(item => {
            HeapifyUpData(item)
        })
        const childrenState = data.children?.map(item => item.state)
        if (childrenState?.every(item => 'all' === item)) {
            data.state = 'all'
        } else if (childrenState?.every(item => 'no' === item)) {
            data.state = 'no'
        } else {
            data.state = 'half'
        }
    } else {
        // 叶子节点
        if (!data.state) {
            data.state = 'no'
        }
    }
}

const getNewNodeState = (state: NodeState) => {
    if ('all' === state) {
        return 'no'
    }
    if ('no' === state || 'half' === state) {
        return 'all'
    }
    return 'no'
}

const TreeNode: FC<TreeNodeProps> = ({ data, onSelect }) => {
    return (
        <div>
            <div
                onClick={() => {
                    onSelect(data)
                }}
            >
                {getIcon(data.state)}
                {data.label}
            </div>
            {data.children && (
                <div style={{ marginLeft: '20px' }}>
                    {data.children.map((item, idx) => {
                        return (
                            <TreeNode
                                key={item.key}
                                data={item}
                                onSelect={onSelect}
                            ></TreeNode>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const dfsGetNodeByKey = (data: TreeNodeData, key: string) => {
    if (data.key === key) {
        return data
    } else {
        if (data.children) {
            let ans = null
            data.children.forEach(node => {
                const res = dfsGetNodeByKey(node, key)
                if (res) {
                    ans = res
                }
            })
            return ans
        } else {
            return null
        }
    }
}

// 将当前节点及所有子节点更新为同一个状态
const updateNodeState = (newState: NodeState, node: TreeNodeData | null) => {
    if (!node) {
        return
    }
    node.state = newState
    if (node.children) {
        node.children.forEach(item => {
            updateNodeState(newState, item)
        })
    }
}

const TreeSelect: FC<TreeNodeProps> = ({ data, onSelect }) => {
    const deepCopyData = deepCopy(data)
    HeapifyUpData(deepCopyData)
    const [nodeData, setNodeData] = useState<TreeNodeData>(deepCopyData)
    return (
        <TreeNode
            data={nodeData}
            onSelect={node => {
                onSelect(node)
                const newNode = deepCopy(nodeData)
                const targetNode = dfsGetNodeByKey(newNode, node.key)
                const newState = getNewNodeState(targetNode?.state || 'no')
                updateNodeState(newState, targetNode)
                HeapifyUpData(newNode)
                if (isDeepEqual(newNode, nodeData)) {
                    return
                }
                setNodeData(newNode)
            }}
        ></TreeNode>
    )
}

const deepCopy = (data: any) => {
    return JSON.parse(JSON.stringify(data))
}

const isDeepEqual = (a: any, b: any) => {
    if (a === b) {
        return true
    } else {
        return JSON.stringify(a) === JSON.stringify(b)
    }
}

export default TreeSelect
