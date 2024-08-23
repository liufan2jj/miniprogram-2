//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //img_url: config.imgUrl, //图片地址
    //签到模块
    totalNum: 0, //金币总数
    signNum: 0, //签到数
    signState: false, //签到状态
    min: 1, //默认值日期第一天1
    max: 7, //默认值日期最后一天7
    be: 0, //默认倍数
    n: 7, //签到周期
    integral: 5, //当天签到积分
    activeNames: ['1'],
    todoList: [{
        contentText: '完成一笔3000万的订单',
        state: true
      },
      {
        contentText: '完成一笔3000万的订单',
        state: false
      },
      {
        contentText: '完成一笔3000万的订单',
        state: false
      },
      {
        contentText: '完成一笔3000万的订单',
        state: false
      },
      {
        contentText: '完成一笔3000万的订单',
        state: false
      },
      {
        contentText: '完成一笔3000万的订单',
        state: false
      },
      {
        contentText: '完成一笔3000万的订单',
        state: false
      },
    ]
  },
  // 初始化数据方法
  generateArray(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
    return array;
  },
  //7天为周期转化方法
  transformList(n, integral) {
    const reduce = n - 1
    if (this.data.signNum % n == 0) {
      this.data.min = this.data.signNum - reduce
      this.data.max = this.data.signNum
    } else {
      this.data.min = this.data.signNum - this.data.signNum % n + 1
      this.data.max = this.data.min + reduce
    }
    this.setData({
      list: this.generateArray(this.data.min, this.data.max),
      signNum: this.data.signNum,
      totalNum: this.data.signNum * integral
    })
  },
  //签到
  bindSignIn(e) {
    this.data.signNum++
    this.data.totalNum += 5
    this.transformList(this.data.n, this.data.integral)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.signNum = 8
    this.transformList(this.data.n, this.data.integral)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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