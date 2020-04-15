Array.prototype.myForEach = function (func) {
    const len = this.length
    for (let i = 0; i < len; i++) {
        //this[i]为value, i为index
        func(this[i], i)
    }
}