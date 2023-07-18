const toggleBtn = document.querySelector(".nav-toggle");
const uL = document.querySelector(".menu-lists");

toggleBtn.addEventListener("click", function () {
  uL.classList.toggle("active");
});

function discardChanges() {
  window.location.href = "/posts";
}
