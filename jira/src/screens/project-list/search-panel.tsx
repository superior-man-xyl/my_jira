import React from "react"

export interface User {
    id: number,
    name: string,
    token: string,
}
interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string,
    },
    setparam: (param: SearchPanelProps['param']) => void,
}
export const SearchPanel = ({ param, setparam, users }: SearchPanelProps) => { // 
    return <form>
        <div>
            部门：
            <input type='text' value={param.name} onChange={(evt) => setparam({
                ...param,
                name: evt.target.value,
            })} />
            负责人：
            <select value={param.personId} onChange={(evt) => setparam({
                ...param,
                personId: evt.target.value
            })} >
                {users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)}
            </select>
        </div>
    </form>
}