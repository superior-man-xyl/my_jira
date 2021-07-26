import { useEffect, useState } from "react"

export default SearchPanel = () => {
    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([]);
    const [list, setList] = useEffect([]);

    useEffect(() => {
        fetch('').then(async response => {//待填充URL
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])
    return <from>
        <div>
            <input type='text' value={param.name} onChange={(evt) => setparam({
                ...param,
                name: evt.target.value
            })} />
            <select value={param.personId} onChange={(evt) => setparam({
                ...param,
                personId: evt.target.value
            })} >
                {users.map(user => <option value={user}>{user.name}</option>)}
            </select>
        </div>
    </from>
}