"use strict";function stopScroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body",e=parseInt(document.documentElement.clientWidth),o=parseInt(window.innerWidth),a=o-e;$(t).attr("style","overflow: hidden; padding-right: "+a+"px")}function freeScroll(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"body";$(t).attr("style","")}function accordion(t,e,o){$(t).on("click",function(){$(this).toggleClass(o).parent().find(e).slideToggle()})}function select(t,e,o,a){$(t||a).on("click",function(a){a.preventDefault(),$(t).toggleClass(o),$(e).slideToggle()}),$(document).on("click",function(a){$(t).is(a.target)||!$(t).hasClass(o)||$(e).is(a.target)||($(t).toggleClass(o),$(e).slideToggle())})}function hoverSelect(t,e,o,a){$(t).on("mouseenter",function(a){a.preventDefault(),$(t).addClass(o),$(t).hasClass(o)&&$(e).slideDown()}),$(a).on("click",function(){$(t).toggleClass(o),$(e).slideUp()}),$(document).on("mousedown",function(a){$(t).is(a.target)||$(e).is(a.target)||!$(t).hasClass(o)||($(t).toggleClass(o),$(e).slideUp())})}function toggleTabs(t,e){$(t).click(function(){var o=$(this).attr("data-tab"),a=$("".concat(e,"[data-tab=").concat(o,"]"));$("".concat(t,".active")).removeClass("active"),$(this).addClass("active"),$("".concat(e,".active")).removeClass("active"),a.addClass("active")})}var createSortButton=function(t,e){return'<button type="button" id="'.concat(e,'" class="publication__item">').concat(t,"</button>")},sortButtonsData=[{id:"sortButton-1",title:"Последние",data:{sort:"created_date",method:"desc"}},{id:"sortButton-2",title:"Популярные",data:{sort:"show_counter",method:"desc"}},{id:"sortButton-3",title:"Лучшие",data:{sort:"property_STATUS",method:"desc"}},{id:"sortButton-4",title:"Старые",data:{sort:"created_date",method:"asc"}}],defaultSort=sortButtonsData[0].sort,method=sortButtonsData[0].method,tagsArr=[],contentFadeInOnReady=function(){$(".preloader").fadeOut(150,function(){$(".preloader").remove()})},bindModalListeners=function(t){t.forEach(function(t){var e=$(t.trigger),o=$(t.modal);e.on("click",function(){stopScroll("body"),o.addClass("active")}),o.on("click",function(t){$(t.target).hasClass("modal")&&($(this).removeClass("active"),freeScroll())}),o.find(".modal__close").on("click",function(){o.removeClass("active"),freeScroll()}),$(document).keydown(function(t){return 27===t.keyCode?($(".modal").removeClass("active"),freeScroll(),!1):void 0})})},createYouTubeEmbedLink=function(t,e){$(t).each(function(t,o){var a=$(o).attr("data-src"),n="https://www.youtube.com/embed/",i="?rel=0&showinfo=0&autoplay=1",r=n+a.slice(a.indexOf("=")+1,a.length)+i;$(o).on("click",function(){$(this).parent(e).empty().append('<iframe class="video__frame" src="'.concat(r,'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'))})})},refreshScript=function(){toggleTabs(".tab-trigger",".tab-content"),contentFadeInOnReady(),bindModalListeners([{modal:$(".modal"),trigger:$(".header__menu_mobile")}]),accordion(".accordion__main",".accordion__information","activeAccordion"),select(".modal__burger",".modal__hiddenRefs","activeHiddenRefs"),select(".footer__burger",".footer__hiddenRefs","footer__activeHiddenRefs"),hoverSelect(".associationModal__button",".associationModal","associationModal__active",".associationModal__close"),select(".tags__list",".tags__items","tags__active"),select(".publication__button",".publication__items","publication__active"),createYouTubeEmbedLink($(".video__button"),$(".video__image")),refreshSCarousel(),"/en"===window.location.pathname.substring(0,3)&&($(".header__button").each(function(t,e){return $(e).removeClass("header__button_active")}),$("#en").addClass("header__button_active")),"/ch"===window.location.pathname.substring(0,3)&&($(".header__button").each(function(t,e){return $(e).removeClass("header__button_active")}),$("#ch").addClass("header__button_active")),$(".header__button").on("click",function(t){$(this).hasClass("header__button_active")&&t.preventDefault()}),$(".header__button a").on("click",function(t){$(this).parent().hasClass("header__button_active")&&t.preventDefault()}),$(".otherNews__more").on("click",function(){window.location.href="/news"}),$(document).on("click",".publication__item",function(e){e.preventDefault();var o=$(this).attr("id"),a=sortButtonsData.find(function(t){return t.id===o}),n=a.data;defaultSort=n.sort,method=n.method;var i=$(this).text().trim();$(".publication__button").text(i),t({tag:tagsArr,sort:defaultSort,method:method})});var t=function(t){$.ajax({url:window.location.pathname,type:"get",data:t}).done(function(t){var e=$(t).find(".news__content").html(),o=$(t).find(".pagination").html();$(".news__content").html(e),$(".pagination").html(o),$(".pagination__button a").each(function(t,e){$(e).removeAttr("onclick")})})};if($(".pagination__button a").each(function(t,e){$(e).removeAttr("onclick")}),$(document).on("click",".pagination__button a",function(e){e.preventDefault(),t({PAGEN_1:new URLSearchParams($(this).attr("href")).get("PAGEN_1"),bxajaxid:"78376259d03e6438c84b77344bec69dc",tag:tagsArr,sort:defaultSort,method:method})}),window.location.search){var e=new URLSearchParams(window.location.search).get("tag");e&&(tagsArr=e.split(",")),1===tagsArr.length&&tagsArr.forEach(function(t){$(".tags__list").html(t)}),tagsArr.length&&tagsArr.forEach(function(t){var e='<button type="button" class="tags__button" onclick="">'.concat(t,"</button>");$(".tags__filter").append(e)})}$(document).on("click",".tags__button",function(){var e=$(this).text(),o=tagsArr.indexOf(e);o>-1&&tagsArr.splice(o,1),$(this).remove(),t({tag:tagsArr,sort:defaultSort,method:method})}),$(".tags__item").on("click",function(){var e=$(this).data("tag");tagsArr.push(e);var o='<button type="button" class="tags__button" onclick="">'.concat(e,"</button>");$(".tags__filter").append(o),t({tag:tagsArr,sort:defaultSort,method:method})})},refreshSCarousel=function(){owlGallery(".carouselSocial",{dots:!1,autoWidth:!1,items:1,margin:16,loop:!0,nav:!0,navContainer:".carouselSocial__buttons",navClass:["carouselSocial__prev","carouselSocial__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{margin:20,autoWidth:!1,items:2}}}),owlGallery(".carouselMeeting",{dots:!1,autoWidth:!1,items:1,margin:5,loop:!0,nav:!0,navContainer:".carouselMeeting__buttons",navClass:["carouselMeeting__prev","carouselMeeting__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{margin:20,autoWidth:!1,items:2}}}),owlGallery(".carouselEvent",{dots:!1,items:1,loop:!0,nav:!0,margin:10,navContainer:".carouselEvent__buttons",navClass:["carouselEvent__prev","carouselEvent__next"]}),owlGallery(".carouselOther",{dots:!1,items:1,loop:!0,nav:!0,margin:10,navContainer:".carouselOther__buttons",navClass:["carouselOther__prev","carouselOther__next"],responsive:{1240:{items:3,margin:20,autoWidth:!1},768:{items:2,margin:20,autoWidth:!1}}})};$().ready(function(){refreshScript();var t='\n        <button type="button" class="upButton">\n            <svg\n                width="12"\n                height="12"\n                viewBox="0 0 12 12"\n                fill="none"\n                xmlns="http://www.w3.org/2000/svg"\n            >\n                <path\n                    fill-rule="evenodd"\n                    clip-rule="evenodd"\n                    d="M11.5303 5.53022L10.4696 4.46956L6.74994 8.18923L6.74994 -0.000113696L5.24994 -0.000113762L5.24994 8.18923L1.53027 4.46956L0.469614 5.53022L5.99994 11.0605L11.5303 5.53022Z"\n                    fill="white"\n                />\n            </svg>\n        </button>\n    ';$("body").append(t),$(".upButton").on("click",function(){$("body,html").animate({scrollTop:0},300)}),window.addEventListener("scroll",function(){window.pageYOffset>document.documentElement.clientHeight?$(".upButton").hasClass("upButton_active")||$(".upButton").addClass("upButton_active"):$(".upButton").hasClass("upButton_active")&&$(".upButton").removeClass("upButton_active")}),$(".tags__oneItem").on("click",function(){var t=$(this).attr("data-tag");window.location.href="http://liga.asap-lp.ru/association/association_joining.php?tag=".concat(t)})});