# 自定义安装

本文档将为需要自定义安装的用户提供帮助，如果您只需要快速部署一个可用环境

请参考[快速开始](quick-start.md)章节

## 简要系统架构说明

由于建木持续集成平台在设计思路上遵循简单性原则，尽量减少用户的部署成本，降低用户的使用与维护门槛。

因此，运行建木只需要一个核心的Java后端服务和依赖的Mysql数据库。

另外，由于建木是一个纯粹的前后端分离项目，因此前端代码需要一个独立的Web服务器来进行部署。

当然，因为建木的任务节点当前都是以容器形式运行在docker上，所以也需要准备一个docker的宿主环境。

具体的架构设计请参考[这里](https://gitee.com/jianmu-dev/jianmu-architecture-as-code)

## 如何从源码编译

建木持续集成平台是一个典型的前后端分离架构，但是为了方便开发部署前后端代码都在同一个代码库中

### 编译工具要求
* Java 11.0.9或更高
* Maven 3.8.1或更高
* NodeJS 16.4或更高
* yarn 1.22.10或更高

**编译Java后端**

```
git clone https://gitee.com/jianmu-dev/jianmu-ci-server.git

cd jianmu-ci-server

mvn package
```
编译打包成功完成后在项目目录下`./api/target`中会存在`jianmu-ci-server.jar`的可执行Fat Jar

**编译前端代码**
```
cd jianmu-ci-server/ui

yarn install

yarn build
```
成功后项目目录下的`./ui/dist`目录下是编译好的前端文件

## 如何部署

### 前端部署  

前端代码可以部署到任意一个支持静态文件的Web服务器下。

可以参考官方镜像使用的部署方式，使用的Web服务器为Nginx

Nginx配置，可参考[nginx-http.conf](https://gitee.com/jianmu-dev/jianmu-ci-server/blob/master/ui/nginx-http.conf)

### 后端部署

**依赖中间件**

Mysql版本需要8.0以上

**服务配置**

由于服务使用Spring Boot开发，因此可以使用环境变量或配置文件进行配置

可用的配置项参考[application.yml](https://gitee.com/jianmu-dev/jianmu-main/blob/master/api/src/main/resources/application.yml)文件

**数据库配置：**
```
SPRING_DATASOURCE_URL: jdbc:mysql://jianmu-mysql:3306/jianmu?useUnicode=true&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: 123456
```
**Docker宿主机地址配置：**
```
EMBEDDED_DOCKER-WORKER_DOCKER-HOST: unix:///var/run/docker.sock
```
该配置项为worker调用的docker守护进程api地址

可配置为Unix socket(unix:///var/run/docker.sock)或Tcp Socket(tcp://127.0.0.1:2375)形式

具体根据要连接的Docker Engine配置而来，可参考[Docker官方文档](https://docs.docker.com/config/daemon/)

**平台用户名与密码配置**

```
JIANMU_API_ADMINUSER: admin
JIANMU_API_ADMINPASSWD: 123456
```

**执行记录系统配置**

统一配置所有项目执行记录的显示条数和是否自动清理，`v2.2.0`版本开始支持

```
JIANMU_GLOBAL_RECORD_MAX: 20
JIANMU_GLOBAL_RECORD_AUTO-CLEAN: 'true'
```
`JIANMU_GLOBAL_RECORD_MAX`为20，表示项目执行记录只显示最后20条，默认为9999
![](./images/execution_record.png)
`JIANMU_GLOBAL_RECORD_AUTO-CLEAN`为true，表示项目启动时，自动删除所有项目最后20条执行记录之前的历史数据；默认为false，表示不自动删除
