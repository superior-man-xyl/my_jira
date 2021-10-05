import { useState } from "react"
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import {Card, Button} from 'antd'

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false); //默认为登陆界面,即非登陆页面
    return <div style={{display:"flex", justifyContent:"center"}}>
        <Card>
        {
            isRegister ? <RegisterScreen /> : <LoginScreen />
        }
        <Button onClick={() => { setIsRegister(!isRegister) }}>切换到{isRegister ? '登陆页' : '注册页'}</Button>
        </Card>
    </div>
}