import {
    useEffect,
    useState
} from "react";

export const isFalsy = (value: unknown) => {// 有个bug，当{isChecked: false}这样的值也会被过滤掉，但这是有用的值
    return value === 0 ? false : !value;//使用下面的isVoid代替
}
export const isVoid = (value: unknown) => value === undefined || value === null || value === '';//这些情况被当作无意义
//在一个函数里，传入一个对象本身是不好的，容易污染传入的对象，因为怕后面的代码会更改到原对象
export const cleanObject = (object: { [key: string]: unknown }) => {//表示只要这样的键值对的对象，使用object就太广了，函数也会被归结于object类型
    //怎么做呢，对传入的对象做一个浅拷贝
    if (!object) {
        return {};
    }
    const result = {
        ...object
    };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result;
}

//做一个自定义hooks
// 功能是，在页面刚加载是执行一个回调函数
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => { // 使用<>泛型的写法，可以使传入值和返回值保持一致（即类型绑定到一起了），可以看看index.d.ts里useState的说明
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // 没次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 下一个useEffect运行，就运行上一个useEffect返回的清理函数
        return () => clearTimeout(timeout); //做一个清理的任务
    }, [value, delay])
    return debouncedValue;
}