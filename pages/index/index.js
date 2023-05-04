import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    avatarUrl: "",
    name: "",
    m: 0,
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

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.setData({
                name: res.userInfo.nickName, // 微信昵称
                avatarUrl: res.userInfo.avatarUrl, // 微信头像
              })
            }
          })
        } else {
          // 未授权，结果返回null
          that.setData({
            m: 0, // 结果
          })
        }
      }
    })
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
   * 用户信息获取权限
   */

  getUserProfile: function () {
    if (this.data.m == 0) {
      wx.getUserProfile({
        desc: '信息仅作为个人展示',
        success: (res) => {
          console.log('获取成功', res)
          wx.setStorage({
            data: res.userInfo,
            key: 'userInfo',
          });
          this.setData({
            m: 1,
            avatarUrl: res.userInfo.avatarUrl || '',
            name: res.userInfo.nickName || '',
          })
        },
        fail: (res) => {
          console.log('用户拒绝', res)
          this.setData({
            m: 0
          })
        }
      })
    } else {
      wx.showToast({
        title: '您已登录啦',
      })
    }
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
        // wx.navigateTo({
        //   url: '/pages/index/like/like',
        // })
        break;
      case "个人设置":
        Toast('个人设置');
        // wx.navigateTo({
        //   url: '/pages/countDown/countDown',
        // })
        break;
      default:
        break;
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
    var useInfo = wx.getStorageSync('userInfo')
    console.log(useInfo)
    if (useInfo) {
      this.setData({
        avatarUrl: useInfo.avatarUrl || '',
        name: useInfo.nickName || '',
      })
    } else {
      Toast('用户授权解锁更多福利');
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