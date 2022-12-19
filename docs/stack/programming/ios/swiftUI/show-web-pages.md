---
id: swiftUI-show-web-pages
title: swiftUI 显示网页内容
sidebar_label: WKWebView
---

### 测试环境

名称 | 内容 |
---------|----------|
 系统版本 | macOS Big Sur 11.2.2 |
 `XCode` | 12.4 (12D4e) |


### 新建工程
打开 `XCode` ，在顶部菜单栏中依次点击 `File/New -> Project` 新建一个工程

选择新建 `ios -> App`
![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/xcode-new-project.png)

设置项目名称为 `Show-Web-Page` ，选择 `Interface` 为 `Swift` ， `Life Cycle` 为 `SwiftAPP`

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/NewProject-show-web-page.png)

之后就进入了 `Hello, world` 界面，工程新建完成

### 功能实现
实现网页内容显示需要用到 `WebView` 控件，该控件可以通过一个 `URL` 来进行网页视图的渲染，或是加载本地的 `HTML` 文件

导入包含 `WebView` 的库 `WebKit`

``` swift
import SwiftUI
import WebKit
```

创建一个结构体 `myWebView`

``` swift
struct myWebView: UIViewRepresentable {
    var url: String
    var webView = WKWebView()
    
    func makeUIView(context: Context) -> WKWebView {
        guard let url = URL(string: self.url) else {
            return WKWebView()
        }
        let request = URLRequest(url: url)
        webView.load(request)
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: UIViewRepresentableContext<myWebView>) {
        
    }
}
```

名称 | 类型 |内容 |
:--------------:|:---:|----------|
 url            | 变量 | 输入参数，目标的 url |
 webView        | 变量 | WKWebView 的窗口视图 |
 makeUIView()   | 函数 | 渲染网页并创建视图 |
 updateUIView() | 函数 | 更新视图 |

对 `ContentView` 结构体中的内容进行修改

- 创建 `view` 的常量，实例化视图时传入 `url` 地址
- 在 `body` 中调用窗口显示

``` swift
struct ContentView: View {
    let view = myWebView(url: "https://apple.com")
    
    var body: some View {
        self.view.ignoresSafeArea()
    }
}
```

预览画布中点击 `Resume` ，代码右侧的画布中将更新视图

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/xcode-Resume.png)

点击画布预览中的运行按钮，可以实时预览效果

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/show-web-page-apple.png)

- 至此简单实现了 `SwiftUI` 渲染显示网页的内容

### 正片环节
既然能够显示网页内容，那岂不是可以 ······ 🐠🐠🐠

将传入实例的 `url` 稍作修改，比如改成

`let view = myWebView(url: "https://bilibili.com")`

- 让我看看这周又更新了什么新番 🤩

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/show-web-page-bilibili.png)

`let view = myWebView(url: "https://taobao.com")`

- 甚至可以顺便往购物车里在添加点东西

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/show-web-page-taobao.png)

买个新杯子，在公司也能泡上枸杞了

`let view = myWebView(url: "https://www.msn.cn/zh-cn/money/markets")`

- 如果你手头富裕，心态良好，平时喜欢炒股

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/show-web-page-money.png)

好家伙，明天早餐又没了

原来除了 `VSCode` 之外， `XCode` 也能成为上班摸鱼的利器······

### 本项目源码
待整理······

## 参考

- [SwiftUI-Guide](https://github.com/fzhlee/SwiftUI-Guide)
- [swiftui-tutorials](https://developer.apple.com/tutorials/swiftui/)
- [IOS-SwiftUI-网页视图（WKWebView）的应用](https://zhuanlan.zhihu.com/p/150072567)
