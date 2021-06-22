# Typescript 贪吃蛇

## 页面布局

```HTML
<main>
  <div id="stage">
    <div id="snake">
      <div></div>
    </div>
    <div id="food">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div id="score-panel">
    <div>SCORE: <span id="score">0</span></div>
    <div>Level: <span id="level">1</span></div>
  </div>
</main>
```

```leSS
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  width: 360px;
  height: 420px;
  border: solid 10px black;
  background-color: #b7d4a8;
  border-radius: 20px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

#stage {
  width: 304px;
  height: 304px;
  border: solid 1px black;
  position: relative;

  #snake {
    width: 10px;
    height: 10px;
    background-color: black;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  #food {
    width: 10px;
    height: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    position: absolute;
    left: 40px;
    top: 40px;

    div {
      width: 4px;
      height: 4px;
      background-color: rgb(14, 129, 133);
      transform: rotate(45deg);
    }
  }
}

#score-panel {
  width: 304px;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
}

```

## 系统模块划分

系统角色主要分为 食物、蛇、计分板、控制器
因此分为四大类：

- Food : 负责食物的相关操作
- Snake: 负责蛇的相关操作
- ScorePanel: 负责计分板相关操作
- GameControl：负责游戏控制

### 食物 类实现

```typescript
/**
 * 食物类
 */

export default class Food {
  private element: HTMLElement; // 外部不需要访问这个元素
  constructor() {
    // 错误提示：不能将类型“null”分配给类型“HTMLElement”
    // 可能为 null 因此在后面加上 ！ 告诉编辑器不可能为null
    this.element = document.querySelector("#food")!;
  }
  // 食物坐标
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }
  set X(value: number) {
    this.element.style.left = value + "px";
  }
  set Y(value: number) {
    this.element.style.top = value + "px";
  }
  // 随机更改食物位置
  changePosition() {
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
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
```

### 计分板 类 实现

```typescript
/**
 * 计分板
 */

export default class ScorePanel {
  private scoreEle: HTMLElement;
  private levelEle: HTMLElement;
  private score: number = 0;
  private level: number = 1;
  public upScore: number; // 吃到多少个食物升一级
  public maxLevel: number; // 最大等级

  constructor(maxLevel: number = 10, upScore: number = 3) {
    this.scoreEle = document.querySelector("#score")!;
    this.levelEle = document.querySelector("#level")!;
    this.upScore = upScore;
    this.maxLevel = maxLevel;
  }

  // 增加游戏分数
  addScore() {
    if (this.score % this.upScore === 0) {
      this.addLevel();
    }
    this.score++;
    this.scoreEle.innerText = this.score + "";
  }

  // 增加游戏等级
  addLevel() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerText = this.level + "";
    }
  }
}
```

### 蛇 类

```typescript
/**
 * 蛇类
 */

export default class Snake {
  private head: HTMLElement; //蛇头
  private bodies: HTMLCollection; //蛇 身体 包括蛇头
  private snakeEle: HTMLElement; // 蛇

  constructor() {
    this.snakeEle = document.querySelector("#snake")!;
    this.head = this.snakeEle.querySelector("div")!;
    /*
    ParentNode.querySelectorAll<Element>(selectors: string): 
    NodeListOf<Element> (+2 overloads)
    返回的是Nodelist 不是 HTMLCollection 类型
    */
    //this.bodies = document.querySelectorAll('#snake>div')!
    this.bodies = this.snakeEle.getElementsByTagName("div");
  }

  // 蛇头坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的新坐标即移动蛇
  set X(value: number) {
    // 如果相同则什么都不做
    if (value === this.X) return;
    // 判断蛇是否撞到墙
    if (value < 0 || value > 290) throw new Error("蛇撞墙了");
    // 判断蛇是否掉头 即蛇头移动到蛇身第一节位置
    if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetLeft === value) {
      // 向右移动时发生掉头
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadAndBody();
  }
  set Y(value: number) {
    if (value === this.Y) return;
    if (value < 0 || value > 290) throw new Error("蛇撞墙了~~~");
    if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetTop === value) {
      // 向右移动时发生掉头
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadAndBody();
  }
  // 增加身体
  addBody() {
    const div = document.createElement("div");
    this.snakeEle.append(div);
  }
  // 移动身体
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let body = <HTMLElement>this.bodies[i - 1];
      let left = body.offsetLeft;
      let top = body.offsetTop;

      (<HTMLElement>this.bodies[i]).style.left = left + "px";
      (<HTMLElement>this.bodies[i]).style.top = top + "px";
    }
  }
  // 检查是否撞到身体
  checkHeadAndBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let body = <HTMLElement>this.bodies[i];
      if (body.offsetLeft === this.X && body.offsetTop === this.Y) {
        throw new Error("蛇撞到自己了~~~");
      }
    }
  }
}
```

### 游戏控制类

```typescript
/**
 * 游戏控制器
 */

import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

export default class GameControl {
  private snake: Snake;
  private food: Food;
  private scorePanel: ScorePanel;
  private direction: string = "ArrowRight"; //方向
  private isOver: boolean = false;

  constructor() {
    this.food = new Food();
    this.snake = new Snake();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    // 绑定键盘按下的事件
    document.addEventListener("keydown", this.handleKeydown.bind(this));
    this.run();
  }

  // 处理键盘按下事件
  handleKeydown(e: KeyboardEvent) {
    this.direction = e.key;
  }
  // 移动蛇
  run() {
    // 获取蛇现在的坐标
    let snakeX = this.snake.X;
    let snakeY = this.snake.Y;
    // 根据移动方向设置 snakeX snakeY
    switch (this.direction) {
      case "ArrowUp":
        snakeY -= 10;
        break;
      case "ArrowDown":
        snakeY += 10;
        break;
      case "ArrowLeft":
        snakeX -= 10;
        break;
      case "ArrowRight":
        snakeX += 10;
        break;
    }
    // 设置蛇头的新坐标
    this.cheakEatFood(snakeX, snakeY);
    try {
      this.snake.X = snakeX;
      this.snake.Y = snakeY;
    } catch (e) {
      let flag = confirm(e.message + "GAME OVER!!!" + "\n你想再玩一次吗?");
      this.isOver = true;
      if (flag === true) {
        location.reload();
        this.isOver = false;
      }
    }

    !this.isOver &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
  // 蛇吃到食物后
  cheakEatFood(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.scorePanel.addScore();
      this.food.changePosition();
      this.snake.addBody();
    }
  }
}
```

### BUG 记录

在测试时我发现无论如何蛇都无法移动，刚开始以为是蛇类代码写错了，于是我在检查代码时发现蛇类代码是没有问题的，
于是我又检查游戏控制类，发现无论怎么改都无法移动，百思不得其解！！！

后来我发现是不是我没有开启 绝对定位，导致蛇无法移动，于是我又开始检查 less 文件，发现了问题所在

**这是原来的代码，设计到蛇的片段**

```less
#snake {
  width: 10px;
  height: 10px;
  background-color: black;
  position: absolute;
  top: 10px;
  left: 10px;
}
```

**在这里我直接将蛇容器的大小固定了，在蛇容器上开启绝对定位，但其实应该控制的是蛇容器里面的 div**

```HTML
  <div id="snake">
    <!-- 真正移动的是这个 -->
    <div></div>
  </div>
```

**修改后的代码**

```less
#snake {
  div {
    width: 10px;
    height: 10px;
    background-color: black;
    position: absolute;
    border: solid 1px #b7d4a8;
  }
}
```

完美运行

# 项目总结

- 使用面向对象的模式虽然代码量增多，但是这种各司其职的编写模式，使得代码写到最后是十分轻松的，而且思路是越来越明确的
- Typescript 明确的类型模式，也使得代码因为类型错误导致的 bug 减少了
