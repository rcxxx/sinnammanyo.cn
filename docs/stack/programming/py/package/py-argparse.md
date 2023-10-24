---
id: python-argparse
title:  Python argparse 解析命令行输入
sidebar_label: argparse
---

## 使用示例

``` py title="name.py"
import argparse

def main(_args):
    print(_args.name)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--name", type=str, help="input user name")
    args = parser.parse_args()
    main(args)
```

```bash title="Usage"
$ python name.py -n rcxxx
rcxxx
```

- argparse 会自动生成 -h 帮助文档

## 参考

- **[argparse 教程](https://docs.python.org/zh-cn/3/howto/argparse.html)**
