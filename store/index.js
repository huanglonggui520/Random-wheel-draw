//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import colors from '../utools/color.js'
import nanoid from "../utools/nanoid.js"
//应用Vuex插件
Vue.use(Vuex)
// import {nanoid} from 'nanoid';

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
	// 允许重复
	SETCFU(state,value){
		
		state.cfu=value
		console.log('state',state.cfu);
	},
	// 删除某个转盘列表
	CLOSELISTS(state,id){
		state.lists.forEach((item,index)=>{
			if(item.id==id){
				state.lists.splice(index,1)
				uni.setStorageSync('lists',state.lists)
			}
		})
	},
	SETZDONG(state,value){
		state.zdong=value
	},
	// 主题切换
	SETTHEME(state,value){
		state.theme=value
	},
	// 获取本地转盘列表
	UNISETLIST(state,value){
		console.log('99',nanoid());
	    state.lists=value
	},
	// 修改
	XIUGAILISTS(state,value){
		console.log('xiug',state.lists);
	    state.lists.forEach((item,index0)=>{
			if(item.id==value.id){
				state.lists[index0].prizes=[]
				item.title=value.title
				value.datas.forEach((item1,index)=>{
					state.lists[index0].prizes.push({fonts: [{ text: item1, top: '20%',lengthLimit:'70%' }], background: colors[index],range:10 })
				})
				uni.setStorageSync('lists',state.lists)
			}
		})
		console.log('xiug',state.lists.prizes);
	},
	SETVOICE(state,value){
	    state.voice=value	
	},
	XIUGAIDEFAUT(state,id){
		state.defaut={}
		if(id==0){
			state.defaut=state.template[0]
			return
		}
	    state.lists.forEach((item,index)=>{
			if(item.id==id){
				state.defaut=item
			}
		})
		console.log(state.defaut);
	},
	// 添加列表
	SETLISTS(state,value){
		
		let obj={
			title:value.title,
			id:nanoid(),
			prizes:[]
		}
		console.log(state)
		value.datas.forEach((item,index)=>{
			obj.prizes.push({fonts: [{ text: item, top: '20%',lengthLimit:'70%' }], background: colors[index],range:10 })
		})
		// console.log(obj);
		state.lists.push(obj)
		uni.setStorageSync('lists',state.lists)
	},
	SETDICENUM(state,num){
		state.diceNum=num
	},
	SETDICEVOICE(state,voice){
		
		state.diceVoice=voice
		console.log(state.diceVoice);
	},
	SETAUTH(state,auth){
		state.showAuth=auth
	},
	SETUSERINFO(state,user){
		state.userInfo=user
	}
}
//准备state对象——保存具体的数据
const state = {
	cfu:true,
	showAuth:false,//是否登录
	zdong:true,
	userInfo:{},
	theme:0,
	diceVoice:true,//骰子音效
	template:[{
		id:0,
		title:'今晚吃什么',
		prizes: [
		  {index:0, fonts: [{ text: '大白菜', top: '20%',lengthLimit:'70%' }], background: colors[0],range:10 },
		  { index:1,fonts: [{ text: '火锅', top: '10%' }], background: colors[1],range:10 },
		  { index:2,fonts: [{ text: '汉堡', top: '10%' }], background: colors[2],range:10 },
		  { index:3,fonts: [{ text: '白米饭', top: '10%' }], background: colors[3] ,range:10},
		  { index:3,fonts: [{ text: '烤串', top: '10%' }], background: colors[4] ,range:10},
		],
	}],
	lists:[],
	voice:true,
	diceNum:1,//骰子个数
	defaut:{
			id:0,
			title:'今晚吃什么',
			prizes: [
			  {index:0, fonts: [{ text: '大白菜', top: '20%',lengthLimit:'70%' }], background: colors[0],range:10 },
			  { index:1,fonts: [{ text: '火锅', top: '10%' }], background: colors[1],range:10 },
			  { index:2,fonts: [{ text: '汉堡', top: '10%' }], background: colors[2],range:10 },
			  { index:3,fonts: [{ text: '白米饭', top: '10%' }], background: colors[3] ,range:10},
			  { index:3,fonts: [{ text: '烤串', top: '10%' }], background: colors[4] ,range:10},
			],
			
			
		}
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})