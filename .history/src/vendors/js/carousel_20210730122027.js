const carousel__meeting = $('.owl-carousel')
const carousel__social = $('owl-carousel')

console.log(carousel__meeting)
console.log(carousel__social)

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
