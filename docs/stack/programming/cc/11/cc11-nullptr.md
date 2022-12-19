---
id: cc-11-nullptr
title: C++11 nullptr
sidebar_label: nullptr
---

## `NULL`、`nullptr`、`0` 的区别
**NULL**的定义
``` cpp
#ifndef __cplusplus
#define NULL ((void *)0)
#else   /* C++ */
#define NULL 0
```
在C++中，**NULL**被直接定义为 **`0`**，这样在函数重载时用**NULL**表示空指针则会出现问题
``` cpp
void function(int a, int *pb);    // 原函数
void function(int a, int pb);    // 重载
function(a, NULL);
```
也就是说**NULL**在程序中具有二义性，C++11引入了 **`nullptr`** 关键字来代指空指针

**`nullptr`** 是指针类型，不能转换为整型，但是C++11仍热允许使用 **`0`** 来表示空指针， 因此 **`nullptr == 0`** 为 **true**，但是使用 **nullptr** 会有更高的安全性