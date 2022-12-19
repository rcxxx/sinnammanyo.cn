---
id: cc-11-auto
title: C++11 auto、decltype
sidebar_label: auto、decltype
---
## 简化声明
**C++11** 提供了多种简化声明的功能，尤其在使用模板时

### auto
在 **C++98** 中，关键字 **`auto`** 是一个存储类型说明符，**C++11** 将其用于实现自动类型推断

在初始化声明中，如果使用关键字 **`auto`**，而不指定变量类型，编译器将把变量的类型设置成与初始值相同

``` cpp title="eg."
auto n = 100; // int
auto x = 1.5; // double
auto y = 1.3e12L // long double
```

- **auto 变量必须在定义时初始化**

但是 **`auto`** 并不是为了这种简单的情况设计的，处理复杂类型时，才能体现 **`auto`** 的优势

例如标准库模块（STL）中的类型

``` cpp title="eg."
// C++98
std::vector<double> scores;
std::vector<double>::iterator pv = scores.begin();
// C++11 允许以如下方式重写
std::vector<double> scores;
auto pv = scores.begin();
```

**`auto`** 用于定义模板函数

例如定义一个求乘积的函数模板

``` cpp title="eg."
template <typename T1,typename T2>
void Multiply(T1 x, T2 y) {
    auto result = x * y;
    std::cout << result;
}
``` 

- 如果没有 **`auto`** **result** 的类型定义将会变得很繁琐

#### auto：引用、指针和const
- 在 **`C++11`** 中，对于引用，**`auto`** 默认使用传值的方式，但是，也可以使用 **`&`** 修饰符强制使用引用
    
``` cpp
int& func();
auto a = func(); // int
auto& b = func(); // int&
```

- 如果有一个指针auto，它会自动成为一个指针类型，也可以显式指明该变量是一个指针
    
``` cpp
int* func();
auto p_a = func(); // int*
auto *p_b = func(); // int*
```

- 如果需要，可以在处理引用时，为auto添加const修饰符
    
``` cpp
int& func();
const auto& a = func(); // const int&
```

- const修饰符结合指针

``` cpp
int* func();
const int* const_func();
const auto* a = func(); // const int*
auto b = const_func(); // const int*
```

---

### `decltype`和新的返回值语法

#### 新的返回值语法：后置返回类型
- 在 **`C++11`** 中，你可以将返回值放在函数声明的最后，将auto放在返回值的位置

``` cpp
auto func(int x, int y) -> int;
```

#### `decltype`
### decltype
- auto允许用特殊的类型声明变量，decltype则允许从一个变量（或任何表达式）导出类型

关键字 **`decltype`** 将变量的类型声明为表达式指定的类型 **`decltype(x) y;`**
``` cpp title="eg."
int n;
double x;
decltype(x * n) y; // double
decltype(&x) z; // double *
```
根据使用的表达式，指定的类型可以为引用和 **`const`**
``` cpp title="eg."
int i = 3;
int &k = i;
const int &n = i;
decltype(n) j1; // const int &
decltype(i) j2; // int
decltype((i)) j3; // int &
decltype(k + 1) j4; // int
```

在定义模板时 **`decltype`** 将会很有用，因为模板要在实例化时才能确定类型
``` cpp
template<typename T1, typename T2>
void func(T t1, U t2){
    decltype(t1 * t2) t;
    // code
}
```

模板函数依赖于模板参数的返回值
    
``` cpp
template <typename T1,typename T2>
auto Multiply(T1 x, T2 y) -> decltype(T1 * T2) {
    return x * y;
}
```


