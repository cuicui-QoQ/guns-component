import Input, { InputSize } from '../src/components/Input/input'
function InputExample() {
    return (
        <>
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
