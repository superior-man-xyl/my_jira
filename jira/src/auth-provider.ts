// 在真实环境下，如果使用firebase这种第三方auth服务的话，本文件就不需要开发者开发

import { User } from "screens/project-list/search-panel"

const localStoragekey = '__auth_provider_token__'

const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development

export const getToken = () => window.localStorage.getItem(localStoragekey)

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStoragekey, user.token || '')
    return user
}

export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) => {//待填充URL
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(data);
        }
    });
}

export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response: Response) => {//待填充URL
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(data);
        }
    });
}

export const logout = async () => window.localStorage.removeItem(localStoragekey)//使用async，之后就会返回一个promise对象，就可以使用then，做个清除user的操作