document.addEventListener('DOMContentLoaded', async () => {
  const portfolio = window.Portfolio;
  const app = document.getElementById('app');

  try {
    await portfolio.loadSections(app, portfolio.sections);
    portfolio.initNavigation(portfolio.sections.map(({ id }) => id));
    portfolio.initPanels();
    portfolio.initCarousels(['edu', 'proj', 'cert', 'skill', 'extra'], portfolio.autoplay);
    portfolio.initNameCarousel();
  } catch (error) {
    console.error(error);
    app.innerHTML = `
      <div class="load-error">
        <strong>Portfolio sections could not be loaded.</strong><br>
        Open this folder with a static server such as VS Code Live Server.
      </div>`;
  } finally {
    portfolio.finishBoot();
  }
});

