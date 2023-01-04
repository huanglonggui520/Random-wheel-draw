export default function nanoid(){
	let str='qwertyuiopasdghfjklmnbvcxz1234567890!@#'
	let g=Math.floor(Math.random()*25+10)
    let result=''
	for(let i=0;i<g;i++){
		result+=str[Math.floor(Math.random()*38+0)]
	}
	return result
}