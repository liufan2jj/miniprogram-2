// pages/login/login.js
import {
  login
} from "../../api/login.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async login() {
    let obj = {
      name: "admin",
      password: "dingding2021"
    }
    const {
      code,
      msg,
      data
    } = await login(obj)
    if (code === 200) {
      console.log(data)
      wx.setStorageSync('token', data.token);
      wx.showToast({
        title: msg,
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
        url: '/pages/home/home'
      })
    } else {
      wx.showToast({
        title: msg,
        icon: "error",
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})