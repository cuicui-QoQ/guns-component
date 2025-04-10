/* eslint-disable no-undef */
// const { expect } = require("chai");
// npx jest jest.test.js --watch 使用这个命令来监控测试文件
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3)
    expect(1 + 2).not.toBe(4)
})

test('test to be true or false', () => {
    expect(true).toBeTruthy()
    expect(false).toBeFalsy()
})
