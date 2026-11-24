/**
 * APP - Point d'entrée principal de l'application
 */
import { Router } from './router.js';
import { ThemeService } from './services/theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation du thème (Sombre par défaut / Clair)
    ThemeService.init();

    // Initialisation du routeur SPA
    Router.init();

    // Gestion du menu mobile burger
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-open');
        });

        // Fermer le menu lors d'un clic sur un lien
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('nav-open');
            });
        });
    }

    console.log("🛡️ CyberVirus Lab & Git Audit System initialisé avec succès !");
});
