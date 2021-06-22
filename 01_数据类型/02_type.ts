/**
 * Object类型
 * 
 * {} 用来指定对象中可以包含哪些属性
 * 语法：
 *  {属性名：属性值，属性名：属性值，...}
 *  在属性名后边加一个？ 表示属性是可选的
 *  [propName:string]:any 表示任意数量任意类型的属性
 */

let obj:{name:string,age?:number}
obj = {name:"孙悟空",age:18}
/*obj = {age:18} 
* 类型 "{ age: number; }" 中缺少属性 "name"，
* 但类型 "{ name: string; age?: number; }" 中需要该属性
*/

//obj = {name:"123",gender:"male"} // 对象文字可以只指定已知属性，并且“gender”不在类型

let obj2:{name:string,[propName:string]:any}
obj2 = {name:"123",gender:"male"}


/**
 *  设置函数结构的类型声明
 *  语法
 *      变量名：(形参：类型，形参：类型...)=> 返回值类型
 */

let fn:(num1: number,num2:number)=>number

//不能将类型“(a: any, b: any, c: any) => any”
//分配给类型“(num1: number, num2: number) => number”。ts(2322)

// fn = function(a,b,c){
//   return a+b
// }


/**
 * 类型数组
 * 语法：
 *    1.变量：类型[]
 *    2.变量: Array<类型>
 */

let arr1:Array<number>
arr1.push(1,2,3)
//arr1.push('hello') 类型“string”的参数不能赋给类型“number”的参数

/**
 * 元组：固定长度的数组
 * 语法：变量：[类型，类型]
 */
let tuple1:[string,string]
//tuple1 = ["123","123","123"] //源具有 3 个元素，但目标仅允许 2 个

/**
 * 枚举
 * 语法
 *    enum 变量名{
 *        变量1
 *        变量2
 *    }
 */

enum Gender{
  male = 0,
  female = 1,
}

let i:{name:string,gender:Gender} = {name:"Jack",gender:Gender.male}
console.log(i.gender === Gender.male); //true
