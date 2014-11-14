$(document).ready(function(){

    //nojs
    $("body").removeClass("no-js");

    //------------------------------------------------------------------------//

    //fakelink
    $('a[href="#"]').on('click',function(e){e.preventDefault();});

    //------------------------------------------------------------------------//

    //placeholder
    $('input[placeholder], textarea[placeholder]').placeholder();

    //------------------------------------------------------------------------//

    // tab
    $(function(){
        $('.tabs').delegate('li:not(.active)','click',function(){
            $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250);
        })
    });

    // tab arrows
    if ( $(".tab").has(".tab-prev").length || $(".tab").has(".tab-next").length ) {
        $('.tab-prev, .tab-next').click(function(){
            var $active = $(this).parents(".tab").find(".tabs .active");
            $next = $(this).hasClass('tab-prev') ? $active.prev() : $active.next();
            if (!$next.length) $next = $(this).hasClass('tab-prev') ? $(this).parents(".tab").find('.tabs li:last') : $(this).parents(".tab").find('.tabs li:first');
            $next.click();
            return false;
        });
    }

    $("#btn_subscribe").click(function(){
        alert("subscribe");
    });

    $("#btn_tell").click(function(){
        alert("tell");
    });

    $("#getIp").click(function(){
        alert(remote_ip_info.country);
    });
    //------------------------------------------------------------------------//

    $('#wechatShare').popover({placement: 'bottom', html: true, content: '<img src="/getqrcode.jpg"><hr>或在微信中打开本网页分享给好友'}
      );
    
    //WeChat
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": "",
                "img_url": "http://www.voluncation.com/logo-wechat.jpg",
                "img_width": "128",
                "img_height": "128",
                "link": "http://www.voluncation.com/",
                "desc":  "让你的身体和心灵都在路上!",
                "title": "旅心Voluncation"
            }, function (res) {
                _report('send_msg', res.err_msg);
            })
        });

        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": "http://www.voluncation.com/logo-wechat.jpg",
                "img_width": "128",
                "img_height": "128",
                "link": "http://www.voluncation.com/",
                "desc":  "让你的身体和心灵都在路上!",
                "title": "旅心Voluncation"
            }, function (res) {
                _report('timeline', res.err_msg);
            });
        });
    }, false);
    
});//document ready