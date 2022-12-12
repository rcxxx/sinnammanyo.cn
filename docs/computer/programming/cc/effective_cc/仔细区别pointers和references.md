---
id:  distinguish-pointers-reference
title: ""
sidebar_label: 指针和引用
---

# 1.仔细区别 pointers 和 references

pointers（指针） 和 references（引用） 使用起来不一样

- pointers 使用 `*` 和 `->` 
- references 使用 `.` 

但是它们似乎实现类似的功能，无论是 pointers 还是 references 都使你间接参考其他对象，应该如何区分和使用？

首先，我们必须知道，不存在 **空引用** `null reference` ，一个 reference 必须总是代表某个对象

- 如果有一个变量一定指向（代表）某个对象，那么就要用 reference 
- 如果这个变量可能指向（代表）某个对象，也有可能不指向（代表）任何对象，就要用 pointers

由于 reference 一定要代表某个对象，C++ 要求 reference 必须有初始值

``` cpp
string& rs;         // 错误的初始化 reference 必须有初始值
string s("abc");
string& rs = s;     // 正常 rs 指向 s
```

pointers 没有这样的限制

``` cpp
string *ps;         // 未初始化的指针，虽然有效但风险高
```

---

由于 reference 不能为空，意味着使用 reference 可能会比 pointers 更富有效率，因为使用 reference 之前不需要测试它是否有效

``` cpp
void printDouble(const double& rd)
{
    cout << rd;     // 不需要测试 rd 是否有效，一定代表某个double
}
```

使用 pointers 时通常需要测试它是否为 null

``` cpp
void printDouble(const double *pd)
{
    if (pd) {       // 检查是否为 null pointer
        cout << *pd;
    }
}
```

---

pointers 与 reference 之间的另一个差异就是，pointers 可以被重新赋值，指向另一个对象，reference 却总是指向（代表）它最初获得的对象

``` cpp
string s1("张三");
string s2("李四");

string& rs = s1;    // rs 代表 s1
string *ps = &s1;   // ps 指向 s1
rs = s2;            // rs 仍代表 s1 ，但 s1 的值现在变成了 "李四"

ps = &s2;           // ps 指向 s2 ，s1 没有变化
```

## 总结

**pointers**
- 当需要考虑 "不指向任何对象" 的可能性时，应该使用 pointers
- 当需要考虑 "在不同时间指向不同对象" 的能力时，应该使用 pointers

**reference**
- 当确定 "总是会代表某个对象" ，而且 "一旦代表了该对象就不再改变" ，应该使用 reference

:::note 结论
当需要指向某个对象，而且绝对不会改变指向其他对象，或者是实现一个操作符而其语法需求无法由 pointers 达成，就应该选择 reference 。任何其他时候，都应该使用 pointers
:::

## 拓展
有一些其他情况也需要使用 reference ，例如实现某些操作符

最常见的例子是 `operator[]` ，这个操作符要求必须返回某种 "能够被当作 assignment 赋值对象" 的东西

``` cpp
vector<int> v(10);      // 产生一个 int vector ，大小为 10

v[5] = 10;              // assignment 的赋值对象是 operator[] 的返回值
```

如果 `operator[]` 返回 pointer ，则应该写为

``` cpp
*v[5] = 10;
```

## 参考
- 《More Effective C++》
