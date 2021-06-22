/**
 * 食物类 
 */

export default class Food{
  private element:HTMLElement  // 外部不需要访问这个元素
  constructor(){
    // 错误提示：不能将类型“null”分配给类型“HTMLElement” 
    // 可能为 null 因此在后面加上 ！ 告诉编辑器不可能为null
    this.element = document.querySelector('#food')!
  }
  // 食物坐标
  get X(){
    return this.element.offsetLeft
  }
  get Y(){
    return this.element.offsetTop
  }
  set X(value:number){
    this.element.style.left = value + 'px'
  }
  set Y(value:number){
    this.element.style.top = value + 'px'
  }
  // 随机更改食物位置
  changePosition(){
    /**
     * 食物应该随机出现在 stage 内任意位置
     *      舞台大小 为 300 x 300 
     *      食物大小 为 10 x 10
     *      因此食物坐标 应为为 0~290（以食物左边计算）
     * 蛇移动一次就是移动一格，一格就是 10 px
     *    Math.rondom() 产生 0~1的随机数
     *    -> Math.rondom() * 29 产生  0~29的随机数
     *    -> Math.round(Math.rondom() * 29) 四舍五入 即 保证产生的是整数
     *    -> Math.round(Math.random() * 29) * 10  保证产生的是 0 ~ 290 的可以被10整除的数
     * 因此食物的坐标应该10的倍数
     */
    let top = Math.round(Math.random() * 29) * 10
    let left = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}