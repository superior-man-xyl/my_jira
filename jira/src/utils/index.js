import {
    useEffect,
    useState
} from "react";

export const isFalsy = (value) => {
    return value === 0 ? false : !value;
}
//在一个函数里，传入一个对象本身是不好的，容易污染传入的对象，因为怕后面的代码会更改到原对象
export const cleanObject = (object) => {
    //怎么做呢，对传入的对象做一个浅拷贝
    if (!object) {
        return {};
    }
    const result = {
        ...object
    };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result;
}

//做一个自定义hooks
// 功能是，在页面刚加载是执行一个回调函数
export const useMount = (callback) => {
    useEffect(() => {
        callback();
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // 没次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 下一个useEffect运行，就运行上一个useEffect返回的清理函数
        return () => clearTimeout(timeout); //做一个清理的任务
    }, [value, delay])
    return debouncedValue;
}