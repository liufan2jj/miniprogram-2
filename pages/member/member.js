// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    avatarUrl: "",
    id: "",
    iconList: [{
        icon: '',
        desc: "会员剧集"
      },
      {
        icon: '',
        desc: "看剧折扣"
      },
      {
        icon: '',
        desc: "广告特权"
      },
      {
        icon: '',
        desc: "原画画质"
      },
    ],
    chargeList: [{
        discount: '6.6折',
        mon: "月",
        original_price: "¥12",
        discount_price: "¥18"
      },
      {
        discount: '5.1折',
        mon: "季",
        original_price: "¥28",
        discount_price: "¥54"
      },
      {
        discount: '4.5折',
        mon: "年",
        original_price: "¥98",
        discount_price: "¥216"
      },
    ],
    jingXuanList: [{
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
      },
    ],
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
    this.data.userInfo = wx.getStorageSync('userInfo')
    if (this.data.userInfo) {
      this.setData({
        avatarUrl: this.data.userInfo.avatar_url || '',
        name: this.data.userInfo.nickname || '',
        id: this.data.userInfo.id || '',
        userInfo: this.data.userInfo
      })
    }
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