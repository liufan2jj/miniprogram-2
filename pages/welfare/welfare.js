import {
  welfareActivityInfo
} from '../../api/welfare.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true, //骨架屏状态
    image: "",
    choice: [],
    recommend: [],
    dataFlag: {}
  },
  maskText(text) {
    if (text.length > 3) {
      return text.substr(0, 1) + '*' + text.substr(-1);
    }
    return text;
  },
  // 页面初始化接口
  async initPageList() {
    try {
      const {
        msg,
        data: {
          image,
          choice,
          recommend
        },
        code
      } = await welfareActivityInfo({})
      if (code === 200) {
        this.setData({
          image,
          choice,
          recommend,
        })
      } else {
        wx.showToast({
          title: msg,
          icon: "error"
        })
      }
    } finally {
      wx.stopPullDownRefresh()
      this.setData({
        loading: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPageList()
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
    this.initPageList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})