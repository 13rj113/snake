import { getRandom } from './util.js'
// 食物类
class Food {
    // 构造器
    constructor({ x = 10, y = 10, width = 20, height = 20, color = '#00FF00' } = {}) {
        // 存储食物
        this.elements = [];
        // 坐标
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
        this.color = color;
    }

    // 将food显示在屏幕上
    render(map) {
        this.remove();
        // 随机设置x、y值

        this.x = getRandom(1, map.offsetWidth / this.width - 1) * this.width;

        this.y = getRandom(1, map.offsetHeight / this.height - 1) * this.height;

        console.log(this.x, this.y);

        // 创建食物 dom
        let div = document.createElement('div');
        map.appendChild(div);
        this.elements.push(div);

        // 设置div样式
        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;

    }

    // 将food移出屏幕
    remove() {
        // 从后往前移除
        for (let i = this.elements.length - 1; i >= 0; i--) {
            this.elements[i].parentNode.removeChild(this.elements[i]); // 删除div
            this.elements.splice(i, 1);  // 删除数组中的元素
        }
    }
}

export default Food;
