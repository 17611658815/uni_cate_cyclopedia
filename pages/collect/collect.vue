<template>
	<view class="page">
		<header-nav :navbar-data='nvabarData'></header-nav>
		<view class='CollectList' :style="'margin-top:'+height+'px'">
			<view class='CollectList_Box' v-if="CollectList.length>0">
				<view class='CollectList_Box_item' @click.stop='goDetaile(item.id)' v-for='(item,index) in CollectList'>
					<image mode="aspectFill" class="imagesPic" :src="item.image"></image>
					<view class='CollectList_Box_item_title'>
						<text style='margin-left:20rpx;'>{{item.name}}</text>
						<image class='del' @click.stop='delitem(index)' src='../../static/icon/del.png'></image>
					</view>
					<image class='sanjiao' src='../../static/icon/collect_sanjiao.png'></image>
				</view>
			</view>
			<view class='none_box' wx:else>
				<image src='../../static/icon/none.png'></image>
				<view>还没有收藏任何作品哦</view>
			</view>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue";
	export default {
		data() {
			return {
				height: '',
				CollectList: [],
				nvabarData: {
					showCapsule: 0,
					title: '收藏',
				},
			}
		},
		onShow() {
			let CollectList = wx.getStorageSync('CollectList') || [];
			this.height = app.globalData.height * 2 + 20;
			this.CollectList = CollectList;
		},
		onLoad() {

		},
		methods: {
			delitem(index) {
				let that = this;
				wx.showModal({
					title: '提示',
					content: '确认删除',
					success(res) {
						if (res.confirm) {
							that.CollectList.splice(index, 1);
							wx.setStorageSync("CollectList", that.CollectList);
							that.onShow();
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			goDetaile(id) {
				wx.navigateTo({
					url: '/pages/cateDetaile/cateDetaile?id=' + id,
				})
			},
		}
	}
</script>

<style>
	.CollectList {
		width: 100%;
		display: flex;
		padding: 30rpx 0;
		justify-content: center;
		min-height: 100vh;
		background: #f8f8f8;
	}

	.CollectList_Box {
		width: 90%;
		display: flex;
		flex-direction: column;
	}

	.CollectList_Box .CollectList_Box_item {
		width: 100%;
		height: 400rpx;
		background-size: 100% 100%;
		margin-bottom: 30rpx;
		position: relative;
		border-radius: 10rpx;
		/* box-shadow:2rpx 2rpx 20rpx #e2e2e2; */

	}

	.CollectList_Box_item_title {
		width: 100%;
		height: 80rpx;
		color: #ffffff;
		line-height: 80rpx;
		font-size: 32rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		border-radius: 0 0 10rpx 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.CollectList_Box_item_title text {
		display: block;
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sanjiao {
		position: absolute;
		right: 0;
		top: -5rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.del {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.none_box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.none_box image {
		width: 306rpx;
		height: 200rpx;
		margin-top: 200rpx;
	}

	.none_box view {
		text-align: center;
		font-size: 30rpx;
		color: #8A8A8A;
		margin-top: 20rpx;
	}

	.imagesPic {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
</style>
