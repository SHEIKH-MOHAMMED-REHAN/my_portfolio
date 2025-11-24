/* form.js
   Simple contact form validation, autosave, and simulated submit.
   Clean, minimal, easy to explain.
*/

(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput = document.getElementById('contact-message');
  const statusEl = document.getElementById('form-status');
  const DRAFT_KEY = 'contact_draft_v1';

  // Utility: show inline error
  function showError(fieldName, message) {
    const el = form.querySelector(`.form-error[data-for="${fieldName}"]`);
    if (el) el.textContent = message;
  }

  function clearErrors() {
    form.querySelectorAll('.form-error').forEach(e => e.textContent = '');
  }

  // Simple email regex (student-level)
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Load draft if exists
  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.name) nameInput.value = data.name;
      if (data.email) emailInput.value = data.email;
      if (data.message) msgInput.value = data.message;
    } catch (e) {
      // ignore parse errors
    }
  }

  // Save draft on input
  function saveDraft() {
    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: msgInput.value.trim()
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) {
      // storage may fail in private mode - ignore
    }
  }

  // Clear draft (after successful submit)
  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {}
  }

  // Validate fields, return boolean
  function validate() {
    clearErrors();
    let ok = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (name.length < 2) {
      showError('name', 'Please enter your name (at least 2 characters).');
      ok = false;
    }

    if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      ok = false;
    }

    if (message.length < 10) {
      showError('message', 'Message is too short (min 10 characters).');
      ok = false;
    }

    return ok;
  }

  // Simulate sending the message
  function simulateSend(data) {
    // return a Promise that resolves after 900ms
    return new Promise(resolve => {
      setTimeout(() => resolve({ ok: true }), 900);
    });
  }

  // Handle form submit
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    statusEl.textContent = '';

    if (!validate()) {
      statusEl.textContent = 'Please fix errors above.';
      return;
    }

    // disable submit
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';

    // collect data
    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: msgInput.value.trim()
    };

    try {
      const res = await simulateSend(payload);
      if (res && res.ok) {
        statusEl.style.color = 'var(--accent-2)';
        statusEl.textContent = 'Message sent — thank you! I will reply soon.';
        // clear form and draft
        form.reset();
        clearDraft();
      } else {
        throw new Error('send-failed');
      }
    } catch (err) {
      statusEl.style.color = '#ffb4b4';
      statusEl.textContent = 'Unable to send message. Please try again later.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // Autosave on input (debounced)
  let saveTimer = null;
  [nameInput, emailInput, msgInput].forEach(inp => {
    inp.addEventListener('input', () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveDraft, 400);
    });
  });

  // Initialize
  loadDraft();
})();
