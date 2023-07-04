---
id: cv-common-iou
title: ''
sidebar_label: IOU
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## IOU 重叠度/交并比

- 代码实现

<Tabs
defaultValue="py"
values={[
    {label: 'Python', value: 'py'},
    {label: 'C++', value: 'cpp'},
]}>
<TabItem value="py">

``` py
"""
      (0, 1)
     .----------
    |           |
    |    (0, 1) |
    | b_1   .---|-------
    |      |////|  b_2  |
    |      |////|       |
     -----------.       |
           |   (2, 3)   |
           |            |
            ------------.(2, 3)

    tl = (max(b_1[0], b_2[0]), max(b_1[1], b_2[1]))
    br = (min(b_1[2], b_2[2]), min(b_1[3], b_2[3]))
"""
def iou(box_1, box_2):
    """
    return iou score between pred / gt box
    :param box_1: predict bbox coordinate
    :param box_2: ground truth bbox coordinate
    :return: iou score
    """
    tl_x = max(box_1[0], box_2[0])
    tl_y = max(box_1[1], box_2[1])
    br_x = min(box_1[2], box_2[2])
    br_y = min(box_1[3], box_2[3])
    # intersection
    i = max(0.0, br_x - tl_x + 1.0) * max(0.0, br_y - tl_y + 1.0)

    # union = area_box_1 + area_box_2 - i
    area_1 = (box_1[2] - box_1[0] + 1.0) * (box_1[3] - box_1[1] + 1.0)
    area_2 = (box_2[2] - box_2[0] + 1.0) * (box_2[3] - box_2[1] + 1.0)
    u = area_1 + area_2 - i

    # iou
    iou = i / u
    return iou
```

</TabItem>
<TabItem value="cpp">

``` cpp
#include <iostream>
#include <algorithm>

/*
      (0, 1)
     .----------
    |           |
    |    (0, 1) |
    | b_1   .---|-------
    |      |////|  b_2  |
    |      |////|       |
     -----------.       |
           |   (2, 3)   |
           |            |
            ------------.(2, 3)

    tl = (max(b_1[0], b_2[0]), max(b_1[1], b_2[1]))
    br = (min(b_1[2], b_2[2]), min(b_1[3], b_2[3]))
*/
/**
 * @brief: return iou score between pred / gt box
 * @param box_1: predict bbox coordinate
 * @param box_2: ground truth bbox coordinate
 * @return: iou score
 */
float iou(const float* box_1, const float* box_2) {
    float tl_x = std::max(box_1[0], box_2[0]);
    float tl_y = std::max(box_1[1], box_2[1]);
    float br_x = std::min(box_1[2], box_2[2]);
    float br_y = std::min(box_1[3], box_2[3]);

    float i = std::max(0.0f, br_x - tl_x + 1.0f) * std::max(0.0f, br_y - tl_y + 1.0f);

    float area_1 = (box_1[2] - box_1[0] + 1.0f) * (box_1[3] - box_1[1] + 1.0f);
    float area_2 = (box_2[2] - box_2[0] + 1.0f) * (box_2[3] - box_2[1] + 1.0f);
    float u = area_1 + area_2 - i;

    float iou = i / u;
    return iou;
}
```

</TabItem>
</Tabs>



## 参考
- **[amusi/Deep-Learning-Interview-Book/blob/master/docs/计算机视觉.md#iou](https://github.com/amusi/Deep-Learning-Interview-Book/blob/master/docs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%A7%86%E8%A7%89.md#iou)**
- **[目标检测之 IoU](https://blog.csdn.net/u014061630/article/details/82818112)**
