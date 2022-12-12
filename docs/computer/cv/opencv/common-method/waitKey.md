---
id: opencv-waitKey
title: ''
sidebar_label: waitKey()
---

## OpenCV 延迟操作 waitKey()

经典操作

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="cc"
values={[
    {label: 'C++', value: 'cc'},
    {label: 'Python', value: 'py'},
]}>
<TabItem value="cc">

``` c
while(1) {
    int key = waitKey(1);
    if (char(key) == 27){
        break;
    }  
}
```

</TabItem>
<TabItem value="py">

``` py
while True:
    key = cv2.waitKey(1)
    if key == 27:
        break
```

</TabItem>
</Tabs>

这里的 `"27"` 对应的是键盘对应按键的 `ACSII` 码值， `27` 对应的是 `ESC` 键

- **[键盘所有按键对应的ASCII码值（键码值）](https://blog.csdn.net/qq_34806812/article/details/83154005)**


- 实现按键交互

``` c
int key = waitKey(0);
switch (key)
{
    case 't':
    case 'T':
    {
        // code
    }
    break;
    case 'f':
    case 'F':
    {
        // code
    } break;
    case 'r':
    case 'R':
    {
        // code
    } break;
    case 'c':
    case 'C':
    {
        // code
    } break;
    case 27:
    {   
        // code
    } break;
}
```