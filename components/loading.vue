<template name="loading">
	<view class="loading-box">
		<view class="loading">
			<view class="loading-item" v-for='(item,index) in 3' :key="index"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "loading",
		data() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	.loading-box {
		display: flex;
		width: 100%;
		padding: 20rpx 0;
		align-items: center;
		justify-content: center;
	}

	.loading-box .loading-text {
		margin-left: 15rpx;
		font-size: 30rpx;
		color: #999;
	}

	.loading {
		font-size: 0;
	}

	.loading .loading-item {
		display: inline-block;
		width: 15rpx;
		height: 15rpx;
		margin-right: 5rpx;
		border-radius: 50%;
		background: #F26B3A;
		-webkit-animation: load 0.65s ease infinite;
		animation: load 0.65s ease infinite;
	}

	.loading .loading-item:last-child {
		margin-right: 0rpx;
	}

	@keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.loading .loading-item:nth-of-type(1) {
		-webkit-animation-delay: 0.13s;
		animation-delay: 0.13s;
	}

	.loading .loading-item:nth-of-type(2) {
		-webkit-animation-delay: 0.26s;
		animation-delay: 0.26s;
	}

	.loading .loading-item:nth-of-type(3) {
		-webkit-animation-delay: 0.39s;
		animation-delay: 0.39s;
	}
</style>
