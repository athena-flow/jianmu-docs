# Shell节点
### 概念

可以在 DSL 中定义 Shell 节点，在指定镜像启动的容器中，执行多条 Shell 命令


### 节点定义说明
```
image: 指定镜像，必填
environment: 定义环境变量，会在容器内转译成大写的环境变量。如: aaa 在容器内可通过 AAA 环境变量调用，非必填
script: 定义Shell命令，非必填，可使用上面定义的环境变量
```
在`environment`中可以使用表达式，引用全局参数、触发器参数或上游节点的输出参数，详见[参数章节](vars.md)

**注意**：
> 1. `environment`中不支持密钥参数
> 2. Shell节点没有输出参数

### 语法

**workflow示例**
```
name: ShellNodeTest

global:
  param:
    abc: abc

workflow:
  start:
    targets: 
      - shell_node
    type: start
  shell_node:
    sources:
      - start
    targets:
      - end
    image: ubuntu:18.04
    environment:
      aaa: aaa${global.abc}
      bBb: bbb666
      CCC: ccc666
    script: 
      - echo $AAA
      - echo $BBB
      - echo $CCC
  end:
    sources:
      - shell_node
    type: end
```

**pipeline示例**
```
name: ShellNodeTest

global:
  param:
    abc: abc

pipeline:
  shell_node:
    image: ubuntu:18.04
    environment:
      aaa: aaa${global.abc}
      bBb: bbb666
      CCC: ccc666
    script: 
      - echo $AAA
      - echo $BBB
      - echo $CCC
```

### 使用内置输入参数
在script中可以直接使用[内置输入参数](custom-node.md#_3-内置输入参数)

**示例：**
```
shell-node:
  image: alpine:3.13.6
  script:
    - cd $JM_SHARE_DIR
    - ls
```