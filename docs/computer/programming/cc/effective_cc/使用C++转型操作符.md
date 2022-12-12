---
id:  prefer-cc-style-cast
title: ""
sidebar_label: 转型操作符
---

# 最好使用 C++ 转型操作符

C风格的转型操作符

- `(type)expression`

C++ 引入 4 个新的转型操作符（cast operators）：`static_cast` , `const_cast` , `dynamic_cast` , `reinterpret_cast`

使用新的转型操作符应该将代码改写为

- `static_cast<type>(expression)`

举个例子，想要将一个 `int` 型变量转型为 `double` 型变量，强迫表达式输出浮点型

``` cpp
int num_1, num_2;

double result = ((double)num_1) / num_2;        // C 风格类型转换

// 如果采用 C++ 转型操作符
double result_2 = static_cast<double>(num_1) / num_2;
```

使用 C++ 的转型操作符，更容易被辨识出来

---

**`static_cast`** 基本上与旧式的类型转换功能相似，也具有相同的限制，例如不能将一个 `double` 转型为 `pointer` ，不能将 `struct` 转型为 `int`

- `static_cast` 甚至不能移除表达式的常量性（constness），因为有一个新的转型操作符 `const_cast` 专司起职

**其他新式 C++ 转型操作符适用于更集中的目的**

**`const_cast`** 用来改变表达式中的 `常量性（constness）` 或 `变易性（volatileness）` ，使用 `const_cast` 是一种强调，使用这个操作符只用来改变某物的常量性或变易形，如果将 `const_cast` 用于其他用途，转型操作会被拒绝


**`dynamic_cast`** 用来执行继承体系中的 "安全向下转型或跨系转型动作" ，也就是说，可以利用 `dynamic_cast` 将指向基类的指针或引用转型为指向派生类的指针或引用，并能得知是否转型成功，如果转型失败，会以一个空指针（当转型对象是指针）或一个 `exception` （当转型对象是 reference）表现出来

``` cpp

```

**``**

