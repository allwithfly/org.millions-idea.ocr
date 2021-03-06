$(function() {
    var index = 0;
    $("#link-logout").hover(function () {
        index = layer.tips('注销登录', '#link-logout', {
            tips: 3
        });
    },function () {
        layer.close(index);
    })
    $("#link-user").hover(function () {
        index = layer.tips('控制台', '#link-user', {
            tips: 3
        });
    },function () {
        layer.close(index);
    })
    // 侧边栏操作按钮
    $(document).on('click', '#guide', function() {
        $(this).toggleClass('toggled');
        $('#sidebar').toggleClass('toggled');
    });
    // 侧边栏二级菜单
    $(document).on('click', '.sub-menu a', function() {
        $(this).next().slideToggle(200);
        $(this).parent().toggleClass('toggled');
    });
    // 个人资料
    $(document).on('click', '.s-profile a', function() {
        $(this).next().slideToggle(200);
        $(this).parent().toggleClass('toggled');
    });
});
// iframe高度自适应
function changeFrameHeight(ifm) {
    ifm.height = document.documentElement.clientHeight - 118;
}
function resizeFrameHeight() {
    $('.tab_iframe').css('height', document.documentElement.clientHeight - 118);
    $('md-tab-content').css('left', '0');
}


// ========== 选项卡操作 ==========
$(function() {
    // 选项卡点击
    $(document).on('click', '.content_tab li', function() {
        // 切换选项卡
        $('.content_tab li').removeClass('cur');
        $(this).addClass('cur');
        // 切换iframe
        $('.iframe').removeClass('cur');
        $('#iframe_' + $(this).data('index')).addClass('cur');
        var marginLeft = ($('#tabs').css('marginLeft').replace('px', ''));
        // 滚动到可视区域:在左侧
        if ($(this).position().left < marginLeft) {
            var left = $('.content_tab>ul').scrollLeft() + $(this).position().left - marginLeft;
            $('.content_tab>ul').animate({scrollLeft: left}, 200, function() {
                initScrollState();
            });
        }
        // 滚动到可视区域:在右侧
        if(($(this).position().left + $(this).width() - marginLeft) > document.getElementById('tabs').clientWidth) {
            var left = $('.content_tab>ul').scrollLeft() + (($(this).position().left + $(this).width() - marginLeft) - document.getElementById('tabs').clientWidth);
            $('.content_tab>ul').animate({scrollLeft: left}, 200, function() {
                initScrollState();
            });
        }
    });
    // 控制选项卡滚动位置
    $(document).on('click', '.tab_left>a', function() {
        $('.content_tab>ul').animate({scrollLeft: $('.content_tab>ul').scrollLeft() - 300}, 200, function() {
            initScrollState();
        });
    });
    // 向右箭头
    $(document).on('click', '.tab_right>a', function() {
        $('.content_tab>ul').animate({scrollLeft: $('.content_tab>ul').scrollLeft() + 300}, 200, function() {
            initScrollState();
        });
    });
    // 初始化箭头状态

});
// 选项卡对象
var Tab = {
    addTab: function(title, url) {
        var index = url.replace(/\./g, '_').replace(/\//g, '_').replace(/:/g, '_').replace(/\?/g, '_').replace(/,/g, '_').replace(/=/g, '_').replace(/&/g, '_');
        // 如果存在选项卡，则激活，否则创建新选项卡
        if ($('#tab_' + index).length == 0) {
            // 添加选项卡
            $('.content_tab li').removeClass('cur');
            var tab = '<li id="tab_' + index +'" data-index="' + index + '" class="cur"><a class="waves-effect waves-light">' + title + '</a></li>';//<i class="zmdi zmdi-close"></i><
            $('.content_tab>ul').append(tab);
            // 添加iframe
            $('.iframe').removeClass('cur');
            var iframe = '<div id="iframe_' + index + '" class="iframe cur"><iframe class="tab_iframe" src="' + url + '" width="100%" frameborder="0" scrolling="auto" onload="changeFrameHeight(this)"></iframe></div>';
            $('.content_main').append(iframe);
            initScrollShow();
            $('.content_tab>ul').animate({scrollLeft: document.getElementById('tabs').scrollWidth - document.getElementById('tabs').clientWidth}, 200, function() {
                initScrollState();
            });
        } else {
            $('#tab_' + index).trigger('click');
        }
        // 关闭侧边栏
        $('#guide').trigger(click);
    },
    closeTab: function($item) {
        var closeable = $item.data('closeable');
        if (closeable != false) {
            // 如果当前时激活状态则关闭后激活左边选项卡
            if($item.hasClass('cur')) {
                $item.prev().trigger('click');
            }
            // 关闭当前选项卡
            var index = $item.data('index');
            $('#iframe_' + index).remove();
            $item.remove();
        }
        initScrollShow();
    }
}
function initScrollShow() {
    if (document.getElementById('tabs').scrollWidth > document.getElementById('tabs').clientWidth) {
        $('.content_tab').addClass('scroll');
    } else {
        $('.content_tab').removeClass('scroll');
    }
}
function initScrollState() {
    if ($('.content_tab>ul').scrollLeft() == 0) {
        $('.tab_left>a').removeClass('active');
    } else {
        $('.tab_left>a').addClass('active');
    }
    if (($('.content_tab>ul').scrollLeft() + document.getElementById('tabs').clientWidth) >= document.getElementById('tabs').scrollWidth) {
        $('.tab_right>a').removeClass('active');
    } else {
        $('.tab_right>a').addClass('active');
    }
}

function fullPage() {

    if ($.util.supportsFullScreen) {
        if ($.util.isFullScreen()) {
            $.util.cancelFullScreen();
        } else {
            $.util.requestFullScreen();
        }
    } else {
        alert("当前浏览器不支持全屏 API，请更换至最新的 Chrome/Firefox/Safari 浏览器或通过 F11 快捷键进行操作。");
    }
}