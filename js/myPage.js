// $(function(){
//   $('#fullpage').fullpage();  //fullpage方法里面接受json对象形式
// });

$(function(){
  var k=$(window).height();// 计算当前屏幕的高度
  var flag=false;   //用来控制动画
  // 点击next 往下播放一屏幕
  $(".next").click(function(event) {
    $.fn.fullpage.moveSectionDown();
 });
  $('#fullpage').fullpage({  //fullpage方法里面接受json对象形式
    //是否显示项目导航
    navigation:true,

    //导航小圆点显示位置（left/right）
    // navigationPosition:"left",
    //滚动到最后一屏后滚回顶部
    // loopBottom:true,

    // 顶部向上滚动到底部
    // loopTop:true,

    //滚动时间快慢默认700ms
    scrollingSpeed: 1400,

    // 回调函数滚动到某一屏后的回调函数，接受anchorLink和index两个参数，anchorLink是锚链接的名称，index是序号，从1开始计算
    afterLoad:function(anchorLink,index){
      // alert(index);
    if(index==2&&flag==false){//flase==false时说明第二屏动画还没执行过，当再滚回是flag变为true动画不再执行
      //alert("this is 2")
      $(".search").show().animate({"right":370},1500,function(){
        //搜索框走进来，沙发两个字显示（淡入淡出）
        $(".search-words").animate({"opacity":1},500,function(){
          //search框直接隐藏
          $(".search").hide();
          //带沙发字的搜索框显示（用了另一张图片）,往右上角移动，缩小
          $(".search-02-1").show().animate({"height":30,"right":250,"bottom":452},1000,function(){
            flag=true;   //如果flag=true，说明所有动画执行完毕
          });
          //同时 沙发图片出现变大
          $(".goods-02").show().animate({"height":218},1000)
          //同时，白色文字渐渐显示出来
          $(".words-02").animate({"opacity":1},500)
        });
      });
    }
  
    },


    //刚开始滚动屏幕就触发的回调函数  onLeave
    //滚动前的回调函数，接受index、nextIndex和direction 3个参数
    // index是离开的“页面”的序号，从1开始计算；nextIndex是滚动到“页面”的序号，从1开始计算；direction判断往上还是往下滚动，值是up或down
    onLeave:function(index,nextIndex,direction){
      if(index==2&&nextIndex==3&&flag==true){
        //当第二屏幕往第三屏滚动的时候，沙发往下（第三屏）掉
        //沙发要往第三屏幕走，走的距离就是当前屏幕的高度-main到底部的高度-沙发到main的高度（即：当前屏幕的高度-250）
        $(".shirt-02").show().animate({"bottom":-(k-250),"width":207,"left":260},2000,function(){
          $(".img-01-a").animate({"opacity":1},500,function(){
            $(".btn-01-a").animate({"opacity":1},500);
          });
        });//k为当前屏幕高度
        //同时白色底盒子覆盖原沙发位置
        $(".cover").show();
      }

//       //第三屏到第四屏的滚动
//       if(index==3&&nextIndex==4){
//         $(".shirt-02").hide();//从2掉到3屏正着的沙发先隐藏掉
//         // 沙发掉落的距离  当前屏幕的高度-250+第三屏幕的50px
//         //同时斜着的沙发显示掉落
//         $(".t1f").show().animate({"bottom":-((k-250)+50),"left":260},2000,function(){
//           $(this).hide();  //动画完毕之后，沙发自动隐藏
//           $(".car-img").show();//同时原来在购物车的沙发显示
//           //购物车开始往右走
//           $(".car").animate({"left":1600},4000);
//         });
//       }
//     },


//   });  
// });
// 第3屏幕到第4屏幕过渡
if(index == 3 && nextIndex == 4 ) {
  $(".shirt-02").hide();
   // 沙发的距离   当前屏幕的高度  - 250    + 第三屏幕的 50距离
  $(".t1f").show().animate({"bottom" : -((k - 250) + 50), "left": 260}, 2000, function() {
     $(this).hide();  // 动画完毕之后，自动隐藏
     $(".car-img").show();
     // 这购物车就开始往右走
     $(".car").animate({"left": "150%"}, 3000, "easeInElastic",function() {
                 $(".note").show();
                 $(".note-img, .words-04-a").animate({"opacity": 1}, 1000, function() {
                     $(".next").fadeIn();
                 });

             });
  })

}

    // 第4屏幕到第5屏幕过渡
    if(index == 4 && nextIndex == 5 ) {
            // 小手上来
            $(".hand-05").animate({"bottom": 0}, 2000, function() {
                // 鼠标显示
                $(".mouse-05-a").animate({"opacity": 1});
                // 沙发从 800 到  70
                $(".t1f-05").show().animate({"bottom": 70}, 1000, function() {
                    // 单子上走 走完之后， 我们的文字翻转
                    $(".order-05").animate({"bottom": 390}, function() {
                        $(".words-05").addClass("words-05-a");
                         $(".next").fadeIn();
                    });
                })
            });
    }
    // 第5屏幕到第6屏幕过渡
    if(index == 5 && nextIndex == 6 ) {
        // 沙发的距离 当前屏幕的高度 减去  box 的 bottom  500
            $(".t1f-05").animate({"bottom": -(k - 500), "left": "40%", "width": 65}, 1500, function() {
                $(".t1f-05").hide();
            });

            $(".box-06").animate({"left": "38%"}, 1500, function() {
                 $(this).animate({"bottom": 40}, 500, function() {
                    $(this).hide();

                    // 行走的过程就是 背景移动的过程
                    // 背景jqury 里面改变比较麻烦  backgroundPositionX  x坐标 
                    // 
                    $(".section6").animate({"backgroundPositionX": "100%"}, 4000, function() {
                        // 当背景动画执行完毕  boy 大小复原  
                        $(".boy").animate({"height": 305, "bottom": 116}, 1000, function() {
                            $(this).animate({ "right": 500}, 500, function() {
                                // 门显示出来 模拟打开门的效果
                                $(".door").animate({"opacity": 1},200, function() {
                                    // 之后girl 显示出来
                                    $(".girl").show().animate({"right": 350, "height": 306 },500, function() {
                                          $(".pop-07").show();
                                           $(".next").fadeIn();
                                    })
                                });
                            });
                        });
                    });
                    // 光的速度
                    $(".words-06-a").show().animate({"left": "30%"},2000, "easeOutElastic");
                    // 
                    $(".pop-06").show();
                 });
            });
           
    }

     // 第6屏幕到第7屏幕过渡
    if(index == 6 && nextIndex == 7 ) {
        setTimeout(function() {
            $(".star").animate({"width": 120}, 500, function() {
                $(".good-07").show();
                 $(".next").fadeIn();
            });

        }, 2000);
    }
    // 这是第8屏幕动画
    
      // $(".beginShoping").mouseenter(function(event) {
      //     $(".btn-08-a").show();
      // }).mouseleave(function(event) {
      //    $(".btn-08-a").hide();
      // });
      // hover 来替代更简洁  以后一个盒子鼠标经过显示离开隐藏  我们就可以用hover和toggle混搭想必也是极好的
      $(".beginShoping").hover(function() {
           $(".btn-08-a").toggle();  //  toggle  显示和隐藏的切换
      });
      // 大手跟随鼠标移动  
      $(document).mousemove(function(event) {
           var x = event.pageX - $(".hand-08").width() / 2;  // 获得鼠标在页面中的x坐标
           var y = event.pageY + 10;  // 获得鼠标在页面中的y坐标

           // 手的top 值不能小于 这个大小minY   当前屏幕的高度 K  减去手的高度  449 
           var minY = k - 449; 
           // 把 鼠标在页面中的坐标 给  hand 大手 left  top 
           if(y < minY ) {
              y = minY;
           }
        
         $(".hand-08").css({"left": x, "top": y});
      });

       // 当我们点击 再来一次的 时候， 分两步进行
       $(".again").click(function(event) {
         // 1. 返回第1屏幕 
           $.fn.fullpage.moveTo(1);
            // 2. 所有的动画都复原 就是原来没有看过的样子 
            // 核心原理就是  让我们的图片（做动画的元素 清除 行内样式就可以）
            // 所有带有动画的div 盒子 添加 move 类名
           $("img, .move").attr("style", "");
       });
      
},

}); 
});
