/**
 * ROUTER - Routeur Client Hash pour l'application SPA
 */
import { MalwaresView } from './modules/malwares-view.js';
import { ExpiroView } from './modules/expiro-view.js';
import { DetectionView } from './modules/detection-view.js';
import { QuizView } from './modules/quiz-view.js';
import { GlossaryView } from './modules/glossary-view.js';
import { GitTrackerModule } from './modules/git-tracker.js';

export const Router = {
    routes: {
        'home': () => Router.renderHome(),
        'malwares': () => MalwaresView.render('main-content'),
        'expiro': () => ExpiroView.render('main-content'),
        'detection': () => DetectionView.render('main-content'),
        'quiz': () => QuizView.render('main-content'),
        'glossary': () => GlossaryView.render('main-content'),
        'git-tracker': () => GitTrackerModule.init('main-content')
    },

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash.replace('#', '') || 'home';
        const handler = this.routes[hash] || this.routes['home'];

        // Mise à jour de la classe active dans la navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHash = link.getAttribute('href')?.replace('#', '');
            if (linkHash === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Dérouler le contenu
        window.scrollTo({ top: 0, behavior: 'smooth' });
        handler();
    },

    renderHome() {
        const container = document.getElementById('main-content');
        if (!container) return;

        container.innerHTML = `
            <div class="home-container">
                <!-- HERO SECTION -->
                <section class="hero-section">
                    <div class="hero-content">
                        <div class="badge-tag">🛡️ Laboratoire Pédagogique Avancé</div>
                        <h1 class="hero-title">Plateforme Éducative sur les Virus Informatiques & Audit Git</h1>
                        <p class="hero-description">
                            Maîtrisez les concepts fondamentaux de la virologie informatique à travers l'étude approfondie du virus 
                            <strong>Win32/Expiro</strong> tout en validant votre apprentissage pratique de 
                            <strong>plus de 65 commandes Git distinctes</strong> exécutées au cours de ce projet.
                        </p>
                        <div class="hero-cta-group">
                            <a href="#expiro" class="btn btn-primary btn-lg">🔬 Étude Approfondie d'Expiro</a>
                            <a href="#git-tracker" class="btn btn-outline btn-lg">⚡ Consulter le Registre Git (65+)</a>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="cyber-terminal-card">
                            <div class="terminal-bar">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                                <span class="terminal-title">cyber-threat-intelligence.sh</span>
                            </div>
                            <div class="terminal-body">
                                <p class="term-line"><span class="prompt">$</span> analyze-target --threat="Win32/Expiro"</p>
                                <p class="term-line term-warn">[!] Signature detected: File Infector PE (x86/x64)</p>
                                <p class="term-line term-danger">[ALERT] AddressOfEntryPoint hijacked -> Section .expiro</p>
                                <p class="term-line term-ok">[+] Polymorphic decryptor routine identified</p>
                                <p class="term-line"><span class="prompt">$</span> git audit --commands-used</p>
                                <p class="term-line term-ok">[OK] 70+ distinct base commands registered in local audit</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 3 GRANDS PILIERS -->
                <section class="features-section">
                    <div class="section-heading text-center">
                        <h2>Structure des Modules Pédagogiques</h2>
                        <p>Une expérience interactive complète alliant cybersécurité défensive et rigueur de versionnement logiciel.</p>
                    </div>

                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">🦠</div>
                            <h3>Encyclopédie des Menaces</h3>
                            <p>10 familles de malwares décortiquées : virus, vers, trojans, ransomwares, rootkits, spywares, bootkits, botnets. Définition, vecteur d'infection, persistance et détection.</p>
                            <a href="#malwares" class="card-link">Explorer l'encyclopédie &rarr;</a>
                        </div>

                        <div class="feature-card highlight-card">
                            <div class="feature-icon">🔬</div>
                            <h3>Module Expert Win32/Expiro</h3>
                            <p>Étude monographique complète sur Expiro : architecture binaire, infection des exécutables PE Windows, simulateur visuel du détournement d'EntryPoint et limites de désinfection.</p>
                            <a href="#expiro" class="card-link">Accéder à l'étude Expiro &rarr;</a>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">⚡</div>
                            <h3>Système d'Audit Git (65+)</h3>
                            <p>Registre pédagogique en direct recensant toutes les commandes de base distinctes réellement exécutées avec cases à cocher de maîtrise et calcul dynamique de votre progression.</p>
                            <a href="#git-tracker" class="card-link">Ouvrir le registre Git &rarr;</a>
                        </div>
                    </div>
                </section>

                <!-- SECTION STATS & BADGES -->
                <section class="banner-summary">
                    <div class="banner-stat">
                        <span class="num">10+</span>
                        <span class="txt">Familles de Malwares analysées</span>
                    </div>
                    <div class="banner-stat">
                        <span class="num">70+</span>
                        <span class="txt">Commandes Git Distinctes certifiées</span>
                    </div>
                    <div class="banner-stat">
                        <span class="num">100%</span>
                        <span class="txt">Vanilla Front-End (Zéro dépendance)</span>
                    </div>
                    <div class="banner-stat">
                        <span class="num">Safe</span>
                        <span class="txt">Simulations inoffensives en Sandbox</span>
                    </div>
                </section>
            </div>
        `;
    }
};
