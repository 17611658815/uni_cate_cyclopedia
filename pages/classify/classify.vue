<template>
	<view class="page">
		<header-nav :navbar-data='nvabarData'></header-nav>
		<view :style="'margin-top:'+height+'px'">
			<view class='clsaa_list_container' v-for='(item,index) in classlits' :key='index'>
				<view class='clsaa_list_title'>
					{{item.title}}
				</view>
				<view class='clsaa_list_item_container'>
					<view class='clsaa_list_item_icon' v-for='(twodata,ind) in item.entries' :key='ind' @click='gocateList(twodata.name)'
					 :style="{backgroundImage: 'url('+twodata.picurl+')'}">
						<view class='clsaa_list_item_icon_title'>
							{{twodata.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		data() {
			return {
				height: 0,
				iphonex: false,
				classlits: [],
				nvabarData: {
					showCapsule: 0,
					title: '菜谱分类',
				},
			}
		},
		onShow() {

		},
		onLoad() {
			this.loadList()
			this.height = app.globalData.height * 2 + 20;
			// 在页面中定义插屏广告
			let interstitialAd = null

			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-55fea3ae5546fb3a'
				})
				interstitialAd.onLoad(() => {})
				interstitialAd.onError((err) => {})
				interstitialAd.onClose(() => {})
			}

			// 在适合的场景显示插屏广告
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
		},
		methods: {
			loadList() {
				let that = this,
					param = new Object();
				param.is_weapp = 1,
					param.weapp_src = 'xcf'
				app.loadingShow()
				this.$Api.getclassList(param).then((res) => {
					app.hideLoading()
					this.classlits = res.data.content
				})
			},
			gocateList(q) {
				let that = this;
				wx.navigateTo({
					url: '../cateList/cateList?q=' + q,
				})
			},
		}
	}
</script>

<style>
	.clsaa_list_container {
		width: 94%;
		margin: auto;
	}

	.clsaa_list_title {
		font-size: 30rpx;
		font-weight: 500;
		padding: 20rpx 0;
	}

	.clsaa_list_item_container {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
	}

	.clsaa_list_item_icon {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		margin-right: 35rpx;
		position: relative;
		background-size: 100% 100%
		
	}

	.clsaa_list_item_icon:nth-child(4n) {
		margin-right: 0;
	}

	.clsaa_list_item_icon_title {
		width: 100%;
		position: absolute;
		bottom: 10rpx;
		left: 0;
		text-align: center;
		color: #ffffff;
		font-size: 26rpx;
		font-weight: 500;
	}
</style>
