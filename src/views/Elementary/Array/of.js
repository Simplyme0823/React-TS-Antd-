/**
 * Array.of() 方法创建一个具有可变数量参数的新数组[实例]，而不考虑参数的数量或类型。
 * 
 * Array.of() 和 Array 构造函数之间的区别在于处理整数参数：
 * Array.of(7) 创建一个具有单个元素 7 的数组，
 * 而 Array(7) 创建一个长度为7的空数组
 * （注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。
 */

if (!Array.of) {
    Array.of = function() {
      return Array.prototype.slice.call(arguments);
    };
  }