"use strict";function stopScroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",e=parseInt(document.documentElement.clientWidth),n=parseInt(window.innerWidth),o=n-e;$(t).attr("style","overflow: hidden; padding-right: "+o+"px")}function freeScroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body";$(t).attr("style","")}function accordion(t,e,n){$(t).on("click",function(){$(this).toggleClass(n).parent().find(e).slideToggle()})}function select(t,e,n,o){$(t||o).on("click",function(o){o.preventDefault(),$(t).toggleClass(n),$(e).slideToggle()}),$(document).on("mousedown",function(o){!$(t).is(o.target)&&$(t).hasClass(n)&&($(t).toggleClass(n),$(e).slideToggle())})}function hoverSelect(t,e,n,o){$(t).on("mouseenter",function(o){o.preventDefault(),$(t).addClass(n),$(t).hasClass(n)&&$(e).slideDown()}),$(o).on("click",function(){$(t).toggleClass(n),$(e).slideUp()}),$(document).on("mousedown",function(o){!$(t).is(o.target)&&$(t).hasClass(n)&&($(t).toggleClass(n),$(e).slideUp())})}var contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(t){t.forEach(function(t){var e=$(t.trigger),n=$(t.modal);e.on("click",function(){stopScroll("body"),n.addClass("active")}),n.on("click",function(t){$(t.target).hasClass("modal")&&($(this).removeClass("active"),freeScroll())}),n.find(".modal__close").on("click",function(){n.removeClass("active"),freeScroll()}),$(document).keydown(function(t){return 27===t.keyCode?($(".modal").removeClass("active"),freeScroll(),!1):void 0})})},createYouTubeEmbedLink=function(t,e){$(t).each(function(t,n){var o=$(n).attr("data-src"),a="https://www.youtube.com/embed/",i="?rel=0&showinfo=0&autoplay=1",c=a+o.slice(o.indexOf("=")+1,o.length)+i;$(n).on("click",function(){$(this).parent(e).empty().append('<iframe class="video__frame" src="'.concat(c,'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'))})})},refreshScript=function(){contentFadeInOnReady(),bindModalListeners([{modal:$(".modal"),trigger:$(".header__menu_mobile")}]),accordion(".accordion__main",".accordion__information","activeAccordion"),select(".modal__burger",".modal__hiddenRefs","activeHiddenRefs"),select(".footer__burger",".footer__hiddenRefs","footer__activeHiddenRefs"),hoverSelect(".associationModal__button",".associationModal","associationModal__active",".associationModal__close"),select(".tags__list",".tags__items","tags__active"),select(".publication__button",".publication__items","publication__active"),createYouTubeEmbedLink($(".video__button"),$(".video__image")),refreshSCarousel();var t=window.location.pathname.substring(0,3);"/en"===t&&$(".header__button").each(function(t,e){return $(e).toggleClass("header__button_active")}),$(".header__button").on("click",function(t){$(this).hasClass("header__button_active")&&t.preventDefault()}),$(".header__button a").on("click",function(t){$(this).parent().hasClass("header__button_active")&&t.preventDefault()}),$(".otherNews__more").on("click",function(){window.location.href="/news"}),$(".pagination__button a").each(function(t,e){$(e).removeAttr("onclick")}),$(document).on("click",".pagination__button a",function(t){t.preventDefault();var e=$(this).attr("href").slice(-1);$.ajax({url:"/news/",type:"get",data:{PAGEN_1:e,bxajaxid:"78376259d03e6438c84b77344bec69dc"}}).done(function(t){var e=$(t).find(".news__content").html(),n=$(t).find("pagination").html();$(".news__content").html(e),$(".pagination").html(n),$(".pagination__button a").each(function(t,e){$(e).removeAttr("onclick")})})});var e=[];if(window.location.search){var n=new URLSearchParams(window.location.search).get("tag");n&&(e=n.split(",")),e.length&&e.forEach(function(t){var e='<button type="button" class="tags__button" onclick="">'.concat(t,"</button>");$(".tags__filter").append(e)})}$(document).on("click",".tags__button",function(){var t=$(this).text(),n=e.indexOf(t);n>-1&&e.splice(n,1),$(this).remove(),$.ajax({url:"/news/",type:"get",data:{tag:e}}).done(function(t){var e=$(t).find(".news__content").html();$(".news__content").html(e)})}),$(".tags__item").on("click",function(){var t=$(this).data("tag");e.push(t);var n='<button type="button" class="tags__button" onclick="">'.concat(t,"</button>");$(".tags__filter").append(n),$.ajax({url:"/news/",type:"get",data:{tag:e}}).done(function(t){var e=$(t).find(".news__content").html();$(".news__content").html(e)})})},refreshSCarousel=function(){owlGallery(".carouselSocial",{dots:!1,autoWidth:!1,items:1,margin:16,loop:!0,nav:!0,navContainer:".carouselSocial__buttons",navClass:["carouselSocial__prev","carouselSocial__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{margin:20,autoWidth:!1,items:2}}}),owlGallery(".carouselMeeting",{dots:!1,autoWidth:!1,items:1,margin:5,loop:!0,nav:!0,navContainer:".carouselMeeting__buttons",navClass:["carouselMeeting__prev","carouselMeeting__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{margin:20,autoWidth:!1,items:2}}}),owlGallery(".carouselEvent",{dots:!1,items:1,loop:!0,nav:!0,margin:10,navContainer:".carouselEvent__buttons",navClass:["carouselEvent__prev","carouselEvent__next"]}),owlGallery(".carouselOther",{dots:!1,items:1,loop:!0,nav:!0,margin:10,navContainer:".carouselOther__buttons",navClass:["carouselOther__prev","carouselOther__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{items:2,margin:20,autoWidth:!1}}})};$().ready(function(){refreshScript()});