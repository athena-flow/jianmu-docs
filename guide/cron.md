# Cron

可定义Cron表达式定时触发流程执行

**定义语法**

```
trigger:
  type: cron
  schedule: * * * * * ? *
```
* type: 此处固定填`cron`，必填
* schedule: Cron表达式，必填

Cron表达式语法可以参考[这里](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html)