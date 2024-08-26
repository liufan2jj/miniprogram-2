// 引用的utils/playerManager.js的代码
const PlayerManager = require('../../utils/playerManager').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: [{
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "爆炸新闻",
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "爆炸新闻",
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "爆炸新闻",
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "爆炸新闻",
      },
    ],
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('sss')
  },
  onClick() {
    console.log(this.data.value)
    if (!this.data.value) {
      return wx.showToast({
        title: '请先输入关键词',
      })
    } else {
      wx.showToast({
        title: this.data.value,
      })
    }
  },
  // 点击跳转播放器
  goPlayVideo() {
    PlayerManager.navigateToPlayer({
      srcAppid: 'wx1234567890123456', // 剧目提审方 appid
      dramaId: '100001', // 小程序管理后台的媒资管理上传的剧目的 dramaId
      serialNo: '1', // 剧目中的某一集
      extParam: encodeURIComponent('a=b&c=d'), // 扩展字段,需要encode
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