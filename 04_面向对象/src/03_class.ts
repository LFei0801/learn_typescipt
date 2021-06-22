// 继承
class Animal{
  name:string
  constructor(theName:string){
    this.name = theName
  }
  move(distanceInmeters:number = 0){
    console.log(`${this.name} moved ${distanceInmeters}m`);
  }
}

class Snake extends Animal{
  
  move(distanceInmeters = 5){
    console.log(`slithering...`);
    // super就是当前类的父类
    super.move(distanceInmeters)
  }
}

class Hourse extends Animal{
  age:number
  constructor(name:string,age:number){ 
    // 如果在子类中写了构造函数，在子类构造函数中必须调用父类的构造函数
    // 使用super调用父类构造函数
    super(name)
    this.age = age
  }
  move(distanceInmeters:number = 5){
    super.move(distanceInmeters)
  }
}

let sam = new Snake('sammmy the python')
let tom = new Hourse('Tom Hourse',20)

sam.move()
tom.move()