/*********选择和取消选择所有的checkbox********/
function selAll(id1,id2)
{
	for(i=0;i<id2.length;i++)
	{
		if(id1.checked==true)
		{
			id2[i].checked=true
		}else{
			id2[i].checked=false
		}
	}
}
/*******************************************/

/*********控制一系列栏目显示与隐藏********/
function itemShow(itemName,showId,num,bgItemName,clsName)       //(itemName+num)系列栏目名称，showID需要显示的编号
{
	var clsNameArr=new Array(2)
	if(clsName.indexOf("|")<=0){
		clsNameArr[0]=clsName
		clsNameArr[1]=""
	}else{
		clsNameArr[0]=clsName.split("|")[0]
		clsNameArr[1]=clsName.split("|")[1]
	}
	
	for(i=1;i<=num;i++)
	{
		if(document.getElementById(itemName+i)!=null)
			document.getElementById(itemName+i).style.display="none"
		if(document.getElementById(bgItemName+i)!=null)
			document.getElementById(bgItemName+i).className=clsNameArr[1]
		if(i==showId)
		{
			if(document.getElementById(itemName+i)!=null)
				document.getElementById(itemName+i).style.display=""
			else
				alert("未找到您请求的内容!")
			if(document.getElementById(bgItemName+i)!=null)
				document.getElementById(bgItemName+i).className=clsNameArr[0]
		}
	}
}
/*******************************************/

//********创建Div容器
function createMyDiv(newName,htmlTxt,cssName,width,height)
{
	//居中位置设置
	var mLeft,mTop;
	if(document.documentElement.clientHeight>0)
	{
		mTop = (document.documentElement.scrollTop + (document.documentElement.clientHeight - height) / 2 );
		mLeft = (document.documentElement.scrollLeft + (document.documentElement.clientWidth - width) / 2 );
	}else{
		mTop = (document.body.scrollTop + (document.body.clientHeight -height) / 2 );
		mLeft = (document.body.scrollLeft + (document.body.clientWidth - width) / 2 );
	}
	var newDiv = document.createElement("div");
	newDiv.id = newName;
	newDiv.setAttibute = ("name",newName);
	newDiv.style.position = "absolute";
	newDiv.style.zIndex = 100;
	newDiv.style.left = mLeft+"px"
	newDiv.style.top = mTop+"px"
	newDiv.style.width = width+"px"
	newDiv.style.height = height+"px"
	newDiv.style.backgroundColor = "#ffffff"
	newDiv.className = cssName
	newDiv.innerHTML = htmlTxt;
	document.body.appendChild(newDiv);
}
//*******************************************/

//********删除容器，多个以逗号分割************/
function removeMyDiv(_value)
{
	var ary = _value.split(",");
	for(var i=0;i<ary.length;i++)
	{
		var obj = document.getElementById(ary[i]);
		if(obj != null)
			obj.parentNode.removeChild(obj);
	}
}

//***********用div隐藏下面的内容*************
function Mask(idName) 
{
	var sWidth,sHeight;
	sHeight = screen.height;
	sWidth = screen.width;
	//if(document.documentElement.scrollTop>0)
	//	document.documentElement.style.overflow="hidden";
	//else
	//	document.body.style.overflow="hidden";
	var bgObj = document.createElement("div");
	bgObj.setAttribute('id',idName);
	bgObj.style.position="absolute";
	bgObj.style.top=0;
	bgObj.style.left=0;
	bgObj.style.background="#333333";
	bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=30,finishOpacity=100)";
	bgObj.style.opacity="0.6";
	bgObj.style.width=sWidth+"px";
	bgObj.style.height=sHeight+"px";
	bgObj.style.zIndex = 5;
	//bgObj.innerHTML = "<iframe style=\"width:"+sWidth+"PX;height:"+sHeight+"PX;top:0;left:0;\"></iframe>" ;
	document.body.appendChild(bgObj);
}

//**********控制Div层的持续滚动*******
function scrollDiv(idName)
{
	if( document.getElementById(idName) == null ) return ;
	var obj = document.getElementById(idName)
	//alert("offsetHeight:"+obj.offsetHeight+"\nbodyClientHeight:"+document.body.clientHeight+"\nbodyScrollTop:"+document.body.clientHeight+"\ndocumentElementClientHeight:"+document.documentElement.clientHeight+"\ndocumentElementScrollTop:"+document.documentElement.clientHeight)
	//if(document.documentElement.scrollTop == 0 && document.body.scrollTop == 0)
	//{
	//	obj.style.top = 0;
	//	obj.style.left = 0;
	//}else 
	if(document.documentElement.clientHeight>0)
	{
		obj.style.top = (document.documentElement.scrollTop + (document.documentElement.clientHeight - obj.offsetHeight) / 2 );
		obj.style.left = (document.documentElement.scrollLeft + (document.documentElement.clientWidth - obj.offsetWidth) / 2 );
	}else{
		obj.style.top = (document.body.scrollTop + (document.body.clientHeight - obj.offsetHeight) / 2 ) +"px";
		obj.style.left = (document.body.scrollLeft + (document.body.clientWidth - obj.offsetWidth) / 2 ) +"px";
	}
	self.setTimeout("scrollDiv('"+idName+"')","10");
}

//*********选择select框********
function sltChk(obj,val)
{
	for(var i=0;i<obj.length;i++)
	{
		if(obj.options[i].value==val)
			obj.options[i].selected=true;
	}
}
//*******************************************


//*********选择单选、复选框********
function chbChk(obj,val)
{
	if(val=='False')
		val="0"
	else if(val=='True')
		val="1"
	var arr=val.split(",");
	for(var i=0;i<obj.length;i++)
	{
		for(var j=0;j<arr.length;j++)
		{
			if(obj[i].value==arr[j])
				obj[i].checked=true;
		}
	}
}
//*******************************************

//*********根据地址显示图片（需要层容器）********
function showPic(id,src,vis,width,height)
{
	var txt=""
	var arr=new Array()
	if(src!=null && src!="")
	{
		arr=src.split(".")
		if(arr[1].toLowerCase()=="swf")
		{
			txt+="<object id =\"mymovie\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width=\""+width+"\" height=\""+height+"\">"
			txt+="<param name=\"movie\" value=\"../../"+src+"\">"
			txt+="<param name=\"quality\" value=\"high\">"
			txt+="<embed name=\"mymovie\" src=\""+src+"\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\""+width+"\" swLiveConnect=\"true\"><\/embed>"
			txt+="<\/object>"       
		}else{
			txt="<img src='../../"+src+"' border=0 width="+width+" height=\""+height+"\">"
		}
		id.innerHTML=txt
		id.style.visibility=vis
	}
}
//*******************************************

//*********复制表单内容到剪贴板********
function copyToClipBoard(obj)
{
	var clipBoardContent="";
	clipBoardContent+=obj.value;
	window.clipboardData.setData("Text",clipBoardContent);
    //alert("复制成功");
}
/*******************************************/

/*********iframe自适应高********/
function iframeHeight(iframeName) {
	var pTar = null;
	if (document.getElementById){
		pTar = document.getElementById(iframeName);
	}
	else{
		document.getElementById('pTar = ' + iframeName + ';');
	}
	if (pTar && !window.opera){
		pTar.style.display="block"
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight)
		{
			pTar.height = pTar.contentDocument.body.offsetHeight+FFextraHeight;
		}else if (pTar.Document && pTar.Document.body.scrollHeight)
		{
			pTar.height = pTar.Document.body.scrollHeight;
		}
	}
}

//*********搜索框提交***********************
function search_sbmt(fm)
{
	fm.action='/search/search.asp?kw='+escape(fm.kw.value.replace(/\s/g,"||"))
	for(var i=0;i<fm.st.length;i++)
	{
		if(fm.st[i].checked==true)
			fm.action+=("&st="+fm.st[i].value)
	}
	fm.submit()
}

//********登陆检查*************
function userLoginChk(newName,bgObj,htmlTxt,cssName,htmlFile,width,height)
{
	var re = /p_name=([^;]+?)($|;)/g;
	var cookie = unescape(document.cookie).toString();
	if(!re.test(cookie))
	{
		createWapDiv(newName,bgObj,htmlTxt,cssName,htmlFile,width,height);
		return false;
	}
	return true;
}

//ajax登陆用
function sbmt_login(fm)
{
	if(fm.userName.value == "" || fm.userName.value == null)
	{
		alert("请填写用户名");
		fm.userName.focus();
		return false;
	}
	if(fm.password.value == "" || fm.password.value == null)
	{
		alert("请填正确密码");
		fm.password.focus();
		return false;
	}
	ajaxFormSubmit(fm,document.getElementById("login"));
}

//********生成浮动层,采用ajax读取信息*************
//********newName:顶上内容层的ID；bgObj:背景层的ID；htmlTxt:显示的文字（如果htmlFile为空的话）；cssName:内容层链接的CSS*************
//********htmlFile:ajax读取的内容文件；width:内容层的宽；height:内容层的高*************
function createWapDiv(newName,bgObj,htmlTxt,cssName,htmlFile,width,height)
{
	createMyDiv(newName,htmlTxt,cssName,width,height)
	scrollDiv(newName);
	Mask(bgObj);
	scrollDiv(bgObj);
	if(htmlFile!=='' && htmlFile!=null)
		ajaxLoadPage(htmlFile,Math.random(),"GET",document.getElementById(newName));
}


/*******设置地址成绝对地址**********/
function setRemoteUrl(url,pageUrl)
{	
	var rgx,matches,mc,picUrl,picUrl2,splitUrlArr
	var pUrl,sUrl,hUrl,psplitUrlArr,newUrl
	var k
	
	/*
	pageUrl = "http://www.cww.net.cn";
	pageUrl = "http://www.cww.net.cn/";
	pageUrl = "http://www.cww.net.cn/ad.sf/ttt";
	pageUrl = "http://www.cww.net.cn/?ter=ater";
	pageUrl = "http://www.cww.net.cn/te.r/erer/?ter";
	pageUrl = "http://www.cww.net.cn/eras/rrr.htm";
	pageUrl = "http://www.cww.net.cn/erer/ter.htm?erer=asdf";
	*/
	
	rgx = /^(http[s]?\:\/\/)([^\?]+?)(?:([\/][^\/]*?)(?:\?.*)?$|$)/
	if((matches = rgx.exec(pageUrl)) != null)
	{
		hUrl = matches[1];
		pUrl = matches[2];
		sUrl = matches[3];
		if(sUrl.indexOf(".") < 0)
			pUrl = pUrl + sUrl;
		if(pUrl.lastIndexOf("/") != (pUrl.length-1))
			pUrl = pUrl+"/";
	}else{
		return url;
	}
	
	picUrl = url.replace("&amp;","&")
	if(picUrl.indexOf("http://") == 0)
	{
		//*** http://xxx.com/x.jpg
		picUrl = picUrl
	}else if(picUrl.substring(0,2) == "./"){
		//*** ./x.jpg
		picUrl = hUrl + pUrl + picUrl.substring(2,picUrl.length)
	}else if(picUrl.substring(0,1) == "/"){
	//*** /x.jpg
		picUrl = hUrl + pUrl.split("/")[0] + picUrl
	}else if(picUrl.substring(0,3) == "../"){
		//*** ../../asdf/tt/x.jpg
		splitUrlArr = picUrl.split("../")
		psplitUrlArr = pUrl.split("/")
		if(splitUrlArr.length >= psplitUrlArr.length)
		{
			picUrl = hUrl + psplitUrlArr[0] + "/" + splitUrlArr[splitUrlArr.length-1]
		}else{
			newUrl = ""
			for(k = 0;k<psplitUrlArr.length-splitUrlArr.length;k++)
				newUrl = newUrl + psplitUrlArr[k] + "/"
			picUrl = hUrl + newUrl + splitUrlArr[splitUrlArr.length-1]
		}
	}else{
		//*** asdf/x.jpg
		picUrl = hUrl + pUrl + picUrl
	}
	
	return picUrl
	
}
/*******************************************/

function len(str)
{
	var num = 0;
	if(str == "" || str == null)
	{
		return 0;	
	}
	var specialStr = Array("&quot;","&amp;","&lt;","&gt;","&nbsp;","&acute;","&copy;","&middot;","&divide;","&deg;","&ldquo;","&rdquo;","&rsquo;");
	var specialKw = Array("\"","&","<",">"," ","'","","","","","“","”","‘","’");
	
	for(var i = 0;i<specialStr.length;i++)
	{
		str = str.replace(specialStr,specialKw);	
	}
	
	var sArr = str.split("");
	for(var i =0;i<sArr.length;i++)
	{
		if(sArr[i].charCodeAt(0)<299)
			num++;
		else
			num += 2;
	}
	
	return num;
}

