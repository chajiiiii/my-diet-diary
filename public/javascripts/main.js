const toggleBtns = document.querySelectorAll(".post-bar-toggle-btn");
const postBarList = document.querySelector(".post-bar-list");

toggleBtns.forEach(function (toggleBtn) {
  toggleBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const postBarList = this.parentNode.querySelector(".post-bar-list");
    postBarList.classList.toggle("active");
  });
});

function discardChanges() {
  window.location.href = "/posts";
}
