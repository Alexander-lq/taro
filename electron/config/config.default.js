'use strict';

const path = require('path');

/**
 * 默认配置
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
  config.openAppMenu = true;

  /**
   * 主窗口
   */
  config.windowsOption = {
    title: '芋头',
    width: 980,
    height: 650,
    minWidth: 400,
    minHeight: 300,
    webPreferences: {
      webSecurity: false,
      contextIsolation: false, // false -> 可在渲染进程中使用electron的api，true->需要bridge.js(contextBridge)
      nodeIntegration: true,
      //preload: path.join(appInfo.baseDir, 'preload', 'bridge.js'),
    },
    frame: true,
    show: false,
    icon: path.join(appInfo.home, 'public', 'images', 'logo-32.png'),
  };

  /**
   * ee框架日志
   */  
  config.logger = {
    encoding: 'utf8',
    level: 'INFO',
    outputJSON: false,
    buffer: true,
    enablePerformanceTimer: false,
    rotator: 'day',
    appLogName: 'ee.log',
    coreLogName: 'ee-core.log',
    errorLogName: 'ee-error.log' 
  }

  /**
   * 远程模式-web地址
   */    
  config.remoteUrl = {
    enable: false,
    url: 'http://electron-egg.kaka996.com/'
  };

  /**
   * 内置socket服务
   */   
  config.socketServer = {
    enable: false,
    port: 7070,
    path: "/socket.io/",
    connectTimeout: 45000,
    pingTimeout: 30000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e8,
    transports: ["polling", "websocket"],
    cors: {
      origin: true,
    }
  };

  /**
   * 内置http服务
   */     
  config.httpServer = {
    enable: true,
    https: {
      enable: false, 
      key: '/public/ssl/localhost+1.key',
      cert: '/public/ssl/localhost+1.pem'
    },
    host: '127.0.0.1',
    port: 7075,
    cors: {
      origin: "*",
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      credentials: true,
      allowHeaders: 'content-type',
    },
    body: {
      multipart: true,
      formidable: {
        keepExtensions: true
      }
    },
    filterRequest: {
      uris:  [
        'favicon.ico'
      ],
      returnData: ''
    }
  };



  /**
   * 主进程
   */     
  config.mainServer = {
    protocol: 'file://',
    indexPath: '/public/dist/index.html',
  }; 

  /**
   * Cross-language service
   * 跨语言服务
   * 生产环境：执行go的二进制程序
   */
  config.cross = {
    go: {
      enable: false,
      name: 'goapp',
      args: ['--port=7073'],
      appExit: true,
    },
  };   

  /**
   * 硬件加速
   */
  config.hardGpu = {
    enable: true
  };

  /**
   * 异常捕获
   */
  config.exception = {
    mainExit: false,
    childExit: true,
    rendererExit: true,
  };

  /**
   * jobs
   */
  config.jobs = {
    messageLog: true
  };  

  /**
   * 插件功能
   */
  config.addons = {
    window: {
      enable: true,
    },
    tray: {
      enable: true,
      title: '芋头',
      icon: '/public/images/tray.png'
    },
    security: {
      enable: true,
    },
    awaken: {
      enable: true,
      protocol: 'ee',
      args: []
    },
    autoUpdater: {
      enable: true,
      windows: false, 
      macOS: false, 
      linux: false,
      options: {
        provider: 'generic', 
        url: 'http://kodo.qiniu.com/'
      },
      force: false,
    }
  };

  return {
    ...config
  };
}
