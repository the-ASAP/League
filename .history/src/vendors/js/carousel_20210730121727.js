const carousel__meeting = $('.owl-carousel').first()
const carousel__social = $('owl-carousel').last()

owl.owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
    navContainer: '.carouselMeeting__buttons',
})
