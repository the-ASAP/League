// $(".tab-trigger").click(function () {
//   var id = $(this).attr("data-tab"),
//     content = $('.tab-content[data-tab="' + id + '"]');

//   $(".tab-trigger.active").removeClass("active"); // 1
//   $(this).addClass("active"); // 2

//   $(".tab-content.active").removeClass("active"); // 3
//   content.addClass("active"); // 4
// });

// function toggleTabs(tabTrigger, tabContent) {
//   $(tabTrigger).click(function () {
//     var id = $(this).attr("data-tab"),
//       content = $(`${tabContent}[data-tab=${id}]`);

//     $(`${tabTrigger}.active`).removeClass("active");
//     $(this).addClass("active");

//     $(`${tabContent}.active`).removeClass("active");
//     content.addClass("active");
//   });
// }

// toggleTabs(".tab-trigger", ".tab-content");
