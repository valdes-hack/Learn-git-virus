/**
 * EXPIRO VIEW MODULE - Étude Monographique & Technique Approfondie de Win32/Expiro
 */
import { EXPIRO_DATA } from '../data/expiro-data.js';
import { PeSimulator } from '../services/pe-simulator.js';

export const ExpiroView = {
    activeTab: 'overview', // 'overview' | 'simulator' | 'variants' | 'disinfection'

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="expiro-view-container">
                <!-- HERO EXPIRO -->
                <div class="expiro-hero">
                    <div class="expiro-badge">MODULE SPÉCIALISÉ D'EXPERTISE TECHNIQUE</div>
                    <h2>Win32/Expiro — Anatomie d'un Infecteur PE Moderne</h2>
                    <p class="expiro-lead">
                        Étude complète du virus parasite <strong>Win32/Expiro</strong> : détournement d'EntryPoint (OEP), polymorphisme, corruption d'exécutables Windows, persistance et limites critiques de désinfection.
                    </p>

                    <div class="expiro-tags-bar">
                        <span class="expiro-tag"><strong>Cible :</strong> Binaires Windows x86 & x64</span>
                        <span class="expiro-tag"><strong>Type :</strong> Section Injector & Appender</span>
                        <span class="expiro-tag"><strong>Danger :</strong> Destruction potentielle du système d'exploitation</span>
                    </div>
                </div>

                <!-- TABS DE NAVIGATION INTERNE -->
                <div class="expiro-tabs-nav">
                    <button class="expiro-tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
                        📑 Vue d'Ensemble & Historique
                    </button>
                    <button class="expiro-tab-btn ${this.activeTab === 'simulator' ? 'active' : ''}" data-tab="simulator">
                        🔬 Simulateur Visuel d'Infection PE
                    </button>
                    <button class="expiro-tab-btn ${this.activeTab === 'variants' ? 'active' : ''}" data-tab="variants">
                        🧬 Variantes & Fonctionnement Interne
                    </button>
                    <button class="expiro-tab-btn ${this.activeTab === 'disinfection' ? 'active' : ''}" data-tab="disinfection">
                        ⚠️ Limites de Désinfection & Détection
                    </button>
                </div>

                <!-- CONTENU DES ONGLETS -->
                <div class="expiro-tab-content">
                    ${this.renderTabContent()}
                </div>
            </div>
        `;

        this.bindEvents(containerId);

        if (this.activeTab === 'simulator') {
            PeSimulator.render('pe-simulator-mount');
        }
    },

    renderTabContent() {
        if (this.activeTab === 'overview') {
            return `
                <div class="tab-pane">
                    <div class="overview-grid">
                        <div class="overview-card">
                            <h3>Fiche d'Identité Technique</h3>
                            <ul class="data-list">
                                <li><strong>Nom officiel :</strong> ${EXPIRO_DATA.overview.name}</li>
                                <li><strong>Classification :</strong> ${EXPIRO_DATA.overview.family}</li>
                                <li><strong>Architectures cibles :</strong> ${EXPIRO_DATA.overview.targets}</li>
                                <li><strong>Découverte :</strong> ${EXPIRO_DATA.overview.discoveryYear}</li>
                                <li><strong>Charge utile principale :</strong> ${EXPIRO_DATA.overview.primaryPayload}</li>
                                <li><strong>Niveau de criticité :</strong> <span class="badge badge-danger">${EXPIRO_DATA.overview.threatLevel}</span></li>
                            </ul>
                        </div>

                        <div class="overview-card">
                            <h3>Impacts Systèmes Spécifiques sur Windows</h3>
                            <div class="impacts-list">
                                ${EXPIRO_DATA.systemImpact.map(imp => `
                                    <div class="impact-item">
                                        <h4>${imp.category}</h4>
                                        <p>${imp.detail}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- TIMELINE HISTORIQUE -->
                    <div class="timeline-container">
                        <h3>Chronologie des Mutations du Virus Expiro</h3>
                        <div class="timeline">
                            ${EXPIRO_DATA.timeline.map(item => `
                                <div class="timeline-item">
                                    <div class="timeline-year">${item.year}</div>
                                    <div class="timeline-content">
                                        <h4>${item.title}</h4>
                                        <p>${item.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else if (this.activeTab === 'simulator') {
            return `
                <div class="tab-pane">
                    <div id="pe-simulator-mount"></div>
                </div>
            `;
        } else if (this.activeTab === 'variants') {
            return `
                <div class="tab-pane">
                    <h3>Les Variantes Documentées d'Expiro</h3>
                    <div class="variants-grid">
                        ${EXPIRO_DATA.variants.map(v => `
                            <div class="variant-card">
                                <div class="variant-badge">${v.architecture}</div>
                                <h4>Variante ${v.name}</h4>
                                <p>${v.features}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="mechanics-deep-dive">
                        <h3>Mécanisme d'Infection Pas-à-Pas des Binaires Exécutables</h3>
                        <div class="steps-flowchart">
                            ${EXPIRO_DATA.peInfectionMechanics.steps.map(s => `
                                <div class="step-card">
                                    <div class="step-num">${s.stepNumber}</div>
                                    <div class="step-details">
                                        <h4>${s.title}</h4>
                                        <p>${s.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="tab-pane">
                    <div class="danger-banner">
                        <h3>${EXPIRO_DATA.disinfectionAndLimits.title}</h3>
                        <p>${EXPIRO_DATA.disinfectionAndLimits.description}</p>
                    </div>

                    <div class="disinfection-points-grid">
                        ${EXPIRO_DATA.disinfectionAndLimits.points.map(pt => `
                            <div class="disinfect-card">
                                <h4>🛑 ${pt.title}</h4>
                                <p>${pt.content}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="yara-section">
                        <h3>Signature de Détection YARA pour Expiro</h3>
                        <p>Règle d'identification basée sur l'en-tête PE, le stub polymorphe et les permissions de section W+X :</p>
                        <pre class="code-block"><code>${EXPIRO_DATA.detectionMethods.yaraRule}</code></pre>
                    </div>

                    <div class="heuristics-list">
                        <h4>Indicateurs de Compromission Heuristiques (IoC)</h4>
                        <ul>
                            ${EXPIRO_DATA.detectionMethods.heuristics.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    },

    bindEvents(containerId) {
        const tabs = document.querySelectorAll('.expiro-tab-btn');
        tabs.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.activeTab = e.currentTarget.getAttribute('data-tab');
                this.render(containerId);
            });
        });
    }
};
