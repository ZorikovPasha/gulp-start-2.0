
jQuery.validator.addMethod(
  "isPhone",
  function (value, element) {
    return this.optional(element) || /^[0-9-()+]{11,30}/.test(value);
  },
  "Please, enter the correct phone number"
);

jQuery.validator.addMethod("isName", function (value, element) {
  return this.optional(element) || /^[А-ЯЁа-яёA-Za-z]{1,40}$/.test(value);
});

export const formValidate = (selector) => {
  $(selector).validate({
    rules: {
      name: {
        isName: true,
      },
      phone: {
        required: true,
        isPhone: true,
      },
    },
    messages: {
      name: {
        required: "Enter your name",
        isName: "Please, enter the correct name",
      },
      phone: {
        required: "Enter your phone number",
        isPhone: "Please, enter the correct phone number",
      },
      isAgree: {
        required: "Please, fill this field",
      },
      messenger: {
        required: "Please, fill this field",
      }
    },
  });
}


export const submitForm = () => {
  $('[data-submit]').on('click', () => {
    formValidate($('[data-form]'))
    
    if ( $('[data-form]').valid() ) {
    } else {}
  })
}