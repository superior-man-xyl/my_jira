import {List} from "./list";
import {SearchPanel} from "./search-panel";
import React, { useState, useEffect } from "react";
import * as qs from 'qs';//qs是一个url参数转化（parse和stringify）的js库。 
import { cleanObject, useMount } from "utils"; //这个方法用于清理对象的空值，为了防止

const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
export const ProjectListScreen=()=>{
    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const debouncedParam = useDebounce(param, 2000);//对这个param做一个节流

    useEffect(() => {// 获取list的
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {//待填充URL
            if (response.ok) {
                setList(await response.json()) 
            }
        })
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
        fetch(`${apiURL}/users`).then(async response => {//待填充URL
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })
    return (
        <>
        <SearchPanel param={param} users={users} setparam={setparam} />
        <List list={list} users={users} />
        </>
    )
}