<template>
	<view class="page">
		<header-nav :navbar-data='nvabarData'></header-nav>
		<view :style="'margin-top:'+height+'px'">
			<view class='cateDetaile_header'>
				<image mode="aspectFill" class='cate_thumb' :src="detaileObj.photo"></image>
				<view class='cate_title'>
					<view class='cate_title_title'>{{detaileObj.name}}</view>
					<view class='cate_title_hot'>
						<text>{{detaileObj.score}}综合评分</text>
						<text>{{detaileObj.stats.n_cooked_last_week}}人最近7天做过</text>
					</view>
					<view class='cate_title_root'>本平台数据均来自www.xiachufang.com</view>
				</view>

				<view class='cate_foodmaterial'>
					<ad unit-id="adunit-394e8d00043446e1" style='margin-bottom:20rpx;'></ad>
					<view class='cate_fmt_title'>
						<view class='cate_fmt_title_txt'>用料</view>
					</view>
					<view class='cate_fmt_item' v-for='(j,index) in detaileObj.ingredient' :key="j">
						<view>{{j.name}}</view>
						<view>{{j.amount}}</view>
					</view>
					<view class='cate_fmt_step' v-for='(k,index) in detaileObj.instruction' :key="k">
						<view class='cate_fmt_step_txt'>
							步骤{{index+1}}
						</view>
						<image v-if=" k.url !=''" lazy-load='true' mode='aspectFill' :src='k.url'></image>
						<view class='cate_fmt_step_textmsg'>{{k.text}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class='collectBox' @click='addCollect'>
			<image src='../../static/icon/addcollect.png'></image>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		data() {
			return {
				id: '',
				height: '',
				nvabarData: {
					showCapsule: 1,
					title: '',
				},
				detaileObj: {},
				// 拖拽参数
				writePosition: [80, 90], //left top
				writesize: [0, 0], // X Y 定位
				window: [0, 0], //屏幕尺寸
				write: [0, 0], //定位参数
				scrolltop: 0, //据顶部距离
			}

		},
		methods: {
			loadList() {
				let that = this,
					param = new Object();
				param.is_weapp = 1,
					param.weapp_src = 'xcf',
					param.id = that.id
				app.loadingShow()
				this.$Api.getCatedetaile(param).then((res) => {
					console.log(res)
					app.hideLoading()
					this.detaileObj = res.data.content.recipe,
						this.nvabarData.title = res.data.content.recipe.name
				})
			},
			addCollect() {
				let that = this;
				let push = true;
				let detaileObj = that.detaileObj
				let CollectList = wx.getStorageSync('CollectList') || [];
				let itemArr = {
					name: detaileObj.name,
					id: detaileObj.id,
					image: detaileObj.photo,
				}
				CollectList.forEach((val) => {
					console.log(val.name.indexOf(itemArr.name))
					if (val.name.indexOf(itemArr.name) > -1) {
						push = false
					} else {
						push = true
					}
				})
				if (push) {
					CollectList.push(itemArr)
					wx.showToast({
						icon: 'success',
						title: '添加成功',
					})
				} else {
					wx.showToast({
						icon: 'none',
						title: '不可重复添加',
					})
				}

				wx.setStorageSync("CollectList", CollectList);
				console.log(CollectList)
			},
			//计算默认定位值
			getSysdata: function() {
				var that = this;
				// 获取元素宽高
				// const query = uni.createSelectorQuery().in(this);
				// query.select('.collectBox').boundingClientRect(data => {
				// 	console.log(data,86)  //null
				// 		// that.writesize = [res.width, res.height];
				// }).exec();
				// wx.getSystemInfo({
				// 	success: function(e) {
				// 		that.window = [e.windowWidth, e.windowHeight];
				// 		var write = [];
				// 		that.write[0] = that.window[0] * that.writePosition[0] / 100;
				// 		that.write[1] = that.window[1] * that.writePosition[1] / 100;
				// 	},
				// 	fail: function(e) {
				// 		console.log(e)
				// 	}
				// });
			},
			//开始拖拽   
			// touchmove: function(e) {
			// 	var that = this;
			// 	var position = [e.touches[0].pageX - that.writesize[0] / 2, e.touches[0].pageY - that.writesize[1] / 2 -
			// 		that.scrolltop
			// 	];
			// 		that.write = position
			// },
			// onPageScroll(e) {
			// 	that.scrolltop = e.scrollTop;
			// },
		},
		onShow() {},
		onLoad(options) {
			console.log(options)
			// 在页面中定义插屏广告
			let that = this;
			let interstitialAd = null
			that.id = options.id,
				that.height = app.globalData.height * 2 + 20;
			that.loadList();
			// that.getSysdata();
		},
		onShareAppMessage: function() {
			var that = this;
			return {
				title: detaileObj.name,
				path: '/pages/cateDetaile/cateDetaile',
			}
		}
	}
</script>

<style>
	.cate_thumb {
		width: 100%;
		height: 500rpx;
	}

	.cate_title {
		width: 90%;
		padding: 40rpx 0;
		text-align: center;
		margin: auto;
		border-bottom: 1rpx solid #e2e2e2;
	}

	.cate_title_title {
		font-size: 40rpx;
		position: relative;
	}

	.cate_title_hot {
		font-size: 25rpx;
		margin-top: 30rpx;
	}

	.cate_title_hot text {
		margin-right: 20rpx;
	}

	.cate_title_root {
		margin-top: 30rpx;
		font-size: 25rpx;
		color: #707070;
	}

	.cate_foodmaterial {
		width: 90%;
		padding-bottom: 90rpx;
		margin: auto;
	}

	.cate_fmt_title {
		width: 100%;
		margin: 40rpx 0;
		position: relative;
	}

	.cate_fmt_title_txt {
		font-size: 36rpx;
		font-weight: 600;
	}

	.cate_fmt_item {
		display: flex;
	}

	.cate_fmt_item view {
		flex: 1;
		font-size: 30rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #e2e2e2;
	}

	.orange {
		color: #F26B3A;
	}

	.black {
		color: #333333;
	}

	.cate_fmt_step_txt {
		padding: 30rpx 0;
		font-size: 36rpx;
		font-weight: 600;
	}

	.cate_fmt_step image {
		width: 100%;
		border-radius: 10rpx;
	}

	.cate_fmt_step_textmsg {
		width: 100%;
		padding: 20rpx 0;
		font-size: 30rpx;
		line-height: 2;
		border-bottom: 1rpx solid #e2e2e2;
	}

	.cateDetaile_share {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0;
		top: 0;
		font-size: 36rpx;
		color: #707070;
		text-align: center;
		font-weight: 500;
	}

	.cateDetaile_share image {
		width: 50rpx;
		height: 50rpx;
		vertical-align: middle;
	}

	.collectBox {
		width: 120rpx;
		height: 120rpx;
		background: #EE5E7B;
		position: fixed;
		bottom: 50rpx;
		right: 30rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.collectBox image {
		width: 50rpx;
		height: 50rpx;
	}
</style>
