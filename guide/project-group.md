# 一键还原项目
一键还原 CI 中的项目

### 1. 项目组dsl文件
**语法**
```
groups:
  - name: xxx
    projects:
      - xxx
      - xxx
  - name: xxx
    projects:
      - xxx
      - xxx
```
* name: 项目组的名称，尚未设置时为默认分组
* projects: 需要导入的项目dsl文件，git仓库根目录的相对路径

**示例**
```
groups:
  - name: 默认分组
    projects:
      # 批量导入
      - /batch_import.yml
  - name: 建木CI
    projects:
      - /ci/all_ci.yml
      - /ci/server_cd.yml
      - /ci/ui_cd.yml
  - name: 建木Hub
    projects:
      # 建木API网关
      - /api-gw/cd.yml
      - /api-gw/ci.yml
      # 建木SSO
      - /sso/v1_ci.yml
      - /sso/v2_cicd.yml
      # 建木Hub
      - /hub/server_cicd.yml
      - /hub/ui_cicd.yml
      # 建木短信
      - /sms/cicd.yml
  - name: 建木官网
    projects:
      - /official-site/wap_cdn_cicd.yml
      - /official-site/web_cdn_cicd.yml
  - name: 建木文档
    projects:
      - /docs/v1_cicd.yml
      - /docs/v2_cicd.yml
  - name: SSL证书
    projects:
      - /ssl/jianmu.dev_cd.yml
      - /ssl/*.jianmu.dev_cd.yml
      - /ssl/*.test.jianmu.dev_cd.yml
```

### 2. 使用
1.通过 [git clone](https://jianmuhub.com/_/git_clone) 节点拉取项目组dsl文件、项目dsl文件所在的git仓库

2.通过 [同步项目组](https://jianmuhub.com/_/sync_project_group) 节点，同步项目组dsl文件中定义的项目

**管道示例**
```
name: 批量导入项目

pipeline:
  git_clone:
    type: git_clone:1.2.0
    param:
      remote_url: https://gitee.com/jianmu-dev/jianmu-ci-dsl.git
      ref: refs/heads/master
      username: ((gitee.username))
      password: ((gitee.password))
  sync_project_group:
    type: sync_project_group:2.0.0
    param:
      ci_url: https://ci.jianmu.dev
      ci_username: ((xxx.xxx))
      ci_password: ((xxx.xxx))
      git_path: ${git_clone.git_path}
      group_file_path: /project_group.yml
      deletable: false
```