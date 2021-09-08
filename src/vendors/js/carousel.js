const owlGallery = (selector, params) => {
    const arrow = `<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4.5C11.2761 4.5 11.5 4.27614 11.5 4C11.5 3.72386 11.2761 3.5 11 3.5V4.5ZM0.646447 3.64645C0.451185 3.84171 0.451185 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM11 3.5L1 3.5V4.5L11 4.5V3.5Z" fill="#39AD46"/>
            </svg>`;
    if (params == undefined) params = "";
    const owl = $(selector);
    owl.each((i, el) => {
        $(el)
            .addClass("owl-carousel owl-theme")
            .owlCarousel(
                Object.assign(params, {
                    lazyLoad: true,
                    smartSpeed: 1000,
                    navText: [arrow, arrow],
                })
            );
    }).trigger("refresh.owl.carousel");
};

$().ready(() => {
    owlGallery(".carouselSocial", {
        dots: false,
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
                margin: 20,
                autoWidth: false,
                items: 3,
            },
            768: {
                margin: 20,
                autoWidth: false,
                items: 2,
            },
        },
    });
});

$().ready(() => {
    owlGallery(".carouselEvent", {
        dots: false,
        items: 1,
        loop: true,
        nav: true,
        margin: 10,
        navContainer: ".carouselEvent__buttons",
        navClass: ["carouselEvent__prev", "carouselEvent__next"],
    });
});

$().ready(() => {
    owlGallery(".carouselOther", {
        dots: false,
        items: 3,
        loop: true,
        nav: true,
        margin: 10,
        navContainer: ".carouselOther__buttons",
        navClass: ["carouselOther__prev", "carouselOther__next"],
    });
});
