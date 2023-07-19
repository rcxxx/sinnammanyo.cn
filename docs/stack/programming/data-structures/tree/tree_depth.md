---
id: data-structures-tree-depth
title: 二叉树的深度
sidebar_label: 二叉树的深度
---

## 相关题目
> [#104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
> 
> [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)
>
> 来源：力扣（LeetCode）
>

## 最大深度
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。
```
示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7

返回它的最大深度 3 
```

根据二叉树的层序遍历的思想，二叉树的最大深度就等于其层数
- 创建一个 $result$ 用于维护树的最大深度，每当遍历到树的新一层，将 $result$ 加一
- 遍历完整棵树，返回 $result$

``` cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        int result = 0;
        if(root == nullptr) {
            return result;
        }
        queue<TreeNode*> que;
        que.push(root);
        
        while(!que.empty()) {
            result++;
            int n = que.size();
            // 将子节点上的非空节点填入队列
            for(int i = 0; i < n ; ++i) {
                TreeNode* node = que.front();
                que.pop();
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

## 最小深度
给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

```
示例：

    3
   / \
  9  20
    /  \
   15   7

输入：root = [3,9,20,null,null,15,7]
输出：2
```

同样可以用层序遍历的思想
- 创建一个 $result$ 用于维护树的最大深度，每当遍历到树的新一层，将 $result$ 加一
- 当遍历到第一个叶子节点时，返回 $result$ ，此时 $result$ 为最小深度
- 遍历完整棵树，返回 $result$ ，此时最小深度等于最大深度

``` cpp
class Solution {
public:
    int minDepth(TreeNode* root) {
        int result = 0;
        if(root == nullptr) {
            return result;
        }

        queue<TreeNode*> que;
        que.push(root);

        while(!que.empty()) {
            int n = que.size();
            result++;
            for (int i = 0; i < n; ++i) {
                TreeNode* node = que.front();
                que.pop();
                if(node->left != nullptr) {
                    que.push(node->left);
                }
                if(node->right != nullptr) {
                    que.push(node->right);
                }
                if(node->left == nullptr && node->right == nullptr) {
                    return result;
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
