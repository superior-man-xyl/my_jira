import React from "react"
import { Input, Select } from "antd"

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
            <Input type='text' value={param.name} onChange={(evt) => setparam({
                ...param,
                name: evt.target.value,
            })} />
            负责人：
            <Select value={param.personId} onChange={value => setparam({
                ...param,
                personId: value
            })} >
                {users.map(user => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)}
            </Select>
        </div>
    </form>
}