(function () {
    const root = document.documentElement;

    function getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch {}
    }

    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function getActiveTheme() {
        const stored = getStoredTheme();
        return stored || getSystemTheme();
    }

    function updateToggleStatus(isDark) {
        const button = document.getElementById('theme-toggle');
        if (!button) return;
        button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);
        updateToggleStatus(isDark);
    }

    function setupThemeToggle() {
        const button = document.getElementById('theme-toggle');
        if (!button) return;

        updateToggleStatus(root.classList.contains('dark'));

        button.onclick = () => {
            const isDark = root.classList.toggle('dark');
            const theme = isDark ? 'dark' : 'light';
            storeTheme(theme);
            updateToggleStatus(isDark);
        };
    }

    // Set initial theme
    applyTheme(getActiveTheme());

    // Attach toggle listener on first load
    document.addEventListener('astro:page-load', setupThemeToggle);

    // Re-apply theme after navigation
    document.addEventListener('astro:after-swap', () => {
        applyTheme(getActiveTheme());
        setupThemeToggle();
    });
})();
