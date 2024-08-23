import Toast from '@vant/weapp/toast/toast';
// 引用的utils/playerManager.js的代码
const PlayerManager = require('../../utils/playerManager').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: ['https://img-blog.csdnimg.cn/5589ae9720df44fda0967faaa288a553.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16', 'https://img-blog.csdnimg.cn/5580029c6bed471487fe93983088cbae.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16', 'https://img-blog.csdnimg.cn/1472745c740d42caa002fb5b24b0069a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBALeW4jOWGgC0=,size_20,color_FFFFFF,t_70,g_se,x_16'],
    iconList: [{
        name: "bar-chart-o",
        color: "#43da47",
        size: "32px",
        text: "排行"
      },
      {
        name: "point-gift-o",
        color: "#43da47",
        size: "32px",
        text: "福利"
      },
      {
        name: "vip-card-o",
        color: "#43da47",
        size: "32px",
        text: "Vip"
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
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    value:'',
  },
  // 搜索栏跳转搜索页
  goSearchPage() {
    console.log("跳转搜索")
  },
  // 排行 福利 Vip 跳转事件
  goClassification: function (e) {
    switch (e.currentTarget.dataset.type) {
      case "排行":
        Toast('排行');
        // wx.navigateTo({
        //   url: '/pages/countDown/countDown',
        // })
        break;
      case "福利":
        wx.navigateTo({
          url: '/pages/welfare/welfare',
        })
        break;
      case "Vip":
        Toast('Vip');
        // wx.navigateTo({
        //   url: '/pages/countDown/countDown',
        // })
        break;
      default:
        break;
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