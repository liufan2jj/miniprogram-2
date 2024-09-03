// 引用的utils/playerManager.js的代码
var PlayerManager = require('../../utils/playerManager')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: ['https://img-blog.csdnimg.cn/5589ae9720df44fda0967faaa288a553.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16', 'https://img-blog.csdnimg.cn/5580029c6bed471487fe93983088cbae.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16', 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16'],
    iconList: [{
        icon: "../../static/img/paihangbang.png",
        text: "排行"
      },
      {
        icon: "../../static/img/fulizhongxin.png",
        text: "福利"
      },
      {
        icon: "../../static/img/huangguan.png",
        text: "VIP"
      }
    ],
    jingXuanList: [{
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
        num: "9999万 播放量"
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
        num: "9999万播放量"
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
        num: "9999万 播放量"
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
        num: "9999万 播放量"
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
        num: "9999万 播放量"
      },
      {
        img: 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16',
        desc: "wwwwwwwwwwwwwwww爆炸新闻",
        num: "9999万 播放量"
      },
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    value: '',
  },
  // 搜索栏跳转搜索页
  goSearchPage() {
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  },
  // 排行 福利 Vip 跳转事件
  goClassification: function (e) {
    switch (e.currentTarget.dataset.type) {
      case "排行":
        wx.navigateTo({
          url: '/pages/rankingList/rankingList',
        })
        break;
      case "福利":
        wx.navigateTo({
          url: '/pages/welfare/welfare',
        })
        break;
      case "VIP":
        wx.navigateTo({
          url: '/pages/member/member',
        })
        break;
      default:
        break;
    }
  },
  // 点击跳转播放器
  goPlayVideo() {
    PlayerManager.navigateToPlayer({
      srcAppid: 'wx8fe8a8ed30593822', // 剧目提审方 appid
      dramaId: '100740', // 小程序管理后台的媒资管理上传的剧目的 dramaId
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
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