$('.accordion__main').click((event) => {
    const $accordion = $(event.currentTarget).parent()

    if ( $($accordion).hasClass('active') ) {
        $($accordion).removeClass('active') 
        $($accordion).animate({
            height: '5.625rem',
        }, 500)
    }
    else {
        $($accordion).addClass('active').slideToggle('slow', function() {})
    //     $($accordion).animate({
    //         height: $($accordion).get(0).scrollHeight
    //     }, 500, function() {
    //         $(this).height('auto')
    //     })
    // }
})
 