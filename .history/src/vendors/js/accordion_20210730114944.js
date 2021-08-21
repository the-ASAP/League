$('.accordion__main').click((event) => {
    const $accordion = $(event.currentTarget).parent()

    if ( $($accordion).hasClass('active') ) {
        $($accordion).removeClass('active').slideToggle('slow', function() {}) 
        // $($accordion).animate({
        //     height: '5.625rem',
        // }, 500)
    }
    else {
        $($accordion).addClass('active')
        // $($accordion).animate({
        //     height: $($accordion).get(0).scrollHeight
        // }, 500, function() {
        //     $(this).height('auto')
        // })
    }
})
 