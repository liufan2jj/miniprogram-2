// pages/play/play.js
import {
  getMaterialDetail
} from "../../api/details/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materialDetail: {},
    materialDetailId: null,
    material_type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    this.setData({
      materialDetailId: options.id,
      material_type: options.type
    })
    this.getMaterialDetail()
  },
  async getMaterialDetail() {
    try {
      wx.setNavigationBarTitle({
        title: '数据加载中...'
      })
      wx.showNavigationBarLoading({})
      const {
        code,
        msg,
        data
      } = await getMaterialDetail({
        material_id: this.data.materialDetailId
      })
      if (code === 200) {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '素材预览'
        })
        this.setData({
          materialDetail: data,
        });
        // console.log(data)
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
        title: '素材组详情'
      })
      error === "error" ? "" : wx.showToast({
        title: error,
        icon: "error",
        duration: 1500
      });
    } finally {}
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