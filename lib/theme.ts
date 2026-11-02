export const THEME_STORAGE_KEY = 'theme';

/**
 * Runs before paint (inlined in <head> by app/layout.tsx) so a saved light
 * preference never flashes dark first. Dark stays the default.
 * `?theme=light` or `?theme=dark` in the URL sets and saves the theme.
 */
export const themeInitScript = `try{var q=new URLSearchParams(location.search).get('theme');if(q==='light'||q==='dark')localStorage.setItem('${THEME_STORAGE_KEY}',q);if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')document.documentElement.classList.add('light')}catch(e){}`;
