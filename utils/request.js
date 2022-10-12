const ACCESS_TOKEN = 'token' // token凭证的key

import HTTP from './http'
// 创建配置信息
const requestConfig = {
  baseUrl: 'http://api.dingding10.top/index.php', // https://test.request.api
  timeout: 10 * 1000, // 请求超时时间
}
// 初始化请求实例
const newHttp = new HTTP()
newHttp.create(requestConfig)

// 请求拦截配置项
const LoadingDelayTime = 750 // showLoading 延迟时间
let requestNum = 0 // 请求次数
let showLoading = false // loading 状态
let loadingTimer = null // showLoading 定时器
let RedirectTimer = null // 重新登录 定时器

// 请求拦截器
newHttp.interceptor.request = config => {
  // 添加loading
  if (config.loading) {
    requestNum++
    // 请求队列中，是第一个请求时，创建loading
    if (requestNum === 1) {
      loadingTimer = setTimeout(() => {
        showLoading = true
        wx.showLoading({
          title: 'loading...',
          mask: true
        })
      }, LoadingDelayTime)
    }
  }

  // 添加 Token 凭证
  if (typeof config.header !== 'object') config.header = {}
  var value = wx.getStorageSync('token')
  if (value) {
    // Do something with return value
    config.header[ACCESS_TOKEN] = value
  }
  // 这里可以自定义统一处理一下 请求的参数 
  // config.data = buildOptions( config.data )
  return config
}
// 响应拦截器
newHttp.interceptor.response = response => {
  // console.log(response)
  // 关闭 Loading
  if (response.loading) {
    requestNum--
    if (requestNum === 0) {
      if (loadingTimer) {
        clearTimeout(loadingTimer)
        loadingTimer = null
      }
      if (showLoading) {
        showLoading = false
        wx.hideLoading()
      }
    }
  }
  // 错误统一处理
  if (response.statusCode === 200) {
    const {
      code,
      msg
    } = response.data
    switch (code) {
      case 200: // 成功响应
        return response.data
        break;
      case 401: // 登录凭证过期 重新登录
        // 这里做一个定时器防抖，防止多个请求返回401，重复执行
        if (RedirectTimer) clearTimeout(RedirectTimer)
        RedirectTimer = null
        RedirectTimer = setTimeout(() => {
          wx.showToast({
            title: `请先登录`,
            icon: 'none',
            duration: 1500
          })
          let timerS = setTimeout(() => {
            clearTimeout(timerS)
            // 这里做退出登录的操作
            // ......
          }, 1500)
        }, 2000)
        return false
        break;
      case 500: // 
        wx.showToast({
          title: msg,
          icon: 'none'
        })
        return false
        break;
      default:
        wx.showToast({
          title: msg,
          icon: 'none'
        })
        return false
    }
  } else if (response.statusCode === 500) {
    wx.showToast({
      title: '服务器500错误',
      icon: 'none',
      duration: 2000
    })
    return false
  } else {
    wx.showToast({
      title: '网络错误',
      icon: 'none'
    })
    return false
  }
}


//GET请求
export function requestGet({
  url,
  data = {},
  loading = true,
  header = {}
}) {
  return newHttp.get(url, data, loading, header)
}
//POST请求
export function requestPost({
  url,
  data = {},
  loading = true,
  header = {}
}) {
  return newHttp.post(url, data, loading, header)
}
// PUT请求
export function requestPut({
  url,
  data = {},
  loading = true,
  header = {}
}) {
  return newHttp.put(url, data, loading, header)
}
// DELETE请求
export function requestDelete({
  url,
  data = {},
  loading = true,
  header = {}
}) {
  return newHttp.delete(url, data, loading, header)
}