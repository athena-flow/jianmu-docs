# 管道定义

CI/CD管道使用Yaml来定义

### pipeline

管道定义在pipeline段落下：

```
name: 管道名称
description: 管道描述

pipeline:

```

### 管道节点

管道由节点组成，同一个管道中的节点名称不可重复：

```
  git_clone:
    type: git_clone:1.2.0
```

节点使用type字段来指定节点类型，节点类型由节点定义唯一标识`ref`与节点定义版本组成

如果不指定版本时，系统会使用默认版本`latest`,如

```
  git_clone:
    type: git_clone
```

等价于

```
  git_clone:
    type: git_clone:latest
```

### 节点别名
在管道中定义节点时，可以定义节点的别名，以便更好的区分节点的含义

使用`alias`来定义节点的别名
```
  shell_node:
    image: alpine:3.13.6
    alias: 测试节点 
    script: 
      - echo hello jianmu
```
流程可视化界面会显示节点的别名，没有定义别名时，默认显示节点名称
![](./images/pipeline_node_alias.png)

### 节点执行顺序

管道自上而下依次执行，一个节点只能有一个上游/下游节点，如下：

```
  git_clone:
    type: git_clone:1.2.0
    param:
      ref: refs/heads/master
      remote_url: https://gitee.com/jianmu-runners/jianmu-runner-hub.git
  hub_publish:
    type: hub_publish:1.0.0
    param:
      hub_url: https://api.jianmuhub.com
      dsl_file_path: ${git_clone.git_path}
      hub_api_ak: ((xxx.xxx))
      hub_api_sk: ((xxx.xxx))
```

### 节点参数

不同的节点类型定义了不同的参数，节点类型预先定义了`输入参数`和`输出参数`的名称、类型与默认值

在管道中配置节点时，可以覆盖`输入参数`的默认值，例如：

```
  hub_publish:
    type: "hub_publish:1.0.0"
    param:
      hub_url: https://api.jianmuhub.com
      dsl_file_path: ${git_clone.git_path}
      hub_api_ak: ((xxx.xxx))
      hub_api_sk: ((xxx.xxx))
```

`输入参数`和`输出参数`也可以使用参数方式引用，详情参见[`参数章节`](vars.md)