$('.accordion').click((event) => {
    const $accordionInfo = $(event.currentTarget)

    if ( $(event.currentTarget).hasClass('active') ) {
        $(event.currentTarget).removeClass('active') 
        $accordionInfo.animate({
            height: 0,
        }, 500)
    }
    else {
        $(event.currentTarget).addClass('active')
        $accordionInfo.animate({
            height: $accordionInfo.get(0).scrollHeight
        }, 500, function() {
            $(this).height('auto')
        })
    }
})
 