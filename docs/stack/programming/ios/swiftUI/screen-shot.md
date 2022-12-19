---
id: swiftUI-screen-shot
title: swiftUI 截取屏幕图像
sidebar_label: Screen Shot
---

### 测试环境

名称 | 内容 |
---------|----------|
 系统版本 | macOS Big Sur 11.2.2 |
 `XCode` | 12.4 (12D4e) |

### 功能实现
- 先在 `XCoed` 新建一个工程，取名 `ScreenShot-Demo`

要实现截图功能，首先得显示图像，方便起见，直接使用 `Show-Web-Page` 工程的代码
- [传送门](https://sinnammanyo.cn/personal-site/docs/ios/swiftUI/swiftUI-show-web-pages)

显示内容部分解决

接下来是实现截图功能

:::info 💡
开始实现功能之前我们先对 **`Info.plist`** 进行一下设置

我们希望将截取到的图像保存到相册中，则需要获取访问相册的权限
:::

打开 `Info.plist`

在 `Key` 一栏中的 `Informatica Property List` 处添加一个新的选项

下拉选项中选中 `Privacy - Photo Library Usage Description`

`value` 栏中填入 `Photo Library Permission`

保存即可，接下来当使用截图功能的时候，会询问是否给 APP 相应的权限

这里不设置的话截图保存的时候程序就会崩溃

---

**准备工作完成，开始实现**

继续在 `myWebView` 结构体中新建一个函数，函数返回类型为 `UIImage` ，并且可以通过传入参数 `shouldSave` 控制是否将截图保存至相册中

``` swift
func takescreenShot(_ shouldSave: Bool = false) -> UIImage? {
    var screenshotImage :UIImage?
    let layer = UIApplication.shared.keyWindow!.layer
    let scale = UIScreen.main.scale
    
    UIGraphicsBeginImageContextWithOptions(layer.frame.size, false, scale);
    
    guard let context = UIGraphicsGetCurrentContext() else {
        return nil
    }
    layer.render(in:context)
    
    screenshotImage = UIGraphicsGetImageFromCurrentImageContext()
    
    UIGraphicsEndImageContext()
    
    if let image = screenshotImage, shouldSave {
        UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil)
    }
    
    return screenshotImage
}
```
详细解释下函数的实现

- 创建一个新的图像背景
`UIGraphicsBeginImageContextWithOptions(layer.frame.size, false, scale);`
  - UIGraphicsBeginImageContextWithOptions 可以通过 scale 调整比例因子，有关 API 的更详细内容可以在 `Developer Documentation` 中查看

- 将图层渲染到背景中
``` swift
guard let context = UIGraphicsGetCurrentContext() else {
    return nil
}
layer.render(in:context)
```

- 将背景赋值到 `UIImage` 变量中

`screenshotImage = UIGraphicsGetImageFromCurrentImageContext()`

- 删除背景

`UIGraphicsEndImageContext()`

- 如果 `shouldSave` 为 `true` ，则将截图保存到相册
``` swift
if let image = screenshotImage, shouldSave {
    UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil)
}
```
  - `shouldSave` 有默认值为 `false`

- 最后将 `screenshotImage` 作为参数返回

至此实现截图功能的函数就已经完成了，本质上就是创建一个当前屏幕图像的复制，然后存储到相册或是需要的变量中

之后在主窗体的 `body` 中新建一个 `botton` 用来激活截图功能，在 `botton` 中调用截图函数

``` swift {2}
Button("Screen Shot") {
    self.screenshotImage = view.takescreenShot(true)
}
.padding()
.background(Color.gray)
.cornerRadius(15)
.foregroundColor(Color.white)
```

调用函数之前先在主窗体最外面一层创建一个变量用来保存截图的返回值

`@State var screenshotImage :UIImage? = nil`

然后将 `botton` 和 `view` 放置在一个 `VStack` 中， `VStack` 会将控件垂直排列

``` swift
var body: some View {
    VStack {
        self.view.ignoresSafeArea()
        
        Button("Capture") {
            ...
        }
        ...
    }
}
```

画布中预览，可以看到 `WebView` 与 `botton`  呈垂直排列

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/screen-shot-canvans.png)

点击 `botton` 后没有反应，是正常的，因为只是在画布中预览，接下来打开 `simulator` 进行测试

在 `XCode` 窗口顶部，工程名称的旁边，可以选择想要打开的模拟器的机器型号，这里选择 `iphone 12`

选择好之后 `cmd + B` 编译工程，成功后 `cmd + R` 运行，等待模拟器打开，进行测试

点击 `Screen Shot` 后出现如下界面，就是前面提到的权限问题

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/screen-shot-photo-library-permission.png)

选择 `Allow Access to All Photos` 允许访问所有相册

之后就可以正常截图了，换不同的位置多截几张

然后来到相册中，成功看到刚才的截图内容

![](https://pictures-1304295136.cos.ap-guangzhou.myqcloud.com/screenshot/macOS/screen-shot-albums.png)

大功告成······

### 方案二
之前尝试用 `SWViewCapture` 来实现截图功能，总是出现 `crash` ，困扰了我很久，在网上找了很久也是没有头绪，结合上面的实现，推测可能是权限的问题，这里将权限设置好之后再来试着实现一下

要使用封装好的第三方库，需要将第三方库的 `.xcodeproj` 目录直接复制到工程根目录下

在 [startry/SwViewCapture](https://github.com/startry/SwViewCapture) 仓库中找到 `SwViewCapture.xcodeproj`，复制到工程目录下

仓库中也有相应的 `API` 的使用方法
 
之后点击工程根目录配置，在 `General` 中找到 `Frameworks, Libraries, and Embedded Content`

点 `+` 然后找到 `SWViewCapture.framework` 添加

重新进行一下编译，就能直接导入了

`import SwViewCapture`

接下来是同样的操作，但是 `SWViewCapture` 类库中已经封装好了截图功能，我们只需要直接调用给出的接口就好

将 `takescreenShot` 修改如下，在第 5-8 行调用了 `takescreenShot` 的接口
``` swift {4, 9}
func takescreenShot (_ shouldSave: Bool = false) -> UIImage? {
    var screenshotImage: UIImage?
    

    webView.swCapture { (capturedImage) -> Void in
        screenshotImage = capturedImage
    }
    

    if let image = screenshotImage, shouldSave {
        UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil)
    }
    
    return screenshotImage
}
```

完成之后测试，果然是因为相册权限的问题导致崩溃

:::tips
`ios` 的开发过程中，很需要注意不同版本之间的 API 的兼容性，官方的帮助文档中大部分都能找到需要的帮助

GitHub 也是很需要经常浏览的地方，开源永远的神
:::

### 保存截图
`UIImageWriteToSavedPhotosAlbum()` 可以将 `UIImage` 保存到相册中，这里可以通过一些方法修改想要保存的图片格式

通过给 `UIImage` 增加拓展功能，可以很方便的设定想要导出的图像格式
- 拓展名要声明在全局

``` swift
extension UIImage {
    func toPNG() -> UIImage? {
        guard let imageData = self.pngData() else {return nil}
        guard let imagePng = UIImage(data: imageData) else {return nil}
        return imagePng
    }
}
```

如果需要导出 `jpeg` 格式的图片

则可以将

**`guard let imageData = self.pngData() else {return nil}`**

改为

**`guard let imageData = self.jpegData(compressionQuality: 1.0) else {return nil}`**

变量名稍作修改即可

使用时直接使用 `UIImage` 中的拓展方法即可

### 本项目源码
待整理······

## 参考
- [UIImageWriteToSavedPhotosAlbum crashed in iOS 11](https://developer.apple.com/forums/thread/89796)
- [How do I take a full screen Screenshot in Swift?](https://stackoverflow.com/questions/25448879/how-do-i-take-a-full-screen-screenshot-in-swift)
- [SwiftUI-Guide](https://github.com/fzhlee/SwiftUI-Guide#11Button-sheet)
- [Swift - 截图功能的实现2](https://www.hangge.com/blog/cache/detail_2114.html)
- [startry/SwViewCapture](https://github.com/startry/SwViewCapture)
- [How to save a UIImage to a file using jpegData() and pngData()](https://www.hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata)
- [UIImageWriteToSavedPhotosAlbum save as PNG with transparency?](https://stackoverflow.com/questions/1489250/uiimagewritetosavedphotosalbum-save-as-png-with-transparency)