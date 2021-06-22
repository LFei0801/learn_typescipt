/**
 * Typescript 是静态类型语言
 * 需要指定数据类型
 */

let a:number = 3
let b:string = "hello"
let flag:boolean = true
let arr:number[] = [1,2,3]


function sum(a:number,b:number):number{
  return a+b
}

const result = sum(1,2)
console.log(result); //3
