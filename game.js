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
        // 将蛇和食物渲染到地图上
        this.snake.render(this.map);
        this.food.render(this.map, this.snake);
        // this.runSnake();
        this.bindKey();
        this.keyCode = 39;
        this.timerId = null;

        // 得分面板
        this.score = 0;
        document.getElementById("score").innerHTML = "当前得分：" + this.score;

        // 按钮规则控制
        this.disableStart = false;
        this.btStart = document.getElementById("btnStart");
        this.btStop = document.getElementById("btnStop");
        this.btStart.disabled = this.disableStart;
        this.btStop.disabled = !this.disableStart;

        // 标记变量
        this.flag = false;

        // 把this赋给_that
        let _that = this;

        // 启动按钮
        this.btStart.onclick = function () {
            _that.oprateStart();
        }

        // 暂停按钮
        this.btStop.onclick = function () {
            _that.oprateStop();
        }

        // 启动暂停绑定键盘按键
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                // 按Shift暂停蛇
                case 16:
                    _that.oprateStop()
                    _that.flag = false;
                    break;
                // 按ENTER启动蛇
                case 13:
                    if (_that.flag) { return; }
                    _that.oprateStart();
                    _that.flag = true;
                    break;

            }
        });

        // 速度控制
        this.oldSpeed = 150;
    }
    // 启动按钮（按键）
    oprateStart() {
        this.runSnake();
        this.disableStart = true;
        this.btStart.disabled = this.disableStart;
        this.btStop.disabled = !this.disableStart;
    }

    // 暂停按钮（按键）
    oprateStop() {
        clearInterval(this.timerId);
        this.disableStart = false;
        this.btStart.disabled = this.disableStart;
        this.btStop.disabled = !this.disableStart;
    }

    // 重新开始
    restart() {
        this.food.remove();
        this.snake.remove();
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        this.timerId = null;
        this.start();
    }
    // 让蛇动起来
    runSnake() {
        this.timerId = setInterval(() => {
            this.oldSpeed = this.snake.speed;
            // 要获取游戏对象中的蛇属性
            this.snake.move(this.food, this.map)
            // 获取蛇头坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            // console.log(headX, headY)

            // 游戏结束情形1：触碰边界
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            if (headX === 0 || headX >= maxX || headY === 0 || headY >= maxY) {
                console.log(headX, headY);
                alert("游戏结束");
                clearInterval(this.timerId);
                this.restart();
                return;
            }

            // 游戏结束情形2：蛇头碰到蛇身
            for (let i = 1; i < this.snake.body.length; i++) {
                if (headX === this.snake.body[i].x && headY === this.snake.body[i].y) {
                    alert("游戏结束");
                    clearInterval(this.timerId);
                    this.restart();
                    return;
                }
            }
            // 根据body的数据，重新渲染蛇在页面的位置
            this.snake.render(this.map);

            // 判断速度是否有改变，若有改变则调整定时器参数
            if (this.snake.speed != this.oldSpeed) {
                this.oldSpeed = this.snake.speed;
                clearInterval(this.timerId);
                this.timerId = null;
                this.runSnake();
            }
        }, this.snake.speed);
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
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        });
    }
}

export default Game;