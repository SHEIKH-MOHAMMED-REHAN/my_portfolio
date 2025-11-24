
function openModal(content) {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const body = modal.querySelector('.modal-body');
  body.innerHTML = content;

  modal.setAttribute('aria-hidden', 'false');

  // Focus the close button for accessibility
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  modal.setAttribute('aria-hidden', 'true');
  modal.querySelector('.modal-body').innerHTML = "";
}

// Close on overlay click or close button
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (!modal) return;
  if (modal.getAttribute('aria-hidden') === 'true') return;

  if (e.target.classList.contains('modal-overlay') ||
      e.target.classList.contains('modal-close')) {
    closeModal();
  }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
