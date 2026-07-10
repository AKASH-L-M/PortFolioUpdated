window.Portfolio = window.Portfolio || {};

function initPanels() {
  let activePanel = null;
  let activeButton = null;

  const closePanel = () => {
    if (!activePanel) return;

    activePanel.classList.remove('open');
    activePanel.setAttribute('aria-hidden', 'true');
    activeButton?.classList.remove('open');
    activeButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('modal-open');

    const buttonToFocus = activeButton;
    activePanel = null;
    activeButton = null;
    buttonToFocus?.focus();
  };

  document.querySelectorAll('.panel').forEach((panel) => {
    const trigger = document.querySelector(`[data-panel-target="${panel.id}"]`);
    const title = trigger?.textContent.replace('▶', '').trim() || 'portfolio.output';
    const modalWindow = panel.querySelector('.panel-pad');

    panel.classList.add('terminal-modal');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-labelledby', `${panel.id}-title`);

    modalWindow?.classList.add('terminal-window');
    modalWindow?.insertAdjacentHTML('afterbegin', `
      <header class="terminal-titlebar">
        <div class="terminal-lights" aria-hidden="true">
          <span class="terminal-light terminal-light-red"></span>
          <span class="terminal-light terminal-light-yellow"></span>
          <span class="terminal-light terminal-light-green"></span>
        </div>
        <div class="terminal-title" id="${panel.id}-title">
          <span class="terminal-prompt">akash@portfolio:~$</span> ${title}
        </div>
        <button class="terminal-close" type="button" data-modal-close aria-label="Close terminal">×</button>
      </header>
    `);
  });

  document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-modal-close]');
    if (closeButton) {
      closePanel();
      return;
    }

    if (activePanel && event.target === activePanel) {
      closePanel();
      return;
    }

    const button = event.target.closest('[data-panel-target]');
    if (!button) return;

    const panel = document.getElementById(button.dataset.panelTarget);
    if (!panel) return;

    if (panel === activePanel) {
      closePanel();
      return;
    }

    closePanel();
    activePanel = panel;
    activeButton = button;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    button.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open');
    panel.querySelector('[data-modal-close]')?.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activePanel) closePanel();
  });
}

window.Portfolio.initPanels = initPanels;

