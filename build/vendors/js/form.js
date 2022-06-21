$("#index__form__phone").mask("+7(999) 999-99-99");

const showSuccess = () => {
  $("#index-modal__form").addClass("hide");
  $("#success").removeClass("hide");
};

$("#index-modal__form").validate({
  errorElement: "span",
  rules: {
    userName: {
      required: true,
    },

    companyName: {
      required: true,
    },

    email: {
      required: true,
      email: true,
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
    },

    companyName: {
      required: "Обязательно к заполнению",
    },

    email: {
      required: "Обязательно к заполнению",
      email: "Пожалуйста, введите корректный email адрес ",
    },

    phone: {
      required: "Обязательно к заполнению",
    },

    processing: false,
    subscription: false,
  },

  submitHandler: function (form) {
    showSuccess();
    console.log(form);
  },
});
