/** */
function ensure(fn, delay) {
    let timer = setTimeout(() => {
        clearTimeout(timer)
        throw new Error('未运行')
    }, delay)
    return function () {
        if (timer) {
            timer = null
            fn.apply(this, [].slice.call(arguments))
        }
    }
}

function tizao(fn) {
    const orign = fn
    let timer = setTimeout(() => {
        timer = null
        if (fn) fn()
    }, 0)
    fn = null
    return function () {
        if (timer) {
            fn = orign.bind.apply(orign, [this].concat([].slice.call(arguments)))
        } else {
            //没有提前运行
            clearTimeout(timer)
            fn.apply(this, [].slice.call(arguments))
        }
    }
}