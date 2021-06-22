/**
 * 蛇类
 */

export default class Snake{
  private head:HTMLElement  //蛇头
  private bodies:HTMLCollection //蛇 身体 包括蛇头
  private snakeEle:HTMLElement  // 蛇

  constructor(){
    this.snakeEle = document.querySelector('#snake')!
    this.head = this.snakeEle.querySelector('div')!
    /*
    ParentNode.querySelectorAll<Element>(selectors: string): 
    NodeListOf<Element> (+2 overloads)
    返回的是Nodelist 不是 HTMLCollection 类型
    */
    //this.bodies = document.querySelectorAll('#snake>div')!
    this.bodies = this.snakeEle.getElementsByTagName('div')
  }

  // 蛇头坐标
  get X(){
    return this.head.offsetLeft
  }
  get Y(){
    return this.head.offsetTop
  }

  // 设置蛇头的新坐标即移动蛇
  set X(value:number){
    // 如果相同则什么都不做
    if(value === this.X) return
    // 判断蛇是否撞到墙
    if(value < 0 || value > 290) throw new Error("蛇撞墙了")
    // 判断蛇是否掉头 即蛇头移动到蛇身第一节位置
    if(this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetLeft === value){
      // 向右移动时发生掉头
      if(value > this.X){
        value = this.X - 10
      }else{
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadAndBody()
  }
  set Y(value:number){
    if(value === this.Y) return
    if(value < 0 || value > 290) throw new Error("蛇撞墙了~~~")
    if(this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetTop === value){
      // 向右移动时发生掉头
      if(value > this.Y){
        value = this.Y - 10
      }else{
        value = this.Y + 10
      }
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadAndBody()
  }
  // 增加身体
  addBody(){
    const div = document.createElement('div')
    this.snakeEle.append(div)
  }
  // 移动身体
  moveBody(){
    for(let i = this.bodies.length-1;i>0;i--){
      let body = <HTMLElement>this.bodies[i-1];
      let left = body.offsetLeft;
      let top = body.offsetTop;

      (<HTMLElement>this.bodies[i]).style.left = left + 'px';
      (<HTMLElement>this.bodies[i]).style.top = top + 'px';
    }
  }
  // 检查是否撞到身体
  checkHeadAndBody(){
    for(let i=this.bodies.length-1;i>0;i--){
      let body = <HTMLElement>this.bodies[i]
      if(body.offsetLeft === this.X && body.offsetTop === this.Y){
        throw new Error('蛇撞到自己了~~~')
      }
    }
  }
}