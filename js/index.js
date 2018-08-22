
    // 获取元素
   var getElem = function (selector) {
       return document.querySelector(selector)
   }
    var getAllElem = function (selector) {
        return document.querySelectorAll(selector)
    }

    // 获取元素样式
    var getCls = function ( element ) {
        return element.getAttribute('class');
    }
    var setCls = function ( element, cls ) {
        return element.setAttribute('class', cls);
    }

    // 为元素添加样式
    var addCls = function ( element, cls) {
        var baseCls = getCls(element);
        if( baseCls.indexOf(cls) === -1 ) {
            setCls(element, baseCls+' '+cls);
        }
    }
    var delCls = function ( element, cls) {
        var baseCls = getCls(element);
        if( baseCls.indexOf(cls) != -1) {
            setCls( element, baseCls.split(cls).join('  ').replace(/\s+/g, ' '));
        }
    }

    // 第一步：初始化样式init
    var screenAnimateElements = {
        '.screen-1': [
            '.screen-1_heading',
            '.screen-1_phone',
            '.screen-1_shadown'
        ],
        '.screen-2': [
            '.screen-2_heading',
            '.screen-2_subheading',
            '.screen-2_phone',
            '.screen-2_point',
            '.screen-2_point_i_1',
            '.screen-2_point_i_2',
            '.screen-2_point_i_3'
        ],
        '.screen-3': [
            '.screen-3_heading',
            '.screen-3_subheading',
            '.screen-3_phone',
            '.screen-3__features'
        ],
        '.screen-4': [
            '.screen-4_heading',
            '.screen-4_subheading',
            '.screen-4_type_item_i_1',
            '.screen-4_type_item_i_2',
            '.screen-4_type_item_i_3',
            '.screen-4_type_item_i_4',
        ],
        '.screen-5': [
            '.screen-5_heading',
            '.screen-5_subheading',
            '.screen-5_bg'
        ],
    }
    // 设置屏内元素为初始状态
    var setScreenAnimateInit = function( screenCls ) {

        var screen = document.querySelector(screenCls); // 获取当前屏的元素
        var animateElements = screenAnimateElements[screenCls];// 需要设置动画的元素

        for( var i = 0; i < animateElements.length; i++ ) {
            var element = document.querySelector(animateElements[i]);
            var baseCls = element.getAttribute('class');
            element.setAttribute('class', baseCls +' '+ animateElements[i].substr(1)+'_animate_init')
        }
    }
    // 设置播放屏内的元素动画
    var playScreenAnimateDone = function ( screenCls ) {

        var screen = document.querySelector(screenCls); // 获取当前屏的元素
        var animateElements = screenAnimateElements[screenCls];// 需要设置动画的元素

        for( var i = 0; i < animateElements.length; i++ ) {
            var element = document.querySelector(animateElements[i]);
            var baseCls = element.getAttribute('class');
            element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
        }
    }


    window.onload = function () {
        for (var prop in screenAnimateElements) {
            //调整第一屏的动画效果，默认载入
            if( prop === '.screen-1') {
                continue;
            }
            setScreenAnimateInit(prop);
        }
    }

    // 第二部：滚动到哪里，就播放到哪里
    var navItems = getAllElem('.header_nav-item');
    var outlineItems = getAllElem('.outline_item');
    var switchNavItemActive = function( idx ) {
        for( var i = 0; i < navItems.length; i++ ) {
            delCls(navItems[i], 'header_nav-item_status_active');
        }
        addCls(navItems[idx], 'header_nav-item_status_active');

        for( var i = 0; i < outlineItems.length; i++ ) {
            delCls(outlineItems[i], 'outline_item_status_active');
        }
        addCls(outlineItems[idx], 'outline_item_status_active');
    }
    window.onscroll = function () {
            var top =  document.body.scrollTop;
        // console.log(top);
        if (top >= 0) {
            playScreenAnimateDone('.screen-1');
            switchNavItemActive(0);
        }
        if (top > 80) {
            addCls( getElem('.header'), 'header_status_back');
            addCls( getElem('.outline'), 'outline_status_in');
            switchNavItemActive(0);
        }else {
            delCls( getElem('.header'), 'header_status_back');
            delCls( getElem('.outline'), 'outline_status_in');
        }
        if (top > 650*1) {
            playScreenAnimateDone('.screen-2');
            switchNavItemActive(1);
        }
        if (top > 650*2) {
            playScreenAnimateDone('.screen-3');
            switchNavItemActive(2);
        }
        if (top > 650*3) {
            playScreenAnimateDone('.screen-4');
            switchNavItemActive(3);
        }
        if (top > 650*4) {
            playScreenAnimateDone('.screen-5');
            switchNavItemActive(4);
        }
    }

    // 第三部，导航条的大纲的双向定位

    // var navItems = getAllElem('.header_nav-item');
    // var outlineItems = getAllElem('.outline_item');
    var setNavJump = function (i, lib) {
        var item = lib[i];
        item.onclick = function () {
            // console.log(i)
            document.body.scrollTop = i * 800;
        }
    }
    for (var i = 0; i < navItems.length; i++ ){
        setNavJump(i, navItems);
    }
    for (var i = 0; i < outlineItems.length; i++ ){
        setNavJump(i, outlineItems);
    }

    // 滑动门特效
    var navTip = getElem('.header_nav_tip');
    var setTip = function (idx, lib) {
        lib[idx].onmousemove = function () {
            navTip.style.left = (idx * 70) + 'px';
        }
        var activeIdx= 0;
        lib[idx].onmouseout = function () {
            for(var i = 0; i < lib.length; i++ ) {
                if( getCls(lib[i]).indexOf('header_nav-item_status_active') > -1) {
                    activeIdx = i;
                    break;
                }
            }
            navTip.style.left = (activeIdx * 70) + 'px';
        }
    }
    for (var i = 0; i < navItems.length; i++ ) {
        setTip(i, navItems);
    }

    setTimeout(function () {
        playScreenAnimateDone('.screen-1');
    },200);

