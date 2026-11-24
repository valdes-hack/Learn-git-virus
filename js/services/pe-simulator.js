/**
 * PE SIMULATOR - Simulateur Visuel Interactif d'Infection Binaire PE
 * Démontre la structure interne d'un exécutable Windows et le détournement de l'OEP par Expiro.
 */

export const PeSimulator = {
    state: {
        mode: 'healthy' // 'healthy' | 'infected' | 'disinfection_attempt'
    },

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="pe-sim-box">
                <div class="pe-sim-header">
                    <div class="pe-sim-title">
                        <span class="icon">🔬</span>
                        <div>
                            <h4>Inspecteur Virtuel de Binaire Portable Executable (PE)</h4>
                            <p class="subtitle">Visualisation dynamique des sections mémoire et du détournement de l'AddressOfEntryPoint</p>
                        </div>
                    </div>
                    <div class="pe-sim-controls">
                        <button class="btn btn-outline ${this.state.mode === 'healthy' ? 'active' : ''}" id="btn-pe-healthy">
                            🟢 Exécutable Sain
                        </button>
                        <button class="btn btn-danger ${this.state.mode === 'infected' ? 'active' : ''}" id="btn-pe-infected">
                            🔴 Infection Expiro
                        </button>
                        <button class="btn btn-warning ${this.state.mode === 'disinfection_attempt' ? 'active' : ''}" id="btn-pe-disinfect">
                            ⚠️ Tentative Désinfection
                        </button>
                    </div>
                </div>

                <div class="pe-sim-body">
                    <!-- Schéma interactif des sections PE -->
                    <div class="pe-diagram-area">
                        <div class="pe-diagram-title">Carte Mémoire du Binaire (${this.state.mode === 'healthy' ? 'calc.exe sain' : this.state.mode === 'infected' ? 'calc.exe INFECTÉ par Win32/Expiro' : 'calc.exe après désinfection risquée'})</div>

                        <div class="pe-sections-stack">
                            <!-- DOS HEADER -->
                            <div class="pe-section-block dos-block">
                                <div class="sec-label">IMAGE_DOS_HEADER</div>
                                <div class="sec-info">Magic: 'MZ' (0x5A4D) | e_lfanew: pointeur vers NT Header</div>
                            </div>

                            <!-- NT HEADERS -->
                            <div class="pe-section-block nt-block">
                                <div class="sec-label">IMAGE_NT_HEADERS</div>
                                <div class="sec-info">
                                    Signature: 'PE\\0\\0' | FileHeader (Machine x86/x64) | 
                                    <strong class="highlight-entry ${this.state.mode === 'infected' ? 'danger-pulse' : ''}">
                                        AddressOfEntryPoint: ${this.state.mode === 'healthy' ? '0x00001000 (.text)' : this.state.mode === 'infected' ? '0x00045000 (.expiro) ⚠️ DÉTOURNÉ' : '0x00001000 (Restauration instable)'}
                                    </strong>
                                </div>
                            </div>

                            <!-- SECTIONS RÉELLES -->
                            <div class="pe-section-block section-text">
                                <div class="sec-label">Section .text (Code Exécutable d'Origine)</div>
                                <div class="sec-info">Taille: 0x0002A000 | Flags: MEM_EXECUTE | MEM_READ</div>
                                <div class="sec-badge ${this.state.mode === 'healthy' ? 'badge-active-target' : ''}">
                                    ${this.state.mode === 'healthy' ? '🎯 Cible légitime de démarrage' : '⏸️ Court-circuité au lancement'}
                                </div>
                            </div>

                            <div class="pe-section-block section-rdata">
                                <div class="sec-label">Section .rdata (Constantes & Imports IAT)</div>
                                <div class="sec-info">Taille: 0x0000C000 | Flags: MEM_READ</div>
                            </div>

                            <div class="pe-section-block section-data">
                                <div class="sec-label">Section .data (Variables Globales)</div>
                                <div class="sec-info">Taille: 0x00004000 | Flags: MEM_READ | MEM_WRITE</div>
                            </div>

                            <!-- SECTION VIRALE DYNAMIQUE -->
                            ${this.state.mode === 'infected' ? `
                                <div class="pe-section-block section-virus danger-pulse">
                                    <div class="sec-label">🚨 NOUVELLE SECTION : .expiro (ou .data étendue)</div>
                                    <div class="sec-info">
                                        Adresse RVA: 0x00045000 | Flags: <strong>MEM_READ | MEM_WRITE | MEM_EXECUTE</strong> (Anomalie W+X critique)<br>
                                        Contenu: Déchiffreur polymorphe + Payload C2/Botnet + Saut vers ancien OEP
                                    </div>
                                    <div class="sec-badge badge-danger">🎯 POINT D'ENTRÉE PIRATÉ (Exécuté en premier)</div>
                                </div>
                            ` : ''}

                            ${this.state.mode === 'disinfection_attempt' ? `
                                <div class="pe-section-block section-damaged">
                                    <div class="sec-label">💥 ZONE TRONQUÉE (Désinfection logicielle)</div>
                                    <div class="sec-info">
                                        Section virale retirée mais en-têtes PE corrompus : Alignement d'adresses invalide.<br>
                                        Crash au lancement : <code>EXCEPTION_ACCESS_VIOLATION (0xc0000005)</code>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Explications dynamiques -->
                    <div class="pe-explanation-panel">
                        <h5>Analyse Technique en Temps Réel</h5>
                        ${this.getExplanationText()}
                    </div>
                </div>
            </div>
        `;

        this.bindEvents(containerId);
    },

    getExplanationText() {
        if (this.state.mode === 'healthy') {
            return `
                <div class="status-box ok">
                    <strong>État : Binaire sain non infecté</strong>
                    <p>Le point d'entrée initial (AddressOfEntryPoint) pointe directement sur l'adresse <code>0x00001000</code> située dans la section <code>.text</code>. Lorsque l'utilisateur lance le fichier, le code légitime du développeur démarre immédiatement et de façon sécurisée.</p>
                    <ul>
                        <li>Aucune section à double droit (W+X).</li>
                        <li>Entropie globale normale (~5.6 - 6.2).</li>
                        <li>Signature Authenticode valide.</li>
                    </ul>
                </div>
            `;
        } else if (this.state.mode === 'infected') {
            return `
                <div class="status-box danger">
                    <strong>État : Infection active par Win32/Expiro</strong>
                    <p>Expiro a greffé une nouvelle section à la fin du fichier et a réécrit le champ <code>AddressOfEntryPoint</code> de l'en-tête NT Header vers <code>0x00045000</code>.</p>
                    <ol>
                        <li><strong>Démarrage du virus :</strong> Windows lance d'abord le déchiffreur polymorphe d'Expiro.</li>
                        <li><strong>Exécution de la charge utile :</strong> Expiro s'installe en mémoire, hook les services et lance le vol de clés/mots de passe.</li>
                        <li><strong>Saut de restitution :</strong> Une fois le méfait accompli, une instruction assembleur <code>JMP 0x00001000</code> rend la main au programme original pour tromper l'utilisateur.</li>
                    </ol>
                </div>
            `;
        } else {
            return `
                <div class="status-box warning">
                    <strong>État : Risque majeur lors de la désinfection</strong>
                    <p>Une désinfection automatisée par antivirus tente d'écraser la section virale et de restaurer l'en-tête d'origine. Cependant, en raison du polymorphisme d'Expiro et des décalages d'alignement de section (SectionAlignment) :</p>
                    <ul>
                        <li>Le fichier exécutable est souvent irrémédiablement corrompu.</li>
                        <li>Si ce fichier est un service vital de Windows (explorer.exe, svchost), le système d'exploitation ne démarre plus (écran bleu ou boucle de plantage).</li>
                        <li><strong>Recommandation professionnelle :</strong> Restauration depuis une sauvegarde saine obligatoire.</li>
                    </ul>
                </div>
            `;
        }
    },

    bindEvents(containerId) {
        document.getElementById('btn-pe-healthy')?.addEventListener('click', () => {
            this.state.mode = 'healthy';
            this.render(containerId);
        });

        document.getElementById('btn-pe-infected')?.addEventListener('click', () => {
            this.state.mode = 'infected';
            this.render(containerId);
        });

        document.getElementById('btn-pe-disinfect')?.addEventListener('click', () => {
            this.state.mode = 'disinfection_attempt';
            this.render(containerId);
        });
    }
};
