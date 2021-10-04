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
    // 这个Parameters是typescript里面的一种类型(准确是 utility Types 工具类型)，且<>里的typeof是typescript中的静态环境中运行的typeof，用于获得函数的参数的类型，接着交给Parameter读出来
    // 联合类型
    // let myNumber : string | number
    // let herNumber : string | number
    // 如何节省代码呢
    // 类型类型联名
    // NumberType = string | number //这种情况下interface无法代替类型联名
    // let hisNumber : NumberType = '6';
    // 很多情况下联合类型和interface可以互换使用，interface无法实现utility Types
    // utility Types 的用法：
    // 用泛型<>给他传入一个其他类型，然后utility types 对其进行某种操作
    // 其他工具类型
    // Pritial<T> 把T的所有属性变为可选。
    // Readonly<T> 变只读
    // Record<K,T> 生成一个接口，属性为K的所有属性，k的所有属性都有T的类型
    // Pick<T,K> 抽取T里的属性，属性来自K.
    // Omit<T,K>和Pick相反（去除属性k）
    // Parameters<T> T是Function，提取函数里返回值为tuple
    // Exclude<Type, ExcludedUnion>通过从Type可分配给的所有联合成员中排除来构造类型ExcludedUnion。
}