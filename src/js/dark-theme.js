import { gid } from './utils/dom';

const $body = document.body;
const saveTheme = (theme) => localStorage.setItem('theme', theme);

gid('btn-theme').addEventListener('click', () => {
  if ($body.classList.contains('dark-mode')) {
    $body.classList.remove('dark-mode');
    saveTheme('light');
    return;
  }

  $body.classList.add('dark-mode');
  saveTheme('dark');
});
