import React from 'react'
import { ButtonType, Button } from './button'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'

//
const buttonMata: Meta<typeof Button> = {
    title: '第四章 Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    args: {
        onClick: fn(),
        disabled: false,
        size: 'lg',
    },
}

export default buttonMata

type Story = StoryObj<typeof buttonMata>

export const DefaultComp: Story = {
    name: '默认按钮样式',
    render: args => <Button {...args}>默认按钮样式</Button>,
}

export const ButtonWithSize: Story = {
    name: '不同尺寸的按钮',
    render: args => (
        <>
            <Button {...args} size={'lg'}>
                大按钮
            </Button>
            <Button {...args} size={'sm'}>
                小按钮
            </Button>
        </>
    ),
}

export const ButtonWithType: Story = {
    name: '不同类型的按钮',
    render: () => (
        <>
            <Button btnType={ButtonType.Danger}>Danger按钮</Button>
            <Button btnType={ButtonType.Link}>link按钮</Button>
            <Button btnType={ButtonType.Primary}>Primary大按钮</Button>
            <Button btnType={ButtonType.Default}>默认按钮</Button>
        </>
    ),
}
