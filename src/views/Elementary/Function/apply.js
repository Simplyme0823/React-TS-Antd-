//当call或apply的第一个参数为null || undefined时 this指向window ||global
Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window//很对浏览器 node中为global
    
    context.fn = this
    let result
    //此处传入第二个参数
    if (arguments[1]) {
        //非数组 抛出错误
        if (!Array.isArray(arguments[1])) {
            throw new TypeError('Error')
        }
        //解构写法 传参
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

const test = Math.max.apply(Math, [1, 2, 3]);
console.log(test)

const valid = (x, y, z) => x + y + z
const added = [1, 2, 3]
const result = valid(...added)
console.log(result)



