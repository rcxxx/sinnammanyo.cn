---
id: fusion360-rack-and-pinion
title: ''
sidebar_label: '齿轮 & 齿条'
---

## Fusion360 绘制齿轮以及齿条

### 标准齿轮 —— SpurGear 脚本
`fusion 360` 默认提供了一个绘制齿轮的工具脚本 `SpurGear`，在 `实用程序` -> `附加模块` 中

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/fusion360/SpurGear-postation.png)

运行脚本，将弹出一个参数输入的界面，分别为
  - Standard —— 标准，选择公制尺寸还是英制尺寸
  - Pressure Angle —— 压力角
  - Module —— 模数
  - Number of Teeth —— 齿数
  - Backlash —— 齿隙，齿轮啮合时的间隙，越大齿越薄
  - Root Fillet Radius —— 齿根处的圆角的半径
  - Gear Thickness —— 齿轮厚度
  - Hole Diameter —— 中心孔径
  - Pitch Diameter —— 节径，为自动计算 模数 x 齿数
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/fusion360/SpurGear-run.png)

假设**齿轮模数为0.5、齿数为40、厚度为 4mm、中心孔径为3**绘制齿轮，再绘制一个**齿数为20**的齿轮

移动使其啮合

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/fusion360/draw-Gear.png)

### 绘制齿条
参照 —— **[如何科学地绘制齿轮(上):齿轮的基本概念/绘制齿条](https://zhuanlan.zhihu.com/p/271932267)**

需要确定齿条的参数
  - 压力角
  - 齿顶高=模数
  - 齿根高=模数 * 1.25
  - 齿距 = π * 模数

知道这些参数之后，绘制齿条的草图如下

1. 绘制参考直线①，过齿轮中心点垂直向下
2. 绘制分度线，垂直于直线①，与齿轮的节径圆相切
3. 由分度线与直线①的交点绘制角度等于压力角的线段与齿相交
4. 交点绘制圆与齿相切，就是 3 中的交点，如果需要齿隙则创建偏移
5. 创建分度线的偏移，向上偏移等于模数，作为齿顶高度，向下偏移等于模数 x 1.25，作为齿根高度
6. 创建直线由齿顶到齿根，与 4 中的圆相切，与直线①的夹角等于压力角
7. 创建 6 中直线的镜像，并连接封闭两条直线
   
**齿条的一个齿就创建完毕**

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/fusion360/rack-sketch.png)

创建拉伸，创建阵列，创建连接，齿条绘制完成

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/fusion360/rack-done.png)

## 参考
- **[Spur Gear Creator](https://apps.autodesk.com/FUSION/en/Detail/Index?id=5355334763669244824)**
- **[Fusion 360 Rack and Pinion Tutorial](https://knowledge.autodesk.com/support/fusion-360/learn-explore/caas/screencast/Main/Details/a7992d99-5d4d-48c2-b971-a86ba3014608.html)**
- **[【Fusion360】Sper Gear(平歯車)を作ってCAD上で動かしてみる！](https://burariweb.info/gadget/3d-printer/fusion360-super-gear-creation.html)**
- **[如何科学地绘制齿轮(上):齿轮的基本概念/绘制齿条](https://zhuanlan.zhihu.com/p/271932267)**