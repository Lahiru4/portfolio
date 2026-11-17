const componentSlots = [...document.querySelectorAll('[data-component]')];

async function loadPageComponents() {
  await Promise.all(componentSlots.map(async (slot) => {
    const name = slot.dataset.component;
    const response = await fetch(`components/${name}.html`);

    if (!response.ok) {
      throw new Error(`Could not load component "${name}": ${response.status}`);
    }

    slot.outerHTML = await response.text();
  }));

  const appScript = document.createElement('script');
  appScript.src = 'js/main.js';
  document.body.appendChild(appScript);
}

loadPageComponents().catch((error) => {
  console.error('Portfolio components failed to load:', error);
});
