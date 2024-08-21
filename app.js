// app.js
import {
  requestGet,
  requestPost,
  requestPut,
  requestDelete
} from './utils/request'
var PlayerManager = require('./utils/playerManager')
const playletPlugin = requirePlugin('playlet-plugin')
App({
  $Http: {
    get: requestGet,
    post: requestPost,
    put: requestPut,
    delete: requestDelete
  },
  playerManagerList: [],
  onLaunch(options) {
    console.log('小程序启动')
    playletPlugin.onPageLoad(this._onPlayerLoad.bind(this))
  },
  _onPlayerLoad(info) {
    // 处理直接进入播放器页面的情况
    // 只有首次进入的页面是播放器页面，才会触发
    let destroyedIndex = -1
    for (let i = 0; i < this.playerManagerList.length; i++) {
      if (this.playerManagerList[i].isDestroy && this.playerManagerList[i].isDestroy()) {
        destroyedIndex = i
        break
      }
    }
    if (destroyedIndex >= 0) {
      this.playerManagerList.splice(destroyedIndex, 1)
    }
    const playerManager = new PlayerManager()
    playerManager._onPlayerLoad(info)
    this.playerManagerList.push(playerManager)
    console.log('this.playerManagerList', this.playerManagerList.length)
  },
})