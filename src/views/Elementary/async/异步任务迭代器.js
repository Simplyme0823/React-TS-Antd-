function run(generator) {
    //第一步启动生成器 得到一个task(迭代器)
    const task = generator()
    //第一次启动迭代器
    let result = task.next()
    console.log(result)
    //如果迭代器没有停，就继续执行
    function step() {
        if (!result.done) {
            //根据迭代器的结果执行
            if (typeof result.value === 'function') {
                //传入的是回调函数，node风格是error-first
                //函数科里化
                result.value(function (err, data) {
                    if (err) {
                        //这里处理回调函数的错误
                        //停止任务
                        result = task.throw(err)
                        return
                    } else {
                        result = task.next(data)
                        console.log(result)
                        step()
                    }
                })
            } else {
                result = task.next(result.value)
                step()
            }
        }
    }
    step()
}

const fs = require('fs')
function read(filename) {
    return function (callback) {
        fs.readFile(filename, callback)
    }

}


/*
run(function* () {
    //第一次next 返回一个函数 result.value为函数
    let content = (yield read("C:/Users/admin/Desktop/1.txt")) + 1
    //task.next(data) 是在这里将content改为next(data)中的data  next是改变上一次yield的返回值  
    //每次运行只运行 到(yield ) 
    console.log(content) //content = 11 (string)
    //第二次next 返回一个函数 result.value为函数
    let content2 = yield read("C:/Users/admin/Desktop/2.txt")
    console.log(content2)
    //第三次next 为true 停止运行
})
*/

/**
 * 利用promise改进版
 */
function runPromise(generator) {
    let task = generator()
    let result = task.next()
    function step() {
        if (result.done) return
        //result.value 为promise 否则 被转化为promise
            let p = Promise.resolve(result.value)
            p.then((value) => {
                result = task.next(value)
                step()
            }).catch(err => {
                console.log(err)
                return 
            })
    }
    step()
}

function readNew(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

runPromise(function* () {
    //第一次next 返回一个函数 result.value为函数
    let content = (yield readNew("C:/Users/admin/Desktop/1.txt")) + 1
    //task.next(data) 是在这里将content改为next(data)中的data  next是改变上一次yield的返回值  
    //每次运行只运行 到(yield ) 
    console.log(content) //content = 11 (string)
    //第二次next 返回一个函数 result.value为函数
    let content2 = yield readNew("C:/Users/admin/Desktop/2.txt")
    console.log(content2)
    //第三次next 为true 停止运行
})