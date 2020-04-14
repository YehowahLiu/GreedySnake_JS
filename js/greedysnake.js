var snake_init_length = 3,
    key_left = 37,
    key_top = 38,
    key_right = 39,
    key_bottom = 40,
    tick_rate = 100,
    snake_length = snake_init_length;

function Food(m) {
    //定义食物的构造函数
    this.x = 0;
    this.y = 0;
    //定义食物的横纵坐标
    this.div = document.createElement("div");
    //为其创建div元素
    this.div.className = "food";
    //设置div类名
    this.map = m;
    //将该食物放入地图
    this.map.appendChild(this.div);
}

Food.prototype.randomLoaction = function () {
    //定义随机生成食物的方法
    var maxX = 900 / 20 - 1;
    var maxY = 600 / 20 - 1;
    //计算生成食物的边界范围
    var indexX = getIntNum(0, maxX);
    var indexY = getIntNum(0, maxY);
    //用自定义的函数生成食物坐标
    this.x = indexX * 20;
    this.y = indexY * 20;
    //计算食物真实位置
    this.div.style.left = this.x + "px";
    this.div.style.top = this.y + "px";
    //设置食物div元素的left和top值
};

function getIntNum(min, max) {
    //定义函数实现生成min到max的随机数字
    return parseInt(Math.random() * (max - min + 1) + min);
}

function Snake(m, f) {
    //定义蛇的构造函数
    this.direction = "right";
    //定义蛇的移动方向，left、right、top、bottom
    this.body = [];
    //蛇的身体，其中第0个div是蛇头位置
    this.map = m;
    //蛇前进方向的地图
    this.food = f;
    //蛇的食物
    this.init();
    //蛇的初始化
}

Snake.prototype.init = function () {
    for (var i = 0; i < snake_init_length; i++) {
        var newHead = document.createElement("div");
        // 创建新蛇头的div元素
        newHead.className = "snake-head";
        //设置新蛇头的类名
        var location = this.getNewHeadLoc();
        newHead.left = location.left + "px";
        newHead.top = location.top + "px";
        //获取新蛇头所在位置并传递给对应div元素
        this.map.appendChild(newHead);
        //将新蛇头放入地图
        var oldhead = this.body[0];
        if (oldhead != undefined) {
            oldhead.className = "snake-body";
        } //获取原有蛇头，如存在将其变为身体
        this.body.unshift(newHead);
        //将新蛇头放入身体
    }
};

Snake.prototype.getNewHeadLoc = function () {
    var x = 0,
        y = 0; //定义存储新蛇头位置的变量，初值为0
    var oldhead = this.body[0]; //获取原有蛇头
    if (oldhead != undefined) {
        //如果之前有蛇头
        x = oldhead.offsetLeft;
        y = oldhead.offsetTop;
        switch (this.direction) {
            case "left":
                x -= 20;
                break;
            case "right":
                x += 20;
                break;
            case "top":
                y -= 20;
                break;
            case "bottom":
                y += 20;
                break;
        } //在原来蛇头基础上移动
    }
    return { left: x, top: y }; //返回新蛇头位置
};

Snake.prototype.inSnake = function (x1, y1) {
    //判断蛇是否占据了(x1,y1)坐标
    for (var i = 2; i < snake_length; i++) {
        var s = this.body[i];
        if (x1 + "px" == s.style.left && y1 + "px" == s.style.top) return true;
    }
    return false;
};

Snake.prototype.move = function () {
    //蛇的移动方法
    var obj = this.getNewHeadLoc(); //获取蛇头移动到的位置
    if (obj.left == this.food.x && obj.top == this.food.y) {
        //如果蛇头将要移动到食物上
        snake_length++;
        var _newHead = document.createElement("div");
        _newHead.style.left = obj.left + "px";
        _newHead.style.top = obj.top + "px";
        _newHead.className = "snake-head";
        this.map.appendChild(_newHead);
        this.body[0].className = "snake-body"; //把原来蛇头样式改为身体
        this.body.unshift(_newHead); //将食物div加入蛇身头部位置
        do {
            this.food.randomLoaction();
        } while (this.inSnake(this.food.x, this.food.y)); //随机生成一个和蛇身不重合的食物
        return false;
    } else if (
        obj.left < 0 ||
        obj.left == 900 ||
        obj.top < 0 ||
        obj.top == 600 ||
        this.inSnake(obj.left, obj.top) //如果将要移动的位置出了地图或在蛇身体内部，游戏结束
    ) {
        alert("想不开死了");
        return true;
    } else {
        // 否则，蛇向所选方向移动一格
        var last = this.body.pop();
        last.className = "snake-head";
        var oldHead = this.body[0];
        oldHead.className = "snake-body";
        this.body.unshift(last);
        last.style.left = obj.left + "px";
        last.style.top = obj.top + "px";
        return false;
    }
};

function Game(m) {
    //构造游戏对象，初始化
    this.food = new Food(m);
    this.snake = new Snake(m, this.food);
}

Game.prototype.start = function () {
    // 定义游戏开始方法
    do {
        this.food.randomLoaction();
    } while (this.snake.inSnake(this.food.x, this.food.y));
    var snake = this.snake;
    var flag = window.setInterval(function () {
        var isDead = snake.move();
        console.log(isDead);
        if (isDead) {
            clearInterval(flag);
        }
    }, tick_rate);
    document.onkeydown = function (e) {
        var code = e.keyCode;
        switch (code) {
            case key_left:
                if (snake.direction != "right") snake.direction = "left";

                break;
            case key_top:
                if (snake.direction != "bottom") snake.direction = "top";
                break;
            case key_right:
                if (snake.direction != "left") snake.direction = "right";
                break;
            case key_bottom:
                if (snake.direction != "top") snake.direction = "bottom";
                break;
        }
    };
};
