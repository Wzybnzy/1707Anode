/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578368767145_3902';

  // add your middleware config here
  config.middleware = ['authorization'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      // csrf: false
      csrf: {
        // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
        // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
        headerName: 'aa-token' // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      }
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: '07a',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
