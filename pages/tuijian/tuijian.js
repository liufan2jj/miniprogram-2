// 引用的utils/playerManager.js的代码
var PlayerManager = require('../../utils/playerManager')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, //骨架屏状态
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    PlayerManager.navigateToPlayer({
      srcAppid: 'wx8fe8a8ed30593822', // 剧目提审方 appid
      dramaId: '100740', // 小程序管理后台的媒资管理上传的剧目的 dramaId
      serialNo: '1', // 剧目中的某一集
      extParam: encodeURIComponent('a=b&c=d'), // 扩展字段,需要encode
    })
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