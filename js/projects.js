

const projects = [
  {
    id: 'url-guardian',
    title: 'URL Guardian',
    tagline: 'AI-assisted URL risk checker.',
    short: 'A simple tool that checks a URL and shows a readable risk explanation.',
    long: `
      URL Guardian is a small prototype that inspects website URLs
      and gives a simple risk explanation. It checks things like domain age,
      HTTPS usage, and common suspicious patterns. Built to learn how to combine
      basic rules with a clean front-end design.
    `,
    badges: ['Python', 'FastAPI', 'HTML/CSS/JS'],
    image: 'assets/img/proj-url-guardian.webp'
  },
  {
    id: 'studysync',
    title: 'StudySync',
    tagline: 'Notes organizer with keyword extraction.',
    short: 'Upload notes and quickly get important keywords for fast revision.',
    long: `
      StudySync helps students extract the main ideas from their notes.
      It pulls keywords and makes revision faster. This project taught me
      how to work with text processing and build a clean upload-and-preview flow.
    `,
    badges: ['Python', 'Flask', 'JavaScript'],
    image: 'assets/img/proj-studysync.webp'
  },
  {
    id: 'habit-track',
    title: 'Smart Habit Tracker',
    tagline: 'Track your daily habits with simple streaks.',
    short: 'A calendar-style tracker that shows streaks and habit progress.',
    long: `
      Smart Habit Tracker helps log daily habits and view streaks visually.
      It is built with a simple layout and focuses on clear presentation
      and easy habit checking. Good exercise for learning UI structure and form handling.
    `,
    badges: ['Node.js', 'MongoDB', 'Chart.js'],
    image: 'assets/img/proj-habit.webp'
  }
];

// Render project cards
function renderProjectsSimple() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card project-card';
    card.innerHTML = `
      <img class="project-thumb" src="${p.image}" alt="${p.title}" />
      <div>
        <h3>${p.title}</h3>
        <p class="text-muted">${p.tagline}</p>
        <p style="margin-top:8px">${p.short}</p>
        <div style="margin-top:10px">
          ${p.badges.map(b => `<span class="badge">${b}</span>`).join('')}
        </div>
        <div style="margin-top:12px">
          <button class="btn btn-outline more-btn" data-id="${p.id}">More Info</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach modal open
  document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const project = projects.find(pr => pr.id === id);
      if (!project) return;

      const html = `
        <h3>${project.title}</h3>
        <p class="text-muted">${project.tagline}</p>
        <p style="margin-top:10px; line-height:1.6">${project.long}</p>
        <p style="margin-top:10px"><strong>Tech Used:</strong> ${project.badges.join(', ')}</p>
      `;

      openModal(html);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectsSimple();

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();
});
