// The initial theme is set by the inline script in index.html before React loads.
export function getTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#121212' : '#f4f4f1');
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}
