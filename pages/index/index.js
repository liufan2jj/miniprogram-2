// pages/index.js
import {
  getMaterialList
} from "../../api/details/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: 1,
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    text: '',
  },
  changeValue(e) {
    this.setData({
      timeData: e.detail,
    });
    this.addStep()
  },
  addStep() {
    if (this.data.value >= 100) {
      this.setData({
        value: 0
      })
    }
    this.setData({
      value: this.data.value += 1,
      text: this.data.value + "％"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async getMaterialList() {
    let obj = {
      page: 1,
      page_size: 100
    }
    const {
      code,
      msg,
      data
    } = await getMaterialList(obj)
    if (code === 200) {
      console.log(data)
      wx.showToast({
        title: msg,
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: msg,
        icon: "error",
        duration: 1500
      })
    }
  },
  loginOut() {
    wx.removeStorageSync('token')
    wx.clearStorage()
    wx.redirectTo({
      url: '/pages/login/login'
    })
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