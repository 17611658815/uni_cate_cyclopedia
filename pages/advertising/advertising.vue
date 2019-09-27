<template>
	<view class="page">
		<view class='main'>
			<view class='adv1'>
				<image mode='scaleToFill' :src='imagePath' class='adv-img'></image>
				<text class='tiaoguo' @click='cliadv()'>跳过 {{miao}}</text>
			</view>
			<view class='adv2'>
				<button>食典录</button>
				<text class='text2'>{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import title from "../../utils/title.js"
	import images from "../../utils/images.js"
	export default {
		data() {
			return {
				miao: 5,
				time: '',
				title: '',
				imagePath: '',
				height: "",
				nvabarData: {
					showCapsule: 0,
					title: '食典录',
				},
			}
		},
		onLoad: function(options) {
			console.log(images)
			var that = this;
			that.time = setInterval(function() {
				that.miao = that.miao - 1
				if (that.miao == 0) {
					clearInterval(that.time);
					wx.switchTab({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
						url: "../index/index"
					})
				}

			}, 1000)
		},

		methods: {
			cliadv: function() {
				clearInterval(this.time)
				wx.switchTab({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
					url: "../index/index"
				})
			},
		},

		onShow() {
			this.imagePath = images[Math.floor(Math.random() * images.length)],
				this.title = title[Math.floor(Math.random() * title.length)]
		},
	}
</script>

<style>
	/* pages/advertising/advertising.wxss */

	.main {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.adv1 {
		width: 100%;
		flex: 4;
		position: relative;
	}

	.adv2 {
		flex: 1;
		background: white;
	}

	.adv-img {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.tiaoguo {
		width: 70rpx;
		height: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 30rpx;
		font-size: 22rpx;
		background-color: wheat;
		margin-left: 10rpx;
		position: absolute;
		z-index: 999;
		right: 25rpx;
		bottom: 25rpx;
		border-radius: 6rpx;

	}

	button {
		border-radius: 18rpx;
		width: 220rpx;
		background-color: #eecbad;
		color: #8b5742;
		margin-top: 38rpx;
		font-size: 33rpx;
	}

	.text2 {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		margin-top: 23rpx;
		font-size: 28rpx;
	}
</style>
