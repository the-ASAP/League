$('.accordion__main').click((event) => {
    const $accordion = $(event.currentTarget).parent()

    if ( $($accordion).hasClass('active') ) {
        // .slideToggle('slow', function() {}) 
        $($accordion).removeClass('active')
        $($accordion).animate({
            height: '5.625rem',
        }, 200)
    }
    else {
        $($accordion).addClass('active')
        $($accordion).animate({
            height: $($accordion).get(0).scrollHeight
        }, 200, function() {
            $(this).height('auto')
        })
    }
})
 