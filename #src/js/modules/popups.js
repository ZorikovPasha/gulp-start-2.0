export default function () {
  const onOpen = (selector) => {
    $(selector).addClass("active")
    $("body").css("padding-right", window.innerWidth - document.body.clientWidth)
    $("body").addClass("lock");
  }

  const onClose = (selector) => {
    $("[data-filename]").text("")
    $(selector).removeClass("active")
    $("body").css("padding-right", 0)
    $("body").removeClass("lock");
  }

  const handleOutsidePopupClick = (popupSel, bodySel, e) => {
    const path = e.originalEvent.path || (e.originalEvent.composedPath && e.originalEvent.composedPath())
    const popupBody = document.querySelector(bodySel)

    if (!path.includes(popupBody)) {
      onClose(popupSel)
    }
  }

  $("[data-popup-open]").on("click", onOpen.bind(null, "[data-popup]"))

  $("[data-popup]").on("click", handleOutsidePopupClick.bind(null, "[data-popup]", "[data-popup-body]"))

  $("[data-popup-close]").on("click", onClose.bind(null, "[data-popup]"))
}