$(document).ready(function(){
	URL = document.location.toString();
	tmpArr = URL.split("?");
	tmpArr=tmpArr[1].split("=");
	id = tmpArr[1];
	jQuery.ajax(
			{
				url:"/bluemapleman/backend/getArticleContent",
				method:"post",
				async:"true",
				data:{
					"id":id,
					},
				dataType:"json",
//				jsonp:"false",
				success:function(json){
					$(".post-title").append(json["title"]);
					$(".post-content").append(json["content"]);
					$(".post-picture").append('<img src="'+json["pictureUrl"]+'" alt="">');
					var date=new Date(json['date'])
					Y = date.getFullYear() + '-';
					M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					D = date.getDate() + ' ';
					$(".post-date").append(Y+M+D); 
					
					$(".prev-next-wrap").append('<a class="btn btn-default" href="index.html"><i class="fa fa-angle-left fa-fw"></i> 返回 </a>&nbsp');
				},
				error:function(jqXHR,textStatus,errorThrown){
			          alert("error:"+errorThrown+"  status:"+textStatus); 
			          return false;
			    },  
			});
});