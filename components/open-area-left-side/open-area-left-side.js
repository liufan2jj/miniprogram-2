var plugin = requirePlugin("playlet-plugin");

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    playerId: {
      type: String,
      value: ''
    },
    serialNo: {
      type: Number,
      value: 0
    },
    item: { // 传入的leftsideAreaList数组下的某一项
      type: Object,
      value: {}
    },
    index: { // 传入的leftsideAreaList数组下的某一项
      type: Number,
      value: 0
    },
    ext: {
      type: String,
      value: ''
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    pageShow: false,
  },
  lifetimes: {
    attached() {
      // if (getCurrentPages()[0].route != "pages/tuijian/tuijian") {
      //   this.setData({
      //     pageShow: false
      //   })
      // } else {
      //   this.setData({
      //     pageShow: true
      //   })
      // }
    }
  },
  observers: {
    // pageShow() {
    //   this.goBack()
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onOperate() {
      const pm = this.getPlayerManager()
      pm.updateOpenArea({
        showLeft: true,
        leftsideAreaList: []
      })
    },
    // goBack() {
    //   const pm = this.getPlayerManager()
    //   if (getCurrentPages()[0].route == "pages/tuijian/tuijian") {
    //     pm.onBack(function () {
    //       pm.switchTab({
    //         url: '/pages/juchang/juchang',
    //       })
    //     })
    //   }
    // },
    getPlayerManager() {
      return plugin.PlayletManager.getPageManager(this.data.playerId)
    },
  },
})