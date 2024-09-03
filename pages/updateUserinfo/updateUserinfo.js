import {
  upateUserInfo
} from '../../api/login.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    value: "",
    userInfo: {}
  },
  /**
   * 用户信息获取权限
   */
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    this.data.avatar_url = avatarUrl;
  },
  getUserProfile: function () {
    wx.getUserProfile({
      desc: '信息仅作为个人展示',
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log('用户拒绝', res)
      }
    })
  },
  submitUserInfo: async function () {
    try {
      let {
        id = "",
          nickname = this.data.value,
          avatar_url = this.data.avatarUrl,
          gender = "",
          language = "",
          city = "",
          province = "",
          country = ""
      } = this.data.userInfo
      const {
        code,
        msg,
        data
      } = await upateUserInfo({
        id,
        nickname,
        avatar_url,
        gender,
        language,
        city,
        province,
        country
      })
      if (code === 200) {
        wx.showToast({
          title: '更新成功',
          icon: "success"
        })
        wx.setStorageSync('userInfo', data);
        this.setData({
          avatarUrl: data.avatar_url || '',
          value: data.nickname || '',
        })
      } else {
        wx.showToast({
          title: msg,
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.data.userInfo = wx.getStorageSync('userInfo')
    if (this.data.userInfo) {
      this.setData({
        avatarUrl: this.data.userInfo.avatar_url || '',
        value: this.data.userInfo.nickname || '',
        userInfo: this.data.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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