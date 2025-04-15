import Input, { InputSize } from '../src/components/Input/input'
import React, { useState } from 'react'
function InputExample() {
    const [value, setValue] = useState<string>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('handleChange', e.target.value)
        setValue(e.target.value)
    }

    return (
        <>
            <h3>当前输入框的值: {value}</h3>
            <Input
                onChange={handleChange}
                value={value}
                placeholder="受控组件"
                defaultValue={'13'}
            />
            <br />
            <br />
            <Input
                placeholder="非受控组件"
                onChange={handleChange}
                defaultValue={'13'}
            />
            <br />
            <br />
            <Input addonBefore="http://" />
            <br />
            <br />
            <Input addonAfter="MB" />
            <br />
            <br />
            <Input size={InputSize.Large} placeholder="大框" />
            <br />
            <br />
            <Input placeholder="标准框" />
            <br />
            <br />
            <Input size={InputSize.Small} placeholder="小框" />
            <br />
            <br />
            <Input
                size={InputSize.Large}
                prepand="prepand"
                append="append"
                placeholder="请输入"
            />
            <br />
            <br />
            <Input
                size={InputSize.Large}
                prepand="prepand"
                append="append"
                placeholder="请输入"
            />
            <br />
            <br />
            <Input
                size={InputSize.Large}
                prepand={<div style={{ height: '40px' }}>Hello</div>}
                append="append"
                placeholder="请输入"
            />
            <br />
            <br />
            <Input
                size={InputSize.Large}
                prepand="prepand"
                append="append"
                placeholder="请输入"
                disabled
            />
        </>
    )
}

export default InputExample
