// 引用的utils/playerManager.js的代码
const PlayerManager = require('../../utils/playerManager').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "/pages/juchang/juchang"
  },
  // 无我看过或在追剧时触发去看剧按钮
  onTapEmpty: function (e) {
    PlayerManager.navigateToPlayer({
      srcAppid: 'wx1234567890123456', // 剧目提审方 appid
      dramaId: '100001', // 小程序管理后台的媒资管理上传的剧目的 dramaId
      serialNo: '1', // 剧目中的某一集
      extParam: encodeURIComponent('a=b&c=d'), // 扩展字段,需要encode
    })
    // wx.switchTab({
    //   url: '/pages/juchang/juchang',
    // })
  },
  // 点击了对应的剧
  onClick: function (e) {

  },
  // 取消在追剧的收藏
  unfav: function (e) {
    console.log(e, 3)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})