"use strict";
class Greeter {
    // 在类创建时调用
    constructor(message) {
        this.greeting = message;
    }
    // this指向实例对象
    greet() {
        return "Hello" + this.greeting;
    }
}
// 构造类的实例
const greeter = new Greeter("world");
greeter.greet();
