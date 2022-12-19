---
id: swiftUI-ReplayKit
title: swiftUI 实现录屏
sidebar_label: ReplayKit
---

### 测试环境

名称 | 内容 |
---------|----------|
 系统版本 | macOS Big Sur 11.2.3 |
 `XCode` | 12.4 (12D4e) |
 测试真机 | iphone 7 plus |

### 功能实现
新建项目 `RecordingScreen-Demo`

新建一个 `View` 分组

在 `View` 分组中新建 `MyWebView` 文件并直接从 `Show-Web-Page` 中复制 `myWebView` 用来创建网页视图
- [传送门](https://sinnammanyo.cn/personal-site/docs/ios/swiftUI/swiftUI-show-web-pages)

#### 定义录屏功能

在 `View` 分组中创建 `RPPreviewView` 文件

创建 `RPPreviewView` 结构体，并继承 `UIViewControllerRepresentable` 

``` swift
struct RPPreviewView: UIViewControllerRepresentable {

}
```

在 `RPPreviewView` 中创建 `Controller` 和 `预览开关`

``` swift
let rpPreviewViewController: RPPreviewViewController
@Binding var isShow: Bool
```
- [关于 `@Binging` 的使用](https://www.cnblogs.com/xiaoniuzai/p/11417123.html)


在 `RPPreviewView` 中创建 `Coordinator` 类，来控制预览

``` swift
class Coordinator: NSObject, RPPreviewViewControllerDelegate {
    var parent: RPPreviewView
        
    init(_ parent: RPPreviewView) {
        self.parent = parent
    }
        
    func previewControllerDidFinish(_ previewController: RPPreviewViewController) {
        withAnimation {
            parent.isShow = false
        }
    }
}
```

创建函数 `makeCoordinator` ， `makeUIViewController` ， `updateUIViewController`

``` swift
func makeCoordinator() -> Coordinator {
    Coordinator(self)
}

func makeUIViewController(context: Context) -> RPPreviewViewController {
    rpPreviewViewController.previewControllerDelegate = context.coordinator
    rpPreviewViewController.modalPresentationStyle = .fullScreen
    
    return rpPreviewViewController
}

func updateUIViewController(_ uiViewController: RPPreviewViewController, context: Context) { }
```

**实现功能**
打开 `ContentView.swift` 文件，创建变量、常量

``` swift
// 窗口常量，用来显示页面
let view = myWebView(url: "https://bilibili.com")

private let recorder = RPScreenRecorder.shared()

//
@State private var isBool = false

// 录屏功能实例
@State var rp: RPPreviewView!

// 录屏开关
@State private var isRecording = false

// 预览开关
@State private var isShowPreviewVideo = false
```
- [关于 `@State` 的使用](https://www.cnblogs.com/xiaoniuzai/p/11417123.html)


创建 `startRecord` 函数，开启录屏功能

``` swift
private func startRecord() {
    guard recorder.isAvailable else {
        print("Recording is not availab")
        return
    }
    
    if !recorder.isRecording {
        recorder.startRecording { (error) in
            guard error == nil else {
                print("There was an error starting the recording")
                return
            }
            
            print("Started Recording Successfully")
            self.isRecording = true
        }
    }
}
```

创建 `stopRecord` 函数，结束录屏

``` swift
private func stopRecord() {
    recorder.stopRecording { (preview, error) in
        print("Stopped recording")
        self.isRecording = false
        
        guard let preview = preview else {
            print("Preview controller is not available")
            return
        }
        
        self.rp = RPPreviewView(rpPreviewViewController: preview, isShow: self.$isShowPreviewVideo)
        withAnimation {
            self.isShowPreviewVideo = true
        }
    }
}
```

**布局UI**

在 `body` 中创建布局控件、按钮控件

``` swift
ZStack {
    VStack {
        self.view
            .ignoresSafeArea()
            .padding()

        Button(action: {

        }, label: {
            Text(isRecording ? "stop" : "start")
            Image(systemName: isRecording ? "stop.circle" : "video.circle")
                .resizable()
                .frame(width: 50, height: 50)
        })
        .padding()
        .frame(width: 150, height: 50.0)
        .background(isRecording ? Color.red : Color.green)
        .foregroundColor(.white)
        .cornerRadius(15)
    }
}
```

预览如下

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/ReplayKit-UI.png)


接下来给按钮添加功能

``` swift
Button(action: {
    if !self.isRecording {
        self.startRecord()
    } else {
        self.stopRecord()
    }
}, label: {
    ...
})
...
```

`VStack` 同级布局中加入预览的视图

``` swift
ZStack {
    VStack {
        ...
    }
    
    if isShowPreviewVideo {
        rp
            .transition(.move(edge: .bottom))
            .edgesIgnoringSafeArea(.all)
    }
}
```

构建并运行，发现画布中的预览没什么反应，因为 `ReplayKit` 需要将程序下载到真机中才有效果

**下载程序到真机**

用 `USB` 线链接 `PC` 和 `手机`，在机型选择中选择 `ios Device -> iphone` 

连接到真机后，编译并 `cmd + R` 运行程序，输入密码将程序下载到真机中

这时候会报出一个错误，原因是手机端还没有给 `App` 信任

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/Could-not-launch.png)

在真机中打开 `设置 -> 通用 -> 设备管理` ，点击开发者 APP ，点击信任，即可运行测试

成功实现录屏功能

### 本项目源码
待整理······

### 参考
- [ReplayKitBySwiftUI](https://github.com/jerryleetw1992/ReplayKitBySwiftUI/blob/master/ReplayKitBySwiftUI/ContentView.swift)

- [Instant Replay](https://github.com/valentebruno/ReplayKit/blob/master/Instant%20Replay/ViewController.swift)

- [iOSReplayKit实践](https://www.jianshu.com/p/b2618a65aa34)