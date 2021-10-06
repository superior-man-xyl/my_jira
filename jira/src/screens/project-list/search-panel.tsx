import React from "react"
import { Input, Select, Form } from "antd"

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
    return <Form layout={"inline"} style = {{marginBottom: '2rem'}}>
        <Form.Item>
            <Input placeholder={"部门名"} type='text' value={param.name} onChange={(evt) => setparam({
                ...param,
                name: evt.target.value,
            })} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => setparam({
                ...param,
                personId: value
            })} >
                {users.map(user => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)}
            </Select>
        </Form.Item>
    </Form>
}