window.Portfolio = window.Portfolio || {};

async function loadSections(container, sections) {
  const requests = sections.map(async ({ file }) => {
    const response = await fetch(`sections/${file}.html`);
    if (!response.ok) {
      throw new Error(`Could not load sections/${file}.html (${response.status})`);
    }
    return response.text();
  });

  const markup = await Promise.all(requests);
  container.innerHTML = markup.join('\n');
}

window.Portfolio.loadSections = loadSections;

