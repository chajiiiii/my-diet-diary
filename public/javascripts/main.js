const postToggleBtns = document.querySelectorAll(".post-bar-toggle-btn");
const postBarList = document.querySelector(".post-bar-list");

postToggleBtns.forEach(function (toggleBtn) {
  toggleBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const postBarList = this.parentNode.querySelector(".post-bar-list");
    postBarList.classList.toggle("active");
  });
});

const navToggleBtn = document.querySelector(".side-nav-toggle-btn");
const navListsSide = document.querySelector(".nav-lists-side");

navToggleBtn.addEventListener("click", function (event) {
  navListsSide.classList.toggle("active");
});

function discardChanges() {
  window.location.href = "/posts";
}
