import request from '@/utils/request'

// 配置更新
export default{
  upload(data,baseUrl) {
    return request({
      url: '/api/UploadFileImpl',
      method: 'post',
      data: data,
      baseURL: baseUrl,
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    })
  }
}


