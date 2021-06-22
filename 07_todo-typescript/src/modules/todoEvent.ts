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

