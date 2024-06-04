import request from '@/utils/request'

// 配置更新
export default{
  upload(data,baseUrl) {
    return request({
      url: '/encrty/upload',
      method: 'post',
      data: data,
      baseURL: baseUrl,
      headers: {'Content-type': 'application/json;charset=utf-8'}
    })
  }
}


