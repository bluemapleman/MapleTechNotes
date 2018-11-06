function modPhoto(obj){
	alert(obj.width+" "+obj.height);
	if(obj.width>obj.height){
		obj.height=(obj.height/obj.width)*100;
		obj.width=100;
	}
	else{
		obj.width=(obj.width/obj.height)*100;
		obj.height=100;
	}
}

//<!--第三步：初始化Datatables-->
$(document).ready(function(){
	$('#myTable').DataTable( {
		"ajax": {
		    "url": "/bluemapleman/backend/getArticleList",
		    "dataSrc": function ( json ) {
		      jsonArr=json['data'];
		      for ( var i=0, ien=jsonArr.length ; i<ien ; i++ ) {
//		    	  	alert(jsonArr[i]['id'])
//本站自己呈现
		    	    jsonArr[i]['title'] ='<a href="article_template.html?id='+jsonArr[i]['id']+'">'+jsonArr[i]['title']+'</a>' ;
//链接到CSDN		    	  
//		        jsonArr[i]['title'] ='<a href="'+jsonArr[i]['url']+'">'+jsonArr[i]['title']+'</a>' ;
		        var date=new Date(jsonArr[i]['date'])
		        
		        Y = date.getFullYear() + '-';
		        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        D = (date.getDate()<10)?'0'+date.getDate():date.getDate();
		        jsonArr[i]['date'] = Y+M+D;
		      }
		      json['data']=jsonArr;
		      return json['data'];
		    }
		 },
    	 columns: [
                  {"data": "title"},
                  {"data": "module_id"},
                  {"data": "date"},
/*                           {"data": "aurl"}, */
              ],
        ordering:true,
        //跟数组下标一样，第一列从0开始，这里表格初始化时，第四列默认降序
        "order": [[ 2, "desc" ]],
        hover:true,
        autoWidth:true,
        bFilter:false,
        searching:true,
        columnDefs:[
                       /* {orderable: false,targets: 0 },  */
                       /* {orderable: false,targets: 1 } */
                   ],//第一列与第二列禁止排序
                   
 initComplete: function () {//列筛选
     var api = this.api();
     api.columns().indexes().flatten().each(function (i) {
         if (i != 0 && i != 2) {//删除第一列与第二列的筛选框
             var column = api.column(i);
             var $span = $('<span class="addselect">▾</span>').appendTo($(column.header()))
             var select = $('<select><option value="">All</option></select>')
                     .appendTo($(column.header()))
                     .on('change', function (evt) {
                         evt.stopPropagation();
                         var val = $.fn.dataTable.util.escapeRegex(
                                 $(this).val()
                         );
                         column
                                 .search(val ? '^' + val + '$' : '', true, false)
                                 .draw();
                     });
             column.data().unique().sort().each(function (d, j) {
                 function delHtmlTag(str) {
                     return str.replace(/<[^>]+>/g, "");//去掉html标签
                 }

                 d = delHtmlTag(d)
                 select.append('<option value="' + d + '">' + d + '</option>')
                 $span.append(select)
             });

         }           
     });
     
 },            
        
        
});
});

function loadVisitCount(){
	$.ajax({
		url:"//bluemapleman/backend/getVisitCount",
		
	})
}


function judgeSubmission(){
	var flag=true;
	if($("#aname").val()==""){
		alert("Name can't be null!")
		$("#aname").focus()
		flag=false;
		return flag;
	}
	if($("#aemail").val()==""){
		alert("email can't be null!")
		$("#aemail").focus()
		flag=false;
		return flag;
	}
	if($("#asubject").val()==""){
		alert("subject can't be null!")
		$("#asubject").focus()
		flag=false;
		return flag;
	}
	if($("#acontent").val()==""){
		alert("content can't be null!")
		$("#acontent").focus()
		flag=false;
		return flag;
	}
	alert("Thanks for your message!")
	return true;
}

