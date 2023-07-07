---
id: cv-object-detection-evaluation
title: ''
sidebar_label: 评估指标
---

## TP、FP、TN、FN

| 预测\真实| 正样本 | 负样本 |
|-------------|-----------|-----------|
| 正样本 | TP | FP |
| 负样本 | FN | TN |

- TP(True Positive) 正样本被正确识别的数量（预测结果为正样本，实际也为正样本）
- FP(False Positive) 被误识别的负样本的数量（预测结果为正样本，实际为负样本）
- TN(True Negative) 负样本被正确识别的数量 （预测结果为负样本，实际也为负样本）
- FN(False Negative) 被漏识别的正样本数量 （预测结果为负样本，实际为正样本）

TP + FN = 真实正样本总和 （正确、漏识别的正样本）
FP + TN = 真实负样本总和 （正确、误识别的负样本）
TP + TN = 正确分类的样本总和 （正确识别的正、负样本）

## Accuracy 准确率

**预测正确的样本比例**

$$
Accuracy = \frac{(TP + TN)}{样本总数}
$$

## Precision 查准率（精确率）

**预测正确的正样本的准确度**，Precision 越大说明误检的越少，Precision 越小说明误检的越多

$$
Precision = \frac{TP}{(TP + FP)}
$$

## Recall 查全率（召回率）

**预测正确的正样本的覆盖率**，Recall 越大说明漏检的越少，Recall 越小说明漏检的越多

$$
Recall = \frac{TP}{(TP + FN)}
$$

`TP + FN` 实际就是 Ground Truth 的数量（真实样本总和）

## AP (Average Precision) 平均精度
**以 Recall 为横轴，Precision 为纵轴，就可以画出一条 PR 曲线，PR 曲线下的面积就定义为 AP**

$$
AP = \int_{0}^{1} P(r) dr
$$

由于积分不好计算，引入插值法

$$
AP = \sum\nolimits_{k=1}^{N} max_{\widetilde{k} \geq k} P(\widetilde{k}) \Delta r(k)
$$


## mAP 
**AP 是计算某一类 PR 曲线下的面积，mAP 则是计算所有类别 PR 曲线下面积的平均值**



## 参考
- **[amusi/Deep-Learning-Interview-Book/blob/master/docs/计算机视觉.md#map](https://github.com/amusi/Deep-Learning-Interview-Book/blob/master/docs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%A7%86%E8%A7%89.md#map)**
- **[AP，mAP计算详解（代码全解）](https://zhuanlan.zhihu.com/p/70667071)**
