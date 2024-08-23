import Toast from '@vant/weapp/toast/toast';
import request from '../../utils/loginInfo'
Page({
  data: {
    avatarUrl: "",
    name: "",
    userInfo: {},
    mySet: [{
        'name': "我的预约",
        'img': "../../static/img/yuyue-lishi.png"
      },
      {
        'name': "我的收藏",
        'img': "../../static/img/shoucang.png"
      },
      {
        'name': "个人设置",
        'img': "../../static/img/icon-shezhi.png"
      },
    ]
  },
  //跳转修改昵称头像页面
  goUserInfo() {
    wx.navigateTo({
      url: '/pages/updateUserinfo/updateUserinfo',
    })
  },
  /**
   * 点击我的预约等板块后进行页面跳转
   */
  onMySet: function (e) {
    switch (e.currentTarget.dataset.type) {
      case "我的预约":
        Toast('我的预约');
        wx.navigateTo({
          url: '/pages/countDown/countDown',
        })
        break;
      case "我的收藏":
        Toast('我的收藏');
        break;
      case "个人设置":
        Toast('个人设置');
        break;
      default:
        break;
    }
  },
  // 绑定手机号
  getPhoneNumber (e) {
    request.getPhone(e.detail.code)
    console.log(e.detail.code)  // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno)  // 错误码（失败时返回）
  },
  //退出登录
  loginOut() {
    wx.removeStorageSync('token')
    wx.clearStorage()
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.userInfo = wx.getStorageSync('userInfo')
    if (this.data.userInfo) {
      this.setData({
        avatarUrl: this.data.userInfo.avatar_url || '',
        name: this.data.userInfo.nickname || '',
        userInfo: this.data.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    console.log('下拉了')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉了')
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})