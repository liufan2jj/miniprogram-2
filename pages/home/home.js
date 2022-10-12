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
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    currentIdL: 0,
    scrollLeft: 0, //tab标题的滚动条位置
    scrollNum: 1,
    albumList: [],
    navList: [{ //table栏切换数据
        id: 0,
        title: "健康"
      },
      {
        id: 1,
        title: "情感"
      },
      {
        id: 2,
        title: "职场"
      },
      {
        id: 3,
        title: "育儿"
      },
      {
        id: 4,
        title: "纠纷"
      },
      {
        id: 5,
        title: "青葱"
      },
      {
        id: 6,
        title: "全部"
      },
      {
        id: 7,
        title: "其他1"
      },
      {
        id: 8,
        title: "其他2"
      },
      {
        id: 9,
        title: "其他3"
      },
      {
        id: 10,
        title: "其他4"
      },
      {
        id: 11,
        title: "其他5"
      },
      {
        id: 12,
        title: "其他6"
      },
    ],
    expertData: [{ //初始数据
      img: "https://img1.baidu.com/it/u=467262757,1977718385&fm=253&fmt=auto&app=138&f=JPG?w=328&h=485",
      name: "刘德华",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=120547587,4272281949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=692",
      name: "郭富城",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img2.baidu.com/it/u=2826703203,3270717982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=734",
      name: "张学友",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=1950660083,691833243&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=600",
      name: "黎明",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img0.baidu.com/it/u=82724758,2778936318&fm=253&fmt=auto&app=138&f=JPEG?w=558&h=500",
      name: "陈志朋",
      tag: "小虎队成员",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img2.baidu.com/it/u=364840430,1183966104&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
      name: "吴奇隆",
      tag: "小虎队成员",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=1978147074,2558334764&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=733",
      name: "苏有朋",
      tag: "小虎队成员",
      answer: 134,
      listen: 2234
    }, {
      img: "https://dev-tms.oss-cn-shenzhen.aliyuncs.com/dev%2F2022-10-09%2Fway_bill_seal_info%2Fdd4b7f6a7b0ba9a1b361a5096330e660_4.jpg",
      name: "稳健宝宝",
      tag: "未来之星",
      answer: 134,
      listen: 2234
    }],
    expertList: [{
      img: "https://dev-tms.oss-cn-shenzhen.aliyuncs.com/dev%2F2022-10-09%2Fway_bill_seal_info%2Fdd4b7f6a7b0ba9a1b361a5096330e660_4.jpg",
      name: "稳健宝宝",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, ],
    expertList1: [{
      img: "https://img1.baidu.com/it/u=467262757,1977718385&fm=253&fmt=auto&app=138&f=JPG?w=328&h=485",
      name: "刘德华",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }],
    expertList2: [{
      img: "https://img1.baidu.com/it/u=120547587,4272281949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=692",
      name: "郭富城",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }],
    expertList3: [{
      img: "https://img2.baidu.com/it/u=2826703203,3270717982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=734",
      name: "张学友",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }],
    expertList4: [{
      img: "https://img1.baidu.com/it/u=1950660083,691833243&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=600",
      name: "黎明",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }],
    expertList5: [{
      img: "https://dev-tms.oss-cn-shenzhen.aliyuncs.com/dev%2F2022-10-09%2Fway_bill_seal_info%2Fdd4b7f6a7b0ba9a1b361a5096330e660_4.jpg",
      name: "稳健宝宝",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, ],
    expertList6: [{
      img: "https://img1.baidu.com/it/u=467262757,1977718385&fm=253&fmt=auto&app=138&f=JPG?w=328&h=485",
      name: "刘德华",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=120547587,4272281949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=692",
      name: "郭富城",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img2.baidu.com/it/u=2826703203,3270717982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=734",
      name: "张学友",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=1950660083,691833243&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=600",
      name: "黎明",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://dev-tms.oss-cn-shenzhen.aliyuncs.com/dev%2F2022-10-09%2Fway_bill_seal_info%2Fdd4b7f6a7b0ba9a1b361a5096330e660_4.jpg",
      name: "稳健宝宝",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=467262757,1977718385&fm=253&fmt=auto&app=138&f=JPG?w=328&h=485",
      name: "刘德华",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=120547587,4272281949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=692",
      name: "郭富城",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img2.baidu.com/it/u=2826703203,3270717982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=734",
      name: "张学友",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=1950660083,691833243&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=600",
      name: "黎明",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://dev-tms.oss-cn-shenzhen.aliyuncs.com/dev%2F2022-10-09%2Fway_bill_seal_info%2Fdd4b7f6a7b0ba9a1b361a5096330e660_4.jpg",
      name: "稳健宝宝",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }],
    expertList7: [{
      img: "https://img2.baidu.com/it/u=2826703203,3270717982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=734",
      name: "张学友",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }, {
      img: "https://img1.baidu.com/it/u=1950660083,691833243&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=600",
      name: "黎明",
      tag: "四大天王",
      answer: 134,
      listen: 2234
    }],
  },
  //切换赋值
  changeTab: function (current) {
    switch (current) {
      case 0:
        this.setData({
          expertData: this.data.expertList
        });
        break;
      case 1:
        this.setData({
          expertData: this.data.expertList1
        });
        break;
      case 2:
        this.setData({
          expertData: this.data.expertList2
        });
        break;
      case 3:
        this.setData({
          expertData: this.data.expertList3
        });
        break;
      case 4:
        this.setData({
          expertData: this.data.expertList4
        });
        break;
      case 5:
        this.setData({
          expertData: this.data.expertList5
        });
        break;
      case 6:
        this.setData({
          expertData: this.data.expertList6
        });
        break;
      case 7:
        this.setData({
          expertData: this.data.expertList7
        });
        break;
      default:
        break;
    }
  },
  //模拟接口请求
  loading: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '数据加载中...'
    })
    wx.showNavigationBarLoading({
      success: function (res) {
        const {
          errMsg
        } = res
        console.log(errMsg)
        setTimeout(() => {
          that.data.expertData.push({
            img: "https://dev-tms.oss-cn-shenzhen.aliyuncs.com/dev%2F2022-10-09%2Fway_bill_seal_info%2Fdd4b7f6a7b0ba9a1b361a5096330e660_4.jpg",
            name: "稳健宝宝",
            tag: "未来之星",
            answer: 134,
            listen: 2234
          })
          var newList = that.data.expertData
          that.setData({
            expertData: newList
          })
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
          wx.setNavigationBarTitle({
            title: '首页'
          })
        }, 3000)
      },
      fail: function (res) {
        const {
          errMsg
        } = res
        console.log(errMsg)
      }
    })
  },
  //滚动到顶部
  upper(e) {},
  //滚动到底部
  lower(e) {
    this.loading()
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
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
      this.getMaterialGroupList(e.target.dataset.id)
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 0) {
      this.data.scrollNum++
      this.setData({
        scrollLeft: 140 * this.data.currentTab
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
  async getAlbumList() {
    const {
      code,
      msg,
      data
    } = await getAlbumList({})
    if (code === 200) {
      this.setData({
        albumList: data.list
      });
      this.getMaterialGroupList(this.data.albumList[0].id)
    } else {
      wx.showToast({
        title: msg,
        icon: "error",
        duration: 1500
      })
    }
  },
  async getMaterialGroupList(id) {
    const {
      code,
      msg,
      data
    } = await getMaterialGroupList({
      album_id: id
    })
    if (code === 200) {
      var updateList = data.list
      this.setData({
        expertData: updateList
      });
      console.log(data)
    } else {
      wx.showToast({
        title: msg,
        icon: "error",
        duration: 1500
      })
    }
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