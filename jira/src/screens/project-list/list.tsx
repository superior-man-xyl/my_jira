import React from "react"
import { User } from "./search-panel"

interface Project {
    id: number,
    name: string,
    personId: number,
    organaization: string,
    pin: boolean,
}
interface ListProps {
    list: Project[],
    users: User[],
}
export const List = ({ users, list }: ListProps) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map((item) =>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{(users.find((user) => user.id === item.personId))?.name || '未知'}</td>
                        {/* 这个问号的意思就是没有符合的值时为undefined，而undefined.name会报错，所以用个问号 */}
                    </tr>
                )
            }
        </tbody>
    </table>
}