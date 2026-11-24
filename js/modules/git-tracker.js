/**
 * GIT TRACKER MODULE - Registre Pédagogique & Audit des Commandes Git
 * Gère le tableau de bord dynamique, les cases à cocher, les filtres, la recherche et les fiches détaillées.
 */
import { GIT_COMMANDS_DATA, GIT_CATEGORIES } from '../data/git-registry.js';
import { StorageManager } from '../services/storage.js';

export const GitTrackerModule = {
    filters: {
        category: 'Toutes',
        status: 'all', // 'all' | 'mastered' | 'unmastered'
        searchQuery: '',
        sortBy: 'chronological' // 'chronological' | 'alphabetical'
    },

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.render();
    },

    render() {
        const masteredList = StorageManager.getMasteredCommands();
        const total = GIT_COMMANDS_DATA.length;
        const masteredCount = GIT_COMMANDS_DATA.filter(cmd => masteredList.includes(cmd.id)).length;
        const remainingCount = total - masteredCount;
        const percentage = total > 0 ? ((masteredCount / total) * 100).toFixed(1) : 0;

        // Tri et filtrage des commandes
        let filteredCommands = GIT_COMMANDS_DATA.filter(cmd => {
            const isMastered = masteredList.includes(cmd.id);
            if (this.filters.category !== 'Toutes' && cmd.category !== this.filters.category) {
                return false;
            }
            if (this.filters.status === 'mastered' && !isMastered) return false;
            if (this.filters.status === 'unmastered' && isMastered) return false;
            if (this.filters.searchQuery.trim() !== '') {
                const q = this.filters.searchQuery.toLowerCase();
                const matchName = cmd.name.toLowerCase().includes(q);
                const matchDesc = cmd.description.toLowerCase().includes(q);
                const matchContext = cmd.projectContext.toLowerCase().includes(q);
                if (!matchName && !matchDesc && !matchContext) return false;
            }
            return true;
        });

        if (this.filters.sortBy === 'alphabetical') {
            filteredCommands.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            filteredCommands.sort((a, b) => new Date(a.firstUsed) - new Date(b.firstUsed));
        }

        const lastUsedCmd = [...GIT_COMMANDS_DATA].sort((a, b) => new Date(b.firstUsed) - new Date(a.firstUsed))[0];

        this.container.innerHTML = `
            <div class="git-tracker-container">
                <!-- EN-TÊTE PÉDAGOGIQUE -->
                <div class="tracker-hero">
                    <div class="badge-tag">⚡ Registre Certifié d'Audit Git</div>
                    <h2>Commandes Git Réellement Utilisées & Apprentissage</h2>
                    <p class="hero-desc">
                        Ce registre trace exclusivement les <strong>commandes Git de base distinctes</strong> exécutées pendant le développement de cette plateforme. 
                        Cochez chaque commande pour valider votre assimilation personnelle.
                    </p>
                    <div class="rule-callout">
                        <span class="callout-icon">ℹ️</span>
                        <span><strong>Règle stricte d'audit :</strong> Une seule commande de base distincte par entrée. <code>git add .</code> et <code>git add -A</code> ne forment qu'une seule et même commande de base (<code>git add</code>).</span>
                    </div>
                </div>

                <!-- TABLEAU DE BORD STATISTIQUE DYNAMIQUE -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-value" id="stat-total">${total}</div>
                        <div class="stat-label">Commandes Distinctes Utilisées</div>
                    </div>
                    <div class="stat-card stat-success">
                        <div class="stat-icon">✅</div>
                        <div class="stat-value" id="stat-mastered">${masteredCount}</div>
                        <div class="stat-label">Commandes Maîtrisées</div>
                    </div>
                    <div class="stat-card stat-warning">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-value" id="stat-remaining">${remainingCount}</div>
                        <div class="stat-label">Restant à Apprendre</div>
                    </div>
                    <div class="stat-card stat-accent">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value" id="stat-percent">${percentage}%</div>
                        <div class="stat-label">Progression Globale</div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </div>

                <!-- BARRE DE RECHERCHE ET FILTRES -->
                <div class="filters-panel">
                    <div class="search-box">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="git-search-input" placeholder="Rechercher une commande (ex: bisect, cat-file, stash)..." value="${this.filters.searchQuery}">
                    </div>

                    <div class="select-group">
                        <select id="git-category-select" class="form-select">
                            ${GIT_CATEGORIES.map(cat => `<option value="${cat}" ${this.filters.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                        </select>

                        <select id="git-status-select" class="form-select">
                            <option value="all" ${this.filters.status === 'all' ? 'selected' : ''}>Tous les statuts</option>
                            <option value="mastered" ${this.filters.status === 'mastered' ? 'selected' : ''}>Maîtrisées uniquement</option>
                            <option value="unmastered" ${this.filters.status === 'unmastered' ? 'selected' : ''}>À maîtriser</option>
                        </select>

                        <select id="git-sort-select" class="form-select">
                            <option value="chronological" ${this.filters.sortBy === 'chronological' ? 'selected' : ''}>Ordre d'utilisation</option>
                            <option value="alphabetical" ${this.filters.sortBy === 'alphabetical' ? 'selected' : ''}>Ordre alphabétique</option>
                        </select>
                    </div>
                </div>

                <!-- COMPTEUR DE RÉSULTATS -->
                <div class="results-meta">
                    <span>Affichage de <strong>${filteredCommands.length}</strong> commande(s) sur ${total}</span>
                    ${lastUsedCmd ? `<span class="last-used-info">Dernière utilisation réelle enregistrée : <strong>${lastUsedCmd.firstUsed}</strong> (${lastUsedCmd.name})</span>` : ''}
                </div>

                <!-- LISTE DES COMMANDES GIT -->
                <div class="commands-list">
                    ${filteredCommands.map(cmd => {
                        const isMastered = masteredList.includes(cmd.id);
                        return `
                            <div class="command-card ${isMastered ? 'card-mastered' : ''}" data-id="${cmd.id}">
                                <div class="command-card-header">
                                    <label class="custom-checkbox-container">
                                        <input type="checkbox" class="cmd-checkbox" data-id="${cmd.id}" ${isMastered ? 'checked' : ''}>
                                        <span class="checkmark"></span>
                                        <span class="cmd-title-name"><code>${cmd.name}</code></span>
                                    </label>
                                    <div class="header-badges">
                                        <span class="badge badge-category">${cmd.category}</span>
                                        <span class="badge ${isMastered ? 'badge-mastered' : 'badge-unmastered'}">
                                            ${isMastered ? '★ Maîtrisée' : '○ À maîtriser'}
                                        </span>
                                    </div>
                                </div>

                                <div class="command-card-body">
                                    <p class="cmd-desc">${cmd.description}</p>
                                    <div class="cmd-syntax-box">
                                        <span class="syntax-label">Syntaxe :</span>
                                        <code>${cmd.syntax}</code>
                                    </div>
                                    <div class="cmd-meta-grid">
                                        <div><strong>Utilité :</strong> ${cmd.utility}</div>
                                        <div><strong>Contexte projet :</strong> ${cmd.projectContext}</div>
                                        <div><strong>Exemple réel :</strong> <code>${cmd.example}</code></div>
                                    </div>
                                </div>

                                <div class="command-card-footer">
                                    <div class="card-footer-info">
                                        <span>📅 1ère exécution : ${cmd.firstUsed}</span>
                                        <span>🔢 Utilisations : ${cmd.useCount}</span>
                                    </div>
                                    <button class="btn btn-sm btn-details" data-cmd-id="${cmd.id}">
                                        📖 Fiche Détaillée
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- MODAL FICHE DÉTAILLÉE -->
                <div id="cmd-modal" class="modal-overlay hidden">
                    <div class="modal-card">
                        <div class="modal-header">
                            <h3 id="modal-cmd-title">Détails de la commande</h3>
                            <button class="modal-close-btn" id="modal-close-btn">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-cmd-content">
                            <!-- Injecté dynamiquement -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    },

    bindEvents() {
        // Checkboxes de maîtrise
        const checkboxes = this.container.querySelectorAll('.cmd-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                StorageManager.setCommandMastered(id, e.target.checked);
                this.render();
            });
        });

        // Recherche instantanée
        const searchInput = this.container.querySelector('#git-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.searchQuery = e.target.value;
                this.render();
                // Garder le focus
                const newInput = this.container.querySelector('#git-search-input');
                newInput.focus();
                newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
            });
        }

        // Filtre de catégorie
        const catSelect = this.container.querySelector('#git-category-select');
        if (catSelect) {
            catSelect.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.render();
            });
        }

        // Filtre de statut
        const statusSelect = this.container.querySelector('#git-status-select');
        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.render();
            });
        }

        // Tri
        const sortSelect = this.container.querySelector('#git-sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.render();
            });
        }

        // Boutons fiches détaillées
        const detailButtons = this.container.querySelectorAll('.btn-details');
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cmdId = e.currentTarget.getAttribute('data-cmd-id');
                this.openModal(cmdId);
            });
        });

        // Fermeture modal
        const modal = this.container.querySelector('#cmd-modal');
        const closeBtn = this.container.querySelector('#modal-close-btn');
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.add('hidden');
            });
        }
    },

    openModal(commandId) {
        const cmd = GIT_COMMANDS_DATA.find(c => c.id === commandId);
        if (!cmd) return;

        const modal = this.container.querySelector('#cmd-modal');
        const title = this.container.querySelector('#modal-cmd-title');
        const content = this.container.querySelector('#modal-cmd-content');

        if (!modal || !title || !content) return;

        const isMastered = StorageManager.isCommandMastered(cmd.id);

        title.innerHTML = `Fiche d'apprentissage : <code>${cmd.name}</code>`;
        content.innerHTML = `
            <div class="modal-detail-grid">
                <div class="detail-row">
                    <span class="label">Catégorie :</span>
                    <span class="value"><span class="badge badge-category">${cmd.category}</span></span>
                </div>
                <div class="detail-row">
                    <span class="label">Statut d'assimilation :</span>
                    <span class="value"><strong>${isMastered ? '✅ Maîtrisée' : '⏳ En cours d\'apprentissage'}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="label">Description complète :</span>
                    <span class="value">${cmd.description}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Syntaxe officielle :</span>
                    <span class="value"><code>${cmd.syntax}</code></span>
                </div>
                <div class="detail-row">
                    <span class="label">Rôle & Utilité :</span>
                    <span class="value">${cmd.utility}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Application concrète dans ce projet :</span>
                    <span class="value">${cmd.projectContext}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Exemple réel d'exécution :</span>
                    <span class="value"><code>${cmd.example}</code></span>
                </div>
                <div class="detail-row">
                    <span class="label">Détails techniques & coulisses :</span>
                    <span class="value">${cmd.details}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Première utilisation enregistrée :</span>
                    <span class="value">${cmd.firstUsed} (${cmd.useCount} exécutions au total)</span>
                </div>
            </div>
            <div class="modal-action-bar">
                <button class="btn btn-primary" id="modal-toggle-mastery" data-id="${cmd.id}">
                    ${isMastered ? 'Marquer comme non maîtrisée' : 'Marquer comme maîtrisée'}
                </button>
            </div>
        `;

        document.getElementById('modal-toggle-mastery')?.addEventListener('click', () => {
            StorageManager.setCommandMastered(cmd.id, !isMastered);
            modal.classList.add('hidden');
            this.render();
        });

        modal.classList.remove('hidden');
    }
};
