Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    if (typeof context === "undefined" || context === null) {
        context = window
    }
    //context=context||window  和上面的代码一样

    //保存原始函数
    context.fn = this
    //第一个参数永远为新的运行环境，所以要截取
    //arguments转化为数组
    Array.from(arguments)
    const args = [].slice(arguments).slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

