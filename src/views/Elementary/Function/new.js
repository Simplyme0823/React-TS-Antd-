//new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。



/**
 * 一个继承自 Foo.prototype 的新对象被创建。
 * 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。
 * new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
 * 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，
 * 则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
 */

function _new() { 
    // 4.1、我们处理参数
    // 检验第一个参数是不是函数。不是函数返回提示信息
    if (Object.prototype.toString.call(arguments[ 0 ]) !== "[object Function]") {
        throw "The first parameter must be a function.";
    }
    
    // 4.2、创建一个空的简单JavaScript对象（即{}）；
    
    var obj = {};
    
    // 4.3、链接该对象（即设置该对象的构造函数）到另一个对象(我认为说的是目标函数对象，绑定原型) ；
    //这样才可以使用原型链上的方法
    obj.__proto__ = arguments[ 0 ].prototype;
    
    // 4.4、将步骤1新创建的对象作为this的上下文（大概是切换 this的意思，我们可以使用 apply 进行参数传递）；
    //下面例子中 new Animal时 构造函数的this为 Animal{} ,这是因为已经将构造函数绑定到了新的空对象上了，并且对象是Animal类型的 才显示Animal{} 
    // 然而， 直接调用Animal() this为global
    var res = arguments[ 0 ].apply(obj, Array.prototype.slice.call(arguments).slice(1));
    
    // 4.5、如果该函数没有返回对象，则返回this（大概意思是说目标函数不存在返回值时，返回新对象，否则返回目标函数的返回值）。
    // 经过测试，使用 new 操作符时，
    // 目标函数返回值是 Object 就返回目标函数的返回值，
    // 否则就返回新对象
    return ( res instanceof Object ) ? res : obj;
}





//Animal是一个构造函数，需要调用这个函数
function Animal(name, age) {
    console.log(this)
    console.log("--------")
    console.log(new.target)
    console.log(this instanceof Animal)
    this.name = name
    this.age = age
    //return {hehe:"animal"}
}

Animal("test","test")//window

const dog = new Animal("dog", 2)

console.log(dog)

console.log(Animal instanceof Animal)//false
console.log(dog instanceof Animal)//true


function parent(name){
    this.name = name
    console.log(this)
}
const child = new parent('hehe') //parent{name:'hehe'}
