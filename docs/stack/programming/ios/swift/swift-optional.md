---
id: swift-optional
title: Swift 「!」 和 「?」 的区别
sidebar_label: 「!」 and 「?」
---

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/blog-screenshot/swift.jpeg)

### `!` 和 `?` 是啥

`!` 和 `?` 是 `Swift` 语言中对一种可选类型 `Optional`  操作的语法

**`可选类型`**
- `Swift` 中支持声明一个没有初始值的属性，定义通常是在类型后加上 `?` 来实现
  - 例如 `var name: String?`

`Optional` 是一个 `enum` ，里面有 `None` 和 `Some` 两种类型

- `Optional` 定义如下

``` swift
enum Optional<T> : LogicValue, Reflectable {  
    case None  
    case Some(T)  
    init()  
    init(_ some: T)  
    /// Allow use in a Boolean context.  
    func getLogicValue() -> Bool  
    /// Haskell's fmap, which was mis-named  
    func map<U>(f: (T) -> U) -> U?  
    func getMirror() -> Mirror 
}
```

实际上 `var name: String?` 这样的声明其实不是声明了一个 `String` 类型，而是声明了一个 `Optional` 类型，它可能包含一个 `String` 值，也可能为空 `nil`

声明了一个 `Optional` 之后，会有一个默认的值为 `nil` ，通过显式赋值后， `Optional` 里才会有值

使用时可以通过 `if` 语句来判断是否有值

``` swift
var str1: String? = "World!"
let str2 = "Hello"

if let str = str1 { 
      let out = str2 + str 
      print(out)
}
```

当 `str1` 的值不为 `nil` 时，才会执行 `if` 中语句，为 `nil` 时则会跳过这部分代码

**`!` 操作符的作用是强制解析**

也可以在后面加上 `!` 操作符，来表示这个 `Optional` 是肯定有值的，例如我们在声明时已经给了初始值，或者在使用之前已经确定对该变量进行过赋值

``` swift
var str1: String? = "World!"
let str2 = "Hello"

if (str1 != nil) { 
      let out = str2 + str1!
      print(out)
}
```

虽然使用 `!` 可以时可以确定 `Optional` 不为空，但是还是要做判断以作保险

``` swift
var str1: String?
let str2 = "Hello"

let out = str2 + str1!
```

上面这段代码是可以通过编译的，但是运行时则会报错，所以使用 `Optional` 时还是需要判断一下是否为空

**`!` 操作符一定要对非空的变量值使用**

--- 

### 参考
- [Swift 编程语言中文教程](https://swift.bootcss.com/02_language_guide/01_The_Basics) —— 可选类型
- [Swift中 ！和 ？的区别及使用](https://www.jianshu.com/p/89a2afb82488)
