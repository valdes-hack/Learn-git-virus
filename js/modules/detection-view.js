/**
 * DETECTION VIEW MODULE - Méthodes de Détection des Malwares & Analyse
 */
export const DetectionView = {
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="detection-view-container">
                <div class="view-hero">
                    <div class="badge-tag">🔍 Méthodes d'Audit & Détection</div>
                    <h2>Techniques d'Analyse et de Détection des Malwares</h2>
                    <p class="hero-desc">
                        Découvrez comment les moteurs de sécurité, EDR et analystes forensiques identifient les programmes malveillants à travers l'analyse statique, dynamique et comportementale.
                    </p>
                </div>

                <div class="detection-methods-grid">
                    <div class="detection-card">
                        <div class="card-icon">🏷️</div>
                        <h3>1. Analyse par Signature Statique</h3>
                        <p>Méthode traditionnelle comparant les hashs cryptographiques (MD5, SHA-256) ou des motifs d'octets spécifiques (Règles YARA) avec une base de données connue.</p>
                        <div class="pro-con">
                            <span class="pro">Avantage : Zéro faux positif sur hash connu</span>
                            <span class="con">Limite : Inefficace face au polymorphisme</span>
                        </div>
                    </div>

                    <div class="detection-card">
                        <div class="card-icon">🧠</div>
                        <h3>2. Analyse Heuristique & Anomalies PE</h3>
                        <p>Recherche de caractéristiques suspectes dans la structure interne du fichier exécutable (ex: section W+X, point d'entrée décalé, imports API d'injection comme VirtualAllocEx ou WriteProcessMemory).</p>
                        <div class="pro-con">
                            <span class="pro">Avantage : Détecte de nouvelles variantes inconnues</span>
                            <span class="con">Limite : Risque de faux positifs</span>
                        </div>
                    </div>

                    <div class="detection-card">
                        <div class="card-icon">📦</div>
                        <h3>3. Analyse d'Entropie de Shannon</h3>
                        <p>Calcul du taux d'entropie (mesure du désordre des octets) dans chaque section. Une entropie supérieure à 7.2 trahit quasi-systématiquement un packer ou du code viral chiffré.</p>
                        <div class="pro-con">
                            <span class="pro">Avantage : Révèle immédiatement les charges cachées</span>
                            <span class="con">Limite : Ne distingue pas un compresseur légitime d'un malware</span>
                        </div>
                    </div>

                    <div class="detection-card">
                        <div class="card-icon">🧪</div>
                        <h3>4. Détonation en Sandbox Dynamique</h3>
                        <p>Exécution du fichier dans un environnement virtuel hermétique instrumenté (ex: Cuckoo Sandbox, Any.Run) pour enregistrer ses appels API, ses créations de fichiers et son trafic réseau.</p>
                        <div class="pro-con">
                            <span class="pro">Avantage : Découvre le comportement réel sans risque</span>
                            <span class="con">Limite : Contournable par évasion de Sandbox (sommeil artificiel)</span>
                        </div>
                    </div>
                </div>

                <!-- TESTEUR D'ENTROPIE SIMULÉ -->
                <div class="entropy-demo-box">
                    <h3>Simulateur Pédagogique d'Entropie PE</h3>
                    <p>Comparez le profil d'entropie d'un binaire classique et d'un binaire infecté par Expiro :</p>
                    <div class="entropy-bars">
                        <div class="entropy-bar-item">
                            <div class="bar-label">Binaire Sain (.text standard) : <strong>5.8 / 8.0 (Normal)</strong></div>
                            <div class="entropy-track"><div class="entropy-fill healthy-fill" style="width: 72%"></div></div>
                        </div>
                        <div class="entropy-bar-item">
                            <div class="bar-label">Binaire Infecté Expiro (Section chiffrée) : <strong>7.85 / 8.0 (Alerte Élevée)</strong></div>
                            <div class="entropy-track"><div class="entropy-fill danger-fill" style="width: 98%"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
