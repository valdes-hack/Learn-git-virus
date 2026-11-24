/**
 * GLOSSARY VIEW MODULE - Glossaire Cybersécurité & Git
 */
import { GLOSSARY_DATA } from '../data/glossary-data.js';

export const GlossaryView = {
    searchQuery: '',
    categoryFilter: 'Toutes',

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const filtered = GLOSSARY_DATA.filter(item => {
            if (this.categoryFilter !== 'Toutes' && item.category !== this.categoryFilter) return false;
            if (this.searchQuery.trim() !== '') {
                const q = this.searchQuery.toLowerCase();
                return item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
            }
            return true;
        });

        container.innerHTML = `
            <div class="glossary-view-container">
                <div class="view-hero">
                    <div class="badge-tag">📚 Répertoire Terminologique</div>
                    <h2>Glossaire Technique : Cybersécurité, Virologie & Git</h2>
                    <p class="hero-desc">
                        Définitions normalisées des concepts essentiels rencontrés lors de l'étude des malwares et de l'ingénierie logicielle Git.
                    </p>
                </div>

                <div class="glossary-search-panel">
                    <input type="text" id="glossary-search-input" placeholder="Rechercher un terme (ex: OEP, C2, SSDT, Reflog)..." value="${this.searchQuery}">
                    <div class="category-pills">
                        <button class="pill ${this.categoryFilter === 'Toutes' ? 'active' : ''}" data-cat="Toutes">Tous les termes</button>
                        <button class="pill ${this.categoryFilter === 'Cybersécurité' ? 'active' : ''}" data-cat="Cybersécurité">Cybersécurité</button>
                        <button class="pill ${this.categoryFilter === 'Git' ? 'active' : ''}" data-cat="Git">Git & Versioning</button>
                    </div>
                </div>

                <div class="glossary-grid">
                    ${filtered.map(item => `
                        <div class="glossary-card">
                            <div class="card-badge">${item.category}</div>
                            <h3 class="term-title">${item.term}</h3>
                            <p class="term-def">${item.definition}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.bindEvents(containerId);
    },

    bindEvents(containerId) {
        const input = document.getElementById('glossary-search-input');
        if (input) {
            input.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render(containerId);
                const newInput = document.getElementById('glossary-search-input');
                newInput.focus();
                newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
            });
        }

        const pills = document.querySelectorAll('.glossary-search-panel .pill');
        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                this.categoryFilter = e.target.getAttribute('data-cat');
                this.render(containerId);
            });
        });
    }
};
