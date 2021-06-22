"use strict";
/**
 * 使用class 关键字来定义一个类
 */
class Person {
    constructor() {
        // 定义实例属性
        this.name = "孙悟空";
        this.age = 20;
        // readonly:只读属性
        this.gender = "male";
    }
    // 方法
    sayHello() {
        console.log("hello world");
    }
    // 如果方法以static开头就是静态方法，可以直接通过类调用
    static sayHello() {
        console.log("hello world");
    }
}
// 定义静态属性，直接被类调用
Person.age = 22;
const person = new Person();
console.log(person.age, person.name);
console.log(Person.age);
