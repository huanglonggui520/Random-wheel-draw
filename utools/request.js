import store from '../store/index.js'
const port=3000
export default async function(url,data={}, method = 'GET',headers='application/json') {
	console.log(store);
	const res=await uni.request({
		url: `http://localhost:${port}${url}`,
		data,
		method,
		header: {
			'authorization': uni.getStorageSync('token'), //自定义请求头信息
			'content-type':headers
		},
		
	})
	if(res[1].data.status===401){
		store.commit('SETAUTH',true)
	}
	return res[1].data
}
