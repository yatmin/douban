// JavaScript Document
var cpage;
function gotopage(target) 
		{  //alert(target)
			var oInput=document.getElementById('inp');
			oScript=document.createElement('script');
			oScript.src='https://api.douban.com/v2/book/search?q='+oInput.value+' &alt=xd&callback=fn1&start=' +(target-1)*15+ '&count=15';
			document.body.appendChild(oScript);
		    cpage = target;        //把页面计数定位到第几页 
		    //setpage(); 
		    //reloadpage(target);    //调用显示页面函数显示第几页,这个功能是用在页面内容用ajax载入的情况 

		}

function fn1(data){
    var oInput=document.getElementById('inp');
	var oDiv=document.getElementById('article');
	var oDiv3=document.getElementById('aside');
	
	//oP.innerHTML='搜索的结果是：'+data.total;

	//console.log(data);
    var aBook=data.books;
    var html='';

    for(var i=0; i<aBook.length; i++){

    	html+='<li><div class="pic"><a><img width="90" height="120" src="' +aBook[i].image+ '"/></a></div><div class="info"><h2 class=""><a>'+aBook[i].title+'<span style="font-size:12px;">'+aBook[i].subtitle+'</span></a></h2><div class="pub">'+aBook[i].author[0]+"/"+aBook[i].publisher+"/"+aBook[i].pubdate+"/"+aBook[i].price+'</div><div class="star"><span class="allstar">豆瓣评分:</span><span class="ranting_nums">'+aBook[i].rating.average+'</span><span class="p1">('+aBook[i].rating.numRaters+'人评价)</span></div><div class="ft"><div class=""></div><div class=""></div></div></li>';
    }
    //html='<ul>'+html+'</ul>'
    oDiv.innerHTML = '<div class="trr">搜索结果'+(data.start+1)+'-'+(data.start+15)+'&nbsp;&nbsp;共'+data.total+'</div>'+'<ul class="search-list">'+html+'</ul>'+'<div id="div2"></div>';
    oDiv3.innerHTML = '<div class="placeholder"><a><img src="images/e004b47e751519d.jpg" height="250" width="300"></a></div>'+'<div class="mb20"><p>相关搜索&nbsp;.&nbsp;.&nbsp;.&nbsp;.</p><p><a href="">> 搜索'+oInput.value+'的电影</a></p><p><a href="">> 搜索'+oInput.value+'的音乐</a></p><p><a href="">> 搜索'+oInput.value+'的舞台剧</a></p><p><a href="">注册</a> 登录以后可以自己添加条目</p></div>';


    var num=Math.ceil((data.total)/15);
    var totalpage,pagesize,count,curcount,outstr; 
	//初始化
	
    if(data.start==0)cpage=1;
	
	totalpage =num; 
	pagesize = 10; 
	outstr = ""; 
	
	function setpage() 
		{
		    if(totalpage<=10){        //总页数小于十页 
		        for (count=1;count<=totalpage;count++) 
		        {    if(count!=cpage) 
		            { 
		                outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>"; 
		            }else{ 
		                outstr = outstr + "<span class='current' >"+count+"</span>"; 
		            } 
		        } 
		    } 
		    if(totalpage>10){        //总页数大于十页 
		        if(parseInt((cpage-1)/10) == 0) 
		        {             
		            for (count=1;count<=10;count++) 
		            {    if(count!=cpage) 
		                {  
		                    outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>"; 
		                }else{ 
		                    outstr = outstr + "<span class='current'>"+count+"</span>"; 
		                } 
		            } 
		            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>后10页</a>"; 
		        } 
		        else if(parseInt((cpage-1)/10) == parseInt(totalpage/10)) 
		        {     
		            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+(parseInt((cpage-1)/10)*10)+")'>前10页</a>"; 
		            for (count=parseInt(totalpage/10)*10+1;count<=totalpage;count++) 
		            {    if(count!=cpage) 
		                { 
		                    outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>"; 
		                }else{ 
		                    outstr = outstr + "<span class='current'>"+count+"</span>"; 
		                } 
		            } 
		        } 
		        else 
		        {     
		            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+(parseInt((cpage-1)/10)*10)+")'>前10页</a>"; 
		            for (count=parseInt((cpage-1)/10)*10+1;count<=parseInt((cpage-1)/10)*10+10;count++) 
		            {         
		                if(count!=cpage) 
		                {
		                    outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>"+count+"</a>"; 
		                }else{ 
		                    outstr = outstr + "<span class='current'>"+count+"</span>"; 
		                } 
		            } 
		            outstr = outstr + "<a href='javascript:void(0)' onclick='gotopage("+count+")'>后10页</a>"; 
		        }
		    }    
		    document.getElementById("div2").innerHTML = "<div id='setpage'><span id='info'>"+cpage+" / "+totalpage+"<\/span>" + outstr + "<\/div>"; 
		    outstr = ""; 
		 
		} 
		
	    setpage();    //调用分页 
		//--> 

}
