function createHint(maps, address, object, coorArr, link) {
    let myPlacemark = new maps.Placemark(
      [coorArr[0], coorArr[1]],
      {
        address,
        object,
        link,
        balloonContentHeader: object,
        balloonContentBody: address,
        balloonContentFooter: link
          ? `<a href=${link} class="yandexMap__hint">` + 'Перейти' + '</a>'
          : ''
      },
      {
        // hintLayout: HintLayout,
        iconColor: '#e23d3d'
      }
    );
  
    return myPlacemark;
  }

  
ymaps.ready(() => {
    const elementExistence = $('#yandexMap').length > 0
    if(elementExistence) {
      const Map = new ymaps.Map("yandexMap", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ["zoomControl"],
      });
      Map.behaviors.disable("scrollZoom");

      Map.geoObjects.add(
          createHint(
              ymaps,
            'Москва',
            'Тут будет туса!',
            [55.76, 37.64]
          )
        );
    }
});
