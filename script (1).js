
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "bestie" && password === "cutie123") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("intro-screen").style.display = "flex";
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}

function startSite() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}
