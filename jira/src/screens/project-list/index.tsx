import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useState, useEffect } from "react";
// import * as qs from 'qs';//qs是一个url参数转化（parse和stringify）的js库。 
import { cleanObject, useMount, useDebounce } from "utils"; //这个方法用于清理对象的空值，为了防止异常
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

// const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
export const ProjectListScreen = () => {
    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const debouncedParam = useDebounce(param, 300);//对这个param做一个节流
    // 使用我们关于fetch封装使用的自定义hooks
    const client = useHttp();

    useEffect(() => {// 获取list的
        // 直接使用fetch
        // fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {//待填充URL
        //     if (response.ok) {
        //         setList(await response.json())
        //     }
        // })
        // 使用我们封装过后，加入了携带token的自定义hooks
        client('projects', { data: cleanObject(debouncedParam) }).then(setList);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam]);
    // useEffect(() => {// 获取users
    //     fetch(`${apiURL}/users`).then(async response => {//待填充URL
    //         if (response.ok) {
    //             setUsers(await response.json())
    //         }
    //     })
    // }, [])
    // 使用自定义的useMount，代表能页面刚加载执行一个回调,这样就不用使用useEffect后带个[]
    useMount(() => {// 获取users
        client('users').then(setUsers);//第二个参数有默认值，所以不用传
        // client这个使用自定义hooks得到的方法代替了下面的代码
        // fetch(`${apiURL}/users`).then(async response => {//待填充URL
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} users={users} setparam={setparam} />
            <List list={list} users={users} />
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`