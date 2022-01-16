# 全局配置

### 参数

具体查看[全局参数](vars#全局参数)

### 开关

> 版本说明：`v2.2.0`开始支持

常规语法：

```yaml
global:
  enabled:
    # 是否启用
    # 默认值为true，表示启用
    # 值为false，表示禁用，此时webhook/cron/手动等操作均无法触发项目执行
    value: true | false
    # 是否在页面可启用/禁用项目
    # 默认值为false，表示只能通过修改DSL的value值启用/禁用项目
    mutable: true | false
```

可简写成如下，此时mutable为默认值false：

```yaml
global:
  # 是否启用
  # 默认值为true，表示启用
  # 值为false，表示禁用，此时webhook/cron/手动等操作均无法触发项目执行
  enabled: true | false
```