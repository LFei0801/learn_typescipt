/**
 * 接口就是定义一个规范
 * 接口可以用来定义一个类结构
 * 用来顶一个类中应该包含哪些属性和方法
 * 同时接口可以被当成类型声明去使用
 */


// 接口中的方法和属性都不能有实际的值
interface myInterface{
  name:string
  age:number
  sayHello():void
  move(distance:number):void
}

/**
 * 定义类时，可以使得类去实现一个接口
 * 使用 implements关键字 来表明 实现某个接口
 */

class Myclass implements myInterface{
  name:string
  age:number
  constructor(theName:string,theAge:number){
    this.name = theName
    this.age = theAge
  }
  sayHello(){
    console.log(`哈哈哈...`);
  }
  move(distance:number){
    console.log(`${this.name} move ${distance}m`);
  }
}