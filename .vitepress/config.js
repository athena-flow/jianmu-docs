const {name, version} = require('../package.json');

const checkCdn = () => {
  console.log(process.env);
  const {npm_config_argv} = process.env;
  const {original} = JSON.parse(npm_config_argv);

  return original.includes('build') &&
    original.includes('--mode') &&
    original.includes('cdn')
};

const base = checkCdn() ? `/${name}/${version}` : '';

module.exports = {
  title: '持续集成平台',
  description: '建木持续集成平台文档',
  lang: 'zh-CN',
  base,
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: `${base}/favicon.ico`,
      },
    ],
    [
      'script',
      {
        src: `${base}/refactor.js`,
      }
    ],
    // 百度统计
    [
      'script',
      {
        src: "https://hm.baidu.com/hm.js?beb9a87efce5424df2ecbbd3caa68d81",
      }
    ],
  ],
  // 主题配置
  themeConfig: {
    // 侧边导航
    sidebar: [{
      text: '首页',
      link: '/guide/index',
    },
      {
        text: '快速开始',
        link: '/guide/quick-start',
      },
      {
        text: '如何使用',
        children: [{
          text: '全局配置',
          link: '/guide/global',
        }, {
          text: '触发器',
          children: [{
            text: 'Webhook',
            link: '/guide/webhook'
          }, {
            text: 'Cron',
            link: '/guide/cron',
          }],
        }, {
          text: '流程编排',
          children: [{
            text: '流程定义',
            link: '/guide/flow-dsl'
          }, {
            text: '管道定义',
            link: '/guide/pipeline-dsl'
          }],
        }, {
          text: '节点定义',
          link: '/guide/node-dsl'
        }, {
          text: '密钥管理',
          link: '/guide/secrets'
        }],
      },
      {
        text: '高级主题',
        children: [{
          text: '参数',
          link: '/guide/vars',
        }, {
          text: "表达式",
          link: "/guide/expression"
        }, {
          text: '内置节点',
          children: [{
            text: "开始/结束节点",
            link: "/guide/start-end-node"
          }, {
            text: "网关节点",
            link: "/guide/gateway"
          }, {
            text: "Shell节点",
            link: "/guide/shell-node"
          }]
        },
          // {
          //     text: '运维',
          //     link: '/guide/operation'
          // },
          {
            text: '自定义节点',
            link: '/guide/custom-node'
          }, {
            text: '一键还原项目',
            link: '/guide/project-group'
          }, {
            text: '第三方库',
            link: '/guide/license-mixing'
          },
          {
            text: '自定义安装',
            link: '/guide/custom-installation',
          }
        ],
      }
    ],
  }
}