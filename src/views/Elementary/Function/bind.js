//本质上是返回了一个新的函数  currying
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    //保存一个使用bind方法的函数
    const _this = this
    //保存该函数的所有参数
    //第一个为context 所有不需要保存
    const args = [...arguments].slice(1)
    //返回一个函数
    return function F() {
        //因为返回一个函数，我们可以new F()需要判断能当做构造函数吗
        //this为new操作产生的实例， new的优先级高于强绑定
        if (this instanceof F) {
            return new _this(...args, ...arguments)//第一个args为bind的时候传入的参数 第二个arguments为new的时候传入的参数
        }
        //利用apply方法传入数组
        return _this.apply(context, args.concat(...arguments))
    }
}

Function.prototype.myApply = function () {
    if (arguments.length > 2 || !Array.isArray(arguments[1])) return

    let context = arguments[0] || window
    context.fn = this
    let result
    if (arguments[1].length > 0) {
        let args = arguments[1].slice(1)
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}


function parent() {
    return function F(){
        console.log(this)
        console.log(this instanceof F)
    }
}
console.log(parent)
let a = parent()
console.log(parent instanceof parent) //false
console.log(a instanceof parent )//false
const p = parent() //F{}
const child = new p() //true




function ex1(){

}


function ex2(){

}


ex1.prototype = ex2.prototype

console.log(ex2.prototype) //{}

ex1.prototype.value = 1
const obj = {ex1:'ex1'}
ex1.prototype = obj //这么写会有什么问题

console.log(ex2.prototype) //{ value: 1 }
console.log(ex1.prototype)