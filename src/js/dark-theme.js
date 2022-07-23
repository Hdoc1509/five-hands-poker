import { gid, qsa } from './utils/dom.js';

const $btnTheme = gid('btn-theme');
const $darkElements = qsa('[data-dark]');
const ls = localStorage;
const savedTheme = ls.getItem('theme');

const darkTheme = () => {
  $darkElements.forEach(($el) => $el.classList.add('dark-mode'));
  ls.setItem('theme', 'dark');
};

const lightTheme = () => {
  $darkElements.forEach(($el) => $el.classList.remove('dark-mode'));
  ls.setItem('theme', 'light');
};

if (savedTheme === 'dark') darkTheme();

$btnTheme.addEventListener('click', () => {
  $btnTheme.classList.contains('dark-mode') ? lightTheme() : darkTheme();
});
