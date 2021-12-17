export function createHint(maps, address, object, coorArr, link) {
    let myPlacemark = new maps.Placemark(
        [coorArr[0], coorArr[1]],
        {
            address,
            object,
            link,
            balloonContentHeader: object,
            balloonContentBody: address,
            balloonContentFooter: link
                ? `<a href=${link} class="yandexMap__hint">` + "Перейти" + "</a>"
                : "",
        },
        {
            // hintLayout: HintLayout,
            iconColor: "#39ad46",
        }
    );

    return myPlacemark;
}

ymaps.ready(async () => {
    const Map = new ymaps.Map("yandexMap", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ["zoomControl"],
    });
    Map.behaviors.disable("scrollZoom");
    // const data = await fetch('').then((res) => {
    // ...
    // В зависимости от результата, мы выводим новые метки на карте
    // myMap.geoObjects.add(
    //      createHint(ymaps, address, object, [latitude, longitude], link)
    //   );
    // })
});
