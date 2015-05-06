if (!window.XMLHttpRequest) {
   window.XMLHttpRequest=function (){
   	return new ActiveXObject("Microsoft.XMLHTTP");
   }
}
//@desc    load a page(some html) via xmlhttp,and display on a container
//@param   url          the url of the page will load,such as "index.php"
//@param   request      request string to be sent,such as "action=1&name=surfchen"
//@param   method       POST or GET
//@param   container          the container object,the loaded page will display in container.innerHTML
//@usage 
//         ajaxLoadPage('index.php','action=1&name=surfchen','POST',document.getElementById('my_home'))
//         suppose there is a html element of "my_home" id,such as "<span id='my_home'></span>" 
//@author  SurfChen <surfchen@gmail.com>
//@url     http://www.surfchen.org/
//@license http://www.gnu.org/licenses/lgpl.html LGPL
function ajaxLoadPage(url,request,method,container)
{
	method=method.toUpperCase();
	var loading_msg='Loading...';//the text shows on the container on loading.
	var loader=new XMLHttpRequest;//require Cross-Browser XMLHttpRequest
	if (method=='GET')
	{
		urls=url.split("?");
		if (urls[1]=='' || typeof urls[1]=='undefined')
		{
			url=urls[0]+"?"+request;
		}
		else
		{
			url=urls[0]+"?"+urls[1]+"&"+request;
		}
		
		request=null;//for GET method,loader should send NULL
	}
	loader.open(method,url,true);
	if (request != null && request != "")
	{
		if (request.toLowerCase().indexOf("getwap=true")>=0)		//如果是提交到wap页面，改变accept值，使用参数getwap=true
		{
			loader.setRequestHeader("Accept","text/vnd.wap.wml, application/xhtml+xml, application/vnd.wap.xhtml+xml, */*");
			loader.setRequestHeader("X-UP-CALLING-LINE-ID", "13888888888");
			loader.setRequestHeader("USER-AGENT", "wap");
		}
	}
	if (method=="POST")
	{
		loader.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	loader.onreadystatechange=function(){
		if (loader.readyState==1)
		{
			if(container)
				container.innerHTML=loading_msg;
		}
		if (loader.readyState==4)
		{
			var returnValue=loader.responseText;
			var re=/(<script.*?>)([\s\S]*?)(<\/script>)/gi;
			//alert(returnValue)
			if(re.test(returnValue))
			{
				var sValue = returnValue.match(re);
				returnValue = returnValue.replace(re,"")
				//alert(RegExp.$2);
				eval(RegExp.$2);
			}
			if(container){
				container.innerHTML=returnValue;
			}else{
				alert(returnValue);
			}
		}
	}
	loader.send(request);
}
//@desc    transform the elements of a form object and their values into request string( such as "action=1&name=surfchen")
//@param   form_obj          the form object
//@usage   formToRequestString(document.form1)
//@notice  this function can not be used to upload a file.if there is a file input element,the func will take it as a text input.
//         as I know,because of the security,in most of the browsers,we can not upload a file via xmlhttp.
//         a solution is iframe.
//@author  SurfChen <surfchen@gmail.com>
//@url     http://www.surfchen.org/
//@license http://www.gnu.org/licenses/lgpl.html LGPL
function formToRequestString(form_obj)
{
    var query_string='';
    var and='';
    for (var i=0;i<form_obj.length ;i++ )
    {
        e=form_obj[i];
    
    
        if (e.name) {
            if (e.type=='select-one') {
                element_value=e.options[e.selectedIndex].value;
            } else if (e.type=='select-multiple') {
                for (var n=0;n<e.length;n++) {
                    var op=e.options[n];
                    if (op.selected) {
                        query_string+=and+e.name+'='+encodeURIComponent(op.value);
                        and="&"
                    }
                }
                continue;
            } else if (e.type=='checkbox' || e.type=='radio') {
                if (e.checked==false) {   
                    continue;   
                }   
                element_value=e.value;
            } else if (typeof e.value != 'undefined') {
                element_value=e.value;
            } else {
                continue;
            }
            query_string+=and+e.name+'='+encodeURIComponent(element_value);
            and="&"
        }

    }
    return query_string;
}
//@desc    no refresh submit(ajax) by using ajaxLoadPage and formToRequestString
//@param   form_obj          the form object
//@param   container          the container object,the loaded page will display in container.innerHTML
//@usage   ajaxFormSubmit(document.form1,document.getElementById('my_home'))
//@author  SurfChen <surfchen@gmail.com>
//@url     http://www.surfchen.org/
//@license http://www.gnu.org/licenses/lgpl.html LGPL
function ajaxFormSubmit(form_obj,container)
{
	ajaxLoadPage(form_obj.getAttributeNode("action").value,formToRequestString(form_obj),form_obj.method,container)
}
