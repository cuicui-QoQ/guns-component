import React from 'react'
import Form from '../src/components/Form/form.tsx'
import FormItem from '../src/components/Form/formItem'
import Input from '../src/components/Input/input'
function FormExample() {
    return (
        <Form
            initialValues={{
                username: 'name',
                password: 'pwd',
                agreement: true,
            }}
        >
            <FormItem
                label="用户名"
                name="username"
                rules={[{ type: 'email', required: true }]}
            >
                <Input placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" name="password">
                <Input placeholder="请输入密码"></Input>
            </FormItem>
            <div>
                <FormItem
                    label="同意"
                    name="agreement"
                    valuePropName="checked"
                    getValueFromEvent={e => e.target.checked}
                >
                    <input type="checkbox" placeholder="请输入密码"></input>
                </FormItem>
                <span>请勾选用户输入同意</span>
            </div>
        </Form>
    )
}

export default FormExample
