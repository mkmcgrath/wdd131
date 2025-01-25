const themeSelector = document.getElementById('themeSelector');
const logo = document.getElementById('logo');

function changeTheme() {
  if (themeSelector.value === 'dark') {
    document.body.classList.add('dark');
    logo.src = 'byui-logo_white.webp'; // Replace with the actual path to your white logo
  } else {
    document.body.classList.remove('dark');
    logo.src = 'byui-logo_blue.webp';
  }
}

themeSelector.addEventListener('change', changeTheme);
