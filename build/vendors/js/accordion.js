function accordion(btn, content) {
    $(btn).on("click", function () {
        $(this).toggleClass("active").parent().find(content).slideToggle();
    });
}

$().ready(() => {
    accordion(".accordion__main", ".accordion__information");
});
