import { render } from '@testing-library/react'
import Button from './button'

test('renders learn react link', () => {
    const wrapper = render(<Button>Nice</Button>)
    const ele = wrapper.queryByText('Nice')
    expect(ele).toBeTruthy()
})

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)
    expect(1 + 2).not.toBe(4)
})

test('test to be true or false', () => {
    expect(true).toBeTruthy()
    expect(false).toBeFalsy()
})
