---
id: design-pattern-UML-class-diagram
title: UML 类图的概念
sidebar_label: UML 类图
---

## UML类图的概念

- UML类图是一种结构图，用于描述一个系统的静态结构
- UML类图是一种静态建模的方法，用以描述软件系统的结构，反映了类结构和类之间的关系

**类图中的类对应面向对象语言中的类**

### 类结构

一个基本的 `UML类图` 结构如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/design-pattern/UML-class-diagram-01.png)

按类名、属性、方法排列

其中属性和方法之前的 `+` 代表 `public` ， `-` 代表 `private` ， `#` 代表 `protected` 

用 `c++` 代码可表示为

``` cpp
class Class {
public:
    String Attribute1;

    String Operation1() {
        ...;
    }

private:

    int Attribute2;
}
```

### 类间关系

#### 1. 依赖 (Dependency)
对于两个独立的对象，当一个对象负责构造另一个对象的实例，或者依赖另一个对象的服务时，两个对象之间主要体现依赖关系，可以简单理解为 类A 使用到了 类B，类B中的变化会影响到 类A。

例如去公司上班要坐公交，但错过了公交车就会迟到，公交车就影响到了上班

- **不想上班👻**

假设你是一个代驾，每次有订单你就需要去开车，但每次开的车都不一定相同，你只是代驾，给什么车你就要开什么车

用 UML图 表现如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/design-pattern/UML-class-diagram-02.png)

``` cpp
class Driver {
public:
    void driving(Car car) {
	    car.run();
    }

    // 依赖关系不一定表现为形参，也可以通过局部变量发生依赖关系
    void driving() {
        Car car = new Car();
        car.run();
    }

    // 也可以通过静态变量发生依赖关系
    void driving2() {
	    Car.run();
    }
}

class Car {
public:
    void run(){}
}
```

#### 2. 关联 (Association)
两个相对独立的对象，当一个对象的实例与另一个对象的一些特定实例存在固定的对应关系时，这两个对象之间为关联关系

这种关系强于依赖关系，不是临时的，一般是长期性的

假设你代驾赚的钱买了自己的车，你现在出门都开自己的车了

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/design-pattern/UML-class-diagram-03.png)

``` cpp
class Driver {
public:
    void driving() {
	    car.run();
    }

private:
    Car car;
}

class Car {
public:
    void run(){}
}
```

**依赖可以说是一种弱关联**

#### 3.聚合 (Aggregation)
聚合关系是关联关系的一种，耦合度强于关联，他们的代码表现是相同的，仅仅是在语义上有所区别

关联关系的对象间是相互独立的，而聚合关系的对象之间存在着包容关系，他们之间是“整体-个体”的相互关系

聚合关系中作为成员变量的类一般使用 `set` 方法赋值

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/design-pattern/UML-class-diagram-04.png)

``` cpp
class Driver {
public:
    void driving() {
	    car.run();
    }
    
    void setCar(Car c){
	    car = c;
    }

private:
    Car car = null;
}

class Car {
public:
    void run(){}
}
```

#### 4. 组合 (Composition)
组合是一种耦合度更强的关联关系。存在组合关系的类表示 `整体-部分` 的关联关系， `整体` 负责 `部分` 的生命周期，他们之间是共生共死的；并且 `部分` 单独存在时没有任何意义

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/design-pattern/UML-class-diagram-05.png)

``` cpp
class Driver {
public:

    Driver(Car car) {
	    this.car = car;
    }
    
    void driving() {
	    car.run();
    }

private:
    Car car = null;
}

class Car {
public:
    void run(){}
}
```

#### 5. 继承 (Generalization)

类与类之间的继承关系

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/design-pattern/UML-class-diagram-06.png)

``` cpp
class Animal {
public:
    void eat(){}
    void sleep(){}
}
class Cat: public Animal {
public:
    void cute(){}
}
```

#### 6. 实现 (Implementation)
一个类实现一个或多个接口的方法。接口定义好操作的集合，由实现类去完成接口的具体操作


## 参考

- [设计模式之 UML 类图](https://zhuanlan.zhihu.com/p/24576502)

- [UML类图详解及类图设计](https://www.cnblogs.com/liujiarui/p/12289537.html)

- [UML类图介绍以及关系详解](https://www.pianshen.com/article/1059678851/)

- [UML类图详解](https://www.awaimai.com/patterns/uml)