function web(){
  this.ip;
  this.url=escape(window.location.href);
  this.source=0;
  this.action=0;
  this.userId=getuserid();
  this.resId;
  this.resType=0;
  this.refer=document.referrer;
  this.page="http://count.72xuan.com/count.html";
}

function soft(){
  this.ip;
  this.url=escape(window.location.href);
  this.userId=0;
  this.source=0;
  this.action=0;
  this.resId;
  this.resType=0;
  this.page="http://admin.72xuan.com:8080/count/count/softFilter.jsp";
}


function getuserid()
{
	cookieName="4lpz_2132_hiduid";
	uid=getcookie(cookieName);
	if(typeof(uid)=='undefined')
	{

		if(typeof(getcookie("72xuan_rid"))=="undefined")
		{
			rid=(new Date().getTime())^ Math.random();
			setcookie("72xuan_rid",rid,24);
		}
		else
		{
			rid=getcookie("72xuan_rid");
		}
		uid=rid;

	}
	return uid;
}


function setcookie(name,value,expireHours){
      var cookieString=name+"="+escape(value);
      if(expireHours>0){
             var date=new Date();
             date.setTime(date.getTime+expireHours*3600*1000);
             cookieString=cookieString+"; expire="+date.toGMTString();
      }
      cookieString=cookieString+";domain=72xuan.com;path=/";
      document.cookie=cookieString;
}

function getcookie(obj)
{
	var arrstr=document.cookie.split(";");
	for(i=0;i<arrstr.length;i++)
	{
		tmp=arrstr[i].split("=");
		if(tmp[0].replace(/(^\s*)|(\s*$)/g, "")==obj)
		{
			return tmp[1];
		}
	}
}

function getWebUrl(record){
	if ((record.url).toString().indexOf("72xuan.com")==-1){
		return "";
	}

	var sUrl = record.page+"?a=1";
	sUrl += "&url="+record.url;
	sUrl += "&uid="+record.userId;
	//sUrl += "&source="+record.source;
	//sUrl += "&action="+record.action;
	//sUrl += "&resId="+record.resId;
	//sUrl += "&resType="+record.resType;
	sUrl += "&refer="+record.refer;
	return sUrl;
}

function getSoftUrl(record){
	if ((record.url).toString().indexOf("72xuan.com")==-1){
		return "";
	}

	var sUrl = record.page+"?a=1";
	sUrl += "&url="+record.url;
	sUrl += "&source="+record.source;
	sUrl += "&action="+record.action;
	sUrl += "&resId="+record.resId;
	sUrl += "&resType="+record.resType;
	sUrl += "&userId="+record.userId;
	return sUrl;
}

function recordWeb2(url){
	var record = new web();
	if(typeof(url)=="undefined" || !isNaN(url))
	{
		url=window.location.href;
	}
	record.url=url;
   
	//record.source=source;
	//record.action=action;
	//record.resId=resId;
	//record.resType=resType;
	//document.getElementById("pv_img").src=getWebUrl(record);
	var img = document.createElement('img');
	img.src=getWebUrl(record);
}

function recordWeb(action,resId,resType,source){
	var record = new web();
	record.source=source;
	record.action=action;
	record.resId=resId;
	record.resType=resType;
	record.page="http://admin.72xuan.com:8080/count/count/webFilter.jsp";
	//document.getElementById("pv_img").src=getWebUrl(record);
	var img = document.createElement('img');
	img.src=getWebUrl(record);
}

function recordSoft(action,resId,resType,source,userId){
	var record = new soft();
	record.source=source;
	record.action=action;
	record.resId=resId;
	record.resType=resType;
	record.userId=userId;
	//document.getElementById("pv_img").src=getSoftUrl(record);
	var img = document.createElement('img');
	img.src=getSoftUrl(record);
}
