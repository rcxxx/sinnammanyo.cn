---
id: python-serial
title:  Python 串口库 pyserial
sidebar_label: pyserial
---

> Python Serial Port Extension for Win32, OSX, Linux, BSD, Jython, IronPython ...
> - **[pyserial project - pyserial · PyPI](https://pypi.org/project/pyserial/)**
> - **[documentation](https://pythonhosted.org/pyserial/)**

## 安装 `pyserial`

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="pip"
values={[
    {label: 'pip', value: 'pip'},
    {label: 'conda', value: 'conda'},
]}>
<TabItem value="pip">

``` bash
pip install pyserial
```

</TabItem>
<TabItem value="conda">

``` bash
conda install -c conda-forge pyserial
```

</TabItem>
</Tabs>

## 简单使用

- 开启串口

```py
import serial

_ser = serial.Serial(port="/dev/ttyACM0", baudrate=115200, timeout=0.01)
```

- 接收串口

```py
str_read = _ser.read(6).hex()
# 6 读取六个字节
# .hex() 十六进制读取
```

- 发送串口

```py
str_write = 'write_str'
_ser.write(str_write)
```

- 关闭串口

```py
_ser.close()
```


## Hex to int
**16进制转为int**

```py
hex_input  = 'C0A80026'
output_list = []
for i in range(0,len(hex_input),2)
    output_list.append(int(hex_input[i:i+2], 16))
```
- [Python - Converting Hex to INT/CHAR](https://stackoverflow.com/questions/7595148/python-converting-hex-to-int-char)

## 参考
- **[documentation](https://pythonhosted.org/pyserial/)**
- **[pyserial project - pyserial · PyPI](https://pypi.org/project/pyserial/)**
- **[Listing available com ports with Python](https://stackoverflow.com/questions/12090503/listing-available-com-ports-with-python)**