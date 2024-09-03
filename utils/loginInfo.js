import {
  login,
  getPhoneNumber
} from '../api/login.js'
// 登录接口
async function loginUser(params) {
  try {
    const {
      code,
      msg,
      data
    } = await login({
      code: params
    });
    if (code === 200) {
      wx.setStorage({
        data: data,
        key: 'userInfo',
      });
    } else {
      wx.showToast({
        title: error,
        icon: "error"
      })
    }
  } catch (error) {
    wx.showToast({
      title: error,
      icon: "error"
    })
  } finally {

  }
}
// 获取手机号接口
async function getPhone(params) {
  try {
    const {
      code,
      msg,
      data
    } = await getPhoneNumber({
      code: params,
    })
    if (code === 200) {
      wx.showToast({
        title: '同步成功',
      })
    }
  } catch (error) {

  } finally {

  }
}
// 缓存是否过期
function _isExpiration() {
  // 当前时间
  var timestamp = Date.parse(new Date());
  // 缓存中的过期时间
  var data_expiration = wx.getStorageSync("data_expiration");
  // 如果缓存中没有data_expiration，说明也没有token，还未登录
  if (data_expiration) {
    // 如果超时了，清除缓存，重新登录
    if (timestamp > data_expiration) {
      wx.removeStorageSync('token')
      wx.removeStorageSync('data_expiration')
      return true;
    } else {
      return false;
    }
  } else {
    return true
  }
}
export default {
  loginUser,
  getPhone,
  _isExpiration
}