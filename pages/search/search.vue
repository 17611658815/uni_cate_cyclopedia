<template>
	<view class="page">
		<header-nav :navbar-data='nvabarData'></header-nav>
		<view class='search_ctn' :style="'margin-top:'+height+'px'" @click.stop='delSelect()'>
			<view class='search_input'>
				<view class='search_input_cnt'>
					<input type='text' @input="inputSearch" confirm-type="search" @focus="inputSearch" @confirm='gosearchMsg(inputVal)'
					 :value='inputVal' placeholder='寻味美食 / 一触及达' placeholder-class='plhclass' />
					<view @click='cancelBack'>取消</view>
				</view>
				<view class='selectContent'>
					<view class='search_input_slect' v-for="(item,index) in searchResultDatas" @click.stop='gosearchMsg(item)' :key='index'>
						{{item}}
					</view>
				</view>
				<view class='search_type_title dp' v-if='history.length>0'>
					<text>搜索历史</text>
					<text @click='delHistory'>清空</text>
				</view>
				<view class='search_hotcontent' v-if='history.length>0'>
					<view class='hot_item' v-for='(item,index) in history' @click.stop='gosearchMsg(item)' :key='index'>
						{{item}}
					</view>
				</view>
				<view class='search_type_title'>热门搜索</view>
				<view class='search_hotcontent'>
					<view class='hot_item' v-for='(item,index) in hotList' @click.stop='gosearchMsg(item)' :key='index'>
						{{item}}
					</view>
				</view>
				<view class="advertisingBox">
					<ad unit-id="adunit-92a612528aa85dc1" ad-type="video" ad-theme="white"></ad>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import app from "../../App.vue";
	import searchList from '../../components/searchHighlightTextView.vue'
	export default {
		data() {
			return {
				inputVal: '', //文本框val
				height: '',
				history: [],
				hotList: [],
				nvabarData: {
					showCapsule: 1,
					title: '寻味美食',
				},
				isIphoneX: false,
				searchResultDatas: []
			}
		},
		onLoad: function(options) {
			let that = this;
			that.isIphoneX = app.globalData.isIphoneX;
			that.height = app.globalData.height * 2 + 20;
			that.history = wx.getStorageSync('searchRecord') || []; //若无储存则为空
			that.hotSearchList()
		},
		onHide: function() {
				this.inputVal =  '',
				this.searchResultDatas = []
		},
		comments: {
			searchList
		},
		methods: {
			//热门搜索
			hotSearchList() {
				let that = this,
					param = new Object();
				param.is_weapp = 1,
					param.weapp_src = 'xcf',
					this.$Api.getHotListItem(param).then((res) => {
						console.log(res)
						this.hotList = res.data.content.keywords.slice(0, 20)
					})
			},
			//搜索下拉
			inputSearch(e) {
				let that = this,
					param = new Object();
				param.is_weapp = 1,
					param.weapp_src = 'xcf',
					param.q = e.detail.value;
				this.inputVal = e.detail.value
				if (e.detail.value.length > 0) {
					this.$Api.searchSelect(param).then((res) => {
						console.log(res)
						let searchData = res.data.content.keywords.map(function(res, i) {
							return {
								key: e.detail.value,
								name: res,
								id: i
							}
						})
						this.searchData = searchData.slice(0, 10);
						this.searchResultDatas = res.data.content.keywords
						console.log(this.searchResultDatas)
					})
				} else if (e.detail.value == 0) { //如果val为空 清空列表
					this.searchResultDatas = []
				}

			},
			//清空下拉
			delSelect() {
				this.searchResultDatas = []
			},
			//跳转搜索详情
			gosearchMsg(val) {
				let that = this;
				console.log(val)
				that.searchHistory(val)
				wx.navigateTo({
					url: '../cateList/cateList?q=' + val,
				})
			},
			//取消搜索
			cancelBack() {
				this.inputVal = '',
					this.searchResultDatas = []
				wx.navigateBack({
					delta: 1
				})
			},
			//历史记录
			searchHistory(query) {
				let that = this
				let searchRecord = wx.getStorageSync('searchRecord') || []
				if (query == '') {
					return
				} else {
					//将搜索值放入历史记录中,只能放前五条
					console.log(searchRecord.length)
					if (searchRecord.length < 10 && searchRecord.indexOf(query) == -1) {
						searchRecord.unshift(
							query,
						)
					} else if (searchRecord.length == 10) {
						searchRecord.pop() //删掉旧的时间最早的第一条
						searchRecord.unshift(
							query,
						)
					}
					wx.setStorageSync('searchRecord', searchRecord)
				}
			},
			//清空历史记录
			delHistory() {
				let that = this;
				wx.showModal({
					title: '提示',
					content: '确认清除历史记录吗?',
					success(res) {
						if (res.confirm) {
							wx.removeStorage({
								key: 'searchRecord',
								success(res) {
									that.history = []
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			},
		}
	}
</script>

<style>
	.search_ctn {
		width: 90%;
		margin: auto;
	}

	.search_input_cnt {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 30rpx 0 10rpx 0;
	}

	.search_input_cnt input {
		flex: 1;
		height: 70rpx;
		background: #f8f8f8;
		padding-left: 20rpx;
		font-size: 28rpx;
		color: #333333;
		border-radius: 10rpx;
	}

	.search_input_cnt view {
		width: 100rpx;
		font-size: 30rpx;
		text-align: right;
	}

	.plhclass {
		font-size: 28rpx;
		color: #707070;
		padding-left: 20rpx;
	}

	.selectContent {
		width: 100%;
		font-size: 30rpx;
		color: #333333;
		border-bottom: 1rpx solid #e2e2e2;
		overflow: hidden;
		padding-bottom: 20rpx;
	}

	.search_input_slect {
		padding: 10rpx 0;
		font-size: 30rpx;
		font-weight: 500;
	}

	.search_hotcontent {
		padding: 20rpx 0 0 0;
		display: flex;
		flex-flow: wrap;
	}

	.hot_item {
		font-size: 26rpx;
		padding: 10rpx 10rpx;
		border: 1rpx solid #e2e2e2;
		margin-bottom: 15rpx;
		border-radius: 10rpx;
		margin-right: 15rpx;
	}

	.search_type_title {
		padding-top: 20rpx;
		font-size: 25rpx;
	}

	.dp {
		display: flex;
		justify-content: space-between;
	}

	.advertisingBox {
		margin-top: 100rpx;
	}
</style>
