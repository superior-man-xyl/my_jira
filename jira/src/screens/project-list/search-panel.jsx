import React from "react"

export const SearchPanel = ({param,setparam,users}) => { // 
    return <from>
        <div>
            <input type='text' value={param.name} onChange={(evt) => setparam({
                ...param,
                name: evt.target.value,
            })} />
            <select value={param.personId} onChange={(evt) => setparam({
                ...param,
                personId: evt.target.value
            })} >
                {users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
            </select>
        </div>
    </from>
}