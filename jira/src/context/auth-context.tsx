import React, { ReactNode, useState } from "react";
import { User } from "screens/project-list/search-panel";
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
export const AuthProvide = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
    const logout = () => auth.logout();
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth必须在AuthProvide中使用！！');
    }
    return context;
}