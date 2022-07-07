if (document.querySelector("#index-modal__form")) {
  $("#index__form__phone").mask("+7(999) 999-99-99");
}

const showSuccess = () => {
  $("#index-modal__form").addClass("hide");
  $("#success").removeClass("hide");
};

$("#index-modal__form").validate({
  errorElement: "span",
  rules: {
    userName: {
      required: true,
      pattern: "^[а-яА-Я_]*$",
    },

    companyName: {
      required: true,
    },

    email: {
      required: true,
      email: true,
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    phone: {
      required: true,
    },

    processing: {
      required: true,
    },

    subscription: {
      required: true,
    },
  },

  messages: {
    userName: {
      required: "Обязательно к заполнению",
      pattern: "Некорректное имя",
    },

    companyName: {
      required: "Обязательно к заполнению",
    },

    email: {
      required: "Обязательно к заполнению",
      email: "Пожалуйста, введите корректный email адрес ",
      pattern: "Пожалуйста, введите корректный email адрес ",
    },

    phone: {
      required: "Обязательно к заполнению",
    },

    processing: false,
    subscription: false,
  },

  submitHandler: function (form) {
    const data = {};
    const inputs = form.querySelectorAll(".index__form__input");
    [...inputs].forEach((el, i) => {
      data[el.name] = el.value;
    });

    $.ajax({
      url: "http://liga.asap-lp.ru/analytics/",
      type: "post",
      data: data,
    }).done(function (res) {
      // console.log(res);
    });

    showSuccess();
  },
});

$("#feedback__form").validate({
  rules: {
    email: {
      required: true,
      email: true,
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
  },

  messages: {
    email: {
      required: "Обязательно к заполнению",
      email: "Некорректный email адрес ",
      pattern: "Некорректный email адрес ",
    },
    processing: false,
    subscription: false,
  },

  submitHandler: function (form) {
    const data = {};
    const inputs = form.querySelectorAll(".feedback__form__input");
    [...inputs].forEach((el, i) => {
      data[el.name] = el.value;

      console.log(el.value);
    });

    $.ajax({
      url: "http://liga.asap-lp.ru/analytics/",
      type: "post",
      data: data,
    }).done(function (res) {
      // console.log(res);
    });

    document.querySelector(".success-modal").classList.add("active");
    const inputEmail = document.querySelector("#feedback__form__email");
    stopScroll("body");
    inputEmail.value = "";
  },
});
