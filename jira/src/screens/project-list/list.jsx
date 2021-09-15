import React from "react"

export const List = ({ users, list }) => {
    return <table>
        <tHead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </tHead>
        <tbody>
            {
                list.map((item) =>
                    <tr key={item.id}>
                        <th>{item.name}</th>
                        <th>{(users.find((user) => user.id === item.personId))?.name || '未知'}</th>
                        {/* 这个问号的意思就是没有符合的值时为undefined，而undefined.name会报错，所以用个问号 */}
                    </tr>
                )
            }
        </tbody>
    </table>
}