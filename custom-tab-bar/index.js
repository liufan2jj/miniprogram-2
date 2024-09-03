var plugin = requirePlugin("playlet-plugin");
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    playerId: {
      type: String,
      value: ''
    },
  },
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#1296db",
    list: [{
        "pagePath": "/pages/bingeWatching/bingeWatching",
        "text": "追剧",
        "iconPath": "/static/img/zhuiju.png",
        "selectedIconPath": "/static/img/zhuiju_after.png"
      },
      {
        "pagePath": "/pages/tuijian/tuijian",
        "text": "推荐",
        "iconPath": "/static/img/tuijian.png",
        "selectedIconPath": "/static/img/tuijian_after.png"
      },
      {
        "pagePath": "/pages/juchang/juchang",
        "text": "剧场",
        "iconPath": "/static/img/juchang.png",
        "selectedIconPath": "/static/img/juchang_after.png"
      },
      {
        "pagePath": "/pages/wode/wode",
        "text": "我的",
        "iconPath": "/static/img/wode.png",
        "selectedIconPath": "/static/img/wode_after.png"
      }
    ]
  },
  attached() {},
  methods: {
    getPlayerManager() {
      return plugin.PlayletManager.getPageManager(this.data.playerId)
    },
    switchTab(e) {
      const pm = this.getPlayerManager()
      pm.switchTab({
        url: e.currentTarget.dataset.path
      })
      this.setData({
        selected: e.currentTarget.dataset.index
      })
    }
  }
})