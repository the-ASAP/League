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
    $(btn || closeButton).on("click", function () {
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

$().ready(() => {
    contentFadeInOnReady();
    bindModalListeners([{ modal: $(".modal"), trigger: $(".header__menu_mobile") }]);
    accordion(".accordion__main", ".accordion__information", "activeAccordion");
    select(".modal__burger", ".modal__hiddenRefs", "activeHiddenRefs");
    select(".footer__burger", ".footer__hiddenRefs", "footer__activeHiddenRefs");
    select(
        ".associationModal__button",
        ".associationModal",
        "associationModal__active",
        ".associationModal__close"
    );
    select(".tags__list", ".tags__items", "tags__active");
    select(".publication__button", ".publication__items", "publication__active");
    createYouTubeEmbedLink($(".video__button"), $(".video__image"));

    ymaps.ready(() => {
        const Map = new ymaps.Map("yandexMap", {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ["zoomControl"],
        });
        Map.behaviors.disable("scrollZoom");
    });
});
