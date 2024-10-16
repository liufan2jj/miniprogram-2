// pages/login/login.js
const app = getApp()
import {
  login
} from '../../../api/login.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: 'admin',
    password: 'dingding2021',
    clientHeight: '',
    flag: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          clientHeight: res.windowHeight,
        })
      },
    })
  },
  //获取输入款内容
  content(e) {
    this.setData({
      username: e.detail.value,
    })
  },
  password(e) {
    this.setData({
      password: e.detail.value,
    })
  },
  setEye() {
    this.setData({
      flag: !this.data.flag,
    })
  },
  //登录接口
  async login() {
    try {
      if (this.data.username == '')
        return wx.showToast({
          icon: 'none',
          title: '账号不能为空',
        })
      if (this.data.password == '')
        return wx.showToast({
          icon: 'none',
          title: '密码不能为空',
        })
      wx.setNavigationBarTitle({
        title: '登录中...',
      })
      wx.showNavigationBarLoading({})
      let obj = {
        name: this.data.username,
        password: this.data.password,
      }
      const {
        code,
        msg,
        data
      } = await login(obj)
      if (code === 200) {
        // console.log(data)
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '稳健医疗',
        })
        wx.setStorageSync('token', data.token)
        wx.showToast({
          title: msg,
          icon: 'success',
          duration: 2000,
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      } else {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 1500,
        })
      }
    } catch (error) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: '稳健医疗',
      })
      error === 'error' ?
        '' :
        wx.showToast({
          title: error.msg,
          icon: 'none',
          duration: 1500,
        })
    } finally {}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})