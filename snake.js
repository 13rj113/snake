import Food from './food.js'
// 蛇类
class Snake {
    // 构造器
    constructor({ width = 20, height = 20, direction = 'right' } = {}) {
        // 存储蛇
        this.elements = [];

        this.width = width;
        this.height = height;
        this.direction = direction;
        // 蛇的身体，初始3节
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' },
        ]
        this.directionTemp = 'right';
    }

    // 将蛇显示在屏幕上
    render(map) {
        // 删除之前创建的蛇
        this.remove()

        // 把蛇身体的每一个点都显示出来
        for (let i = 0; i < this.body.length; i++) {
            let object = this.body[i];

            // 创建蛇 dom
            let div = document.createElement('div');
            map.appendChild(div);
            this.elements.push(div);

            // 设置div样式
            div.style.position = 'absolute';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = object.color;

        }
    }

    // 让蛇跑起来
    move(food, map) {
        // 控制蛇的移动（后一节蛇身移动到前一节蛇身的位置）
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        let head = this.body[0];
        let temp = 0;
        if (this.direction === 'left' && this.directionTemp === 'right') {
            this.directionTemp = 'right'
            temp = 1;
        }

        if (this.direction === 'right' && this.directionTemp === 'left') {
            this.directionTemp = 'left'
            temp = 1;
        }

        if (this.direction === 'top' && this.directionTemp === 'bottom') {
            this.directionTemp = 'bottom'
            temp = 1;
        }

        if (this.direction === 'bottom' && this.directionTemp === 'top') {
            this.directionTemp = 'top'
            temp = 1;
        }
        if (temp === 0) {
            this.directionTemp = this.direction;
        }

        switch (this.directionTemp) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        this.body[0].x = head.x;
        this.body[0].y = head.y;

        // 蛇吃食物
        // 判断蛇头的位置是否与食物的位置重合
        let headX = head.x * this.width;
        let headY = head.y * this.height;

        if (headX === food.x && headY === food.y) {
            // 蛇变长一节
            let last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            // 重新生成一个食物
            food.render(map);
        }
    }

    // 清除一条蛇
    remove() {
        // 从后往前移除
        for (let i = this.elements.length - 1; i >= 0; i--) {
            this.elements[i].parentNode.removeChild(this.elements[i]); // 删除div
            this.elements.splice(i, 1);  // 删除数组中的元素
        }
    }
}

export default Snake;