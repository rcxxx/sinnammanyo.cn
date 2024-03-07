---
id: vslam-evo
title: 轨迹评估工具 evo 的安装与使用
sidebar_label: evo
---

## 项目地址

- **[MichaelGrupp/evo](https://github.com/MichaelGrupp/evo)**

### 安装

evo 是一个用于视觉里程计和 slam 问题的轨迹评估工具，以 Python 工具包的形式安装，可以直接从 pip 安装

``` bash
pip install evo --upgrade --no-binary evo
```

或者克隆源码后进行本地安装

``` bash
git clone https://github.com/MichaelGrupp/evo.git
pip install --editable . --upgrade --no-binary evo
```

### 使用

克隆源码后的 `test/data` 目录下有一些用来测试的轨迹文件，使用 KITTI 数据集的格式
- `KITTI_00_gt.txt`,`KITTI_00_ORB.txt`,`KITTI_00_SPTAM.txt`

#### 绘制轨迹
`evo_traj` 用于绘制轨迹，可同时绘制多条轨迹

``` bash
cd test/data
evo_traj kitti KITTI_00_ORB.txt KITTI_00_SPTAM.txt --ref=KITTI_00_gt.txt -p --plot_mode=xz
```
- 同时绘制 `KITTI_00_ORB.txt`,`KITTI_00_SPTAM.txt` 两条轨迹，并以 `KITTI_00_gt.txt` 作为参考（虚线）
- `--plot_mode=xz` 表示仅在 `xz` 平面绘制

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/vslam/evo/evo_traj_kitti.png)

- 其他格式轨迹的绘制

```
evo_traj tum trac_all.txt --plot
```

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/vslam/evo/evo_traj_tum_plot.png)
