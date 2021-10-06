import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
    //登陆后，还要有登出
    const { logout } = useAuth();//使用这个自定义hooks，全局内任意使用其中的方法
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <HeaderItem>Logo</HeaderItem>
                <HeaderItem>项目</HeaderItem>
                <HeaderItem>用户</HeaderItem>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>退出登陆</button>
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
/* display: flex;
flex-direction: row;
align-items: center; */
`;
const HeaderLeft = styled(Row)`//使用这个Row，定义的复用css组件
`;
const HeaderRight = styled.div``;
const Main = styled.main`
`;
