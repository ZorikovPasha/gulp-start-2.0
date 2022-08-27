import mobile from "./modules/mob-menu"
import sliders from "./modules/sliders"
import popups from "./modules/popups"

$(function() {
  sliders()
  mobile()
  popups()

  new WOW().init();

  $('[data-phone]').inputmask({ mask: "+7(999) 999-99-99" })
})