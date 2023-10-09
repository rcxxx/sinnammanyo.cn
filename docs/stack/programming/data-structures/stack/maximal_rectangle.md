---
id: algorithm-hard-85-maximal-rectangle
title: LeetCode-困难-85 最大矩形
sidebar_label: 最大矩形
---

## 题目描述

>   来源：力扣（LeetCode）
>   链接：https://leetcode.cn/problems/maximal-rectangle/

给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

示例1：
```
输入：matrix = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]]

输出：6
```

## 题解

**1. 构造柱状图**

创建一个同样大小的描述矩阵，以 行 -> 列 的方式遍历输入矩阵，并更新描述矩阵的值，更新当前元素的值为同一行中，左侧连续为 `1` 的元素的个数

假设输入矩阵如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cc-algorithm/stack/maximal_rectangle/input_matrix.png)

假设输入矩阵定义为 `matrix = std::vector<std::vector<char>>()`，对该矩阵进行遍历，并更新描述矩阵

``` cpp
int rows = matrix.size();
int cols = matrix[0].size();
std::vector<std::vector<int>> maximum_width(rows, std::vector<int>(cols, 0));


for(int i = 0; i < rows; ++i) {
    // 第 i 行
    for(int j = 0; j < cols; ++j) {
        if(matrix[i][j] == '1'){
            maximum_width[i][j] = (j == 0 ? 0 : maximum_width[i][j-1]) + 1;
        }
    }
}
```

以 行 -> 列 的方式遍历，对于描述矩阵中的每一个元素，都将其值更新为当前位置下，同一行内左侧连续的 1 的个数，遍历后，描述矩阵更新为如下结果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cc-algorithm/stack/maximal_rectangle/max_width_matrix.png)

不难发现，描述矩阵中信息即为，当前位置能组成的矩形的最大宽度，只需要在得到对应位置能满足的最大高度，即可求出矩形面积

接下来以 列 -> 行 的方式处理描述矩阵，对于每一列，用单调栈的方式，自上而下维护容器 up，再自下而上维护容器 down

``` cpp
for (int j = 0; j < cols; ++j) {
    std::stack<int> mono_st;
    std::vector<int> up(rows, 0);
    for (int i = 0; i < rows; ++i) {
        while (!mono_st.empty() && maximum_width[mono_st.top()][j] >= maximum_width[i][j]) {
            mono_st.pop();
        }

        up[i] = mono_st.empty() ? 0 : mono_st.top() + 1;
        mono_st.push(i);
    }
}
```

以第七列为例，栈内元素以及 `up` 变化如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cc-algorithm/stack/maximal_rectangle/seventh_col_max_width_matrix.png)

| step(row) | up[i] | mono_st |
|:-----:|:-----:|:-------|
|0      |0      |0|
|1      |0 + 1  |0, 1|
|2      |0 + 1  |0, 2|
|3      |2 + 1  |0, 2, 3|
|4      |3 + 1  |0, 2, 3, 4|
|5      |3 + 1  |0, 2, 3, 5|
|6      |3 + 1  |0, 2, 3, 6|
|7      |2 + 1  |0, 2, 7|
|8      |0      |8|
|9      |0      |9|

同样的方法，自下而上的维护 `down`

对整个描述矩阵 `maximum_width` 执行遍历后，能得到一个由每一列 `up/down` 组成的矩阵

- `up_matrix`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cc-algorithm/stack/maximal_rectangle/max_up_matrix.png)

- `down_matrix`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/cc-algorithm/stack/maximal_rectangle/max_down_matrix.png)

对于每一个元素位置， `maximum_width` 中所维护的为当前位置能组成的最大矩形的宽度，而 `up_matrix/down_matrix` 中维护的元素相减，则能得到当前位置能组成的最大矩形的高度，二者相乘，则能得到最大面积

- 题解代码

``` cpp
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {

        int rows = matrix.size();
        
        if (rows == 0) {
            return 0;
        }
        int cols = matrix[0].size();
        std::vector<std::vector<int>> maximum_width(rows, std::vector<int>(cols, 0));


        for(int i = 0; i < rows; ++i) {
            // 第 i 行
            for(int j = 0; j < cols; ++j) {
                if(matrix[i][j] == '1'){
                    maximum_width[i][j] = (j == 0 ? 0 : maximum_width[i][j-1]) + 1;
                }
            }
        }

        int max_area = 0;
        for (int j = 0; j < cols; ++j) {
            std::stack<int> mono_st;
            std::vector<int> up(rows, 0);
            for (int i = 0; i < rows; ++i) {
                while (!mono_st.empty() && maximum_width[mono_st.top()][j] >= maximum_width[i][j]) {
                    mono_st.pop();
                }

                up[i] = mono_st.empty() ? 0 : mono_st.top() + 1;
                mono_st.push(i);
            }

            mono_st = std::stack<int>();
            std::vector<int> down(rows, 0);
            for (int i = rows - 1; i >= 0; i--) {
                while (!mono_st.empty() && maximum_width[mono_st.top()][j] >= maximum_width[i][j]) {
                    mono_st.pop();
                }

                down[i] = mono_st.empty() ? rows : mono_st.top();
                mono_st.push(i);
            }

            for (int i = 0; i < rows; ++i) {
                int height = down[i] - up[i];
                int width = maximum_width[i][j];
                int area = width * height;
                max_area = max(max_area, area);
            }
        }

        return max_area;
    }
};
```

|Name|Value|
|:-:|:-:|
|时间复杂度| $O(mn)$|
|空间复杂度| $O(mn)$ |

- m 和 n 为矩阵的大小
