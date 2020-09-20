/** @format */

class test {
  // property
  sayName = () => {
    console.log(this);
    console.log("name");
  };
  // method
  sayHi() {
    console.log(this);
    console.log("hi");
  }
}
const t = new test();

t.sayName();
t.sayHi();
