//迭代器
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
            goNext = true;
        } else {
            goNext = false;
        }
    }
    return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
console.log(sortArr(arr));
/**
 * [
 * [ 1, 34 ],
 * [ 2, 3, 44, 234, 456 ],
 * [ 1, 4, 5, 6, 4567 ],
 * [ 1, 23, 34, 78 ]
 * ]
 */