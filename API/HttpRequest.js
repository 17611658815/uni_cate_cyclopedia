
	

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
 function post(url, data){
	var promise = new Promise((resolve, reject) => {
		wx.request({
			url: url,
			data: data,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res);
				} else {
					reject(res.data);
				}
			},
			fail: function() {
				utils.showTost('网络错误')
			}
		})
	});
	return promise;
}
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function get(url, data){
	var promise = new Promise((resolve, reject) => {
		wx.request({
			url: url,
			data: data,
			header: {
				'content-type': 'application/json',
			},
			success: function(res) {
				if (res.statusCode == 200) {
					resolve(res);
				} else {
					reject(res.data);
				}
			},
			fail: function(e) {
				utils.showTost('网络错误')
			}
		})
	});
	return promise;
}

 export default {
	 get,
	 post
}



