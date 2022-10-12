const App = getApp()
export function login(data) {
  return App.$Http.post({
    // 请求api
    url: '/api/login/login',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}