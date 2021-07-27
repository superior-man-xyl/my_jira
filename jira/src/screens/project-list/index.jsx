import {List} from "./list";
import {SearchPanel} from "./search-panel";
import React, { useState, useEffect } from "react";
import * as qs from 'qs';
import { cleanObject } from "utils";

const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen=()=>{
    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useEffect([]);

    useEffect(() => {
        fetch(`${apiURL}/projects${qs.stringify(cleanObject(param))}`).then(async response => {//待填充URL
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param]);
    useEffect(() => {
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