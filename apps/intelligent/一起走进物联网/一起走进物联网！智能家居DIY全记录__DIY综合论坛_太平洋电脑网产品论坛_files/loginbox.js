var localHref = window.location.href;
var f_Logan={
	_targetUrl:'',
	needJS : function(src,callback,fn) {
		if(arguments.length==1){
			var js = document.createElement('script');
			js.src = src;
			document.getElementsByTagName('head')[0].appendChild(js);
		}else{
			if (typeof callback != 'function')
			return; // 非法回调函数
			if (arguments.length==3 && typeof fn != 'undefined' && fn != null && fn != '')
				return callback(false); // 功能早已载入
			var scripts = window.__needJS__ || (window.__needJS__ = []);
			var script = scripts[src] || (scripts[src] = {
				loaded : false,
				callbacks : []
			});
			
			if (script.loaded)
				return callback(false);
			else
				script.callbacks.push(callback);
				
			if (script.callbacks.length == 1) {
				var js = document.createElement('script');
				js.src = src;
				js.onreadystatechange = js.onload = function() {
					if (!js.readyState || js.readyState == 'loaded'
							|| js.readyState == 'complete') {
						script.loaded = true;
						for (var i = 0; i < script.callbacks.length; i++)
							script.callbacks[i](true);
					}
				};
				document.getElementsByTagName('head')[0].appendChild(js);
			}
		}
	},
	$$:function(id){
		if(id && typeof id == "string"){
			return document.getElementById(id)
		}
	},
	/*检查登陆状态*/
	checkLogin:function(){
		var loginInfo={};
		loginInfo.state=false;
		loginInfo.cmu='';
		if(!!document.cookie.match(/(^|; )common_session_id=[^;]+/) && document.cookie.match(/(^|; )cmu=([^;]+)/)){
			loginInfo.cmu=decodeURI(document.cookie.match(/(^|; )cmu=([^;]+)/)[2]);
			loginInfo.state=true;
		}
		return loginInfo;
	},

	/*消息提示*/
	updatemsg:function(data){
		var total = 0;
		var msg = document.getElementById('msg');
		var msgmark = f_Logan.$$("Jmsgmark");
		total = data.messageCount + data.systemNoticeCount + data.forumReplyCount;
		f_Logan.msgtotal = total;
		if(total>0){
			if(total.toString().length>3){
				msgmark.innerHTML += '<em>99+</em>';
			}else{
				msgmark.innerHTML += '<em>'+total+'</em>';
			}
			if(data.systemNoticeCount>0){
				if(data.systemNoticeCount.toString().length>3){
					f_Logan.$$("Jnoticelink").innerHTML += '<em>99+</em>';
				}else{
					f_Logan.$$("Jnoticelink").innerHTML += '<em>'+data.systemNoticeCount+'</em>';
				}
			}
			if(data.forumReplyCount>0){
				if(data.forumReplyCount.toString().length>3){
					f_Logan.$$("Jreplylink").innerHTML += '<em>99+</em>';
				}else{
					f_Logan.$$("Jreplylink").innerHTML += '<em>'+data.forumReplyCount+'</em>';
				}
			}
			// if(data.commentReplyCount>0){
			// 	if(data.commentReplyCount.toString().length>3){
			// 		f_Logan.$$("Jcmtlink").innerHTML += '<em>99+</em>';
			// 	}else{
			// 		f_Logan.$$("Jcmtlink").innerHTML += '<em>'+data.commentReplyCount+'</em>';
			// 	}
			// }
			if(data.messageCount>0){
				if(data.messageCount.toString().length>3){
					f_Logan.$$("Jmessagelink").innerHTML += '<em>99+</em>';
				}else{
					f_Logan.$$("Jmessagelink").innerHTML += '<em>'+data.messageCount+'</em>';
				}
			}
		}
	},

	/*显示提示*/
	updatetip:function(ncount,rcount,mcount,total){
		var msgtip = document.getElementById("msgtip");
		var tipHtml = '<a href="javascript:void(0)" class="close" onclick="f_Logan.closetip()"></a>';
		if(ncount>0){
			tipHtml += '<p id="noticemsg">'+ncount+'条新通知，<a onclick="f_Logan.closemsg(this,'+ncount+')" href="http://my.pconline.com.cn/msg/notice.jsp" target="_blank">查看</a></p>';
		}
		if(rcount>0){
			tipHtml += '<p id="replymsg">'+rcount+'条新回复，<a onclick="f_Logan.closemsg(this,'+rcount+')" href="http://my.pconline.com.cn/forum/receivereply.jsp" target="_blank">查看</a></p>';
		}
		if(mcount>0){
			tipHtml += '<p id="messagemsg">'+mcount+'条新私信，<a onclick="f_Logan.closemsg(this,'+mcount+')" href="http://my.pconline.com.cn/msg/inbox.jsp?pageNo=1" target="_blank">查看</a></p>';
		}
		msgtip.innerHTML = tipHtml;
		msgtip.style.display="block";
		var date=new Date();
		var expireDays=10;
		date.setTime(date.getTime()+expireDays*24*3600*1000);//cookie为十天后过期
		document.cookie="show_msgtip=yes; expire="+date.toGMTString();
		document.cookie="msg_count="+total+"; "+date.toGMTString();
		this.showtip=true;
	},

	/*隐藏提示*/
	closetip:function(){
		document.getElementById("msgtip").style.display="none";
		document.cookie="show_msgtip=no";
		f_Logan.showtip = false;
	},

	/*隐藏消息*/
	closemsg:function(obj,msgcounts){
		var msgcount = document.getElementById("msgtip").getElementsByTagName("p").length;
		if(msgcount == 1){
			document.getElementById("msgtip").style.display="none";
			f_Logan.showtip = false;
			document.getElementById("msgname").innerHTML="消息";
		}else{
			var hidemsg = obj.parentNode;
			hidemsg.parentNode.removeChild(hidemsg);
			var newmsgcount = f_Logan.msgtotal - msgcounts;
			document.getElementById("msgname").innerHTML='消息（<em>'+newmsgcount+'</em>）';
		}
	},
	/*用户信息*/
	updateScore:function(data){
		var id = data.userId.toString();
		var imgSrc = "http://i7.3conline.com/images/upload/upc/face/";
		for(var i = 0,len = id.length; i < len; i+=2){
			imgSrc += id.charAt(i);
			if(i < len-1){
				imgSrc += id.charAt(i+1);
			}
			imgSrc += '/';
		}
		imgSrc += id + '_50x50';
		f_Logan.$$('Jloginface').setAttribute('src',imgSrc);
		var loginInfo={};
		loginInfo = f_Logan.checkLogin();
		if(data.nickname==undefined){
			f_Logan.$$("Jloginuname").innerHTML = loginInfo.cmu;
			f_Logan.$$("Jloginuname").title = loginInfo.cmu;
		}else{
			f_Logan.$$("Jloginuname").innerHTML = data.nickname;
			f_Logan.$$("Jloginuname").title = data.nickname;
		}
	},

	/*刷新页面*/
	refreshPage : function(){
		window.location.reload();	
	},

	/*刷新登陆信息*/
	refreshLogan : function(){
		var loginInfo={};
		loginInfo = f_Logan.checkLogin();
		if(f_Logan.ready===2){
			f_Logan.refreshPage();
			return false;
		}
		f_Logan.$$('Jloginload').style.display="none";
		if(loginInfo.state==false){
			f_Logan.$$('Junloginbox').style.display="inline";
		}else{
			f_Logan.$$('Jloginingbox').style.display="block";
			f_Logan.needJS("http://itbbs.pconline.com.cn/action/user/user_json.jsp?name="+encodeURI(loginInfo.cmu)+"&callback=f_Logan.updateScore");
			f_Logan.needJS("http://bip.pconline.com.cn/intf/message.jsp?act=getNumToJson&siteId=1&status=0&callback=f_Logan.updatemsg");
		}
	},
	/*退出*/
	exitLogan : function(){
		f_Logan.ready = 2;
		this.needJS("http://passport2.pconline.com.cn/passport2/passport/logout_b.jsp?r="+Math.floor(Math.random()*10),f_Logan.refreshLogan);
	},
	/*下拉*/
	isContains : function(p,c){
		if(p.contains){
			return p.contains(c);
		}else{
			return (p.compareDocumentPosition(c) === 16);
		}
	},
	hoverclass : function(ele,cname){
		ele.onmouseover = function(e){
			var e = window.event || e,
			target = e.relatedTarget || e.fromElement;
			if(f_Logan.isContains(this,target)) return;
			f_Logan.timer = setTimeout(function(){
				if(!ele.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)'))){
					ele.className += " "+cname;
				}
			},200)	
		}
		ele.onmouseout = function(e){
			var e = window.event || e,
			target = e.relatedTarget || e.toElement;
			if(f_Logan.isContains(this,target)) return;
			clearTimeout(f_Logan.timer);
			f_Logan.timer = setTimeout(function(){
			var reg = new RegExp('(\\s|^)'+cname+'(\\s|$)');
				if(ele.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)'))){
					ele.className=ele.className.replace(reg,'');
				}
			},200)
		}
	},
	/*初始化*/
	build : function(){
		f_Logan.hoverclass(f_Logan.$$("Jlogindrop"),"login-hover");
		var usermenu = f_Logan.$$("Jloginingbox").getElementsByTagName("dl");
		for (var i = 0; i < usermenu.length; i++) {
			f_Logan.hoverclass(usermenu[i],"hover");
		};
		f_Logan.$$("JloginbyPc").href="http://my.pconline.com.cn/login.jsp?return="+escape(location.href);
		f_Logan.$$("Jloginlink").href="http://my.pconline.com.cn/login.jsp?return="+escape(location.href);
		f_Logan.$$("JloginbypcWeibo").href="http://my.pconline.com.cn/passport/opens/authorize.jsp?type=sina_online&return="+escape(location.href);
		f_Logan.$$("JloginbyQQ").href="http://my.pconline.com.cn/passport/opens/authorize.jsp?type=qzone_online&return="+escape(location.href);
		f_Logan.$$("JloginbyTaobao").href="http://passport2.pconline.com.cn/passport2/api/open_oauth.jsp?type=taobao_online&display=&return="+escape(location.href)+"&bind_url=http://my.pconline.com.cn/passport/opens/open_bind.jsp?return="+escape(location.href);
		this.refreshLogan();
	},
	ready:0,
	showtip:false,
	timer:null
}
f_Logan.build();