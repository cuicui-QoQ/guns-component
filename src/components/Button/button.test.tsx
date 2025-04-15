import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'
import { vi } from 'vitest' // vi 用于模拟函数调用
import '@testing-library/jest-dom' // 添加这行

// describe 用于分组测试用例
// it 用于定义一个测试用例
// expect 用于断言
// vi.fn() 用于模拟函数调用
// toBeInTheDocument() 用于断言元素是否在页面上
// toHaveClass() 用于断言元素是否有指定的class
// toHaveAttribute() 用于断言元素是否有指定的属性
// toHaveBeenCalled() 用于断言函数是否被调用
// toHaveBeenCalledTimes() 用于断言函数被调用的次数
// fireEvent.click() 用于模拟点击事件
describe('test Button componet', () => {
    it('should render the correct default button', () => {
        const defaultProps = {
            onClick: vi.fn(),
        }
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const ele = wrapper.getByText('Nice') as HTMLButtonElement
        expect(ele).toBeInTheDocument() // 是不是已经在页面上了
        expect(ele.tagName).toEqual('BUTTON') // TagName
        expect(ele.disabled).toBeFalsy() // 可点击
        expect(ele).toHaveClass('guns-button guns-button--default') // 是不是有这个class
        fireEvent.click(ele)
        expect(defaultProps.onClick).toHaveBeenCalled() // 是不是被点击了
    })
    it('should render the correct component based on different props', () => {
        const testProps: ButtonProps = {
            btnType: ButtonType.Primary,
            size: ButtonSize.Large,
            className: 'test-class',
        }
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const ele = wrapper.getByText('Nice')
        expect(ele).toBeInTheDocument() // 是不是已经在页面上了
        expect(ele).toHaveClass(
            'guns-button guns-button--primary test-class guns-button--lg',
        ) // 是不是有class
    })
    it('should render a link when btnType equals link and href is provided', () => {
        const testUrl = 'http://testurl'
        const wrapper = render(
            <Button btnType={ButtonType.Link} href={testUrl}>
                Link
            </Button>,
        )
        const ele = wrapper.getByText('Link')
        expect(ele).toBeInTheDocument() // 是不是已经在页面上了
        expect(ele).toHaveClass('guns-button guns-button--link') // 是不是有class
        expect(ele.tagName).toEqual('A') // TagName
        expect(ele).toHaveAttribute('href', testUrl) // 是不是有href属性, 并且值是testUrl
    })
    it('should render disabled button when disabled set to true', () => {
        const testProps: ButtonProps = {
            onClick: vi.fn(),
            disabled: true,
        }
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const ele = wrapper.getByText('Nice') as HTMLButtonElement
        expect(ele).toBeInTheDocument() // 是不是已经在页面上了
        expect(ele.disabled).toBeTruthy() // 是不是不可点击
        fireEvent.click(ele)
        expect(testProps.onClick).toHaveBeenCalledTimes(0) // 是不是被点击了
    })
})
