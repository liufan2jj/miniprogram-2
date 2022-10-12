const App = getApp()

export function getAlbumList(data) {
  return App.$Http.post({
    // 请求api
    url: '/api/creativeCenter/getAlbumList',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}

export function getMaterialGroupList(data) {
  return App.$Http.post({
    // 请求api
    url: '/api/creativeCenter/getMaterialGroupList',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}