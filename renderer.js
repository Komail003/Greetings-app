function closeModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}
let unlockCount = parseInt(localStorage.getItem("unlockCount")) || 0;

function showModal(userName = "Commander") {
  unlockCount++;
  localStorage.setItem("unlockCount", unlockCount);
  document.getElementById(
    "greetingText"
  ).innerText = `👋 Welcome back, ${userName}!`;
  document.getElementById(
    "unlockCount"
  ).innerText = `🔓 Unlock count: ${unlockCount}`;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
}

window.electronAPI.onShowGreeting((userName) => {
  showModal(userName);
});
