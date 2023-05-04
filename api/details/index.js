const App = getApp()

export function getMaterialList(data) {
  return App.$Http.post({
    // 请求api
    url: '/api/creativeCenter/getMaterialList',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}

export function getMaterialDetail(data) {
  return App.$Http.post({
    // 请求api
    url: '/api/creativeCenter/getMaterialDetail',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}