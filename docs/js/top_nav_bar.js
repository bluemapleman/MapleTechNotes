$(document).ready(function(){
  //navbar & signal & contact ways
  $("body").prepend(
'<nav class="navbar navbar-default navbar-static-top" role="navigation">'+
'    <div class="container-fluid">'+
'    <div class="navbar-header">'+
'        <a class="navbar-brand" href="index.html">MapleTechNotes</a>'+
'    </div>'+
'    <div>'+
'        <ul class="nav navbar-nav">'+
'            <li class="active"><a href="sd.html">软件开发</a></li>'+
'            <li><a href="ai.html">人工智能</a></li>'+
'            <li class="dropdown">'+
'                <a href="#" class="dropdown-toggle" data-toggle="dropdown">数据挖掘<b class="caret"></b></a>'+
'                <ul class="dropdown-menu">'+
'                    <li><a href="#">推荐系统</a></li>'+
'                    <li><a href="#">EJB</a></li>'+
'                    <li><a href="#">Jasper Report</a></li>'+
'                    <li class="divider"></li>'+
'                    <li><a href="#">分离的链接</a></li>'+
'                    <li class="divider"></li>'+
'                    <li><a href="#">另一个分离的链接</a></li>'+
'                </ul>'+
'            </li>'+
'        </ul>'+
'    </div>'+
'    </div>'+
'</nav>');
});