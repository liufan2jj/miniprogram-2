import {
  requestGet,
  requestPost,
} from '../utils/request'
// 登录接口
export function login(data) {
  return requestPost({
    // 请求api
    url: '/playlet/info/create',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: false
  });
}
// 修改用户昵称头像
export function upateUserInfo(data) {
  return requestPost({
    // 请求api
    url: '/playlet/profile/update',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}
// 获取用户手机号
export function getPhoneNumber(data) {
  return requestPost({
    // 请求api
    url: '/playlet/phone/update',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}