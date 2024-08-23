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
    }
  } catch (error) {

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

export default {
  loginUser,
  getPhone
}