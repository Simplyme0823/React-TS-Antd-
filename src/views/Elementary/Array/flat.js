const listsd = [1, [2, 3, [4, 5, 6]]]

/**
 * 原型链上的函数不能用箭头函数
 * 
 * 本质上：递归
 * num 层数 默认为一层
 */

Array.prototype.myFlat = function (num = 1) {
    let arr = []
    if (!Number(num) || Number(num) < 0) {
        return this
    }
    if (!Array.isArray(this)) return

    this.forEach(item => {
        if (!Array.isArray(item)) {
            arr.push(item)
        } else {
            arr = arr.concat(item.myFlat(--num))
        }
    })
    return arr
}

Array.prototype.flatAll = function () {
    let arr = []
    if (!Array.isArray(this)) return

    this.forEach(item => {
        if(!Array.isArray(item)){
            arr.push(item)
        }else{
            arr = arr.concat(item.flatAll())
        }
    })
   return arr 
}

const result = listsd.flatAll()
console.log(result)

