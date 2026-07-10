window.Portfolio = window.Portfolio || {};

function finishBoot() {
  const overlay = document.getElementById('bootOverlay');
  if (!overlay) return;

  window.setTimeout(() => {
    overlay.classList.add('done');
    window.setTimeout(() => overlay.remove(), 700);
  }, 2400);
}

window.Portfolio.finishBoot = finishBoot;

