/**
 * 属性默认时public的 属性可以被任意修改
 * 
 * private 私有属性 只能在内部访问
 * 通过在内部添加方法使得私有属性可以被外部访问
 * 
 * protected 只能在当前类和当前类的子类中访问
 */

class People{
  // name:string
  // private _age:number


  // constructor(name:string,age:number){
  //   this.name = name
  //   this._age = age
  // }

  // 可以直接将属性定义在构造函数中
  constructor(public name:string,private _age:number){}

  // // getter方法 ，获取私有属性
  // getAge(){
  //   return this.age
  // }
  // // setter方法， 设置私有属性
  // setAge(age:number){
  //   if(age > 0){
  //     this.age = age
  //   }
  // }

  get age(){
    console.log('get _age 执行了');
    return this._age 
  }
  set age(age:number){
    if(age>0){
      this._age = age
    }
  }
}

const p = new People('猪八戒',1000)
console.log(p.age); //get _age 执行了 1000
p.age = 200 //get _age 执行了
console.log(p.age); //200


// // 属性被任意修改导致数据不安全
// p.setAge(-3) //年龄不能小于0
// console.log(p); //People { name: '猪八戒', age: 1000 }
// p.setAge(2000)
// console.log(p); //People { name: '猪八戒', age: 2000 }        

