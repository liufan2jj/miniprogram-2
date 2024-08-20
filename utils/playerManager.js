var plugin = requirePlugin("playlet-plugin");
// 点击按钮触发此函数跳转到播放器页面
function navigateToPlayer(obj) {
    // 下面的${dramaId}变量,需要替换成小程序管理后台的媒资管理上传的剧目的dramaId，变量${srcAppid}是提审方appid，变量${serialNo}是某一集，变量${extParam}是扩展字段，可通过
    const { extParam, dramaId, srcAppid } = obj
    wx.navigateTo({
      url: `plugin-private://wx94a6522b1d640c3b/pages/playlet/playlet?dramaId=${dramaId}&srcAppid=${srcAppid}&extParam=${extParam || ''}`
    })
}
const proto = {
  _onPlayerLoad(info) {
    const pm = plugin.PlayletManager.getPageManager(info.playerId)
    this.pm = pm
    // encryptedData是经过开发者后台加密后(不要在前端加密)的数据，具体实现见下面的加密章节
    this.getEncryptData({serialNo: info.serialNo}).then(res => {
      // encryptedData是后台加密后的数据，具体实现见下面的加密章节
      pm.setCanPlaySerialList({
        data: res.encryptedData,
        freeList: [{start_serial_no: 1, end_serial_no: 10}], // 1~10集是免费剧集
      })
    })
    pm.onCheckIsCanPlay(this.onCheckIsCanPlay)
    // 关于分享的处理
    // 开启分享以及withShareTicket
    pm.setDramaFlag({
      share: true,
      withShareTicket: true
    })
    // 获取分享参数,页面栈只有短剧播放器一个页面的时候可获取到此参数
    // 例如从分享卡片进入、从投流广告直接跳转到播放器页面，从二维码直接进入播放器页面等情况
    plugin.getShareParams().then(res => {
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
    // extParam除了可以通过在path传参，还可以通过下面的接口设置
    pm.setExtParam('hellotest')
    // 分享部分end
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
      resolve({
        encryptedData: '' // TODO: 此参数需从后台接口获取到
      })
    })
  },
}
function PlayerManager() {
  var newProto = Object.assign({}, proto)
  for (const k in newProto) {
    if (typeof newProto[k] === 'function') {
      this[k] = newProto[k].bind(this)
    }
  }
}

PlayerManager.navigateToPlayer = navigateToPlayer
module.exports = PlayerManager