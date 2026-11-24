/**
 * ThemeService - Bascule du thème sombre (Cyber Dark) / clair (Clean Light)
 */
import { StorageManager } from './storage.js';

export const ThemeService = {
    init() {
        const savedTheme = StorageManager.getTheme();
        this.applyTheme(savedTheme);

        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        StorageManager.setTheme(newTheme);
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
};
