export const isFalsy = (value) => {
    return value === 0 ? false : !value;
}
//在一个函数里，传入一个对象本身是不好的，容易污染传入的对象
export const cleanObject = (object) => {
    //怎么做呢，对传入的对象做一个浅拷贝
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result;
}