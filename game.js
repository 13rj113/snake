import Food from "./food.js";
import Snake from "./snake.js";
// 游戏的入口文件
class Game {
    // 构造器
    constructor() {
        // 创建食物和蛇的实例
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        this.timerId = null;

    }
    start() {
        // 将食物和蛇渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);
        this.runSnake();
        this.bindKey();
        this.keyCode = 39;
    }
    // 重新开始
    restart() {
        this.food.remove();
        this.snake.remove();
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        this.timerId = null;
        this.start()
    }
    // 让蛇动起来
    runSnake() {
        this.timerId = setInterval(() => {
            // 要获取游戏对象中的蛇属性
            this.snake.move(this.food, this.map)
            // 获取蛇头坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            // console.log(headX, headY)

            // 游戏结束情形1：触碰边界
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                alert("游戏结束");
                clearInterval(this.timerId);
                this.restart();
                return
            }

            // 游戏结束情形2：蛇头碰到蛇身
            for (let i = 1; i < this.snake.body.length; i++) {
                if (headX === this.snake.body[i].x && headY === this.snake.body[i].y) {
                    alert("游戏结束")
                    clearInterval(this.timerId);
                    this.restart();
                    return
                }
            }
            // 根据body的数据，重新渲染蛇在页面的位置
            this.snake.render(this.map);
        }, 150);
    }
    // 绑定键盘事件，控制蛇的方向
    bindKey() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        });
    }
}

export default Game;