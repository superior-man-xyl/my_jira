import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'//将其作为一个react组件
import { Button, Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
    //登陆后，还要有登出
    const { user, logout } = useAuth();//使用这个自定义hooks，全局内任意使用其中的方法
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                <HeaderItem>项目</HeaderItem>
                <HeaderItem>用户</HeaderItem>
            </HeaderLeft>
            <HeaderRight>
                {/* <button onClick={logout}>退出登陆</button> */}
                <Dropdown overlay={
                <Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'} onClick={logout}>退出登陆</Button>
                    </Menu.Item>
                </Menu>
            }>
                <Button type={'link'} onClick={(e)=>e.preventDefault()}>Hi! {user?.name}</Button>
            </Dropdown>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen />
        </Main>
    </Container>
}
const HeaderItem = styled.h3`
margin-right: 3rem;
`
const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
height: 100vh;
`;
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index:1;
/* display: flex;
flex-direction: row;
align-items: center; 写在了Row里*/
`;
const HeaderLeft = styled(Row)`//使用这个Row，定义的复用css组件
`;
const HeaderRight = styled.div``;
const Main = styled.main`
`;
