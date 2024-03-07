---
id: cv-object-detection-nms
title: ''
sidebar_label: NMS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## NMS 非极大值抑制
- NMS(Non-Maximum Suppression)

目标检测中常用的一种后处理技术，用于消除多余的重叠检测框，保留最有可能的目标框

**处理步骤**
1. 将所有检测框按置信度排序
2. 从得分最高的检测框开始，遍历其余检测框
3. 计算当前检测框与任意一个被保留的检测框的IOU，若IOU大于阈值则删除当前框，否则保留
4. 重复 2~3 直至所有检测框都处理完成

## 代码实现

<Tabs
defaultValue="cpp"
values={[
    {label: 'Python', value: 'py'},
    {label: 'C++', value: 'cpp'},
]}>
<TabItem value="py">

``` py
def nms(boxes, scores, th):
    # 获取坐标和分数
    x_1 = boxes[:, 0]
    y_1 = boxes[:, 1]
    x_2 = boxes[:, 2]
    y_2 = boxes[:, 3]

    # 每个 box 的面积 用于计算 iou
    areas = (x_2 - x_1 + 1.0) * (y_2 - y_1 + 1.0)

    # 按照分数降序排序
    order = scores.argsort()[::-1]

    keep = []
    while order.size > 0:
        # 保留分数最高的框
        i = order[0]
        keep.append(i)

        # 获得与当前框 iou 值大于 th 的索引
        xx_1 = np.maximum(x_1[i], x_1[order[1:]])
        yy_1 = np.maximum(y_1[i], y_1[order[1:]])
        xx_2 = np.minimum(x_2[i], x_2[order[1:]])
        yy_2 = np.minimum(y_2[i], y_2[order[1:]])
        inter = np.maximum(0.0, xx_2 - xx_1 + 1.0) * np.maximum(0.0, yy_2 - yy_1 + 1.0)
        iou = i / (areas[i] + areas[order[1:]] - inter)

        # 保留IoU值小于阈值的框
        inds = np.where(iou <= threshold)[0]
        order = order[inds + 1]

    return keep
```

</TabItem>
<TabItem value="cpp">

``` cpp
#include <iostream>
#include <vector>
#include <algorithm>

struct Box {
    float x_1, y_1, x_2, y_2, score;
};

float iou(const Box& box_1, const Box& box_2) {
    float tl_x = std::max(box_1.x_1, box_2.x_1);
    float tl_y = std::max(box_1.y_1, box_2.y_1);
    float br_x = std::min(box_1.x_2, box_2.x_2);
    float br_y = std::min(box_1.y_2, box_2.y_2);

    float i = std::max(0.0f, br_x - tl_x + 1.0f) * std::max(0.0f, br_y - tl_y + 1.0f);

    float area_1 = (box_1.x_2 - box_1.x_1 + 1.0f) * (box_1.y_2 - box_1.y_1 + 1.0f);
    float area_2 = (box_2.x_2 - box_2.x_1 + 1.0f) * (box_2.y_2 - box_2.y_1 + 1.0f);
    float u = area_1 + area_2 - i;

    float iou = i / u;
    return iou;
}

void nms(std::vector<Box>& boxes, float th) {
    // 按照分数降序排序
    std::sort(boxes.begin(), boxes.end(), [](const Box& box_1, const Box& box_2) {
        return box_1.score > box_2.score;
    });

    std::vector<int> indices;
    for (int i = 0; i < boxes.size(); ++i) {
        bool keep = true;
        for (int j = 0; j < indices.size(); ++j) {
            if (iou(boxes[i], boxes[indices[j]]) > th) {
                keep = false;
                break;
            }
        }
        if (keep) {
            indices.push_back(i);
        }
    }

    std::vector<Box> output_boxes;
    for (int i = 0; i < indices.size(); ++i) {
        output_boxes.push_back(boxes[indices[i]]);
    }

    boxes = output_boxes;
}
```

</TabItem>
</Tabs>

NMS的阈值通常是在0.3到0.7之间选择，可以根据具体应用场景进行调整。NMS可以有效地消除多余的检测框，提高目标检测的准确率和效率

## 参考

