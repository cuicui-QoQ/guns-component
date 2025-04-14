import React from 'react'
import {
    render,
    RenderResult,
    fireEvent,
    cleanup,
} from '@testing-library/react'
import { vi } from 'vitest'
import Menu, { MenuProps, MenuMode } from './menu.tsx'

import MenuItem from './menuItem.tsx'

const testProps = {
    defaultIndex: 0,
    className: 'test-class',
    onSelect: vi.fn(),
}

const getMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>Menu3</MenuItem>
        </Menu>
    )
}

// beforeEach 钩子函数，每个测试用例执行前都会执行

let wrapper: RenderResult,
    menuEle: HTMLElement,
    activeItem: HTMLElement,
    disabledItem: HTMLElement

describe('test Menu component', () => {
    afterEach(() => {
        // 每个测试用例执行后都会执行的钩子函数
    })
    // 钩子函数，每个测试用例执行前都会执行
    beforeEach(() => {
        vi.clearAllMocks() // 清空所有 mock 的状态
        wrapper = render(getMenu(testProps))
        menuEle = wrapper.getByTestId('test-menu')
        activeItem = wrapper.getByText('active')
        disabledItem = wrapper.getByText('disabled')
    })
    it('should render the correct default menu', () => {
        expect(menuEle).toBeInTheDocument()
        expect(activeItem).toBeInTheDocument()
        expect(disabledItem).toBeInTheDocument()
        expect(menuEle).toHaveClass('tums-menu test-class')
        expect(activeItem).toHaveClass('tums-menu-item is-active')
        expect(disabledItem).toHaveClass('tums-menu-item is-disabled')
        expect(menuEle.getElementsByTagName('li').length).toEqual(3) // 是不是有3个li
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('Menu3')
        expect(thirdItem).toBeInTheDocument()
        // 初始状态下，activeItem是active，thirdItem是disabled
        expect(thirdItem).not.toHaveClass('is-active')
        expect(activeItem).toHaveClass('is-active')
        fireEvent.click(thirdItem)
        // 点击后，thirdItem变成active
        expect(thirdItem).toHaveClass('is-active')
        expect(activeItem).not.toHaveClass('is-active')
        // 点击后，点击事件应该被调用
        expect(testProps.onSelect).toHaveBeenCalledTimes(1)
        // 点击后，点击事件应该被调用，并且参数应该是2
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
    })
    it('should not change active when disabled item is clicked', () => {
        fireEvent.click(disabledItem)
        expect(disabledItem).toHaveClass('is-disabled')
        expect(activeItem).toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalled()
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup() // 这个函数用于清理测试环境，这里是为了避免初始化时候创建的多次wrapper
        // 不同的用例之间，会自动清理
        const testVerProps = {
            mode: 'vertical' as MenuMode,
            onSelect: vi.fn(),
        }
        wrapper = render(getMenu(testVerProps))
        menuEle = wrapper.getByTestId('test-menu')
        expect(menuEle).toBeInTheDocument()
        expect(menuEle).toHaveClass('tums-menu tums-menu--vertical')
    })
})
