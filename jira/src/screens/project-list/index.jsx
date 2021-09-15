import {List} from "./list";
import {SearchPanel} from "./search-panel";
import React, { useState, useEffect } from "react";
import * as qs from 'qs';
import { cleanObject } from "utils"; //这个方法用于清理对象的空值，为了防止

const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
export const ProjectListScreen=()=>{
    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {// 获取list的
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {//待填充URL
            if (response.ok) {
                setList(await response.json()) 
            }
        })
    }, [param]);
    useEffect(() => {// 获取users
        fetch(`${apiURL}/users`).then(async response => {//待填充URL
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])
    return (
        <>
        <SearchPanel param={param} users={users} setparam={setparam} />
        <List list={list} users={users} />
        </>
    )
}