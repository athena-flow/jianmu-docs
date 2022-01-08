# 全局配置

### 参数

具体查看[全局参数](vars#全局参数)

### 开关

语法：

```yaml
global:
  enabled:
    # 是否启用
    # 默认值为true，表示启用
    value: true | false
    # 是否在页面可启用/禁用项目
    # 默认值为false，表示只能通过修改DSL的value值启用/禁用项目
    mutable: true | false
```