---
id: rm-2018-buff-simulation
title: RoboMaster2018能量机关模拟显示
sidebar_label: RM2018能量机关模拟
---
# 九宫格手写数字模拟显示代码
## 前言
心血来潮想把之前没做完的东西复现一遍，就需要先写一份模拟显示九宫格神符的代码，说干就干，并且记录一下

## 需求分析
- 收集数码管样式的图片，1~9
- 收集手写数字的样本图片（1~9），可以直接从mnist中获取
- 让图像随机的出现在它该出现的位置
- 可通过按键或鼠标选择识别正确或错误
- 可以导出视频

## 代码实现
首先根据需求确定代码框架
![](https://raw.githubusercontent.com/rcxxx/my-img/main/img/screenshot/RM-2018-Buff-simulation.png
)

### 从Mnist数据集获取手写数字图片
图片获取完成之后先定义图片的`base`路径

``` cpp
const string DIGIT_IMG_DIR = "./img/digit_img/";
const string MINST_IMG_DIR = "./img/mnist_img/";
```

### 区域划分
初始化一张纯黑背景

``` cpp
/** 设置分辨率
 * 1080 Size(1920, 1080)
 * 2k   Size(2560, 1440)
 * 3k   Size(3200, 1800)
 * 4k   Size(4096, 2160)
 */
Size RESOLUTION = Size(1920, 1080);
Mat src_img = Mat::zeros(RESOLUTION, CV_8UC3);
```

通过分辨率切分宽和高的单位长度，通过单位长度定位各个图像的位置

``` cpp
const float UNIT_W = RESOLUTION.width / 22;
const float UNIT_H = RESOLUTION.height / 14;
```

标记数码管的位置，数码管图像大小为  `Size(UNIT_W, UNIT_H*1.75)`

``` cpp
vector<Rect> digit_num(5);
float start_x = (11 - 2.5)* UNIT_W - 0.4*UNIT_W * 2;
for (size_t i = 0; i < digit_num.size(); i++)
{
    digit_num[i] = Rect(Point2f(start_x + i*(1 + 0.4)*UNIT_W, UNIT_H), Size(UNIT_W, UNIT_H*1.75));
    rectangle(src_img, digit_num[i], Scalar(0, 255, 0), 2, 8, 0);
}
```

标记九宫格位置，九宫格图像大小为  `Size(UNIT_W * 4, UNIT_H * 7/3)`

``` cpp
const float _H = (UNIT_H * 7) / 3; // 每格的高
vector<Rect> mnist_num(9);
for (int i = 0; i < 3; ++i) {
    // 行
    float x = (4 * UNIT_W) + (i * 5 * UNIT_W);
    for (int j = 0; j < 3; ++j) {
        // 列
        float y = (4 * UNIT_H) + (j * (_H + UNIT_H));
        mnist_num[i * 3 + j] = Rect(Point2f(x, y), Size(4 * UNIT_W, _H));
        rectangle(src_img, mnist_num[i * 3 + j], Scalar(255, 255, 255), 2, 8, 0);
    }
}
```

标记状态灯位置, 状态灯大小为  `Size(UNIT_W * 2, UNIT_H)`

``` cpp
vector<Rect> left_sidebar(5);
	for (size_t i = 0; i < left_sidebar.size(); i++)
	{
		left_sidebar[i] = Rect(Point(UNIT_W, (UNIT_H * 4) + (i * 2 * UNIT_H)), Size(UNIT_W * 2, UNIT_H));
		rectangle(src_img, left_sidebar[i], Scalar(255, 0, 0), -1, 8, 0);
	}
	vector<Rect> right_sidebar(5);
	for (size_t i = 0; i < right_sidebar.size(); i++)
	{
		right_sidebar[i] = Rect(Point(UNIT_W * 19, (UNIT_H * 4) + (i * 2 * UNIT_H)), Size(UNIT_W * 2, UNIT_H));
		rectangle(src_img, right_sidebar[i], Scalar(255, 0, 0), -1, 8, 0);
	}
```

标记效果如下，左右边距为一个单位宽度，上下边距为一个单位高度，数码管位置居中
![](https://raw.githubusercontent.com/rcxxx/my-img/main/img/screenshot/RM-2018-Buff-Display_YaiWEtolVq.png
)

位置标记完成，接下来就是不同区域的显示内容，只需要设置背景图`src_img`的`ROI`区域即可
### 按键功能
- 先创建表示状态的列表

``` cpp
enum sidebar_color {
    RED,
    BLUE
};
int color = RED; // 设置侧边栏默认颜色
vector<bool> flag{false, false, false};
/**
 * flag[0]  数码管是否更新  false 更新  true 不更新
 * flag[1]	手写数字是否更新	true 更新  false 激活状态
 * flag[2]	侧边状态是否更新   true 加一  false 重置
 */
int sidebar_cnt = 0;
```

- 后续代码都实现在循环中，通过按键或是鼠标事件更新

``` cpp
while(1) {
    // 设置颜色
    Scalar rect_color = color == RED ? Scalar(0, 0, 255) : Scalar(255, 0, 0);

    // 设置侧边栏
    /* code */

    // 设置数码管数字
    /* code */

    // 设置手写数字
    /* code */

    bool is_exit = false;
    /** 设置按键事件
    * 't' ture 正确
    * 'f' false 错误
    * 'r' reset 重置
    * 'c' change 切换颜色
    */
    int key = waitKey(0);
    switch (key)
    {
        case 't':
        case 'T':
        {
            flag[0] = true;
            flag[2] = true;
        }
        break;
        case 'f':
        case 'F':
        {
            flag[0] = false;
            flag[1] = false;
            flag[2] = false;
        } break;
        case 'r':
        case 'R':
        {
            flag[0] = false;
            flag[1] = false;
            flag[2] = false;
        } break;
        case 'c':
        case 'C':
        {
            color = ((color == RED) ? BLUE : RED);
            flag[0] = false;
            flag[1] = false;
            flag[2] = false;
        } break;
        case 27:
        {
            is_exit = true; 
        } break;
    }

    if (is_exit == true) {
        break;
    }
}
```

### 侧边栏区域

``` cpp
if (flag[2]) {
    sidebar_cnt += 1;
    if (sidebar_cnt > 5) {
        flag[1] = true;
        sidebar_cnt = 0;
    }
    // 状态栏计数加一
    for (int i = 0;i < sidebar_cnt; ++i) {
        rectangle(src_img, left_sidebar[5 - i -1], rect_color, -1, 8, 0);
        rectangle(src_img, right_sidebar[5 - i -1], rect_color, -1, 8, 0);
    }
}
else {
    // 状态栏计数清零
    sidebar_cnt = 0;
    src_img = Mat::zeros(RESOLUTION, CV_8UC3);
}
```
### 数码管区域
先创建一个公用的随机数种子，在每一次使用过随机种子之后都进行更新，增大随机性

``` cpp
auto base_seed = time(nullptr);
auto random_seed = get_random(0, 65535, base_seed);  // unsigned int 数据范围是 0~65535
random_seed = (random_seed + 1) >= 65535 ? 0 : random_seed + 1; // 更新seed
```

`get_random()`是用来获取一定范围内随机数的函数，定义如下
``` cpp
int get_random(int min, int max, unsigned int seed) {
	std::default_random_engine e(static_cast<unsigned int>(seed));
	std::uniform_int_distribution<> n(min, max);
	return n(e);
}
```

首先创建一个用作随机列表的容器，长度为9（数字为1~9）

``` cpp
vector<int> digit_img_list{ 1, 2, 3, 4, 5, 6, 7, 8, 9 };
```

设置数码管数字
``` cpp
vector<Mat> list_img(5); // 用于存放数码管数字图片
if (!flag[0]) {
    // 上一次激活失败，则更新数码管数字
    default_random_engine e(static_cast<unsigned int>(random_seed));
    random_seed = (random_seed + 1) >= 65535 ? 0 : random_seed + 1; // 更新seed
    shuffle(digit_img_list.begin(), digit_img_list.end(), e); // 随机排列 digit_img_list 中的元素
    for (size_t i = 0; i < list_img.size(); i++)
    {
        stringstream str; // 用字符串流获取图片路径
        str << DIGIT_IMG_DIR << digit_img_list[i] << ".png";
        String s = str.str();
        // 取 digit_img_list 中的前5项
        Mat temp_img = imread(s);
        Mat digit_img = src_img(digit_num[i]);
        resize(temp_img, digit_img, Size(UNIT_W, UNIT_H*1.75));
    }
}
```
### 九宫格区域
设置手写数字
``` cpp
random_seed = (random_seed + 1) >= 65535 ? 0 : random_seed + 1; // 更新seed
if (!flag[1]) {
    default_random_engine e(static_cast<unsigned int>(random_seed));
    shuffle(minst_img_list.begin(), minst_img_list.end(), e);
    random_seed = (random_seed + 1) >= 65535 ? 0 : random_seed + 1; // 更新seed
    for (size_t i = 0; i < mnist_num.size(); i++)
    {
        // 每个格的数字都在100张图片中随机
        int num = get_random(1, 96, random_seed);
        random_seed = (random_seed + 1) >= 65535 ? 0 : random_seed + 1; // 更新seed
        // 根据随机列表排列九宫格
        stringstream str;
        str << MINST_IMG_DIR << minst_img_list[i] << "/" << num << ".png";
        String s = str.str();
        Mat temp_img = imread(s);
        Mat handwirting_img = src_img(mnist_num[i]);
        resize(temp_img, handwirting_img, Size(4 * UNIT_W, _H));
    }
}
else {
    for (size_t i = 0; i < mnist_num.size(); i++)
    {
        Mat temp_img = imread("./img/wolf-logo.jpg");
        Mat wolf_logo_img = src_img(mnist_num[i]);
        resize(temp_img, wolf_logo_img, Size(4 * UNIT_W, _H));
    }
}
```

## 导出视频流


## 最终效果


## 完整代码
链接