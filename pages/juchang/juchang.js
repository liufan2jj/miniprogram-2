// 引用的utils/playerManager.js的代码
var PlayerManager = require('../../utils/playerManager')
import {
  theatreInfo,
  selectDramaChoiceList
} from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconList: [{
        icon: "../../static/img/paihangbang.png",
        text: "排行"
      },
      {
        icon: "../../static/img/qiandao.png",
        text: "签到"
      },
      {
        icon: "../../static/img/huangguan.png",
        text: "VIP"
      }
    ],
    jingXuanList: [],
    imgList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    value: '',
    loading: true, //骨架屏状态
    pageNo: 2,
    pageSize: 10,
    noneMore: false,
    loadingMore: true
  },
  // 搜索栏跳转搜索页
  goSearchPage() {
    wx.navigateTo({
      url: '/packageDetails/pages/searchPage/searchPage',
    })
  },
  // 排行 福利 Vip 跳转事件
  goClassification: function (e) {
    switch (e.currentTarget.dataset.type) {
      case "排行":
        wx.navigateTo({
          url: '/packageDetails/pages/rankingList/rankingList',
        })
        break;
      case "签到":
        wx.navigateTo({
          url: '/packageDetails/pages/signPage/signPage',
        })
        break;
      case "VIP":
        wx.navigateTo({
          url: '/packageDetails/pages/recharge/recharge',
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
    this.initPageList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 页面初始化接口
  async initPageList() {
    this.setData({
      pageNo: 2
    })
    try {
      const {
        msg,
        data: {
          banner,
          choice
        },
        code
      } = await theatreInfo({
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      })
      if (code === 200) {
        this.setData({
          imgList: banner,
          jingXuanList: choice
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
  // 分页接口
  async getPageList() {
    try {
      const {
        msg,
        code,
        data
      } = await selectDramaChoiceList({
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      })
      if (code === 200) {
        if (data && data.length <= 0) {
          this.setData({
            noneMore: !this.data.noneMore,
            loadingMore: !this.data.loadingMore
          })
        } else {
          this.setData({
            jingXuanList: this.data.jingXuanList.concat(data),
            pageNo: ++this.data.pageNo
          })
        }
      } else {
        wx.showToast({
          title: msg,
          icon: "error"
        })
      }
    } finally {
      wx.stopPullDownRefresh()
    }
  },
  onShow() {
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 2
    //   })
    // }
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
    this.initPageList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getPageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})