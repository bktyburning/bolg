//版权 北京智能社©, 保留所有权利
//url,data,type,time,success,error
function ajax(opations){
	
	opations=opations||{};
	opations.type=opations.type||'get';
	opations.data=opations.data||{};
	opations.timeOut=opations.timeOut||0;	//0 代表不做超时限定
	opations.success=opations.success||null;
	opations.error=opations.error||null;
	
	//0.整理data数据
	opations.data.t=Math.random();
	var arr=[];
	for(var key in opations.data){
		arr.push(key+'=' + encodeURIComponent(opations.data[key]));	
	}
	var str=arr.join('&');
	
	//1.创建ajax对象
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();	
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
	}
	
	if(opations.type=='get'){
		//get
		//2.连接
		oAjax.open('get',opations.url+'?'+str,true);
		//3.请求
		oAjax.send();	
	}else{
		//post
		//2.连接
		oAjax.open('post',opations.url,true);		//只需要url
		//设置POST特有的头
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		//3.请求
		oAjax.send(str);
	}
	
	//4.接收	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				opations.success && opations.success(oAjax.responseText)
				clearTimeout(timer);
			}else{
				opations.error && opations.error(oAjax.status);	
				clearTimeout(timer);
			}
		}
	};
	
	
	if(opations.timeOut){
		var timer=setTimeout(function(){
			alert('超时了');
			oAjax.abort();	//中断数据加载	
		},opations.timeOut);	
	}
};	