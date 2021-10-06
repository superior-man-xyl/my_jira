import React, { FormEvent } from "react";
import { useAuth } from '../context/auth-context'
import { Form, Input } from 'antd';
import { Longbutton } from "unauthenticated-app";

// const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
export const RegisterScreen = () => {
    const { register, user } = useAuth();//使用了自定义hooks,使用useAuth（基于context），我们可以在全局的任何地方随意使用user数据，以及login，register，logout三个方法
    const handleSubmit = (values: { username: string, password: string }) => {
        register(values);// antd的这个values的组成结构是由Form.Item的name属性来推断的
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
            {/* <label htmlFor="username">用户名：</label> */}
            <Input placeholder={'用户名'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            {/* <label htmlFor="password">密码：</label> */}
            <Input placeholder={'密码'} type="password" id={'username'} />
        </Form.Item>
        <Form.Item>
            <Longbutton type={"primary"} htmlType="submit">注册</Longbutton>
        </Form.Item>
    </Form>
}