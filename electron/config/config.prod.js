'use strict';

/**
 * 生产环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
  const config = {};

  /**
   * 开发者工具
   */
  config.openDevTools = true;

  /**
   * 应用程序顶部菜单
   */
  config.openAppMenu = false;

  /**
   * jobs
   */
  config.jobs = {
    messageLog: false
  };

  /**
   * Cross-language service
   * 跨语言服务
   */
  config.cross = {
    go: {
      enable: false,
      name: 'goapp',
      args: ['--port=7073'],
      appExit: true,
    }
  };

  return {
    ...config
  };
};
