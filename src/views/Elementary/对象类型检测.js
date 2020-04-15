/**
 * 可以通过 toString() 来获取每个对象的类型。
 * 为了每个对象都能通过 Object.prototype.toString() 来检测，
 * 需要以 Function.prototype.call() 或者 
 * Function.prototype.apply() 的形式来调用，
 * 传递要检查的对象作为第一个参数，称为 thisArg。
 */


var toString = Object.prototype.toString;

const a =()=>{}
const b =[]
toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]
console.log(toString.call(a)) // [object Function]
console.log(toString.call(b)) // [object Array]


//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]