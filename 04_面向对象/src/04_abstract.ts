/**
 * 有些类天生就是当作其他类的父类，不希望其创建实例
 * 此时可以使用抽象类
 * 以 abstract 开头的是抽象类
 */

abstract class Animals{
  name:string
  constructor(theName:string){
    this.name = theName
  }
  /**
   * 抽象类 可以定义抽象方法
   * 抽象方法使用 abstract 开头 没有方法体
   * 抽象方法只能定义在抽象列中，子类必须对抽方法进行重写
   */
  abstract sayHello():void
}

class Dog extends Animals{
  constructor(name:string){
    super(name)
  }
  // 对抽象方法重写
  sayHello(){
    console.log('汪汪汪...');
  }
}