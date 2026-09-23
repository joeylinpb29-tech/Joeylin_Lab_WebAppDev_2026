const themes = [
    {bg: '#f5f5f5', text: '#333', btn: '#000000', btnText: '#fff'},
    {bg: '#333', text: '#f5f5f5', btn: '#1063e7', btnText: '#fff'},
];

let currentTheme = 0;
const btn = document.getElementById('theme-switcher');

btn.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.text;
    btn.style.backgroundColor = theme.btn;
    btn.style.color = theme.btnText;
});