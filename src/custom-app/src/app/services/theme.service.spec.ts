import { applyThemeAttribute } from './theme.service';

describe('applyThemeAttribute', () => {
  it('sets data-theme="dark" for the dark theme', () => {
    const html = document.createElement('html');
    applyThemeAttribute(html, true);
    expect(html.getAttribute('data-theme')).toBe('dark');
  });

  it('sets data-theme="light" for the light theme instead of removing the attribute', () => {
    const html = document.createElement('html');
    html.setAttribute('data-theme', 'dark');
    applyThemeAttribute(html, false);
    expect(html.getAttribute('data-theme')).toBe('light');
  });
});
