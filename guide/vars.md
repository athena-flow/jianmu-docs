# 参数

### 全局参数

可以在流程定义的`param`段落中定义全局参数，参数类型`type`支持 STRING、NUMBER、BOOL。语法如下：
```
global:
  param:
    image_name:
      type: STRING
      value: jianmudev/private
    num: 
      type: NUMBER
      value: 10
    bool: 
      type: BOOL
      value: true
```
**注：出于安全性考虑，全局参数的`type`不支持 SECRET 类型**

可以在参数名后面，直接定义参数值，**将默认为 STRING 类型**
```
global:
  param:
    image_name: jianmudev/private
```
然后可以在节点定义的输入参数中进行引用，语法如下：
```
maven_jib_build:
  type: maven_build:1.2.0-jdk11
  param:
    image_name: ${global.image_name}
```

### 触发器参数

如果当前流程已经定义了[Webhook](webhook.md)，那么当流程被事件触发时，可以使用如下语法来引用目标事件中的参数：

`${trigger.gitlab_ref}`

完整例子：
```
name: git_clone_test

trigger:
  type: webhook
  param:
    - name: gitlab_ref
      type: STRING
      exp: $.body.json.gitlab_ref

pipeline:
  clone:
    type: git_clone:1.2.0
    param:
      remote_url: https://gitee.com/jianmu-dev/jianmu-ci-ui.git
      ref: ${trigger.gitlab_ref}
```

### 输出参数

可以在当前节点的输入参数中引用上游节点的输出参数的值：
#### 管道定义
```
name: 发布hub-server镜像
description: 发布hub-server镜像

pipeline:
  git_clone:
    type: git_clone:1.2.0
    param:
      remote_url: https://gitee.com/jianmu-hub/jianmu-hub-server.git
      ref: refs/heads/master
      username: ((gitee.username))
      password: ((gitee.password))
  maven_jib_build:
    type: maven_build:1.2.0-jdk11
    param:
      workspace: ${pipeline.git_clone.git_path}
```
如上所示，`maven_jib_build`节点可以使用`${pipeline.git_clone.git_path}`的语法

也可以简写成`${git_clone.git_path}`

引用`git_clone`节点的输出参数`git_path`的值作为输入参数`workspace`的值

#### 流程定义
```
name: 发布hub-server镜像
description: 发布hub-server镜像

workflow:
  start:
    targets:
      - git_clone
    type: start
  git_clone:
    sources:
      - start
    targets:
      - maven_jib_build
    type: git_clone:1.2.0
    param:
      remote_url: https://gitee.com/jianmu-hub/jianmu-hub-server.git
      ref: refs/heads/master
      username: ((gitee.username))
      password: ((gitee.password))
  maven_jib_build:
    sources:
      - git_clone
    targets:
      - end
    type: maven_build:1.2.0-jdk11
    param:
      workspace: ${workflow.git_clone.git_path}
  end:
    sources:
      - maven_jib_build
    type: end
```
如上所示，`maven_jib_build`节点可以使用`${workflow.git_clone.git_path}`的语法，也可以简写成`${git_clone.git_path}`

引用`git_clone`节点的输出参数`git_path`的值作为输入参数`workspace`的值
