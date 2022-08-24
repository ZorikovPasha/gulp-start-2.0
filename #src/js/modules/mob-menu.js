export default function() {
  $("[data-open-menu]").on("click", () => {
    $("[data-menu]").addClass("active")
    setTimeout(() => $("[data-menu-body]").addClass("active"), 200)
    $("body").addClass("lock");
  })

  $("[data-menu-close], [data-menu-link]").on("click", () => {
    $("[data-menu]").removeClass("active")
    $("[data-menu-body]").removeClass("active")
    $("body").removeClass("lock");
  })
}