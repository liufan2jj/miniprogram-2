// 引用的utils/playerManager.js的代码
var PlayerManager = require('../../../utils/playerManager')
import {
  searchDramaList
} from '../../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: [],
    pageNo: 1,
    pageSize: 10,
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onConfirm() {
    if (!this.data.value) {
      return wx.showToast({
        title: '请先输入关键词',
        icon: "none"
      })
    } else {
      this.setData({
        list: [],
        pageNo: 1
      })
      this.searchPageList()
    }
  },
  onClick() {
    if (!this.data.value) {
      return wx.showToast({
        title: '请先输入关键词',
        icon: "none"
      })
    } else {
      this.setData({
        list: [],
        pageNo: 1
      })
      this.searchPageList()
    }
  },
  async searchPageList() {
    const {
      code,
      data,
      msg
    } = await searchDramaList({
      key: this.data.value,
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
          list: this.data.list.concat(data),
          pageNo: ++this.data.pageNo
        })
      }
    } else {
      wx.showToast({
        title: msg,
        icon: "error"
      })
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
    this.searchPageList()
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