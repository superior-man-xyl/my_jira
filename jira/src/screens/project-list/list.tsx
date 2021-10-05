import React from "react"
import { User } from "./search-panel"
import { Table } from "antd"

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
    return <Table pagination={false} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)//这个locareCompar可以排序中文字符
    }, {
        title: '负责人',
        render(value, item) {
            return <span>
                {(users.find((user) => user.id === item.personId))?.name || '未知'}
            </span>
        }
    }]} dataSource={list} />
    // <table>
    //     <thead>
    //         <tr>
    //             <th>名称</th>
    //             <th>负责人</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             list.map((item) =>
    //                 <tr key={item.id}>
    //                     <td>{item.name}</td>
    //                     <td>{(users.find((user) => user.id === item.personId))?.name || '未知'}</td>
    //                     {/* 这个问号的意思就是没有符合的值时为undefined，而undefined.name会报错，所以用个问号 */}
    //                 </tr>
    //             )
    //         }
    //     </tbody>
    // </table>
}