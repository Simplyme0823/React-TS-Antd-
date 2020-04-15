Array.prototype.myFilter = function (func) {
    const arr = []
    const len = this.length
    for (let i = 0; i < len; i++) {
        if (func(this[i], i)) {
            arr.push(this[i])
        }
    }
    return arr
}