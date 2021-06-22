/**
 * 联合类型 使用|来连接多个类型 智能是这两个值中其中一个
 *  */ 
let gender: "male"|"female" = "male"

gender = "female"

let str:boolean|string
str = true
str = "hello"
//  str = 12 不能将类型“12”分配给类型“string | boolean”


/**
 * any 任意类型
 * 不建议使用
 * 
 * any类型的值可以赋值给任意类型的变量
 */

let anyVaribe:any = 1
// anyVaribe = "hello"
// anyVaribe = true

let s:string = "world"
s = anyVaribe
console.log(s); //1 破坏了s的原有类型

/**
 * unknown 未知类型，实际上就是一个类型安全的any
 * 不能直接将类型“unknown”赋值给其他类型的变量
 * 
 */
let un:unknown = 10
let s1 = "123"
//s1 = un //不能将类型“unknown”分配给类型“string”
// 要想将unknown类型的变量赋值给其他类型的变量需要先进行类型检查
if(typeof un === "string"){
  s1 = un
}

/**
 * 类型断言,可以用来告诉解析器变量的实际类型
 * 语法：
 *  变量 as 类型
 *  <类型>变量
 */

s1 = un as string
s1 = <string>un

/**
 * void 表示返回值为空，可以为undefind和null
 * never 表示返回值为空，不可以为undefind和null
 */


