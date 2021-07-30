$('.accordion__main').click((event) => {
    const $accordion = $(event.currentTarget).parent()

    if ( $(event.currentTarget).hasClass('active') ) {
        $(event.currentTarget).removeClass('active') 
        $(event.currentTarget).animate({
            height: '5.625rem',
        }, 500)
    }
    else {
        $(event.currentTarget).addClass('active')
        $(event.currentTarget).animate({
            height: $(event.currentTarget).get(0).scrollHeight
        }, 500, function() {
            $(this).height('auto')
        })
    }
})
 