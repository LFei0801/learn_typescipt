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
    span.style.opacity = completed ? "0.5" : "1"
  }
}