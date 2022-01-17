"use strict";function stopScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",t=parseInt(document.documentElement.clientWidth),o=parseInt(window.innerWidth),n=o-t;$(e).attr("style","overflow: hidden; padding-right: "+n+"px")}function freeScroll(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body";$(e).attr("style","")}function accordion(e,t,o){$(e).on("click",function(){$(this).toggleClass(o).parent().find(t).slideToggle()})}function select(e,t,o,n){$(e||n).on("click",function(n){n.preventDefault(),$(e).toggleClass(o),$(t).slideToggle()}),$(document).on("mousedown",function(n){!$(e).is(n.target)&&$(e).hasClass(o)&&($(e).toggleClass(o),$(t).slideToggle())})}function hoverSelect(e,t,o,n){$(e).on("mouseenter",function(n){n.preventDefault(),$(e).addClass(o),$(e).hasClass(o)&&$(t).slideDown()}),$(n).on("click",function(){$(e).toggleClass(o),$(t).slideUp()}),$(document).on("mousedown",function(n){!$(e).is(n.target)&&$(e).hasClass(o)&&($(e).toggleClass(o),$(t).slideUp())})}var contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(e){e.forEach(function(e){var t=$(e.trigger),o=$(e.modal);t.on("click",function(){stopScroll("body"),o.addClass("active")}),o.on("click",function(e){$(e.target).hasClass("modal")&&($(this).removeClass("active"),freeScroll())}),o.find(".modal__close").on("click",function(){o.removeClass("active"),freeScroll()}),$(document).keydown(function(e){return 27===e.keyCode?($(".modal").removeClass("active"),freeScroll(),!1):void 0})})},createYouTubeEmbedLink=function(e,t){$(e).each(function(e,o){var n=$(o).attr("data-src"),a="https://www.youtube.com/embed/",i="?rel=0&showinfo=0&autoplay=1",s=a+n.slice(n.indexOf("=")+1,n.length)+i;$(o).on("click",function(){$(this).parent(t).empty().append('<iframe class="video__frame" src="'.concat(s,'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'))})})};$().ready(function(){contentFadeInOnReady(),bindModalListeners([{modal:$(".modal"),trigger:$(".header__menu_mobile")}]),accordion(".accordion__main",".accordion__information","activeAccordion"),select(".modal__burger",".modal__hiddenRefs","activeHiddenRefs"),select(".footer__burger",".footer__hiddenRefs","footer__activeHiddenRefs"),hoverSelect(".associationModal__button",".associationModal","associationModal__active",".associationModal__close"),select(".tags__list",".tags__items","tags__active"),select(".publication__button",".publication__items","publication__active"),createYouTubeEmbedLink($(".video__button"),$(".video__image"));var e=[];window.location.search&&(e=new URLSearchParams(window.location.search).get("tag"),e&&e.split(","),e.length&&e.forEach(function(e){var t='<button type="button" class="tags__button" onclick="">'.concat(e,"</button>");$(".tags__filter").append(t)})),$(document).on("click",".tags__button",function(){var t=$(this).text(),o=e.indexOf(t);o>-1&&e.splice(o,1),$(this).remove(),$.ajax({url:"/?tag=".concat(e.join(",")),context:document.body}).done(function(){console.log("done")})}),$(".tags__item").on("click",function(){var t=$(this).text();e.push(t);var o='<button type="button" class="tags__button" onclick="">'.concat(t,"</button>");$(".tags__filter").append(o),$.ajax({url:"http://liga.asap-lp.ru//news/?tag=".concat(e.join(","))}).done(function(e){var t=($(e),$(".news__content").html($(e).find($(".news__content")).html()));console.log(t),owlGallery(".carouselSocial",{dots:!1,autoWidth:!1,items:1,margin:16,loop:!0,nav:!0,navContainer:".carouselSocial__buttons",navClass:["carouselSocial__prev","carouselSocial__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{margin:20,autoWidth:!1,items:2}}}),owlGallery(".carouselMeeting",{dots:!1,autoWidth:!1,items:1,margin:5,loop:!0,nav:!0,navContainer:".carouselMeeting__buttons",navClass:["carouselMeeting__prev","carouselMeeting__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{margin:20,autoWidth:!1,items:2}}}),owlGallery(".carouselEvent",{dots:!1,items:1,loop:!0,nav:!0,margin:10,navContainer:".carouselEvent__buttons",navClass:["carouselEvent__prev","carouselEvent__next"]}),owlGallery(".carouselOther",{dots:!1,items:1,loop:!0,nav:!0,margin:10,navContainer:".carouselOther__buttons",navClass:["carouselOther__prev","carouselOther__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{items:2,margin:20,autoWidth:!1}}})})});var t=window.location.pathname.substring(0,3);"/en"===t&&$(".header__button").each(function(e,t){return $(t).toggleClass("header__button_active")}),$(".header__button").on("click",function(e){$(this).hasClass("header__button_active")&&e.preventDefault()}),$(".header__button a").on("click",function(e){$(this).parent().hasClass("header__button_active")&&e.preventDefault()}),$(".otherNews__more").on("click",function(){window.location.href="/news"})});