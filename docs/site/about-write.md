---
id: about-write
title: 风格指北
sidebar_label: 编辑
---
# Docusaurus 风格指北
- 详见这篇[官网文档](https://v2.docusaurus.io/docs/markdown-features)—— 英文
- 基本语法与 **`markdown`** 相似
- 我下面的内容也知识一些自己的总结，与文档中没有区别

## Code
- 支持代码片段高亮，语法如下
    ```
        ```js {2}
        function highlightMe() {
        console.log('This line can be highlighted!');
        }
        ```
    ```
    - 效果
    ```js {2}
    function highlightMe() {
    console.log('This line can be highlighted!');
    }
    ```
    - 想高亮多行可将 **`{2}`** 改为 **`{1-3}`**，即可多行高亮
## MDX
- **`MDX`** 是一种可编辑的格式，可以在 **`Markdown`** 文档中无缝编写 **`JSX`**
- 详细使用方法可以查看这篇[文档👈](https://mdxjs.com/)，也可以在 **YouTube** 观看相关[视频📷](https://www.youtube.com/watch?v=d2sQiI5NFAM&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
- 一些简单的示例
  - 在你的 **`Markdown`** 添加如下语句
    ``` jsx
    export const Highlight = ({children, color}) => ( <span style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
        }}>{children}</span> );
    ```
  - 使用时如下
    ``` md
    <Highlight color="#25c2a0">Docusaurus green</Highlight>
    ```

export const Highlight = ({children, color}) => ( <span style={{
    backgroundColor: color,
    borderRadius: '2px',
    color: '#fff',
    padding: '0.2rem',
}}>{children}</span> );

  - 最终效果👉<Highlight color="#25c2a0">Docusaurus green</Highlight>👈

- Tabs
  - 加入如下内容
    ``` md
    import Tabs from '@theme/Tabs';
    import TabItem from '@theme/TabItem';
    
    <Tabs
    defaultValue="apple"
    values={[
        {label: 'Apple', value: 'apple'},
        {label: 'Orange', value: 'orange'},
        {label: 'Banana', value: 'banana'},
    ]}>
    <TabItem value="apple">This is an apple 🍎</TabItem>
    <TabItem value="orange">This is an orange 🍊</TabItem>
    <TabItem value="banana">This is a banana 🍌</TabItem>
    </Tabs>
    ```
  - 效果👇

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="apple"
values={[
    {label: 'Apple', value: 'apple'},
    {label: 'Orange', value: 'orange'},
    {label: 'Banana', value: 'banana'},
]}>
<TabItem value="apple">This is an apple 🍎</TabItem>
<TabItem value="orange">This is an orange 🍊</TabItem>
<TabItem value="banana">This is a banana 🍌</TabItem>
</Tabs>

### Code Tabs

<Tabs
defaultValue="js"
values={[
    {label: 'JavaScript', value: 'js'},
    {label: 'Python', value: 'py'},
    {label: 'Java', value: 'java'},
]}>
<TabItem value="js">

```js
function helloWorld() {
  console.log('Hello, world!');
}
```

</TabItem>
<TabItem value="py">

```py
def hello_world():
  print 'Hello, world!'
```

</TabItem>
<TabItem value="java">

```java
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
```

</TabItem>
</Tabs>

## BrowserWindow
- 相关组件位于 **[`@site/src/components/BrowserWindow`](https://github.com/rcxxx/personal-site/tree/master/src/components/BrowserWindow)**
- 参考自官方站点源码
- 
``` md
import BrowserWindow from '@site/src/components/BrowserWindow';

<BrowserWindow minHeight={240} url="http://localhost:3000">

# 这是一个浏览器窗口


</BrowserWindow>
```

import BrowserWindow from '@site/src/components/BrowserWindow';

<BrowserWindow minHeight={240} url="http://localhost:3000">

# 这是一个浏览器窗口
## 这里是内容

</BrowserWindow>

## 内嵌 Bilibili 视频

- 相关组件位于 **[`@site/src/components/BVideo`](https://github.com/rcxxx/personal-site/tree/master/src/components/BVideo)**
- 参考自 **[`https://zxuqian.cn/`](https://zxuqian.cn/)**

``` shell
import BVideo from "@site/src/components/BVideo";

<BVideo src="" bsrc=""/>
```
- `src` 中放 `Bilibili` 分享视频的嵌入代码
- `bsrc` 中放视频的网页 `url`

import BVideo from "@site/src/components/BVideo";

<BrowserWindow>

<BVideo src="https://www.bilibili.com/bangumi/play/ep374668?from=search&seid=5105236372748998047&spm_id_from=333.337.0.0" bsrc="https://www.bilibili.com/bangumi/play/ep374668?from=search&seid=5105236372748998047&spm_id_from=333.337.0.0"/>

</BrowserWindow>

- 这里我两个都放了网页的 `url` 效果就没那么好了······

## 参考
- **[Markdown Features](https://www.docusaurus.cn/docs/markdown-features)**