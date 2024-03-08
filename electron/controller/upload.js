'use strict';

const { Controller } = require('ee-core');
const Cross = require('ee-core/cross');
const Log = require('ee-core/log');
const HttpClient = require('ee-core/httpclient');
const Services = require('ee-core/services');

/**
 * Cross
 * @class
 */
class CrossController extends Controller {



  /**
   * Access the api for the cross service
   */
  async requestApi(args) {
    const { name, urlPath, params} = args;
    const hc = new HttpClient();
    const serverUrl = Cross.getUrl(name);
    console.log('Server Url:', serverUrl);

    const apiHello = serverUrl + urlPath;
    const options = {
      method: 'GET',
      data: params || {},
      dataType: 'json',
      timeout: 1000,  
    };
    const result = await hc.request(apiHello, options);

    return result.data;
  }
}

CrossController.toString = () => '[class CrossController]';
module.exports = CrossController;  