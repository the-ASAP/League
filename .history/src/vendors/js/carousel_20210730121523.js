const owl = $('.owl-carousel').first()

console.log(owl)
owl.owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
    navContainer: '.carouselMeeting__buttons',
})
