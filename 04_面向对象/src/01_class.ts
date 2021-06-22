/**
 * 使用class 关键字来定义一个类
 */

class Person{
  // 定义实例属性
  name:string = "孙悟空"
  age:number = 20
  // 定义静态属性，直接被类调用
  static age:number = 22
  // readonly:只读属性
  readonly gender:"male"|"famale" = "male"

  // 方法
  sayHello(){
    console.log("hello world");
  }
  // 如果方法以static开头就是静态方法，可以直接通过类调用
  static sayHello(){
    console.log("hello world");
  }
}

const person = new Person()
console.log(person.age,person.name);
console.log(Person.age);

