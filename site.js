(() => {
  const languageButton = document.getElementById('language');
  const menuButton = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const isPrivacy = location.pathname.endsWith('privacy.html');
  let language = new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en';
  function closeMenu(returnFocus = false) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  }
  function renderLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset[language]; });
    document.querySelectorAll('[data-alt-en]').forEach(el => {
      el.alt = language === 'zh' ? el.dataset.altZh : el.dataset.altEn;
    });
    languageButton.textContent = language === 'zh' ? 'EN' : '中文';
    languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    menuButton.setAttribute('aria-label', language === 'zh' ? '导航菜单' : 'Navigation menu');
    document.title = isPrivacy
      ? (language === 'zh' ? '网站隐私说明 — Trifun' : 'Website privacy — Trifun')
      : (language === 'zh' ? 'Trifun — 创作工具与互动故事' : 'Trifun — Creative tools & interactive stories');
    document.querySelectorAll('a[href^="index.html"],a[href^="privacy.html"]').forEach(a => {
      const url = new URL(a.href);
      if (language === 'zh') url.searchParams.set('lang', 'zh');
      else url.searchParams.delete('lang');
      a.setAttribute('href', url.pathname.split('/').pop() + url.search + url.hash);
    });
  }
  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    const url = new URL(location.href);
    if (language === 'zh') url.searchParams.set('lang', 'zh');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    renderLanguage();
  });
  menuButton.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  renderLanguage();
})();
