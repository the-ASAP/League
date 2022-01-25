// удаляем прелодер при загрузке страницы
const contentFadeInOnReady = () => {
    $(".preloader").fadeOut(150, () => {
        $(".preloader").remove();
    });
};

//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = (modalArr) => {
    modalArr.forEach((obj) => {
        let jQTrigger = $(obj.trigger);
        let jQModal = $(obj.modal);

        jQTrigger.on("click", function () {
            stopScroll("body");
            jQModal.addClass("active");
        });

        jQModal.on("click", function (e) {
            if ($(e.target).hasClass("modal")) {
                $(this).removeClass("active");
                freeScroll();
            }
        });

        jQModal.find(".modal__close").on("click", function () {
            jQModal.removeClass("active");
            freeScroll();
        });

        $(document).keydown((e) => {
            if (e.keyCode === 27) {
                $(".modal").removeClass("active");
                freeScroll();
                return false;
            }
        });
    });
};

// Запрещаем скролл для body
function stopScroll(item = "body") {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", "overflow: hidden; padding-right: " + scrollbarWidth + "px");
}

// возвращаем скролл для body
function freeScroll(item = "body") {
    $(item).attr("style", "");
}

function accordion(btn, content, activeClass, closeButton) {
    $(btn).on("click", function () {
        $(this).toggleClass(activeClass).parent().find(content).slideToggle();
    });
}

function select(btn, content, activeClass, closeButton) {
    $(btn || closeButton).on("click", function (e) {
        e.preventDefault();
        $(btn).toggleClass(activeClass);
        $(content).slideToggle();
    });
    $(document).on("mousedown", function (e) {
        if (!$(btn).is(e.target) && $(btn).hasClass(activeClass)) {
            $(btn).toggleClass(activeClass);
            $(content).slideToggle();
        }
    });
}

function hoverSelect(btn, content, activeClass, closeButton) {
    $(btn).on("mouseenter", function (e) {
        e.preventDefault();
        $(btn).addClass(activeClass);
        if ($(btn).hasClass(activeClass)) $(content).slideDown();
    });
    $(closeButton).on("click", function (e) {
        $(btn).toggleClass(activeClass);
        $(content).slideUp();
    });
    $(document).on("mousedown", function (e) {
        if (!$(btn).is(e.target) && $(btn).hasClass(activeClass)) {
            $(btn).toggleClass(activeClass);
            $(content).slideUp();
        }
    });
}

const createYouTubeEmbedLink = (btn, container) => {
    $(btn).each((i, el) => {
        let link = $(el).attr("data-src"),
            linkStart = "https://www.youtube.com/embed/",
            linkEnd = "?rel=0&showinfo=0&autoplay=1";
        let newLink = linkStart + link.slice(link.indexOf("=") + 1, link.length) + linkEnd;
        $(el).on("click", function () {
            $(this)
                .parent(container)
                .empty()
                .append(
                    `<iframe class="video__frame" src="${newLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                );
        });
    });
};

const refreshScript = () => {
    contentFadeInOnReady();
    bindModalListeners([{ modal: $(".modal"), trigger: $(".header__menu_mobile") }]);
    accordion(".accordion__main", ".accordion__information", "activeAccordion");
    select(".modal__burger", ".modal__hiddenRefs", "activeHiddenRefs");
    select(".footer__burger", ".footer__hiddenRefs", "footer__activeHiddenRefs");
    hoverSelect(
        ".associationModal__button",
        ".associationModal",
        "associationModal__active",
        ".associationModal__close"
    );
    select(".tags__list", ".tags__items", "tags__active");
    select(".publication__button", ".publication__items", "publication__active");
    createYouTubeEmbedLink($(".video__button"), $(".video__image"));
    refreshSCarousel()

    let en = window.location.pathname.substring(0,3)
    if(en === '/en') $('.header__button').each((index, item) => $(item).toggleClass('header__button_active'))

    $('.header__button').on('click', function(e) {
        if($(this).hasClass("header__button_active")) e.preventDefault()
    })
    $('.header__button a').on('click', function(e) {
        if($(this).parent().hasClass("header__button_active")) e.preventDefault()
    })

    $('.otherNews__more').on('click', function() {
        window.location.href = '/news'
    })


    // {
    //     PAGEN_1: 2
    //  bxajaxid: 78376259d03e6438c84b77344bec69dc
    // }
    
    $('.pagination__button a').each((index, item) => {
        $(item).removeAttr('onclick')
    })

    $(document).on('click', '.pagination__button a', function(e) {
        e.preventDefault()
        const PAGEN_1 = $(this).attr('href').slice(-1)
        $.ajax({
            url: `/news/`,
            type: 'get',
            data: {
                PAGEN_1,
                bxajaxid: "78376259d03e6438c84b77344bec69dc"
            }
        }).done(function(res) {
            const content = $(res).find('.news__content').html()
            const pagination = $(res).find('pagination').html()
            $('.news__content').html(content)
            $('.pagination').html(pagination)
            $('.pagination__button a').each((_, item) => {
                $(item).removeAttr('onclick')
            })
        })
    })

    let tagsArr = []
    
    if(window.location.search) {
        let params = new URLSearchParams(window.location.search).get('tag')
        if(params) tagsArr = params.split(',')
        if(tagsArr.length) {
            tagsArr.forEach(tag => {
                const component = `<button type="button" class="tags__button" onclick="">${tag}</button>`
                $(".tags__filter").append(component)
            })
        }
    }

    $(document).on('click', '.tags__button', function() {
        const text = $(this).text()
        const deleteIndex = tagsArr.indexOf(text)
        if(deleteIndex > -1) tagsArr.splice(deleteIndex, 1)
        $(this).remove()
        $.ajax({
            url: `/news/`,
            type: 'get',
            data: {
                tag: tagsArr
            }
        }).done(function(res) {
            const content = $(res).find('.news__content').html()
            $('.news__content').html(content)
        });
    })

    $('.tags__item').on('click', function(e) {
        const text = $(this).data('tag')
        tagsArr.push(text)
        const component = `<button type="button" class="tags__button" onclick="">${text}</button>`
        $(".tags__filter").append(component)
        $.ajax({
            url: `/news/`,
            type: 'get',
            data: {
                tag: tagsArr
            }
        }).done(function(res) {
            const content = $(res).find('.news__content').html()
            $('.news__content').html(content)
        });
    })
}
const refreshSCarousel = () => {
    owlGallery(".carouselSocial", {
        dots: false,
        autoWidth: false,
        items: 1,
        margin: 16,
        loop: true,
        nav: true,
        navContainer: ".carouselSocial__buttons",
        navClass: ["carouselSocial__prev", "carouselSocial__next"],
        responsive: {
            1240: {
                items: 3,
                margin: 20,
                autoWidth: false,
            },
            768: {
                margin: 20,
                autoWidth: false,
                items: 2,
            },
        },
    });
    owlGallery(".carouselMeeting", {
        dots: false,
        autoWidth: false,
        items: 1,
        margin: 5,
        loop: true,
        nav: true,
        navContainer: ".carouselMeeting__buttons",
        navClass: ["carouselMeeting__prev", "carouselMeeting__next"],
        responsive: {
            1240: {
                items: 3,
                margin: 20,
                autoWidth: false,
            },
            768: {
                margin: 20,
                autoWidth: false,
                items: 2,
            },
        },
    });
    owlGallery(".carouselEvent", {
        dots: false,
        items: 1,
        loop: true,
        nav: true,
        margin: 10,
        navContainer: ".carouselEvent__buttons",
        navClass: ["carouselEvent__prev", "carouselEvent__next"],
    });
    owlGallery(".carouselOther", {
        dots: false,
        items: 1,
        loop: true,
        nav: true,
        margin: 10,
        navContainer: ".carouselOther__buttons",
        navClass: ["carouselOther__prev", "carouselOther__next"],
        responsive: {
            1240: {
                items: 3,
                margin: 20,
                autoWidth: false,
            },
            768: {
                items: 2,
                margin: 20,
                autoWidth: false,
            },
        },
    });
}

$().ready(() => {
    refreshScript()
});
