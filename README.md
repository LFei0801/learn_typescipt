# Typescript 学习笔记

## 一、类型系统

**Typescript 是 JS 的超集，给 JS 添加许多特效，其中最重要的是类型系统，将动态类型的 JS 变成了静态语言**

### 1. number、string、boolean

```Typescript
/**
 * 语法 变量：类型
 * */
let a:number = 1
let b:string = "123"
let c:boolean = true
```

### 2.array 类型

TS 中数组不再是任意类型数据都可以放在一个数组中了

```typescript
/**
 * 类型数组
 * 语法：
 *    1.变量：类型[]
 *    2.变量: Array<类型>
 */

let arr1: Array<number>;
arr1.push(1, 2, 3);
//arr1.push('hello') 类型“string”的参数不能赋给类型“number”的参数
```

### 3.联合类型

```Typescript
/**
 * 联合类型 使用|来连接多个类型 智能是这两个值中其中一个
 *  */
let gender: "male"|"female" = "male"
gender = "female"
let str:boolean|string
str = true
str = "hello"
//  str = 12 不能将类型“12”分配给类型“string | boolean”
```

### 4. any 类型

```Typescript
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
```

### 5. unknown 类型

```Typescript
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
```

### 类型断言

```typescript
/**
 * 类型断言,可以用来告诉解析器变量的实际类型
 * 语法：
 *  变量 as 类型
 *  <类型>变量
 */

s1 = un as string;
s1 = <string>un;
```

### 6. void 和 never 类型

```typescript
/**
 * void 表示返回值为空，可以为undefind和null
 * never 表示返回值为空，不可以为undefind和null
 */
```

### 7. object 类型

```typescript
/**
 * Object类型
 *
 * {} 用来指定对象中可以包含哪些属性
 * 语法：
 *  {属性名：属性值，属性名：属性值，...}
 *  在属性名后边加一个？ 表示属性是可选的
 *  [propName:string]:any 表示任意数量任意类型的属性
 */

let obj: { name: string; age?: number };
obj = { name: "孙悟空", age: 18 };
/*obj = {age:18}
 * 类型 "{ age: number; }" 中缺少属性 "name"，
 * 但类型 "{ name: string; age?: number; }" 中需要该属性
 */

//obj = {name:"123",gender:"male"} // 对象文字可以只指定已知属性，并且“gender”不在类型

let obj2: { name: string; [propName: string]: any };
obj2 = { name: "123", gender: "male" };
```

### 8.函数类型声明

```typescript
/**
 *  设置函数结构的类型声明
 *  语法
 *      变量名：(形参：类型，形参：类型...)=> 返回值类型
 */

let fn: (num1: number, num2: number) => number;

//不能将类型“(a: any, b: any, c: any) => any”
//分配给类型“(num1: number, num2: number) => number”。ts(2322)

// fn = function(a,b,c){
//   return a+b
// }
```

### 9. 元组类型

```typescript
/**
 * 元组：固定长度的数组
 * 语法：变量：[类型，类型]
 */
let tuple1: [string, string];
//tuple1 = ["123","123","123"] //源具有 3 个元素，但目标仅允许 2 个
```

### 10. 枚举类型

```typescript
/**
 * 枚举
 * 语法
 *    enum 变量名{
 *        变量1
 *        变量2
 *    }
 */

enum Gender {
  male = 0,
  female = 1,
}

let i: { name: string; gender: Gender } = { name: "Jack", gender: Gender.male };
console.log(i.gender === Gender.male); //true
```

## 二、编译选项

**Typescript 文件必须编译成 JS 文件才能执行，语法为：tsc 文件名，这样十分不方便**
**可以使用以下指令编译文件**

```
tsc    // 编译所有文件
tsc -w // 观察模式，ts文件有改动后就相应改动js文件
```

### 1. tsconfig.json

**新建 tsconfig.json 文件,tsconfig.json 是 ts 编译器的配置文件，ts 编译器可以根据此配置文件编译文件**

```json
{
  /*
  *tsconfig.json 是ts编译器的配置文件，ts编译器可以根据此配置文件编译文件
  * 
  * include 用来指定哪些文件需要被编译
            路径：**表示任意目录
                  * 表示任意文件
  * exclude 不需要被编译的文件目录
            默认值：["node_modules","bower_compoents","jspm_package"]
    compilerOptions: 编译的选项：
            target: 指定编译成js的版本
            module: 模块系统的规范
            outDir: 编译后文件放在何处
            outFile: 将代码合并为一个文件
            allowJs:是否对js代码进行编译
            checkJs: 是否检查js代码符合代码规范
            removeComments: 是否移除注释
            noEmit: 不生成编译后的文件
            noEmitOnError: 当有错误时不生成编译后的文件
            alwaysStrict: 用来设置编译后的文件是否开启严格模式
            noImplicitAny: 不允许隐式any类型
            noImplicitThis: 不允许不明确的this
            strictNullChecks: 不允许有隐式空值
            strict:true 开启所有严格模式
  */
  "include": ["./src/**/*"],
  "exclude": ["./src/hello/**/*"],
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "outDir": "./dist",
    "allowJs": true,
    "strict": true,
    "noEmitOnError": true,
    "alwaysStrict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}
```

### 2. webpack 打包 TS

首先下载依赖

```
npm i -d webpack webpack-cli typescript ts-loader html-webpack-plugin
```

创建 webpack.config.js 文件

```javascript
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件目录
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件
    filename: "bundle.js",
  },
  // 指定 webpack 打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: "ts-loader",
        // 要排除的文件
        exclude: /node_modules/,
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
```

创建 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "module": "ES2015",
    "target": "ES2015",
    "strict": true
  }
}
```

创建 src 文件夹，新建 index.ts 文件

在 package.json 文件新建命令

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

在终端输入命令使用 webpack 打包

```
npm run build
```

## 三、类

Typescript 和 Javascript ES6 创建类写法相似，但是还是有点区别

### 1. 基础写法

```Typescript
/**
 * 使用class 关键字来定义一个类
 */

class Greeter{
  // 先定义属性，再在构造函数中通过this绑定
  greeting:string
  // 在类创建时调用
  constructor(message:string){
    this.greeting = message
  }
  // this指向实例对象
  greet(){
    return "Hello" + this.greeting
  }
}

// 构造类的实例
const greeter = new Greeter("world")
greeter.greet()

```

### 2. 继承 extends

```typescript
// 继承
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInmeters: number = 0) {
    console.log(`${this.name} moved ${distanceInmeters}m`);
  }
}

class Snake extends Animal {
  move(distanceInmeters = 5) {
    console.log(`slithering...`);
    // super就是当前类的父类
    super.move(distanceInmeters);
  }
}

class Hourse extends Animal {
  age: number;
  constructor(name: string, age: number) {
    // 如果在子类中写了构造函数，在子类构造函数中必须调用父类的构造函数
    // 使用super调用父类构造函数
    super(name);
    this.age = age;
  }
  move(distanceInmeters: number = 5) {
    super.move(distanceInmeters);
  }
}

let sam = new Snake("sammmy the python");
let tom = new Hourse("Tom Hourse", 20);

sam.move();
tom.move();
```

### 3. 抽象类

```typescript
/**
 * 有些类天生就是当作其他类的父类，不希望其创建实例
 * 此时可以使用抽象类
 * 以 abstract 开头的是抽象类
 */

abstract class Animals {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  /**
   * 抽象类 可以定义抽象方法
   * 抽象方法使用 abstract 开头 没有方法体
   * 抽象方法只能定义在抽象列中，子类必须对抽方法进行重写
   */
  abstract sayHello(): void;
}

class Dog extends Animals {
  constructor(name: string) {
    super(name);
  }
  // 对抽象方法重写
  sayHello() {
    console.log("汪汪汪...");
  }
}
```

### 4. 接口

```typescript
/**
 * 接口就是定义一个规范
 * 接口可以用来定义一个类结构
 * 用来顶一个类中应该包含哪些属性和方法
 * 同时接口可以被当成类型声明去使用
 */

// 接口中的方法和属性都不能有实际的值
interface myInterface {
  name: string;
  age: number;
  sayHello(): void;
  move(distance: number): void;
}

/**
 * 定义类时，可以使得类去实现一个接口
 * 使用 implements关键字 来表明 实现某个接口
 */

class Myclass implements myInterface {
  name: string;
  age: number;
  constructor(theName: string, theAge: number) {
    this.name = theName;
    this.age = theAge;
  }
  sayHello() {
    console.log(`哈哈哈...`);
  }
  move(distance: number) {
    console.log(`${this.name} move ${distance}m`);
  }
}
```

### 5. 属性的封装

```typescript
/**
 * 属性默认时public的 属性可以被任意修改
 *
 * private 私有属性 只能在内部访问
 * 通过在内部添加方法使得私有属性可以被外部访问
 *
 * protected 只能在当前类和当前类的子类中访问
 */

class People {
  // name:string
  // private _age:number

  // constructor(name:string,age:number){
  //   this.name = name
  //   this._age = age
  // }

  // 可以直接将属性定义在构造函数中
  constructor(public name: string, private _age: number) {}

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

  get age() {
    console.log("get _age 执行了");
    return this._age;
  }
  set age(age: number) {
    if (age > 0) {
      this._age = age;
    }
  }
}

const p = new People("猪八戒", 1000);
console.log(p.age); //get _age 执行了 1000
p.age = 200; //get _age 执行了
console.log(p.age); //200

// // 属性被任意修改导致数据不安全
// p.setAge(-3) //年龄不能小于0
// console.log(p); //People { name: '猪八戒', age: 1000 }
// p.setAge(2000)
// console.log(p); //People { name: '猪八戒', age: 2000 }
```

## 四. 泛型

```typescript
/**
 * 在定义函数或类时，遇到类型不明确时可以使用泛型
 */

function fn<T>(a: T): T {
  return a;
}

function fn1<T, K>(a: T, b: K): T {
  console.log(b);
  return a;
}

interface inter {
  length: number;
}

// T 必须满足interface接口
function fn3<T extends inter>(a: T): number {
  return a.length;
}

class Myclass<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
}

// 不指定泛型，TS可以自动对类型进行推断
const res1 = fn(18);
const a = { length: 100 };
const res4 = fn3(a);
//const res5 = fn3(111) //类型“number”的参数不能赋给类型“inter”的参数

// 指定泛型
const res2 = fn<string>("hello");
const res3 = fn1<number, string>(123, "Hello");
```
