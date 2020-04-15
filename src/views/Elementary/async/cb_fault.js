/**
 * 1. 信任问题，交出了【回调】函数的控制权
 * 2. 回调是非线性，非顺序的，代码理解困难
 */

//1. 如何确定回调函数已经启动

function timeoutify(fn, delay) {
    let intv = setTimeout(() => {
        intv = null
        fn(new Error("Timeout!"))
    }, delay);

    return function () {
        if (intv) {
            clearTimeout(intv)
            fn.apply(this, arguments)
        }
    }
}

function foo(err, data) {
    console.log(arguments, "foo")
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
}

function test(foo) {
    console.log(arguments)
    return function () {
        //对于js来说 形参与真实传入的参数并无关系， 匿名函数传了几个参数
        //arguments的个数就有几个
        console.log(arguments, "匿名")
        foo.apply(this, arguments)//arguments类数组 并非数组
    }
}

test(foo)("err", "data")


function valid() {
    console.log(arguments)
    return
}

valid(1, 2, 3)//[Arguments] { '0': 1, '1': 2, '2': 3 }


//2.如何确定回调函数不会提前执行？？
//这取决于调用回调函数的工具何时执行
//保险起见 永远异步调用回调函数，即使是下一轮的event loop
//让所有的回调都是异步执行

/**
 * 举例:sync : a = 0 ; async: a =1
 */

function result(data) {
    console.log(a)
}
var a = 0
//ajax("/getdata.php", result)
a++

function asyncify(fn) {
    var orig_fn = fn
    var intv = setTimeout(() => {
        intv = null
        //此处没有bind是在下方做了处理
        if (fn) fn()
    }, 0);
    fn = null
    return function () {
        if (intv) {
            //提前触发,没有到下一轮event loop
            //bind.apply() 本质上是 bind() 
            //内部是 orig_fn.bind(this, arguments[0], arguments[1]) arguments为调用回调函数的时候输入的参数
            fn = orig_fn.bind.apply(orig_fn, [this].concat([].slice.call(arguments)))
        } else {
            //已经是下一轮 event loop
            orig_fn.apply(this, arguments)
        }
    }
}

function wrapped(a) {
    console.log(a)
}
asyncify(wrapped)


/**
 * 丑陋...
 */

function add(getX, getY, cb) {
    var x, y
    //ajax1
    getX(function (xVal) {
        x = xVal
        if (y != undefined) {
            cb(x, y)
        }
    })
    //ajax2
    getY(function (yVal) {
        y = yVal
        if (x != undefined) {
            cb(x, y)
        }
    })
}

add(ajax1(), ajax2(), function sum(number1, number2) {
    console.log(number1 + number2)
})