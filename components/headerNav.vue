<template name="header-nav">
	<view class='nav-wrap' :style="{height:height_20+'px'}">
		<view class='nav-title' :style="'line-height:'+height_44+'px'">
	 <image class="loadingGif" src="../static/icon/loading.gif" mode="" v-if='pullDown'></image>	{{navbarData.title}}</view>
		<view style='display: flex; justify-content: space-around;flex-direction: column'>
			<view class='nav-capsule' :style="{height:height_44+'px'}" v-if="navbarData.showCapsule">
				<view  @click='_navback' v-if='!share'>
					<image src='../static/icon/icon_left.png' mode='aspectFill' class='back-home'></image>
				</view>
				<view class='navbar-v-line' v-if='!share'></view>
				<view @click='_backhome'>
					<image src='../static/icon/icon_hoem.png' mode='aspectFill' class='back-pre'></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from "../App.vue"
	export default {
		name: "header-nav",
		 props:{
			 pullDown:{
				type:Boolean
			 },
		    navbarData:{
		        type:Object
		    }
		},
		data() {
			return {
				height_20: 0,
				height_44:0,
				navbarData:{
					showCapsule: 1,
				}
				//默认值  默认显示左上角
			}
		},
		created: function() {
			this.share = app.globalData.share
			this.height_44 = app.globalData.height*2+44
			this.height_20 = app.globalData.height*2+20

			// // 获取是否是通过分享进入的小程序
			// this.setData({
			// 	share: app.globalData.share
			// })
			// // 定义导航栏的高度   方便对齐
			// this.setData({
			// 	height: app.globalData.height
			// })
		},
		methods: {
			// 返回上一页面
			_navback() {
				wx.navigateBack()
			},
			//返回到首页
			_backhome() {
				// wx.switchTab({
				//   url: '/pages/index/index',
				// })
				wx.reLaunch({
					url: '/pages/index/index',
				})
			}
		}
	}
</script>

<style>
	.nav-wrap {
		position: fixed;
		width: 100%;
		top: 0;
		background: #fff;
		color: #000;
		z-index: 9999999;
		border: 1rpx solid #e2e2e2;
	}

	/* 标题要居中 */

	.nav-title {
		position: absolute;
		text-align: center;
		max-width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		font-size: 32rpx;
		color: #2c2b2b;
		font-weight: 500;
	}

	.nav-capsule {
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		width: 140rpx;
		justify-content: space-between;
		height: 100%;
	}

	.navbar-v-line {
		width: 1px;
		height: 32rpx;
		background-color: #e5e5e5;
	}

	.back-pre,
	.back-home {
		width: 32rpx;
		height: 36rpx;
		margin-top: 4rpx;
		padding: 10rpx;
	}

	.nav-capsule .back-home {
		width: 36rpx;
		height: 36rpx;
		margin-top: 8rpx;
	}
	.loadingGif{
		width: 60rpx;
		height: 60rpx;
		vertical-align: middle;
	}
</style>
