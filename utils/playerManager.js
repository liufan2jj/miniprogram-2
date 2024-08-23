var playletPlugin = requirePlugin("playlet-plugin");

// 点击按钮触发此函数跳转到播放器页面
function navigateToPlayer(obj) {
  // 下面的${dramaId}变量,需要替换成小程序管理后台的媒资管理上传的剧的dramaId
  // 变量${srcAppid}是提审方appid
  // 变量${serialNo}是活动的页面路径
  // 变量${extParam}是分享参数，分享的卡片和二维码会在分享的链接上携带此参数
  const { extParam, dramaId, srcAppid } = obj
  wx.navigateTo({
    url: `plugin-private://wx94a6522b1d640c3b/pages/playlet/playlet?dramaId=${dramaId}&srcAppid=${srcAppid}&extParam=${extParam || ''}`
  })
}
function deepClone(obj) {  
  if (typeof obj !== 'object' || !obj) return obj
  let newObj = obj instanceof Array ? [] : {}  
  for (let key in obj) {    
    if (typeof obj[key] === 'object') {      
      newObj[key] = deepClone(obj[key])    
    } else {
      newObj[key] = obj[key]    
    }
  }
  return newObj
}

const proto = {
  data: { // 可通过this.data访问
    playerId: '',
    arr: [],
    b: null
  },
  _onPlayerLoad(info) {
    console.log('onPlayerLoad info', info, 'data', this.data)
    this.data.playerId = info.playerId
    const pm = playletPlugin.PlayletManager.getPageManager(info.playerId)
    this.pm = pm
    // encryptedData是经过开发者后台加密后(不要在前端加密)的数据，具体实现见下面的加密章节
    this.getEncryptData({serialNo: info.serialNo}).then(res => {
      // encryptedData是后台加密后的数据，具体实现见下面的加密章节
      pm.setCanPlaySerialList({
        data: res.encryptedData,
        freeList: [{ // 1~10集是免费剧,data里面的字段也必须至少设置1~10集可播放
          start_serial_no: 1,
          end_serial_no: 10
        }],
      })
    })
    // 需要解锁的事件
    pm.onCheckIsCanPlay(this.onCheckIsCanPlay)
    this._initShare()
    // 参考文档章节“数据上报”
    pm.onDataReport((obj) => {
      if (obj.event === playletPlugin.REPORT_DATA_EVENTS.VIDEO_PLAY
        || obj.event === playletPlugin.REPORT_DATA_EVENTS.CHANGE_SERIAL
        || obj.event === playletPlugin.REPORT_DATA_EVENTS.VIDEO_PAUSE
      ) {
        console.log('>>>>onDataReport obj', obj)
      }
    })
    // 设置右侧固定运营位置跳转路径
    pm.setActivityInfo({
      url: ''
    })
    // 设置运营区域
    pm.updateOpenArea({
      showLeft: false,
      showRight: false,
      leftsideAreaList: [
        {
          left: 16, // 类似绝对定位的样式
          top: 20,
          width: 72,
          height: 32
        },
      ],
      ext: 'extInfo',
    })
  },
  _initShare() {
    const pm = this.pm
    // 关于分享的处理
    // 开启分享以及withShareTicket
    pm.setDramaFlag({
      share: true,
      withShareTicket: true
    })
    // 获取分享参数,页面栈只有短剧播放器一个页面的时候可获取到此参数
    // 例如从分享卡片进入、从投流广告直接跳转到播放器页面，从二维码直接进入播放器页面等情况
    playletPlugin.getShareParams().then(res => {
      console.log('getLaunch options query res', res)
      // 关于extParam的处理，需要先做decodeURIComponent之后才能得到原值
      const extParam = decodeURIComponent(res.extParam)
      console.log('getLaunch options extParam', extParam)
      // 如果设置了withShareTicket为true，可通过文档的方法获取更多信息
      // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html
      const enterOptions = wx.getEnterOptionsSync()
      console.log('getLaunch options shareTicket', enterOptions.shareTicket)
    }).catch(err => {
      console.log('getLaunch options query err', err)
    })
    // 设置分享参数
    pm.setExtParam('scene')
  },
  onCheckIsCanPlay(param) {
    // TODO: 碰到不可以解锁的剧集，会触发此事件，这里可以进行扣币解锁逻辑，如果用户无足够的币，可调用下面的this.isCanPlay设置
    console.log('onCheckIsCanPlay param', param)
    var serialNo = param.serialNo
    this.getEncryptData({serialNo: serialNo}).then(res => {
      // encryptedData是后台加密后的数据，具体实现见下面的加密章节
      this.pm.isCanPlay({
        data: res.encryptedData,
        serialNo: serialNo,
      })
    })
  },
  getEncryptData(obj) {
    const { serialNo } = obj
    // TODO: 此接口请求后台，返回下面的setCanPlaySerialList接口需要的加密参数
    const { srcAppid, dramaId } = this.pm.getInfo()
    console.log('getEncryptData start', srcAppid, dramaId, serialNo)
    return new Promise((resolve, reject) => {
      // TODO: 开发者后台需要实现此接口，相关的代码node的示例可参考node目录
      wx.request({
        url: 'http://localhost:8888/videoplayer/getCanPlayList',
        data: {
          srcAppid: srcAppid,
          dramaId: dramaId,
          serialNo: serialNo
        },
        success: (res) => {
          console.log('videoPlayer getCanPlayList res', res)
          resolve({
            encryptedData: res.data.encryptedData
          })
        },
        fail: (fail) => {
          reject(fail)
        }
      })
    })
  },

}
function PlayerManager() {
  var newProto = Object.assign({}, proto)
  for (const k in newProto) {
    if (typeof newProto[k] === 'function') {
      this[k] = newProto[k].bind(this)
    } else if (typeof newProto[k] === 'object') {
      if (!newProto[k]) {
        this[k] = newProto[k]
      } else {
        this[k] = deepClone(newProto[k])
      }
    }
  }
}

PlayerManager.navigateToPlayer = navigateToPlayer
export default PlayerManager
