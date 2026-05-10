export function ThemeScript() {
  // Default = dark. Light mode is opt-in via the toggle (stored as 'light').
  const code = `(function(){try{var s=localStorage.getItem('theme');document.documentElement.classList.toggle('light',s==='light');}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
