<template name="searchList">
	<view class='listCommon'>
			6666
		<!-- <text @click='onTap(item)' v-for="(item,index) in searchArray" :key="index" :class="item == keyName ? 'highlight' : 'normal'">{{item}}</text> -->
	</view>
</template>

<script>
	export default {
		name: "searchList",
		props: {
			datas: {
				type: Object
			},
			onTap: {
				type: Function
			}
		},
		data() {
			return{
				searchArray: [],
				keyName: ''
			}
		},
		methods: {
			_propertyDataChange: function(newVal) {
				let searchArray = this.getHilightStrArray(newVal.name, newVal.key)
				this.keyName = newVal.key,
					this.searchArray = searchArray
			},

			getHilightStrArray: function(str, key) {
				return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
			}
		},
	}
</script>

<style>
	/* component/searchHilightTextView.wxss */
	.listCommon text {
		width: 100%;
		height: 40rpx;
		font-family: PingFangSC;
		font-size: 28rpx;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: normal;
		letter-spacing: normal;
	}

	.highlight {
		/* color: #F26B3A; */
	}

	.normal {
		color: #484848;
	}
</style>
