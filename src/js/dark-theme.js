import { gid } from './utils/dom';

const $body = document.body;
const ls = localStorage;

gid('btn-theme').addEventListener('click', () => {
  if ($body.classList.contains('dark-mode')) {
    $body.classList.remove('dark-mode');
    ls.setItem('theme', 'light');
    return;
  }

  $body.classList.add('dark-mode');
  ls.setItem('theme', 'dark');
});
