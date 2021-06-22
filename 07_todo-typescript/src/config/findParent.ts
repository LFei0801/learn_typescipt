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