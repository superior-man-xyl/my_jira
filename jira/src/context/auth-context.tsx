import React, { ReactNode, useState } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
import * as auth from '../auth-provider';

const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => void,
} | undefined>(undefined);//使用泛型

AuthContext.displayName = 'AuthContext';

interface AuthForm {
    username: string,
    password: string,
}
//bootstrap 启动，初始化
const bootstrapUser = async () => {//初始化下user，防止刷新后为空，
    // 页面判断是否出现登陆页面是通过判断user是否为空，所以为了防止页面刷新后回到登陆页面，对其做个初始化
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', { token });
        user = data.user;
    }
    return user;
}

export const AuthProvide = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
    const logout = () => auth.logout();

    useMount(() => {//页面加载时调用，保证user值一直存在
        bootstrapUser().then(setUser)
        //其实存在一个问题，因为获取user的过程是异步的，因为要有请求，所以user的数据会在初始化后才获得，所以刷新后会临时跳转到登陆页面
    })

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth必须在AuthProvide中使用！！');
    }
    return context;
}