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
    srcAppid: {
      type: String,
      value: ''
    },
    dramaId: {
      type: String,
      value: ''
    },
    serialNo: {
      type: Number,
      value: 0
    },
    extParam: {
      type: String,
      value: ''
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    _isInitChargeDialog: false,
    chargeList: [],
    selectIndex: -1,
  },
  lifetimes: {
    attached() {
      this.initChargeDialog()
    }
  },
  observers: {
    serialNo(serialNo) {
      // 当集数发生改变的时候，触发此函数
    },
    playerId(playerId) {
      console.log('this.initChargeDialog', playerId)
      this.initChargeDialog()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initChargeDialog() {
      // 如果播放器页面还没有playerId，返回
      if (!this.data.playerId) return
      // 只需要初始化一次
      if (this.data._isInitChargeDialog) return
      this.data._isInitChargeDialog = true
      const pm = this.getPlayerManager()
      if (pm) {
        // 注册弹窗显示事件
        pm.onShowChargeDialog(this.onShowChargeDialog.bind(this))
        // 注册弹窗隐藏事件
        pm.onHideChargeDialog(this.onHideChargeDialog.bind(this))
      }
    },
    getPlayerManager() {
      return plugin.PlayletManager.getPageManager(this.data.playerId)
    },
    onShowChargeDialog() {
      console.log('onShowChargeDialog')
      // 根据已有的参数初始化下弹窗
      this.setData({
        chargeList: [{
          name: '充100得1.3千币'
        }, {
          name: '充300得5千币'
        }, {
          name: '充500得6千币'
        }]
      })
    },
    onHideChargeDialog() {
      console.log('onHideChargeDialog')
    },
    onSelectChargeItem(e) {
      const { index } = e.currentTarget.dataset
      console.log('onSelectChargeItem index', index)
      this.setData({
        selectIndex: index
      })
    },
    onClose() {
      const pm = this.getPlayerManager()
      pm.hideChargeDialog()
    },
    onCharge(e) {
      const selectIndex = this.data.selectIndex
      if (selectIndex < 0) {
        wx.showToast({
          icon: 'none',
          title: '请选择一个充值方案'
        })
        return
      }
      console.log('onSelectChargeItem index', index)
      const item = this.data.chargeList[index]
      const pm = this.getPlayerManager()
      const { serialNo, dramaId, srcAppid } = this.data
      // TODO: 调用后台接口进行充值并解锁此集，返回充值的数据
      wx.request({
        url: 'http://localhost:8888/videoplayer/charge',
        data: {
          srcAppid: srcAppid,
          dramaId: dramaId,
          serialNo: serialNo,
          chargeName: item.name
        },
        success: (res) => {
          console.log('videoPlayer charge res', res)
          // 告诉播放器这一集是否能播放了
          pm.isCanPlay({
            data: res.data.encryptedData,
            serialNo
          })
          // 隐藏充值弹窗
          pm.hideChargeDialog()
        },
        fail: (fail) => {
          wx.showToast({
            icon: 'none',
            title: '充值失败'
          })
        }
      })
    }

  },
})
