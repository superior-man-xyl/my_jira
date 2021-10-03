import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
    //登陆后，还要有登出
    const { logout } = useAuth();//使用这个自定义hooks，全局内任意使用其中的方法
    return <div>
        <button onClick={logout}>退出登陆</button>
        <ProjectListScreen />
    </div>
}