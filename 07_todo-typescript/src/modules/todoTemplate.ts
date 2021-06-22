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
      <span style=" text-decoration:${completed ? "line-through" : ""}; opacity: ${completed ? "0.5" : "1"};">${content}</span>
      <button data-id=${id}>X</button>
    `
  }
}