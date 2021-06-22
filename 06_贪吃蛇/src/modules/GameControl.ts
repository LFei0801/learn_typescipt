/**
 * 游戏控制器
 */

import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

export default class GameControl{
  private snake:Snake
  private food:Food
  private scorePanel:ScorePanel
  private direction:string = "ArrowRight" //方向
  private isOver:boolean = false

  constructor(){
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
    this.init()
  }

  init(){
    // 绑定键盘按下的事件
    document.addEventListener('keydown',this.handleKeydown.bind(this))
    this.run()
  }

  // 处理键盘按下事件
  handleKeydown(e:KeyboardEvent){
    this.direction = e.key
  }
  // 移动蛇
  run(){
    // 获取蛇现在的坐标
    let snakeX = this.snake.X
    let snakeY = this.snake.Y
    // 根据移动方向设置 snakeX snakeY
    switch(this.direction){
      case "ArrowUp":
        snakeY -= 10
        break
      case "ArrowDown":
        snakeY += 10
        break
      case "ArrowLeft":
        snakeX -= 10
        break
      case "ArrowRight":
        snakeX += 10
        break
    }
    // 设置蛇头的新坐标
    this.cheakEatFood(snakeX,snakeY)
    try{
      this.snake.X = snakeX
      this.snake.Y = snakeY
    }catch(e){
      let flag = confirm(e.message+"GAME OVER!!!"+"\n你想再玩一次吗?")
      this.isOver = true
      if(flag === true){
        location.reload()
        this.isOver = false
      }
    }

    !this.isOver && setTimeout(this.run.bind(this),300 - (this.scorePanel.level -1) * 30)
  }
  // 蛇吃到食物后
  cheakEatFood(x:number,y:number){
    if(x === this.food.X && y === this.food.Y){
      this.scorePanel.addScore()
      this.food.changePosition()
      this.snake.addBody()
    }
  }
}