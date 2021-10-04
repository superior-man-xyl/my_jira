import { useAuth } from 'context/auth-context';
import qs from 'qs';
import * as auth from '../auth-provider';

const apiURL = process.env.REACT_APP_API_URL; // 这里REACT_APP_API_URL有两个变量在.env 和 .env.development
interface Config extends RequestInit {// 因为fetch的第二个参数的类型定义不包含data和token，所以我们要自己定义一个
    token?: string,
    data?: object,

}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {//endpoint就是${apiURL}/projects?里的/rojects部分
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    // axios和fetch的表现不一样，返回状态不为2XX时，axios会抛出异常，而fwetch不会
    return window.fetch(`${apiURL}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {//有些后端系统会统一八请求成功给返回200，然后自己约定一个code来分辨状态，这里就不那样做了
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: '请重新登陆' });
            }
            const data = await response.json();
            if (response.ok) {//因为fetch请求得到状态码，就算是失败的状态码，fetch其也不会返回错误
                return data;
            } else {
                return Promise.reject(data)//手动抛出异常
            }
        })
}

export const useHttp = () => {//做一个可以自动携带JWT Token的方法来结合上面封装过后的fetch
    const { user } = useAuth();//这是之前做的自定义hooks，用于全局获取user和几个方法
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })//使用rest参数，以后传参数可以分开传，而且类型定义时可以按照[xxxx]
    // 这个Parameters是typescript里面的一种操作符
}