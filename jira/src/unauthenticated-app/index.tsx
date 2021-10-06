import { useState } from "react"
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Card, Button, Divider } from 'antd';
import styled from '@emotion/styled';
import logo from 'assets/logo.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg'

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false); //默认为登陆界面,即非登陆页面
    return <Container
    //  style={{display:"flex", justifyContent:"center"}} 使用css in js的组件代替了
    >
        <Header />
        <Background />
        <ShadowCard>
            <Title>
                {isRegister ? '请注册' : '请登陆'}
            </Title>
            {
                isRegister ? <RegisterScreen /> : <LoginScreen />
            }
            <Divider />
            <Button type={"link"} onClick={() => { setIsRegister(!isRegister) }}>{isRegister ? '已经有账号了？直接登陆' : '没有账号？注册新账号'}</Button>
        </ShadowCard>
    </Container>
}
const Container = styled.div`//接着就是把Continer当作div组件使用，不同的是他拥有样式
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
`
const ShadowCard = styled(Card)`//注意非html元素标签的写法使用括号包裹
width: 40rem;
min-height: 46rem;
padding: 3.2rem 4rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
`
const Header = styled.header`
background: url(${logo}) no-repeat center;
padding: 5rem 0 ;
background-size: 8rem;
width: 100%;
`
const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: left bottom, right bottom;
background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
calc(((100vw - 40rem) / 2) - 3.2rem), cover;
background-image: url(${left}), url(${right});
`
const Title = styled.h2`
margin-bottom: 2.4rem;
color: rgba(94,108,132);
`

export const Longbutton = styled(Button)`
width: 100%;
`