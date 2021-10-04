import React, { FormEvent } from "react";
import { useAuth } from '../context/auth-context'

// const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
export const RegisterScreen = () => {
    const { register, user } = useAuth();//使用了自定义hooks,使用useAuth（基于context），我们可以在全局的任何地方随意使用user数据，以及login，register，logout三个方法
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {// 来自于 interface FormEvent<T = Element> extends SyntheticEvent<T> {}
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;//这个 as HTMLInputElement 表示我们默认其是该类型
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        register({ username, password });
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名：</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码：</label>
            <input type="password" id={'username'} />
        </div>
        <button type="submit">注册</button>
    </form>
}