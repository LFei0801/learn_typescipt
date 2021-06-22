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

  private mTodoData: iTodoData[] = []

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