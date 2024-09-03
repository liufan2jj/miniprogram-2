// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: -1,
    chargeList: [{
        discount: '',
        original_price: "¥2",
        discount_price: "200金币"
      },
      {
        discount: '特惠',
        original_price: "¥9.9",
        discount_price: "200 + 送200"
      },
      {
        discount: '',
        original_price: "¥29.9",
        discount_price: "2990 + 送1000"
      },
      {
        discount: '热门',
        original_price: "¥49.9",
        discount_price: "4990 + 送2500"
      },
      {
        discount: '',
        original_price: "¥99.9",
        discount_price: "9990 + 送5000"
      },
      {
        discount: '性价比',
        original_price: "¥300",
        discount_price: "30000 + 送20000"
      },
    ],
  },
  gomemberPage() {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  // 充值选择
  checkCharge(e) {
    const {
      index,
      original_price,
    } = e.currentTarget.dataset
    this.setData({
      current: index
    })
    console.log(index, this.data.current, original_price)
  },
  // 充值规则
  gochargeRule() {
    wx.navigateTo({
      url: '/pages/userAgreement/userAgreement?tabs=0',
    })
  },
  // 会员协议
  gomemberAgreement() {
    wx.navigateTo({
      url: '/pages/userAgreement/userAgreement?tabs=1',
    })
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