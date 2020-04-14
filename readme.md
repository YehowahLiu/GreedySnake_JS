# 贪吃蛇游戏(via html)

[在线演示](http://htmlpreview.github.io/?https://github.com/YehowahLiu/GreedySnake_JS/blob/master/index.html)

> 2020 年春 Web 程序设计大作业

### 游戏基本规则

1. 主要目标为控制蛇移动吃掉食物
2. 蛇吃掉食物后身体增长一格
3. 地图有边界，食物在地图中随机出现
4. 蛇移动过程不允许折返
5. 当蛇头撞到墙壁或自己身体的一部分后，游戏结束

### 页面与代码的总体设计

1. 基础游戏功能实现

    - 使用面向对象的编程思想
    - 创建食物对象，属性包括当前坐标及其其 div 元素，方法包括随机生成一个食物
    - 创建蛇的对象，属性为当前朝向、对应的食物、身体元素集合(首元素为蛇头)，方法包括初始化蛇身、判断下一步蛇头走向、判断某一 div 元素是否和蛇身重合、蛇的移动
    - 创建游戏对象，属性包括蛇的对象、食物对象和地图，方法包括游戏的开始
    - 游戏开始后，初始化地图、蛇和食物，蛇开始移动，并监听键盘事件，通过四个方向键进行游戏状态的改变，从而实现游戏基础功能

2. 自定义选项**TODO**

    增加自定义游戏键位的选项

3. 交互逻辑优化**TODO**

    - 进入网页时，显示默认游戏地图和三个选项：游戏规则、开始游戏、自定义
    - 游戏结束后，显示当前得分和再来一次按钮

### 参考资料

[【前端笔记】js 简单代码实现贪吃蛇](https://blog.csdn.net/weixin_41606276/article/details/81432105)
[javascript 贪吃蛇游戏源码](https://blog.csdn.net/github_27314097/article/details/82988719)
