var plugin = requirePlugin("playlet-plugin");
import {
  userCenter
} from '../../api/login.js'
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
    current: -1,
    total:0
  },
  lifetimes: {
    attached() {
      this.initChargeDialog()
    }
  },
  observers: {
    serialNo(serialNo) {
      // 当集数发生改变的时候，触发此函数
      console.log(serialNo)
      this.onShowChargeDialog()
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
        // 注册点击按钮拉起激励广告事件
        pm.onUseAdUnlock(this.onUseAdUnlock.bind(this))
      }
    },
    getPlayerManager() {
      return plugin.PlayletManager.getPageManager(this.data.playerId)
    },
    gomemberPage() {
      const pm = this.getPlayerManager()
      pm.navigateTo({
        url: '/pages/member/member',
      })
    },
    // 充值规则
    gochargeRule() {
      const pm = this.getPlayerManager()
      pm.navigateTo({
        url: '/pages/userAgreement/userAgreement?tabs=0',
      })
    },
    // 会员协议
    gomemberAgreement() {
      const pm = this.getPlayerManager()
      pm.navigateTo({
        url: '/pages/userAgreement/userAgreement?tabs=1',
      })
    },
    onShowChargeDialog() {
      console.log('onShowChargeDialog')
      const pm = this.getPlayerManager()
      pm.emitCustomEvent("toView", '200')
      // 根据已有的参数初始化下弹窗
      this.setData({
        chargeList: [{
            discount: '',
            original_price: "¥2",
            discount_price: "200金币"
          },
          {
            discount: '特惠',
            original_price: "¥9.9",
            discount_price: "990+送200"
          },
          {
            discount: '',
            original_price: "¥29.9",
            discount_price: "2990+送1000"
          },
          {
            discount: '',
            original_price: "¥49.9",
            discount_price: "4990+送2500"
          },
          {
            discount: '会员1天',
            original_price: "¥19.9",
            discount_price: "解锁观看全站1天"
          },
          {
            discount: '会员2天',
            original_price: "¥30",
            discount_price: "解锁观看全站2天"
          },
        ],
      })
    },
    onHideChargeDialog() {
      console.log('onHideChargeDialog')
    },
    onClose() {
      const pm = this.getPlayerManager()
      pm.hideChargeDialog()
    },
    onUseAdUnlock() {
      console.log('>>>USE_AD_UNLOCK')
      // 拉起激励视频广告去解锁
    },
    onSelectChargeItem(e) {
      const {
        index
      } = e.currentTarget.dataset
      console.log('onSelectChargeItem index', index)
      this.setData({
        selectIndex: index
      })
    },
    // 初始化用户信息
    async initUserinfo() {
      try {
        const {
          msg,
          code,
          data
        } = await userCenter({})
        if (code === 200) {
          if (data) {
            const storageUseInfo = wx.getStorageSync('userInfo')
            const newData = {
              ...storageUseInfo,
              data
            }
            this.setData({
              total: data.view_point
            })
            wx.setStorageSync('userInfo', newData);
          }
        } else {
          wx.showToast({
            title: msg,
            icon: "error"
          })
        }
      } catch (error) {
        wx.showToast({
          title: error,
          icon: 'error'
        })
      }
    },
    // 充值选择
    checkCharge(e) {
      const {
        index,
        original_price,
      } = e.currentTarget.dataset
      this.setData({
        current: index
      })
      console.log(index, this.data.current, original_price)
      const selectIndex = this.data.current
      const item = this.data.chargeList[selectIndex]
      if (selectIndex < 0) {
        wx.showToast({
          icon: 'none',
          title: '请选择一个充值方案'
        })
        return
      }
      wx.showToast({
        icon: 'none',
        title: '您选充值了' + item.original_price
      })
    },
    onCharge() {
      const pm = this.getPlayerManager()
      const {
        serialNo,
        dramaId,
        srcAppid
      } = this.data
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