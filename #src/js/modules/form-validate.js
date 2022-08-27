
jQuery.validator.addMethod("isPhone", function (value, element) {
  return this.optional(element) || /^([0-9- ()+]){17,20}/.test(value);
});
jQuery.validator.addMethod("isName", function (value, element) {
  return this.optional(element) || value.length > 0;
});

jQuery.validator.addMethod("isEmail", function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
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

export const onSubmit = () => {
  $('[data-form]').on('submit', (e) => {
    e.preventDefault()

    const validator = formValidate($('[data-form]'),
    {
      name: {
        required: true,
        isName: true,
      },
      phone: {
        required: true,
        isPhone: true,
      },
      email: {
        required: true,
        isEmail: true,
      },
      isAgree: { required: true },
    })

    if ($('[data-form]').valid()) {
      try {
        const formData = new FormData()
        $(`${formSel} [data-input]`).each((_, el) => formData.append($(el).attr("name"), $(el).val()))
    
        let response = await fetch('', { 
          method: 'POST', 
          body: formData,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
    
        const result = await response.json();
        // if (result) {
        //   validator.resetForm()
        //   $("[data-form]] [data-input]").val('');
        // }
      } catch(err) {}
    }
  })
}

