/*************************************************
 ** preload为预加载模块，该文件将会在程序启动时加载 **
 *************************************************/
const Addon = require('ee-core/addon');
const Services = require('ee-core/services');

/**
 * 预加载模块入口
 */
module.exports = async () => {

  // 已实现的功能模块，可选择性使用和修改
  Addon.get('tray').create();
  Addon.get('security').create();
  Addon.get('awaken').create();
  Addon.get('autoUpdater').create();
  Services.get('cross').createJavaServer();
  Services.get('cross').createGoServer();
}