((d, $body, ls) => {
  const savedTheme = ls.getItem('theme');

  const darkTheme = () => {
    $body.classList.add('dark-mode');
    ls.setItem('theme', 'dark');
  };

  const lightTheme = () => {
    $body.classList.remove('dark-mode');
    ls.setItem('theme', 'light');
  };

  if (savedTheme === 'dark') darkTheme();

  d.getElementById('btn-theme').addEventListener('click', () => {
    $body.classList.contains('dark-mode') ? lightTheme() : darkTheme();
  });
})(document, document.body, localStorage);
