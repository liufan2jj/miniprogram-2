import {
  requestGet,
  requestPost,
} from '../utils/request'

//福利页初始化
export function welfareActivityInfo(data) {
  return requestGet({
    // 请求api
    url: '/playlet/playlet/welfare/activity/info',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}

//权益卡列表
export function welfareCardList(data) {
  return requestGet({
    // 请求api
    url: '/playlet/playlet/welfare/card/list',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}

//领取权益卡
export function welfareCardReceive(data) {
  return requestPost({
    // 请求api
    url: '/playlet/playlet/welfare/card/receive',
    // 请求参数
    data: data,
    // 是否开启loading，可选 默认 true
    loading: true
  });
}