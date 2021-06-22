# todo-typescript
尝试用面向对象的方式写前端里面经典的TodoList应用
# 传统写法

1. 绑定事件处理函数 --- 数据
   1. 增加项 - 列表数据 -> 增加一项
      {id timestamp,content string,completed:false}
   2. 删除项 - 列表数据 -> id -> removeItem
      将对应项的视图 -> 列表 -> 删除
   3. 改变完成状态 - 列表数据 -> id -> change completed
      将对应项的完成状态 -> 是否完成 toggle

# 面向对象、类的继承、横向切割方案 -- 设计方案

1. 程序分类
   - 外层： 浏览器的事件 -> 调用方法 -> 事件处理函数的绑定
   - 操作数据：addTodo、removeTodo、toggleComplete
   - 操作 DOM: addItem、removeItem、changleCompleted
   - 管理模板 todoView -> 接受参数

2. 思考
   - 这种面向对象写Todo的写法类似于后端里面的MVC模式
   - TodoControl层 即控制层，负责管理整个梳理整个应用的app，不直接参与数据以及DOM方面的操作
   - TodoEvent层，即数据层， 负责管理处理整个应用的数据处理，不直接操作DOM，继承自DOM层，提供操作数据的方法给控制层
   - TodoDOM层： 即DOM层, 直到DOM层才设计DOM的操作,继承自模板层，提供DOM方面的API给数据层
   - TodoTemplate层，负责提供DOM模板给DOM层使用

## TodoControl 类
- 负责最外层事件，浏览器调用这个类
- 负责调用TodoEvent 类的方法

```typescript
/**
 * 外层控制类
 */

import { iTodoData } from "../config/typing"
import TodoEvent from "./todoEvent"

export default class TodoControl {
  private oInputElement: HTMLInputElement
  private oButtonElement: HTMLElement
  private oTodoListElement: HTMLElement
  private todoEvent: TodoEvent

  private mTodoData: iTodoData[] = [
    { id: 0, content: "111", completed: false },
    { id: 1, content: "222", completed: true }
  ]

  constructor() {
    this.oInputElement = document.querySelector('input')
    this.oButtonElement = document.querySelector('button')
    this.oTodoListElement = document.querySelector('.todo-list')
    this.todoEvent = new TodoEvent(this.mTodoData, this.oTodoListElement)
    this.init()
  }

  private init(): void {
    this.bindEvent()
  }

  private bindEvent(): void {
    this.oButtonElement.addEventListener('click', this.handleAddBtnClick.bind(this))
    this.oTodoListElement.addEventListener('click', this.handleTodoListClick.bind(this))
  }

  private handleAddBtnClick(): void {
    const val: string = this.oInputElement.value.trim()
    if (val.length) {
      const todo: iTodoData = {
        id: Math.floor(Math.random() * 100000),
        content: val,
        completed: false
      }
      const ret = this.todoEvent.addTodo(todo)
      if (ret && ret === -1) {
        alert('列表项已经存在')
      }
    }
    this.oInputElement.value = ''
  }

  private handleTodoListClick(e: MouseEvent): void {
    const target = <HTMLElement>e.target
    const targetName = target.tagName.toLowerCase()
    if (targetName === 'input' || targetName === 'button') {
      const id = parseInt(target.dataset.id)
      switch (targetName) {
        case 'input':
          this.todoEvent.toggleCompleted(id, target)
          break
        case 'button':
          this.todoEvent.removeTodo(id, target)
          break
        default:
          break
      }
    }
  }
}
```

## TodoEvent 类

- 负责数据处理方面的工作，继承自TodoDOM类,调用TodoDOM类的方法
- 不直接操作DOM

```typescript
/**
 * 数据层
 */

import { iTodoData } from "../config/typing";
import TodoDOM from "./todoDOM";

export default class TodoEvent extends TodoDOM {
  private todoData: iTodoData[]

  constructor(todoData: iTodoData[], todoWrapper: HTMLElement) {
    super(todoWrapper)
    this.todoData = todoData
    this.initList(todoData)
  }

  public addTodo(todo: iTodoData): null | number {
    // 判断是否输入同样的item
    const _todo = this.todoData.find((item: iTodoData) => item.content === todo.content)
    if (!_todo) {
      this.todoData.push(todo)
      this.addItem(todo)
      return
    }
    return -1
  }

  public removeTodo(id: number, target: HTMLElement): void {
    this.todoData = this.todoData.filter(item => item.id !== id)
    this.removeItem(target)
  }

  public toggleCompleted(id: number, target: HTMLElement): void {
    this.todoData = this.todoData.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
        this.changeCompleted(target, item.completed)
      }
      return item
    })
  }
}


```

## TodoDOM类
- 负责操作DOM 

```typescript
/**
 * 视图层
 */

import findParentNode from "../config/findParent";
import { iTodoData } from "../config/typing";
import TodoTempleate from "./todoTemplate";

export default class TodoDOM extends TodoTempleate {
  protected todoWrapper: HTMLElement
  constructor(todoWrapper: HTMLElement) {
    super()
    this.todoWrapper = todoWrapper
  }

  protected initList(todoData: iTodoData[]) {
    if (todoData.length) {
      const oFragment: DocumentFragment = document.createDocumentFragment()
      todoData.map(todo => {
        const item: HTMLElement = document.createElement('div')
        item.className = 'todo-item'
        item.innerHTML = this.todoView(todo)
        oFragment.appendChild(item)
      })
      this.todoWrapper.appendChild(oFragment)
    }
  }

  protected addItem(todo: iTodoData): void {
    const todoItem: HTMLElement = document.createElement('div')
    todoItem.className = 'todo-item'
    todoItem.innerHTML = this.todoView(todo)
    this.todoWrapper.appendChild(todoItem)
  }

  protected removeItem(target: HTMLElement): void {
    const todoItem: HTMLElement = findParentNode(target, "todo-item")
    todoItem.remove()
  }

  protected changeCompleted(target: HTMLElement, completed: boolean): void {
    const todoItem: HTMLElement = findParentNode(target, 'todo-item')
    const span = todoItem.querySelector('span')
    span.style.textDecoration = completed ? 'line-through' : 'none'
  }
}
```

## TodoTemplate 类

- 负责提供给DOM一些DOM模板

```typescript
/**
 * 模板层
 * 管理 DOM 模板
 */

import { iTodoData } from "../config/typing";

export default class TodoTempleate {

  protected todoView(todo: iTodoData): string {
    const { id, content, completed } = todo
    return `
   
      <input type="checkbox" ${completed ? "checked" : ""}  data-id=${id}/>
      <span style=" text-decoration:${completed ? "line-through" : ""}">${content}</span>
      <button data-id=${id}>删除</button>
    `
  }
}
```

## 其他 ts文件

### typing.ts

- 负责提供给一些数据接口，规划化数据格式

```typescript
export interface iTodoData{
  id:number,
  content:string,
  completed:boolean
}
```

### findparent.ts

- 负责找到当前元素的父元素

```typescript
/**
 * 找到当前元素的对应className的父元素
 * @param target 当前元素
 * @param className 目标元素含有的classname
 * @returns 父元素
 */

export default function findParentNode(target: HTMLElement, className: string): HTMLElement {
  while (target = <HTMLElement>target.parentNode) {
    if (target.className = className) {
      return target
    }
  }
}
```
