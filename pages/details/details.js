// pages/details/details.js
import { getMaterialList } from '../../api/details/index.js'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		loading: true, //骨架屏状态
		list: [],
		page: 1,
		page_size: 10,
		total: 0,
		id: null,
		show: false,
		src: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			id: options.id,
		})
		this.getMaterialList()
	},
	showPopup(e) {
		console.log(e.target.dataset.src)
		this.setData({
			show: true,
			src: e.target.dataset.src,
		})
	},

	onClose() {
		this.setData({
			show: false,
		})
	},
	//获取素材详情接口
	async getMaterialList() {
		try {
			wx.setNavigationBarTitle({
				title: '数据加载中...',
			})
			wx.showNavigationBarLoading({})
			const { code, msg, data } = await getMaterialList({
				material_group_id: this.data.id,
				page: this.data.page,
				page_size: this.data.page_size,
			})
			if (code === 200) {
				this.setData({
					loading: false,
				})
				wx.stopPullDownRefresh()
				wx.hideNavigationBarLoading()
				wx.setNavigationBarTitle({
					title: '素材组详情',
				})
				this.setData({
					list: this.data.list.concat(data.list),
					total: data.page_info.total_count,
				})
				if (data?.list?.length <= 0)
					return wx.showToast({
						title: '没有更多数据了',
						icon: 'none',
						duration: 1500,
					})
				this.setData({
					page: (this.data.page += 1),
				})
				// console.log(this.data.page, data.list)
			} else {
				wx.showToast({
					title: msg,
					icon: 'error',
					duration: 1500,
				})
			}
		} catch (error) {
			wx.stopPullDownRefresh()
			wx.hideNavigationBarLoading()
			wx.setNavigationBarTitle({
				title: '素材组详情',
			})
			error === 'error'
				? ''
				: wx.showToast({
						title: error.msg,
						icon: 'error',
						duration: 1500,
				  })
		} finally {
		}
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		this.getMaterialList()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {},
})
