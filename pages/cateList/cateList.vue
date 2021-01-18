<template>
	<view class="page">
		<header-nav :navbar-data='nvabarData'></header-nav>
		<view class='cateList_containter' :style="'margin-top:'+height+'px'">
			<view class="cate_itle" :style="'position: fixed;left:0;top:'+height+'px'">
				<view class='cate_itle_title'>{{query}}</view>
			</view>
			<view class='cate_itle'></view>
			<view class="cate_sot_options" :class="[scroTop > 100 ? 'cate_sot_options_none':'cate_sot_options_show']" :style="'position: fixed;top:'+height_2">
				<view @click="switcherTab(0)" :class='[currentTab==0 ? "strong":"color"]'>综合</view>
				<view @click="switcherTab(1)" :class='[currentTab==1 ? "strong":"color"]'>评分最高</view>
				<view @click="switcherTab(2)" :class='[currentTab==2 ? "strong":"color"]' style="text-align: right;">做过最多</view>
			</view>
			<view class='cate_sot_options'></view>
			<scroll-view style='height:100%'>
				<view class='cate_itemList' v-for="(item,index) in cateList" 
				:key='index' 
				v-if="item.style!='equipment_binding_tips_item' && item.style!='search_artical_ad_collection'"
				@click='goDetaile(item.content.object.id)'>
					<ad unit-id="adunit-e565947e04a88860" ad-type="video" v-if='index==1' ad-theme="white"></ad>
					<image class='cate_itemList_image' mode="aspectFill" lazy-load='true' :src='item.content.object.photo640'></image>
					<view class='cate_itemList_text'>
						<view class='cate_itemList_text_1'>{{item.content.object.name}}<text v-if="item.content.object.score!=''" style="margin-left:20rpx;color:#F26B3A;font-weight:500">{{item.content.object.score}}分</text>
						</view>
						<view class='cate_itemList_text_2'>
							<view class='cate_itemList_text_2_content'>
								<text v-for="j in item.content.object.ingredient">{{j.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<loading v-if='loading'></loading>
				<view class='reach_bottom' v-if='off_on && offset>0'>我是有底线的</view>
				<view class="goTopBox animated" :class="isGoTop == true ? 'transform1':'transform2'" @click="goTop">
					<image src="../../static/icon/goTop.png"></image>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import app from "../../App.vue"
	export default {
		data() {
			return {
				height: "",
				height_2: "",
				query: '',
				offset: 0,
				nvabarData: {
					showCapsule: 1,
					title: '菜谱列表',
				},
				cateList: [],
				currentTab: 0,
				title: '',
				off_on: false,
				contType: ['', '-score', '-n_dishes'],
				scroTop: 0,
				cursor:"",
				loading:false,
				isGoTop: false,
			}
		},
		onLoad: function(options) {
			let that = this;
			that.height = app.globalData.height * 2 + 20;
			that.height_2 = app.globalData.height * 2 + 40
			that.query = options.q
			that.loadList()
		},

		onPageScroll: function(e) {
			if (e.scrollTop > 500) {
				this.isGoTop = true
			} else if (e.scrollTop < 10) {
				this.isGoTop = false
			}
			this.scroTop = e.scrollTop
		},
		onReachBottom: function() {
			let that = this;
			if (!that.off_on) {
				that.offset = that.offset += 20
				that.loadList()
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
			switcherTab(current) {
				console.log(current)
				let that = this;
				// app.loadingShow()
				that.cateList = [];
				that.offset = 0;
				that.currentTab = current
				console.log(current)
				that.loadList()
			},
			loadList() {
				let that = this,
				param = new Object();
				param.is_weapp = 1;
				param.size = 10
				param.weapp_src = 'xcf';
				param.q = that.query;
				param.cursor = that.cursor;
				param.order_by = that.contType[that.currentTab]
				that.loading = true
				this.$Api.searchDetaile(param).then((res) => {
					that.loading = false
					that.cursor = res.data.content.cursor.next
					if (res.data.content.cursor.has_next) {
						console.log(res.data,104)
						that.cateList = that.cateList.concat(res.data.content.content)
						// that.cateList = that.cateList.concat(that.cateList,res.data.content.content)
						console.log(that.cateList,100)
					} else {
						that.off_on = true;
					}
				})
			},

			goDetaile(id) {
				wx.navigateTo({
					url: '../cateDetaile/cateDetaile?id=' + id,
				})
			},
		},
	}
</script>

<style>
	@import '../../static/css/animate.css';

	.cateList_containter {
		width: 90%;
		margin: auto;
	}

	.cate_itle {
		width: 100%;
		height: 80rpx;
		left: 5%;
		line-height: 80rpx;
		font-size: 40rpx;
		font-weight: 500;
		background: white;
		z-index: 99;
		border-bottom: 1rpx solid #f8f8f8;
	}

	.cate_itle_title {
		width: 90%;
		margin: auto;
	}

	.cate_itemList {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #e2e2e2;
	}

	.cate_itemList_image {
		width: 100%;
		border-radius: 10rpx;
	}

	.cate_itemList_text {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: space-between;
	}

	.cate_itemList_text_1 {
		font-size: 33rpx;
		color: #333333;
		font-weight: 500;
	}

	.cate_itemList_text_2 {
		width: 100%;
		font-size: 25rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;

	}

	.cate_itemList_text_2_content {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #707070;
	}

	.cate_itemList_text_3 {
		font-size: 23rpx;
	}

	.cate_sot_options {
		width: 90%;
		display: flex;
		justify-content: space-between;
		height: 50rpx;
		align-items: center;
		padding: 0 0 10rpx 0;
		background: #FFFFFF;
		z-index: 99;
	}

	/* 显示隐藏过度 */
	.cate_sot_options_show {
		opacity: 6;
		visibility: visible;
		transition: all .5s linear;
	}

	.cate_sot_options_none {
		opacity: 0;
		visibility: hidden;
		transition: all .5s linear;
	}

	.cate_sot_options view {
		flex: 1;
		font-size: 25rpx;
	}

	.cate_sot_options view:nth-child(2) {
		text-align: center;
	}

	.strong {
		font-weight: 600;
	}

	.color {
		color: #707070;
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
</style>
