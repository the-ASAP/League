const carousel__meeting = $('.owl-carousel').first()
const carousel__social = $('owl-carousel').last()

carousel__meeting.owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
    navContainer: '.carouselMeeting__buttons',
})

carousel__social.owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
    // navContainer: '.carouselMeeting__buttons',
})
