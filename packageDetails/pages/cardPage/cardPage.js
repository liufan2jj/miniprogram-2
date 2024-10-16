import {
  welfareCardList,
  welfareCardReceive
} from '../../../api/welfare.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    show: false,
    cardName: "",
    pageNo: 1,
    pageSize: 10,
    list: []
  },
  onUsecard({
    target: {
      dataset: {
        index,
        id
      }
    }
  }) {
    const {
      title
    } = this.data.list[index]
    this.setData({
      show: true,
      id,
      cardName: title
    });
  },
  async onConfirm() {
    try {
      const {
        code,
        msg
      } = await welfareCardReceive({
        id: this.data.id
      })
      if (code === 200) {
        wx.showToast({
          title: '领取成功',
          icon: 'success'
        })
        this.setData({
          pageNo: 1,
          pageSize: 10
        })
        this.getPageList()
      } else {
        wx.showToast({
          title: msg,
          icon: "error"
        })
      }
    } finally {
      this.setData({
        show: false
      });
    }
  },
  onCancel() {
    this.setData({
      show: false
    });
  },
  // 分页接口
  async getPageList() {
    try {
      const {
        msg,
        code,
        data
      } = await welfareCardList({
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      })
      if (code === 200) {
        this.setData({
          list: this.data.list.concat(data),
          pageNo: ++this.data.pageNo
        })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageList()
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
    this.getPageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})