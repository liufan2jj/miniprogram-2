// pages/home.js
var app = getApp();
import {
  getAlbumList,
  getMaterialGroupList
} from "../../api/index/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, //骨架屏状态
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    currentId: 0,
    scrollLeft: 0, //tab标题的滚动条位置
    scrollNum: 1,
    page: 1,
    page_size: 10,
    total: 0,
    id: null,
    albumList: [],
    navList: [],
    expertData: [],
    flag: true
  },
  //滚动到顶部
  upper(e) {},
  //滚动到底部
  lower(e) {
    // console.log(e, 'sss')
    this.getMaterialGroupList()
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    // console.log(e, '滑动')
    this.setData({
      currentTab: e.detail.current,
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    // console.log(e, '点击')
    var cur = e.target.dataset.current;
    this.data.expertData = []
    this.data.page = 1
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        id: e.target.dataset.id
      })
      this.getMaterialGroupList()
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 1) {
      this.data.scrollNum++
      this.setData({
        scrollLeft: 150 * (this.data.currentTab - 1)
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //首页数据请求
    that.getAlbumList()
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc,
        });
      }
    });
  },
  //tab切换请求接口数据
  async getAlbumList() {
    try {
      wx.setNavigationBarTitle({
        title: '数据加载中...'
      })
      wx.showNavigationBarLoading({})
      const {
        code,
        msg,
        data
      } = await getAlbumList({})
      if (code === 200) {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '首页'
        })
        this.setData({
          albumList: data.list,
          id: data.list[0].id
        });
        this.getMaterialGroupList()
      } else {
        wx.showToast({
          title: msg,
          icon: "error",
          duration: 1500
        })
      }
    } catch (error) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: '首页'
      })
      error === "error" ? "" : wx.showToast({
        title: error.msg,
        icon: "error",
        duration: 1500
      });
    } finally {}
  },
  //点击tab获取数据接口
  async getMaterialGroupList() {
    try {
      wx.setNavigationBarTitle({
        title: '数据加载中...'
      })
      wx.showNavigationBarLoading({})
      const {
        code,
        msg,
        data
      } = await getMaterialGroupList({
        album_id: this.data.id,
        page: this.data.page,
        page_size: this.data.page_size
      })
      if (code === 200) {
        this.setData({
          loading: false,
        });
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '首页'
        })
        this.setData({
          expertData: this.data.expertData.concat(data.list),
          total: data.page_info.total_count
        });
        if (data?.list?.length <= 0) return wx.showToast({
          title: "没有更多数据了",
          icon: "none",
          duration: 1500
        })
        this.setData({
          page: this.data.page += 1
        })
        // console.log(this.data.page, data.list)
      } else {
        wx.showToast({
          title: msg,
          icon: "error",
          duration: 1500
        })
      }
    } catch (error) {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: '首页'
      })
      error === "error" ? "" : wx.showToast({
        title: error.msg,
        icon: "error",
        duration: 1500
      });
    } finally {}
  },
  footerTap: app.footerTap,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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