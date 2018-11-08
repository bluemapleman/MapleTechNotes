$(document).ready(function(){
  //navbar & signal & contact ways
  $("body").prepend(
'<!-- top bar for small device -->'+
'       <div class="responsive-header visible-xs visible-sm ">'+
'            <div class="container">'+
'                <div class="row">'+
'                    <div class="col-md-12">'+
'                        <div class="top-section">'+
'                            <div class="profile-image">'+
'                                <img class="img-circle img-responsive" src="img/me.jpg" alt="bluemapleman">'+
'                            </div>'+
'                            <div class="profile-content">'+
'                                <h3 class="profile-title">Volton</h3>'+
'                                <p class="profile-description">Pro Photography</p>'+
'                            </div>'+
'                        </div>'+
'                    </div>'+
'                </div>'+
'                <a href="#" class="toggle-menu"><i class="fa fa-bars"></i></a>'+
'                <div class="main-navigation responsive-menu">'+
'                    <ul class="navigation">'+
'                        <li><a href="dashboard.html"><i class="fa fa-home"></i>导航页 (Dashboard)</a></li>'+
'                    	 <li><a href="sd.html"><i class="fa fa-pencil"></i>软件开发 (Software Development)</a></li>'+
'                        <li><a href="ai.html"><i class="fa fa-book"></i>人工智能 (Artificial Intelligence)</a></li>'+
'                        <li><a href="dm.html"><i class="fa fa-user"></i>数据挖掘 (Data Mining）</a></li>'+
'                        <li><a href="ca.html"><i class="fa fa-music"></i>作曲/编曲 (Composing/Arranging)</a></li>'+
'                        <li><a href="me.html"><i class="fa fa-envelope"></i>关于我（Bluemapleman）</a></li>'+
'                        '+
'                    </ul>'+
'                </div>'+
'            </div>'+
'        </div>'+
'        '+
'        <!-- SIDEBAR -->'+
'        <div class="sidebar-menu hidden-xs hidden-sm">'+
'            <div class="top-section">'+
'                <div class="profile-image">'+
'                    <img class="img-responsive" src="img/me.jpg" alt="My Picture">'+
'                </div>'+
'                <ul>'+
'                    <li><h3 class="profile-title"><i class="fa fa-user"></i> Xinyao Qian(钱欣耀)</h3></li>'+
'                    <!-- <p class="profile-description"><i class="fa fa-university"></i> Zhongnan University of Economics and Law</p> -->'+
'                    <!-- <li><a href="mailto:#"><i class="fa fa-paper-plane"></i> TomQianMaple@outlook.com</a></li> -->'+
'                    <li><p><i class="fa fa-paper-plane"></i> TomQianMaple@outlook.com</p></li>'+
'                    <li>    <script charset="Shift_JIS" src="http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_tr.js"></script>  </li>'+
'                    <!-- <p class="linkedin"><a href="https://www.linkedin.com/in/xinyao-qian-087847122/" target="_blank"><i class="fa fa-linkedin-square"></i> My Linkedin Page</a></p> -->'+
'                </ul>'+
'                <!-- <object type="application/x-shockwave-flash" style="outline:none;" data="http://cdn.abowman.com/widgets/hamster/hamster.swf?" width="300" height="225"><param name="movie" value="http://cdn.abowman.com/widgets/hamster/hamster.swf?"></param><param name="AllowScriptAccess" value="always"></param><param name="wmode" value="opaque"></param></object> -->'+
'            </div> <!-- top-section -->'+
'            '+
'            '+
'            <div class="main-navigation">'+
'                <ul class="navigation">'+
'                        <li><a href="dashboard.html"><i class="fa fa-home"></i>导航页 (Dashboard)</a></li>'+
'                    	 <li><a href="sd.html"><i class="fa fa-pencil"></i>软件开发 (Software Development)</a></li>'+
'                        <li><a href="ai.html"><i class="fa fa-book"></i>人工智能 (Artificial Intelligence)</a></li>'+
'                        <li><a href="dm.html"><i class="fa fa-user"></i>数据挖掘 (Data Mining）</a></li>'+
'                        <li><a href="ca.html"><i class="fa fa-music"></i>作曲/编曲 (Composing/Arranging)</a></li>'+
'                        <li><a href="me.html"><i class="fa fa-envelope"></i>关于我（Bluemapleman）</a></li>'+
'                </ul>'+
'            </div> <!-- .main-navigation -->'+
'            '+
'            '+
'            <div class="social-icons">'+
'                <ul>'+
'                    <!-- <li><a href="#"><i class="fa fa-facebook"></i></a></li>'+
'                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>'+
'                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>'+
'                    <li><a href="#"><i class="fa fa-rss"></i></a></li> -->'+
'                    <li><a href="https://www.linkedin.com/in/xinyao-qian-087847122/" target="_blank"><i style="size: 30" class="fa fa-linkedin"></i></a></li>'+
'                    <li><a href="https://github.com/bluemapleman" target="_blank"><i class="fa fa-github"></i></a></li>'+
'                </ul>'+
'            </div> '+
'            '+
'        </div> <!-- .sidebar-menu -->'
);
});