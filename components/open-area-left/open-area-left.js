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
  },
  /**
   * 组件的初始数据
   */
  data: {
    share: true,
    showRight: false
  },
  lifetimes: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChargeTransparent() {
      const pm = this.getPlayerManager()
      pm.updateChargeDialogInfo({
        isTransparentBackground: true
      })
      pm.showChargeDialog()
    },
    onChargeWhiteBg() {
      const pm = this.getPlayerManager()
      pm.updateChargeDialogInfo({
        isTransparentBackground: false
      })
      pm.showChargeDialog()
    },
    onChargeHeight() {
      const pm = this.getPlayerManager()
      pm.updateChargeDialogHeight({
        height: 1500, // 充值弹窗最高到导航栏出，不会超过导航栏
      })
      pm.showChargeDialog()
    },
    onChangeDrama() {
      const pm = this.getPlayerManager()
      const info = pm.getInfo()
      // 跳转回当前剧集
      pm.changeDrama({
        queryString: `srcAppid=${info.srcAppid}&dramaId=${info.dramaId}`
      })
    },
    onPause() {
      const pm = this.getPlayerManager()
      pm.pause()
    },
    onPlay() {
      const pm = this.getPlayerManager()
      pm.play()
    },
    onToggleShare() {
      const pm = this.getPlayerManager()
      // 跳转回当前剧集
      pm.setDramaFlag({
        share: !this.data.share,
        withShareTicket: true
      })
      this.setData({
        share: !this.data.share
      })
    },
    onToggleRight() {
      const pm = this.getPlayerManager()
      // 跳转回当前剧集
      pm.updateOpenArea({
        showRight: !this.data.showRight,
      })
      this.setData({
        showRight: !this.data.showRight,
      })
    },
    onClose() {
      const pm = this.getPlayerManager()
      pm.updateOpenArea({
        showLeft: false,
        showRight: false,
        leftsideAreaList: [
          {
            left: 16,
            top: 20,
            width: 72,
            height: 32
          },
        ],
      })
    },
    getPlayerManager() {
      return plugin.PlayletManager.getPageManager(this.data.playerId)
    },
  },
})
