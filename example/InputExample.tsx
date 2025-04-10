import Input, { InputSize } from '../src/components/Input/input'
function InputExample() {
    return (
        <>
            <Input
                size={InputSize.Large}
                prepand="prepand"
                append="append"
                placeholder="请输入"
            />
        </>
    )
}

export default InputExample
