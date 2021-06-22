"use strict";
/**
 * 有些类天生就是当作其他类的父类，不希望其创建实例
 * 此时可以使用抽象类
 * 以 abstract 开头的是抽象类
 */
class Animals {
    constructor(theName) {
        this.name = theName;
    }
}
class Dog extends Animals {
    constructor(name) {
        super(name);
    }
    // 对抽象方法重写
    sayHello() {
        console.log('汪汪汪...');
    }
}
