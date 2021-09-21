import React, { FormEvent } from "react";

const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
export const LoginScreen = () => {
    const login = (param: { username: string, password: string }) => {
        fetch(`${apiURL}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then(async response => {//待填充URL
            if (response.ok) {

            }
        })
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {// 来自于 interface FormEvent<T = Element> extends SyntheticEvent<T> {}
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;//这个 as HTMLInputElement 表示我们默认其是该类型
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
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
        <button type="submit">登陆</button>
    </form>
}