---
id: data-structures-tree-level-order
title: 二叉树的层序遍历
sidebar_label: 层序遍历
---

## 题目描述
> #102. 二叉树的层序遍历
> 
> 来源：力扣（LeetCode）
> 
> 链接：https://leetcode.cn/problems/binary-tree-level-order-traversal
> 

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）

```
示例 1:
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```

## 题解
二叉树的前中后序遍历利用了栈的结构，属于深度优先，要先获取到最深层的节点

二叉树的层序遍历属于广度优先，需要获取每一层的节点，需要用到队列

- 创建队列，取得根节点加入队列

``` cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        queue<TreeNode*> que;
        if(root != nullptr) {
            que.push(root);
        }
        vector<vector<int>> result;

        return result;
    }
};
```

- 队列非空，获取队列的长度 $n$ ，从队列中取出前 $n$ 个元素拓展队列

``` cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        queue<TreeNode*> que;
        if(root != nullptr) {
            que.push(root);
        }
        vector<vector<int>> result;
        while(!queue.empty()) {
            int n = queue.size();
            result.push_back(vecotr<int>());
            for(int i = 0; i < n ; ++i) {

            }
        }

        return result;
    }
};
```

- 每次取得元素时，将值填入 result 并判断左右子树是否非空，如果非空则将其填入队列

``` cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        queue<TreeNode*> que;
        if(root != nullptr) {
            que.push(root);
        }
        vector<vector<int>> result;
        
        while(!que.empty()) {
            int n = que.size();
            result.push_back(vector<int>());
            for(int i = 0; i < n ; ++i) {
                TreeNode* node = que.front();
                que.pop();
                result.back().push_back(node->val);
                if(node->left != nullptr) {
                    que.push(node->left);
                }
                if(node->right != nullptr) {
                    que.push(node->right);
                }
            }
        }
        return result;
    }
};
```
|Name|Value|
|:-:|:-:|
|时间复杂度| $O(n)$ |
|空间复杂度| $O(n)$ |

## 相关题目
> 107. 二叉树的层序遍历 II
> 
> 来源：力扣（LeetCode）
> 
> 链接：https://leetcode.cn/problems/binary-tree-level-order-traversal-ii

给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

```
示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]]
```

只需要将 二叉树层序遍历的结果数组进行翻转即可

``` cpp
reverse(result.begin(), result.end());
```

``` cpp
class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        queue<TreeNode*> que;
        if(root != nullptr) {
            que.push(root);
        }
        vector<vector<int>> result;
        
        while(!que.empty()) {
            int n = que.size();
            result.push_back(vector<int>());
            for(int i = 0; i < n ; ++i) {
                TreeNode* node = que.front();
                que.pop();
                result.back().push_back(node->val);
                if(node->left != nullptr) {
                    que.push(node->left);
                }
                if(node->right != nullptr) {
                    que.push(node->right);
                }
            }
        }
        reverse(result.begin(), result.end()); // 反转 result
        return result;
    }
};
```
|Name|Value|
|:-:|:-:|
|时间复杂度| $O(n)$ |
|空间复杂度| $O(n)$ |
