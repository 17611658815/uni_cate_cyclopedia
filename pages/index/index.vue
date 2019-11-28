<template>
	<view class="page">
		<header-nav :navbar-data='nvabarData' :pullDown='pullDown'></header-nav>
		<view :style="{height:height+'px'}"></view>
		<scroll-view scroll-y="true" style="height:100%;">
			<view style="width:100%;height:100%">
				<view class='swipe-wrap'>
					<image mode='aspectFill' src='../../static/img/b1.jpg'></image>
				</view>
				<navigator url='../search/search'>
					<view class="index-serch-box">
						<view class="index-serch-con">
							<image class="index-serch-link-icon" src="../../static/icon/icon-serch.png"></image>
							<text class="index-serch-link-text">今天想吃点什么</text>
						</view>
					</view>
				</navigator>
				<view class='index-slogan'>{{title}}</view>
				<view style="display:none">
					<image v-for='(item,index) in images' :key="index" :id="item.recipe.id" :src="item.recipe.photo" @load="onImageLoad"></image>
				</view>
				<view class='img_container'>
					<ad @error='onError' unit-id="adunit-afbda2510cbf3487"></ad>
					<view class="img_item">
						<view v-for='(item,index) in col1' :key="index" class='img_item_box' @click="goDetaile(item.recipe.id)">
							<image mode="widthFix" class='index_img_item' :src="item.recipe.photo" :style="{height:item.height+'px'}"></image>
							<view class='index_img_title'>
								<view class='index_img_title_item'>{{item.recipe.name}}</view>
								<view class='index_img_title_mark'>
									<view v-if="item.recipe.author.name!=''">
										<image class='mark radious' :src='item.recipe.author.photo'></image><text class='author_name'>{{item.recipe.author.name}}</text>
									</view>
									<view v-if='item.recipe.stats.n_cooked>0'>
										<image class='mark' src='../../static/icon/icon-pingfen.png'></image> {{item.recipe.stats.n_cooked}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="img_item">
						<view v-for='(item,index) in col2' :key="index" class='img_item_box' @click="goDetaile(item.recipe.id)">
							<image mode="widthFix" class='index_img_item' :src="item.recipe.photo" :style="{height:item.height+'px'}"></image>
							<view class='index_img_title'>
								<view class='index_img_title_item'>{{item.recipe.name}}</view>
								<view class='index_img_title_mark'>
									<view v-if="item.recipe.author.name!=''">
										<image class='mark radious' :src='item.recipe.author.photo'></image><text class='author_name'>{{item.recipe.author.name}}</text>
									</view>
									<view v-if='item.recipe.stats.n_cooked>0'>
										<image class='mark' src='../../static/icon/icon-pingfen.png'></image> {{item.recipe.stats.n_cooked}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<loading v-if='!off_on'></loading>
				<view class='reach_bottom' v-if='off_on'>我是有底线的</view>

			</view>
		</scroll-view>
		<!-- 返回顶部 -->
		<view class="goTopBox animated" :class="isGoTop == true ? 'transform1':'transform2'" @click="goTop">
			<image src="../../static/icon/goTop.png"></image>
		</view>
	</view>

</template>

<script>
	import Vue from 'vue'
	import app from "../../App.vue"
	import title from "../../utils/title.js"
	import "../../static/css/animate.css";
	import headerNav from "../../components/headerNav.vue"
	let col1H = 0;
	let col2H = 0;
	export default {
		data() {
			return {
				data: {},
				page: 1,
				height: '',
				iphonex: false,
				scrollH: 0,
				imgWidth: 0,
				loadingCount: 0,
				images: [],
				col1: [],
				col2: [],
				// 自定义导航参数
				nvabarData: {
					showCapsule: 0,
					title: '食典录',
				},
				pullDown: false,
				offset: 0,
				limit: 20,
				is_weapp: 1,
				loading: false,
				title: "",
				isGoTop: false,
				imageObj: null,
				col1H: 0,
				col2H: 0
			}
		},
		onPullDownRefresh: function() {
			var that = this;
			that.pullDown = true,
				wx.vibrateShort()
			wx.showNavigationBarLoading() //在标题栏中显示加载

			setTimeout(function() {
				wx.hideNavigationBarLoading() //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
				that.pullDown = false,
					that.images = [],
					that.col1 = [],
					that.col2 = []
				that.loadImages()

			}, 1500);
		},
		onShow() {
			console.log(app.globalData)
		},
		onLoad() {
			wx.getSystemInfo({
				success: (res) => {
					let ww = res.windowWidth,
						wh = res.windowHeight;
					this.imgWidth = ww * 0.48;
					this.scrollH = wh;
					this.title = title[Math.floor(Math.random() * title.length)];
					this.height = app.globalData.height * 2 + 20;
					this.loadImages();
				}
			})
		},
		onReachBottom() {
			this.onscrollBotm()
		},
		onPageScroll: function(e) {
			if (e.scrollTop > 500) {
				this.isGoTop = true
			} else if (e.scrollTop < 10) {
				this.isGoTop = false
			}
		},
		methods: {
			// 点击置顶
			goTop: function() {
				// this.isGoTop = false;
				wx.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			onError(e) {
				console.log(e, 145)
			},

			onImageLoad: function(e) {
				let imageId = e.currentTarget.id;
				console.log(imageId)
				let oImgW = e.detail.width; //图片原始宽度
				let oImgH = e.detail.height; //图片原始高度
				let imgWidth = this.imgWidth; //图片设置的宽度
				let scale = imgWidth / oImgW; /*比例计算*/
				let imgHeight = oImgH * scale; //自适应高度
				let images = this.images;
				let imageObj = null;
				for (let i = 0; i < images.length; i++) {
					let img = images[i];
					// console.log(img.recipe.id, imageId, 121)
					if (img.recipe.id == imageId) {
						imageObj = img;
						break;
					}
				}
				imageObj.height = imgHeight;
				let loadingCount = this.loadingCount - 1;

				if (col1H <= col2H) {
					col1H += imgHeight;
					this.col1.push(imageObj);
					console.log(imgHeight, 143)
				} else {
					col2H += imgHeight;
					this.col2.push(imageObj);
					console.log(imgHeight, 147)
				}
				console.log(this.col2, 148)
				this.loadingCount = loadingCount;
				if (!loadingCount) {
					this.images = [];
				}
			},
			loadImages: function() {
				let that = this,
					images = [],
					param = new Object();
				param.offset = that.offset,
					param.limit = that.limit,
					param.is_weapp = that.is_weapp;
				that.off_on = true;
				this.$Api.getHomeList(param).then((res) => {
					console.log(res)
					if (res.data.content.recipes.length > 0) {
						for (var i = 0; i < res.data.content.recipes.length; i++) {
							images.push(res.data.content.recipes[i])
						}
						let baseId = "img-" + (+new Date());
						for (let i = 0; i < images.length; i++) {
							images[i].recipe.author.id = baseId + "-" + i;
						}
						that.off_on = false
						that.loadingCount = images.length
						that.images = images
						that.page = that.page
					} else {
						that.off_on = true
					}
				})
			},
			onscrollBotm() {
				let that = this;
				if (!that.off_on) {
					that.offset = that.offset += 20,
						that.loadImages()
				}
			},
			goDetaile(id) {
				uni.navigateTo({
					url: '../cateDetaile/cateDetaile?id=' + id
				});
			},

		},
		components: {
			headerNav
		},
		onShareAppMessage: function() {
			var that = this;
			return {
				title: "今天想吃点什么？",
				path: '/pages/index/index',
			}
		},
	}
</script>

<style>
	/**index.wxss**/
	scroll-view {}

	.content {
		width: 100%;
		height: 86%;
		/*一定要设置高度*/
		position: relative;
		padding-bottom: 40rpx;
		box-sizing: border-box;
	}

	.orientation_region {
		position: fixed;
		top: 10rpx;
		right: 10rpx;
	}

	.swipe-wrap {
		width: 100%;
		height: 240rpx;
	}

	.swipe-wrap image {
		width: 100%;
		height: 240rpx
	}

	.index-serch-box {
		width: 100%;
		padding: 15rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
	}

	.index-serch-con {
		width: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #000000;
		padding: 25rpx 0;
		background: white;
	}

	.index-serch-link-icon {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.index-slogan {
		width: 100%;
		/* background: #ffffff; */
		padding: 30rpx 0 20rpx 0;
		font-size: 25rpx;
		text-align: center;
		color: #e2e2e2;
	}

	.img_item {
		width: 46%;
		margin: 2%;
		display: inline-block;
		vertical-align: top;
		/* background: #ffffff; */
	}

	.index_img_item {
		width: 100%;
		border-radius: 5rpx;
	}

	.img_container {
		width: 95%;
		margin: auto;
	}

	.img_container_item {
		height: 430rpx;
		margin-bottom: 20rpx;
		position: relative;
	}

	.img_container_item image {
		width: 100%;
		height: 100%;
		border-radius: 5rpx;
	}

	.img_container_item_title {
		width: 98%;
		padding: 20rpx 0;
		max-height: 120rpx;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		color: #ffffff;
		border-radius: 0 0 5rpx 5rpx;
		padding-left: 2%;
	}

	.index_img_title {
		margin-bottom: 10rpx;
	}

	.index_img_title .index_img_title_item {
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
		border-radius: 0 0 10rpx 10rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		padding-top: 20rpx;
		padding: 0 20rpx;
	}

	.index_img_title_hot {
		display: flex;
	}

	.index_img_title_hot view {
		font-size: 23rpx;
		color: #707070;
		font-weight: 500;
		margin-right: 20rpx;
	}

	.img_item_box {
		margin-bottom: 20rpx;
		box-shadow: 2rpx 2rpx 20rpx #e2e2e2;
		padding-bottom: 20rpx;
	}

	.index_img_title_mark {
		padding: 0 20rpx;
		font-size: 25rpx;
		color: #707070;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.index_img_title_mark view {
		display: flex;
		align-items: center;
	}

	.author_name {
		width: 140rpx;
		display: block;
		white-space: nowrap;
		overflow: hidden;
	}

	.mark {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.radious {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	.index-serch-link-text {
		font-size: 35rpx;
		font-family: Microsoft JhengHei;
	}

	/* 返回顶部 */
	.goTopBox {
		width: 80rpx;
		height: 80rpx;
		background: #F26B3A;
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goTopBox image {
		width: 40rpx;
		height: 40rpx;
	}

	/* 添加我得小程序 */
	.addMiniApp {
		width: 400rpx;
		height: 300rpx;
		position: fixed;
		top: 10rpx;
		right: 10rpx;
		color: #000000;
		background: #ffffff;
		z-index: 99999;
	}

	.transform1 {
		transition: 0.6s;
		transform: translateX(0);
		/**左移元素**/
	}

	.transform2 {
		transition: 0.6s;
		transform: translateX(80px);
		/**左移元素**/
	}
	.headerLoadBox{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
