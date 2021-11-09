ymaps.ready(() => {
    const Map = new ymaps.Map("yandexMap", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ["zoomControl"],
    });
    Map.behaviors.disable("scrollZoom");
});
