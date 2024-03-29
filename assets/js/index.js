/**
 * Main JS file for GhostScroll behaviours
 */
var $post = $('.row'), 
	$first = $('.post-index.first'), 
	$last = $('.post-index.last'), 
	$fnav = $('.fixed-nav'),
	$postholder = $('.post-holder'),
	$postafter = $('.post-after'),
	$sitehead = $('#site-head');

var navCate = [];//左侧分类数组

/*globals jQuery, document */
(function ($) {
    "use strict";
    function srcTo (el) {
    	$('html, body').animate({
			scrollTop: el.offset().top
		}, 1000);
    }
    $(document).ready(function(){
     
        $postholder.each(function (e) {
        	if(e % 2 != 0)
        		$(this).css({
                    'background': '#0099cc',
                    'color'     : 'white',
                })
        })

        $postafter.each(function (e) {
        	var bg = $(this).parent().css('background-color')
        	$(this).css('border-top-color', bg)

        	if(e % 2 == 0)
        		$(this).css('left', '6%')

        })
        

        $('.btn.first').click( function () {
        	srcTo ($first)
        })
        $('.btn.last').click( function () {
        	srcTo ($last)
        })
        $('#header-arrow').click(function () {
            srcTo ($first)
        })

        $('.post-title').each(function () {
        	var t = $(this).parents('.row').attr('data-catName');
            if (navCate.indexOf(t) < 0) {
                navCate.push(t);
                var index = $(this).parents('.row').index();
                var category = $(this).parents('.row').attr('data-category');
                $fnav.append("<a data-nav='" + category + "' class='fn-item' item_index='"+index+"'>"+t+"</a>");
            }
        });

        //左侧分类导航栏点击事件
        $('.fn-item').click(function () {
            var i = $(this).attr('item_index'),
                s = $(".row[item_index='"+i+"']"),
                category = $(this).attr('data-nav');

            $('[data-category]').hide();
            $('[data-category=' + category + ']').show();
            $('html, body').animate({
                scrollTop: s.offset().top
            }, 100);

        })

        $('.post.last').next('.post-after').hide();
        $(window).scroll( function () {
        	var w = $(window).scrollTop(),
        		g = $sitehead.offset().top,
        		h = $sitehead.offset().top + $(this).height()-100;

        	if(w >= g && w<=h) {
        		//$('.fixed-nav').fadeOut('fast');
                $('.fixed-nav').fadeIn('fast');
        	} else {
                $('.fixed-nav').fadeIn('fast');
                /*if($(window).width()>500)
        		  $('.fixed-nav').fadeIn('fast')*/
        	}

        	$post.each(function () {
        		var f = $(this).offset().top,
        			b = $(this).offset().top + $(this).height(),
        			t = $(this).index(),
        		 	i = $(".fn-item[item_index='"+t+"']"),
        		 	a = $(this).parent('.post-holder').prev('.post-holder').find('.post-after');
        		 $(this).attr('item_index', t);

        		if(w >= f && w<=b) {

        			i.addClass('active');
        			a.fadeOut('slow')
        		} else {
        			i.removeClass('active');
        			a.fadeIn('slow')
        		}
        	})
        });
        $(window).trigger('scroll');//触发scroll事件

        $('li').before('<span class="bult fa fa-asterisk icon-asterisk"></span>')
        $('blockquote p').prepend('<span class="quo icon-quote-left"></span>')
            .append('<span class="quo icon-quote-right"></span>')

        $('.info').each(function () {
            var imgItem = $(this).find('img'),
                url = '';
            if(imgItem.length > 0){
                var url = $(imgItem).attr('src');
                $(imgItem).hide();
                $(imgItem)
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .find('img')
                .attr('src', url);
            }else{
                /*$(this)
                    .parent()
                    .find('img')
                    .remove();*/ 
                $(this)
                    .parent()
                    .parent()
                    .parent()
                    .height(280); 
            }
            
        })

    });

    $post.each(function () {
        var postText = $(this).html();
        var fa  = [];
        for(var i=0; i < icons.length; i++) {
            fa[i]       = {};
            fa[i].str   = "@"+ icons[i]+ "@";
            fa[i].icon  = icons[i];
            fa[i].int   = postText.search(fa[i].str);

            if(fa[i].int > -1 ) { 
                fa[i].count = postText.match(new RegExp(fa[i].str,"g")).length;
                console.log(fa[i].count)
                for(var j=0; j < fa[i].count; j++) {
                    $(this).html($(this).html().replace(fa[i].str, "<i class='fa "+fa[i].icon+"'></i>"))
                }
            }
        }
    });

    // 初始化雨滴效果
    if ( 1 > $('script[src*="init_rainyday"]').size() ) {
        if ( '' != $('#ccontainer').attr('data-bg') ){
            $('#ccontainer').css('background-image', 'url('+$('#ccontainer').attr('data-bg')+')');
        }
        return;
    }

    $(window).load(function(){

        // On the home page, move the blog icon inside the header 
        // for better relative/absolute positioning.

        $('#site-bg-image').show();

        $(window).resize(function(){
            $(window).scroll();
        });

        $(window).resize();
        $(window).scroll();
    });
    

}(jQuery));
