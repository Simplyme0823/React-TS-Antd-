//Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
//Array.from(arrayLike[, mapFn[, thisArg]])
//thisArg 可选参数，执行回调函数 mapFn 时 this 对象。
//mapFn 如果指定了该参数，新数组中的每个元素会执行该回调函数。

//Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 
//除非创建的不是可用的中间数组。

function combine(){ 
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));                     // [1, 2, 3]