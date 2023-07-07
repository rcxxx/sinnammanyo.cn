---
id: data-structures-linkedlist
title: 链表
sidebar_label: 链表
---

## 关于链表
链表是同过指针关联在一起的线性存储结构，链表上的每一个元素称为一个节点 `node`

每个节点由两部分组成
- 数据域（用于存放数据）
- 指针域（用于存放关联其他节点的指针）

链表的特点：
- 动态内存分配，空间利用率高，存储空间不连续
- 随机访问性能差

### 单链表
指针域中只有一个指针指向链表的下一个节点，末尾节点的指针指向空 `nullptr`

- 链表的定义如下 —— C++

``` cpp
// 单链表
struct ListNode {
    int val;  // 节点上存储的元素
    ListNode *next;  // 指向下一个节点的指针
    ListNode(int x) : val(x), next(NULL) {}  // 节点的构造函数
};
```

- 表头插入节点

``` cpp
void insertAtHead(ListNode*& head, int data) {
    ListNode* new_head = new Node(data);
    new_head->next = head;
    head = new_head;
}
```

- 表尾插入节点

``` cpp
void insertAtTail(ListNode*& head, int data) {
    ListNode* new_node = new Node(data);
    if (head == nullptr) {
        head = new_node;
    } else {
        ListNode* tail = head;
        while (tail->next != nullptr) {
            tail = tail->next;
        }
        tail->next = new_node;
    }
}
```

- 表中插入节点

``` cpp
void insertAtP(ListNode*& head, int data, int position) {
    ListNode* new_node = new Node(data);
    if (head == nullptr || position == 0) {
        insertAtHead(head, data);
    } else {
        ListNode* curr = head;  
        while (0 < position-- && tail->next != nullptr) {
            curr = curr->next;
        }
        new_node->next = curr->next;
        curr->next = new_node;
    }
}
```

- 删除节点

``` cpp
ListNode* tmp = head;
head = head->next;
delete tmp;
```

### 双链表

### 循环链表