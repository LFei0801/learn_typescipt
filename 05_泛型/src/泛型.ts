/**
 * 在定义函数或类时，遇到类型不明确时可以使用泛型
 */

function fn<T>(a:T):T{
  return a
}

function fn1<T,K>(a:T,b:K):T{
  console.log(b);
  return a
}

interface inter{
  length:number
}

// T 必须满足interface接口
function fn3<T extends inter>(a:T):number{
  return a.length
}

class Myclass<T>{
  name:T
  constructor(name:T){
    this.name = name
  }
}

// 不指定泛型，TS可以自动对类型进行推断
const res1 = fn(18)
const a = {length:100}
const res4 = fn3(a)
//const res5 = fn3(111) //类型“number”的参数不能赋给类型“inter”的参数

// 指定泛型
const res2 = fn<string>("hello")
const res3 = fn1<number,string>(123,"Hello")


