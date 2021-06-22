/**
 * 计分板
 */

export default class ScorePanel{
  private scoreEle:HTMLElement
  private levelEle:HTMLElement
  private score:number = 0
  public level:number = 1
  public upScore:number   // 吃到多少个食物升一级
  public maxLevel:number  // 最大等级

  constructor(maxLevel:number = 10,upScore:number = 3){
    this.scoreEle = document.querySelector('#score')!
    this.levelEle = document.querySelector('#level')!
    this.upScore = upScore
    this.maxLevel = maxLevel
  }

  // 增加游戏分数
  addScore(){
    this.score ++
    this.scoreEle.innerText = this.score + ''
    if(this.score % this.upScore === 0){
      this.addLevel()
    }
  }

  // 增加游戏等级
  addLevel(){
    if(this.level < this.maxLevel){
      this.level ++
      this.levelEle.innerText = this.level + ''
    }
  }
}