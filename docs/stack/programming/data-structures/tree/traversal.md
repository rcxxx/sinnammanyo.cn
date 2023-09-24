---
id: data-structures-tree-traversal
title: 二叉树的遍历
sidebar_label: 遍历
---

## 相关题目
> [#94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)
> 
> [#144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
> 
> [#145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)
> 

---

## 递归遍历
二叉树的遍历天然就具有递归性质，我们可以创建一个递归函数来模拟

``` cpp
void traversal(TreeNode* cur) {
    if(cur==nullptr) {
        return;
    }
    traversal(cur->left, v);   
    traversal(cur->right, v);
}
```
|Name|Value|
|:-:|:-:|
|时间复杂度| $O(n)$ |
|空间复杂度| $O(n)$ |

- 空间复杂度为递归过程中栈的开销，平均情况为 $O(\log n)$，最坏情况下树呈链状，空间复杂度为 $O(n)$

### 前序
前序遍历的访问顺序：根节点 -> 左子树 -> 右子树，当访问到左/右子树时用同样的顺序遍历

``` cpp
class Solution {
public:
    void traversal(TreeNode* cur, vector<int>& v) {
        if(cur==nullptr) {
            return;
        }
        // 中 - 左 - 右
        v.push_back(cur->val);
        traversal(cur->left, v);   
        traversal(cur->right, v);
    }

    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> v;
        traversal(root, v);
        return v;
    }
};
```

### 中序
中序遍历的访问顺序：左子树 -> 根节点 -> 右子树，当访问到左/右子树时用同样的顺序遍历

``` cpp
class Solution {
public:
    void traversal(TreeNode* cur, vector<int>& v) {
        if(cur==nullptr) {
            return;
        }
        // 左 - 中 - 右
        traversal(cur->left, v);   
        v.push_back(cur->val);
        traversal(cur->right, v);
    }

    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> v;
        traversal(root, v);
        return v;
    }
};
```

### 后序
后序遍历的访问顺序：左子树 -> 右子树 -> 根节点，当访问到左/右子树时用同样的顺序遍历

``` cpp
class Solution {
public:
    void traversal(TreeNode* cur, vector<int>& v) {
        if(cur==nullptr) {
            return;
        }
        // 左 - 右 - 中
        traversal(cur->left, v);
        traversal(cur->right, v); 
        v.push_back(cur->val);
    }

    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> v;
        traversal(root, v);
        return v;
    }
};
```

- 递归遍历中的前、中、后序遍历的区别，在于递归函数的调用顺序

---

## 迭代遍历
迭代法与递归思路相同，区别在于递归时隐式的维护了一个栈，迭代时需要显式的将这个栈创建出来
### 前序
按照前序遍历的访问顺序：根节点 -> 左子树 -> 右子树，当访问到当前节点不为空时，将其 `val` 添加进数组，然后将其入栈，将节点往左子树迭代，重复操作直到左子树为空，获取栈顶，并向其右子树迭代

``` cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode *root) {
        vector<int> res;
        if (root == nullptr) {
            return res;
        }

        stack<TreeNode*> st;
        TreeNode* node = root;
        while(!st.empty() || node != nullptr) {
            while(node != nullptr) {
                res.push_back(node->val);
                st.push(node);
                node = node->left;
            }

            node = st.top();
            st.pop();
            node = node->right;
        }

        return res;
    }
};
```

### 中序
按照中序遍历的访问顺序：左子树 -> 根节点 -> 右子树，假如左子树不为空，将其入栈，并向左子树继续迭代，当左子树为空时，当前栈顶则为根节点，将其值存入数组，并向右子树迭代

``` cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* node = root;
        while (!st.empty() || node != nullptr) {
            while (node != nullptr) {
                st.push(node);
                node = node->left;
            }
            node = st.top();
            st.pop();
            res.push_back(node->val);
            node = node->right;
        }
        return res;
    }
};
```

### 后序
按照后序遍历的访问顺序：左子树 -> 右子树 -> 根节点，当左子树不为空时，将节点入栈，并向左子树迭代，当左子树为空时，获取栈顶的节点，判断其右子树，

``` cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* node = root;
        TreeNode* prev = nullptr;
        while (!st.empty() || node != nullptr) {
            while (node != nullptr) {
                st.push(node);
                node = node->left;
            }
            node = st.top();
            st.pop();

            if (node->right == nullptr || node->right == prev) {
                res.push_back(node->val);
                prev = node;
                node = nullptr;
            } else {
                st.push(node);
                node = node->right;
            }            
        }
        return res;
    }
};
```

---

<!-- ## Morris 遍历
Morris 可以将非递归的二叉树遍历空间复杂度将为 $O(1)$

### 前序

### 中序

### 后序 -->

