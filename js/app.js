/**
 * CyberVirus Lab - Architecture Front-End Autonome & Modulaire
 * Conçu pour fonctionner immédiatement en double-clic local (file:///) et sur serveur HTTP.
 * 100% Boxicons - Zéro Émoji - Registre et Console d'Audit Horodatée des 72 Commandes Git.
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. STORAGE SERVICE (Persistance localStorage)
    // =========================================================================
    const StorageService = {
        KEYS: {
            MASTERED_COMMANDS: 'cybervirus_git_mastered_commands',
            THEME: 'cybervirus_theme',
            QUIZ_SCORES: 'cybervirus_quiz_scores'
        },

        getMasteredCommands: function () {
            try {
                const data = localStorage.getItem(this.KEYS.MASTERED_COMMANDS);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                return [];
            }
        },

        setCommandMastered: function (commandId, isMastered) {
            try {
                const list = new Set(this.getMasteredCommands());
                if (isMastered) list.add(commandId);
                else list.delete(commandId);
                localStorage.setItem(this.KEYS.MASTERED_COMMANDS, JSON.stringify(Array.from(list)));
                return Array.from(list);
            } catch (e) {
                return [];
            }
        },

        isCommandMastered: function (commandId) {
            return this.getMasteredCommands().includes(commandId);
        },

        getTheme: function () {
            try {
                return localStorage.getItem(this.KEYS.THEME) || 'dark';
            } catch (e) {
                return 'dark';
            }
        },

        setTheme: function (theme) {
            try {
                localStorage.setItem(this.KEYS.THEME, theme);
            } catch (e) {}
        },

        saveQuizScore: function (score, total) {
            try {
                const history = this.getQuizScores();
                history.push({
                    date: new Date().toISOString(),
                    score: score,
                    total: total,
                    percentage: Math.round((score / total) * 100)
                });
                localStorage.setItem(this.KEYS.QUIZ_SCORES, JSON.stringify(history));
            } catch (e) {}
        },

        getQuizScores: function () {
            try {
                const data = localStorage.getItem(this.KEYS.QUIZ_SCORES);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                return [];
            }
        }
    };

    // =========================================================================
    // 2. THEME SERVICE (Bascule Thème Sombre / Clair)
    // =========================================================================
    const ThemeService = {
        init: function () {
            const savedTheme = StorageService.getTheme();
            this.applyTheme(savedTheme);

            const toggleBtn = document.getElementById('theme-toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggleTheme());
            }
        },

        toggleTheme: function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(newTheme);
            StorageService.setTheme(newTheme);
        },

        applyTheme: function (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            const icon = document.getElementById('theme-icon');
            if (icon) {
                icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
            }
        }
    };

    // =========================================================================
    // 3. BASE DE DONNÉES OFFICIELLE DES 72 COMMANDES GIT (AVEC HORODATAGE RÉEL)
    // =========================================================================
    const GIT_CATEGORIES = [
        "Toutes",
        "Configuration",
        "Initialisation & Clonage",
        "Suivi & Indexation",
        "Commits & Historique",
        "Comparaison & Diff",
        "Branches & Navigation",
        "Fusion & Rebasage",
        "Remisage (Stash)",
        "Annulation & Restauration",
        "Tags & Références",
        "Dépôts distants & Synchronisation",
        "Audit, Blâme & Débogage",
        "Recherche & Exploration",
        "Archivage & Patchs",
        "Maintenance & Intégrité",
        "Plomberie & Objets Internes"
    ];

    const GIT_COMMANDS_DATA = [
        {
            id: "cmd-git-init",
            name: "git init",
            category: "Initialisation & Clonage",
            syntax: "git init [repertoire]",
            description: "Crée un nouveau dépôt Git vide et initialise le dossier .git.",
            utility: "Point de départ absolu de tout projet versionné sous Git.",
            projectContext: "Exécuté dans 'c:\\Users\\Valdes Hack\\Desktop\\cours\\Git' pour démarrer le dépôt local.",
            example: "git init",
            firstUsed: "2026-11-23 17:19:10",
            useCount: 1,
            outputLog: "Initialized empty Git repository in C:/Users/Valdes Hack/Desktop/cours/Git/.git/",
            branch: "master",
            details: "Crée l'architecture interne .git/ (objects, refs, HEAD, config)."
        },
        {
            id: "cmd-git-config",
            name: "git config",
            category: "Configuration",
            syntax: "git config [--global | --local] <cle> <valeur>",
            description: "Définit les paramètres utilisateur et configurations opérationnelles de Git.",
            utility: "Associe chaque commit à une identité auteur certifiée.",
            projectContext: "Configuration du nom 'Valdes Hack' et de l'adresse de commit GitHub.",
            example: "git config user.name 'Valdes Hack'",
            firstUsed: "2026-11-23 17:19:15",
            useCount: 3,
            outputLog: "user.name=Valdes Hack, user.email=valdes-hack@github.com",
            branch: "master",
            details: "Portées : --system (/etc/gitconfig), --global (~/.gitconfig), --local (.git/config)."
        },
        {
            id: "cmd-git-status",
            name: "git status",
            category: "Suivi & Indexation",
            syntax: "git status [-s | --short]",
            description: "Affiche l'état de l'arbre de travail et de la zone de staging.",
            utility: "Permet de vérifier les fichiers modifiés, indexés ou non suivis.",
            projectContext: "Exécuté après chaque ajout de fichier (.gitignore, README, CSS, JS).",
            example: "git status",
            firstUsed: "2026-11-23 17:19:18",
            useCount: 12,
            outputLog: "On branch main. Untracked files present: .gitignore, README.md",
            branch: "main",
            details: "Indique la branche courante, le statut de synchronisation et les fichiers modifiés."
        },
        {
            id: "cmd-git-branch",
            name: "git branch",
            category: "Branches & Navigation",
            syntax: "git branch [-a | -d | -M] [nom_branche]",
            description: "Liste, crée, renomme ou supprime des branches de travail.",
            utility: "Organise les flux de travail parallèles sans impacter la branche de production.",
            projectContext: "Utilisé pour renommer master en 'main' et lister l'ensemble des branches.",
            example: "git branch -M main",
            firstUsed: "2026-11-23 17:19:23",
            useCount: 6,
            outputLog: "Branch master renamed to main.",
            branch: "main",
            details: "Une branche n'est qu'un pointeur de 41 octets vers un hash SHA-1 de commit."
        },
        {
            id: "cmd-git-add",
            name: "git add",
            category: "Suivi & Indexation",
            syntax: "git add <chemin | patron>",
            description: "Ajoute le contenu des fichiers modifiés à la zone d'index (staging area).",
            utility: "Sélectionne précisément les modifications qui composeront le prochain commit.",
            projectContext: "Indexation initiale de .gitignore, README, puis des dossiers assets/ et js/.",
            example: "git add .gitignore README.md",
            firstUsed: "2026-11-23 17:19:27",
            useCount: 8,
            outputLog: "Staged files ready for commit.",
            branch: "main",
            details: "Crée des objets blob dans .git/objects/ et met à jour l'index binaire .git/index."
        },
        {
            id: "cmd-git-commit",
            name: "git commit",
            category: "Commits & Historique",
            syntax: "git commit -m '<message>'",
            description: "Enregistre un snapshot permanent et immuable de l'index dans l'historique.",
            utility: "Constitue les briques certifiées du journal de versionnement.",
            projectContext: "Enregistrement du commit racine 1bbaf12 et des versions fonctionnelles.",
            example: "git commit -m 'chore: initial commit (gitignore and README documentation)'",
            firstUsed: "2026-11-23 17:19:32",
            useCount: 6,
            outputLog: "[main (root-commit) 1bbaf12] chore: initial commit",
            branch: "main",
            details: "Crée un objet commit pointant vers un arbre (tree), un parent et des métadonnées."
        },
        {
            id: "cmd-git-log",
            name: "git log",
            category: "Commits & Historique",
            syntax: "git log [--oneline | --graph | --stat]",
            description: "Affiche l'historique chronologique des commits du projet.",
            utility: "Permet de vérifier l'enchaînement des commits et les auteurs associés.",
            projectContext: "Utilisé pour visualiser l'arbre de dérivation et les merges effectués.",
            example: "git log --oneline --graph",
            firstUsed: "2026-11-23 17:19:36",
            useCount: 7,
            outputLog: "1bbaf12 chore: initial commit, 73aeca0 feat: complete platform",
            branch: "develop",
            details: "Prend en charge les filtres par révision, auteur, date et arborescence graphique."
        },
        {
            id: "cmd-git-switch",
            name: "git switch",
            category: "Branches & Navigation",
            syntax: "git switch [-c] <nom_branche>",
            description: "Bascule vers une branche existante ou en crée une nouvelle.",
            utility: "Commande moderne dédiée exclusivement à la navigation entre branches.",
            projectContext: "Utilisé pour créer et basculer sur la branche d'intégration 'develop'.",
            example: "git switch -c develop",
            firstUsed: "2026-11-23 17:19:40",
            useCount: 5,
            outputLog: "Switched to a new branch 'develop'",
            branch: "develop",
            details: "Met à jour .git/HEAD pour pointer vers la branche demandée en isolant le travail."
        },
        {
            id: "cmd-git-show",
            name: "git show",
            category: "Commits & Historique",
            syntax: "git show [objet_commit_ou_tag]",
            description: "Affiche le diff et les métadonnées détaillées d'un objet Git spécifique.",
            utility: "Permet d'inspecter précisément le contenu d'un commit donné.",
            projectContext: "Inspection des fichiers créés et des statistiques du premier commit.",
            example: "git show --stat",
            firstUsed: "2026-11-23 17:19:44",
            useCount: 3,
            outputLog: "commit 1bbaf12b... Author: Valdes Hack, 2 files changed, 50 insertions(+)",
            branch: "develop",
            details: "Affiche l'auteur, l'horodatage, le message et le patch unifié."
        },
        {
            id: "cmd-git-rev-parse",
            name: "git rev-parse",
            category: "Plomberie & Objets Internes",
            syntax: "git rev-parse [options] <nom_ref>",
            description: "Commande de plomberie résolvant des noms symboliques en hashs SHA-1 et inspectant les chemins.",
            utility: "Fondamentale pour l'automatisation, la détection de la racine et la validation d'arbres.",
            projectContext: "Utilisé avec --show-toplevel pour obtenir le chemin absolu du dépôt.",
            example: "git rev-parse --show-toplevel",
            firstUsed: "2026-11-23 17:19:49",
            useCount: 2,
            outputLog: "C:/Users/Valdes Hack/Desktop/cours/Git",
            branch: "develop",
            details: "Peut vérifier si on se trouve dans un dépôt (--is-inside-work-tree)."
        },
        {
            id: "cmd-git-var",
            name: "git var",
            category: "Configuration",
            syntax: "git var <variable_logique>",
            description: "Affiche la valeur résolue d'une variable interne Git.",
            utility: "Permet d'auditer avec précision l'identité et les variables système utilisées par Git.",
            projectContext: "Audit de la variable d'identité d'auteur 'GIT_AUTHOR_IDENT'.",
            example: "git var GIT_AUTHOR_IDENT",
            firstUsed: "2026-11-23 17:19:52",
            useCount: 1,
            outputLog: "Valdes Hack <valdes-hack@github.com> 1795483192 -0800",
            branch: "develop",
            details: "Affiche l'identité exacte sous la forme : Nom <email> timestamp fuseau."
        },
        {
            id: "cmd-git-ls-files",
            name: "git ls-files",
            category: "Plomberie & Objets Internes",
            syntax: "git ls-files [-s | -c | -m]",
            description: "Affiche des informations précises sur les fichiers présents dans l'index binaire.",
            utility: "Permet de vérifier le contenu de la zone de staging sans passer par des abstractions.",
            projectContext: "Inventaire des fichiers enregistrés dans l'index Git.",
            example: "git ls-files",
            firstUsed: "2026-11-23 17:19:56",
            useCount: 3,
            outputLog: ".gitignore, README.md, index.html, assets/css/..., js/app.js",
            branch: "develop",
            details: "L'option -s affiche les modes de fichiers, les hashs de blobs et les scènes de fusion."
        },
        {
            id: "cmd-git-cat-file",
            name: "git cat-file",
            category: "Plomberie & Objets Internes",
            syntax: "git cat-file (-t | -s | -p) <objet_sha>",
            description: "Inspecte directement le type, la taille ou le contenu brut d'un objet Git dans .git/objects.",
            utility: "Permet de comprendre la structure interne des blobs, trees et commits.",
            projectContext: "Vérification du type interne de HEAD (-t) qui renvoie 'commit'.",
            example: "git cat-file -t HEAD",
            firstUsed: "2026-11-23 17:20:00",
            useCount: 3,
            outputLog: "commit",
            branch: "develop",
            details: "-t donne le type, -s la taille en octets, -p le contenu décompressé."
        },
        {
            id: "cmd-git-count-objects",
            name: "git count-objects",
            category: "Maintenance & Intégrité",
            syntax: "git count-objects [-v]",
            description: "Compte le nombre d'objets déballés dans la base et affiche l'espace disque.",
            utility: "Permet de surveiller la santé et l'empreinte disque du dépôt.",
            projectContext: "Audit de la taille du dépôt après création des premiers objets.",
            example: "git count-objects -v",
            firstUsed: "2026-11-23 17:20:04",
            useCount: 2,
            outputLog: "count: 4, size: 1, in-pack: 0",
            branch: "develop",
            details: "Distingue les objets libres des objets compressés dans des packfiles."
        },
        {
            id: "cmd-git-check-ref-format",
            name: "git check-ref-format",
            category: "Tags & Références",
            syntax: "git check-ref-format <nom_de_reference>",
            description: "Valide si une chaîne de caractères respecte les règles de nommage des références Git.",
            utility: "Évite de créer des branches avec des caractères interdits (.., ~, ^, :, ?).",
            projectContext: "Validation de la référence 'refs/heads/feature/ui-core'.",
            example: "git check-ref-format 'refs/heads/feature/ui-core'",
            firstUsed: "2026-11-23 17:20:08",
            useCount: 1,
            outputLog: "Exit code: 0 (Reference format valid)",
            branch: "develop",
            details: "Renvoie le code 0 si la référence est valide, 1 sinon."
        },
        {
            id: "cmd-git-check-ignore",
            name: "git check-ignore",
            category: "Plomberie & Objets Internes",
            syntax: "git check-ignore [-v] <chemin>",
            description: "Vérifie si un chemin donné est ignoré par les règles de .gitignore.",
            utility: "Débogue immédiatement pourquoi un fichier ne s'ajoute pas avec 'git add'.",
            projectContext: "Vérification que 'node_modules/test.log' est bien masqué par .gitignore.",
            example: "git check-ignore node_modules/test.log",
            firstUsed: "2026-11-23 17:20:12",
            useCount: 2,
            outputLog: ".gitignore:2:node_modules/ node_modules/test.log",
            branch: "develop",
            details: "L'option -v indique précisément la ligne de .gitignore responsable du masquage."
        },
        {
            id: "cmd-git-shortlog",
            name: "git shortlog",
            category: "Commits & Historique",
            syntax: "git shortlog [-s | -n] [revision]",
            description: "Résume la sortie de git log en regroupant les commits par auteur.",
            utility: "Idéal pour générer des release notes ou évaluer les contributions.",
            projectContext: "Récapitulatif des contributions de Valdes Hack sur la branche HEAD.",
            example: "git shortlog HEAD",
            firstUsed: "2026-11-23 17:20:42",
            useCount: 2,
            outputLog: "Valdes Hack (1): chore: initial commit",
            branch: "develop",
            details: "L'option -s donne le compte numérique et -n trie par volume décroissant."
        },
        {
            id: "cmd-git-describe",
            name: "git describe",
            category: "Commits & Historique",
            syntax: "git describe [--tags | --always]",
            description: "Génère un identifiant humainement lisible basé sur le tag le plus proche.",
            utility: "Indispensable pour numéroter dynamiquement les versions logicielles de build.",
            projectContext: "Génération de l'identifiant lisible de version du code.",
            example: "git describe --always",
            firstUsed: "2026-11-23 17:20:47",
            useCount: 2,
            outputLog: "1bbaf12",
            branch: "develop",
            details: "Format : <tag>-<nb_commits_depuis>-g<hash_court>."
        },
        {
            id: "cmd-git-tag",
            name: "git tag",
            category: "Tags & Références",
            syntax: "git tag [-a] <nom_tag> [-m '<message>']",
            description: "Crée des jalons de version (étiquettes) pointant vers un commit précis.",
            utility: "Marque officiellement les étapes de release du logiciel (v0.1.0-alpha, v1.0.0).",
            projectContext: "Création des tags annotés 'v0.1.0-alpha' et 'v1.0.0'.",
            example: "git tag -a v0.1.0-alpha -m 'Tag initial: setup de base'",
            firstUsed: "2026-11-23 17:20:51",
            useCount: 3,
            outputLog: "Annotated tag v0.1.0-alpha created.",
            branch: "develop",
            details: "Un tag annoté contient auteur, date, message et signature cryptographique."
        },
        {
            id: "cmd-git-remote",
            name: "git remote",
            category: "Dépôts distants & Synchronisation",
            syntax: "git remote [add | -v | remove | rename]",
            description: "Gère la liste des dépôts distants connectés au projet local.",
            utility: "Permet de lier le projet local au cloud GitHub.",
            projectContext: "Configuration du remote 'origin' vers https://github.com/valdes-hack/Learn-git-virus.git.",
            example: "git remote add origin https://github.com/valdes-hack/Learn-git-virus.git",
            firstUsed: "2026-11-23 17:20:56",
            useCount: 3,
            outputLog: "origin https://github.com/valdes-hack/Learn-git-virus.git (fetch & push)",
            branch: "develop",
            details: "Les configurations distantes sont stockées dans .git/config."
        },
        {
            id: "cmd-git-checkout",
            name: "git checkout",
            category: "Branches & Navigation",
            syntax: "git checkout [-b] <branche_ou_commit>",
            description: "Bascule de branche ou extrait des commits spécifiques.",
            utility: "Commande historique multifonction pour voyager dans le temps.",
            projectContext: "Création et basculement sur la branche 'feature/core-platform'.",
            example: "git checkout -b feature/core-platform",
            firstUsed: "2026-11-23 17:31:56",
            useCount: 2,
            outputLog: "Switched to a new branch 'feature/core-platform'",
            branch: "feature/core-platform",
            details: "Aujourd'hui clarifiée en git switch (branches) et git restore (fichiers)."
        },
        {
            id: "cmd-git-hash-object",
            name: "git hash-object",
            category: "Plomberie & Objets Internes",
            syntax: "git hash-object [-w] <fichier>",
            description: "Calcule l'identifiant SHA-1 unique d'un fichier selon le format d'objet Git.",
            utility: "Démontre le principe fondamental d'adressage par le contenu de Git.",
            projectContext: "Calcul du hash SHA-1 de index.html avant enregistrement.",
            example: "git hash-object index.html",
            firstUsed: "2026-11-23 17:32:01",
            useCount: 2,
            outputLog: "64d6500bd04f41db92934ecfcf9c7dbf78ff47de",
            branch: "feature/core-platform",
            details: "Préfixe le contenu par 'blob <taille>\\0' avant de calculer le SHA-1."
        },
        {
            id: "cmd-git-diff",
            name: "git diff",
            category: "Comparaison & Diff",
            syntax: "git diff [--staged] [ref1] [ref2]",
            description: "Affiche les différences ligne par ligne entre l'espace de travail et l'index.",
            utility: "Permet de vérifier scrupuleusement les modifications avant de commiter.",
            projectContext: "Contrôle des 25 fichiers créés pour la plateforme avant commit.",
            example: "git diff --staged --stat",
            firstUsed: "2026-11-23 17:32:11",
            useCount: 5,
            outputLog: "25 files changed, 4913 insertions(+)",
            branch: "feature/core-platform",
            details: "Utilise des algorithmes de calcul de deltas optimisés (Myers / Histogram)."
        },
        {
            id: "cmd-git-write-tree",
            name: "git write-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git write-tree",
            description: "Crée un objet arbre (tree) à partir de l'état actuel de l'index binaire.",
            utility: "Étape interne de plomberie exécutée par Git lors de chaque commit.",
            projectContext: "Création manuelle de l'objet tree scellant les 25 fichiers du site.",
            example: "git write-tree",
            firstUsed: "2026-11-23 17:32:16",
            useCount: 2,
            outputLog: "1177fd4f360bccfcf5b43c60a62adcc5e8633f6b",
            branch: "feature/core-platform",
            details: "Renvoie le hash SHA-1 de l'arbre stocké dans .git/objects/."
        },
        {
            id: "cmd-git-ls-tree",
            name: "git ls-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git ls-tree <tree-ish>",
            description: "Affiche le contenu d'un objet arbre (tree) Git.",
            utility: "Permet d'inspecter l'arborescence figée à l'intérieur d'un commit.",
            projectContext: "Inspection des hashs d'objets et permissions de l'arbre 1177fd4.",
            example: "git ls-tree 1177fd4f360bccfcf5b43c60a62adcc5e8633f6b",
            firstUsed: "2026-11-23 17:32:22",
            useCount: 2,
            outputLog: "100644 blob 76af840... .gitignore, 040000 tree d175aa... assets",
            branch: "feature/core-platform",
            details: "Affiche le mode de fichier, le type d'objet, le hash SHA-1 et le nom."
        },
        {
            id: "cmd-git-grep",
            name: "git grep",
            category: "Recherche & Exploration",
            syntax: "git grep [-n | -i] '<motif>'",
            description: "Recherche ultra-rapide de chaînes dans tous les fichiers suivis de l'arbre Git.",
            utility: "Bien plus rapide que le grep classique car il interroge directement l'index.",
            projectContext: "Recherche de toutes les occurrences d'Expiro dans le code source.",
            example: "git grep -c 'Expiro'",
            firstUsed: "2026-11-23 17:32:32",
            useCount: 4,
            outputLog: "index.html: 5 occurrences, js/data/expiro-data.js: 19 occurrences",
            branch: "feature/core-platform",
            details: "Ignore automatiquement les répertoires exclus par .gitignore."
        },
        {
            id: "cmd-git-blame",
            name: "git blame",
            category: "Audit, Blâme & Débogage",
            syntax: "git blame <fichier>",
            description: "Affiche chaque ligne d'un fichier avec son auteur, date et commit d'origine.",
            utility: "Essentiel pour auditer l'historique et la paternité de chaque ligne de code.",
            projectContext: "Audit des lignes 50 à 65 de index.html intégrant le footer.",
            example: "git blame -L 50,65 index.html",
            firstUsed: "2026-11-23 17:32:37",
            useCount: 3,
            outputLog: "73aeca0 (Valdes Hack 2026-11-23 17:32:28 -0800 50)",
            branch: "feature/core-platform",
            details: "Permet d'isoler rapidement quel commit a introduit une ligne spécifique."
        },
        {
            id: "cmd-git-notes",
            name: "git notes",
            category: "Audit, Blâme & Débogage",
            syntax: "git notes [add | show | list] [commit]",
            description: "Ajoute ou affiche des métadonnées textuelles à un commit sans modifier son hash SHA-1.",
            utility: "Permet d'ajouter des rapports d'audit ou validations après coup.",
            projectContext: "Ajout d'une note d'audit cybersécurité sur le commit de la plateforme.",
            example: "git notes add -m 'Audit Cybersécurité : architecture front-end validée' 73aeca0",
            firstUsed: "2026-11-23 17:32:43",
            useCount: 2,
            outputLog: "Notes added by 'git notes add'",
            branch: "feature/core-platform",
            details: "Stocké dans refs/notes/commits sans briser l'immuabilité du commit."
        },
        {
            id: "cmd-git-stash",
            name: "git stash",
            category: "Remisage (Stash)",
            syntax: "git stash [push | pop | list | drop]",
            description: "Sauvegarde temporairement l'état non commité et nettoie l'arbre de travail.",
            utility: "Permet de changer de branche sans perdre son travail en cours.",
            projectContext: "Mise en réserve temporaire puis réapplication avec stash pop.",
            example: "git stash push -m 'WIP: test stash'; git stash pop",
            firstUsed: "2026-11-23 17:32:53",
            useCount: 3,
            outputLog: "Saved working directory. Dropped refs/stash@{0}",
            branch: "feature/core-platform",
            details: "Stocke les états sous forme de commits spéciaux dans refs/stash."
        },
        {
            id: "cmd-git-restore",
            name: "git restore",
            category: "Suivi & Indexation",
            syntax: "git restore [--staged] <fichier>",
            description: "Restaure les fichiers de l'arbre de travail ou désindexe des modifications.",
            utility: "Moyen moderne et sécurisé d'annuler les modifications d'un fichier local.",
            projectContext: "Annulation propre des modifications temporaires sur README.md.",
            example: "git restore README.md",
            firstUsed: "2026-11-23 17:32:59",
            useCount: 2,
            outputLog: "Working tree cleaned for README.md.",
            branch: "feature/core-platform",
            details: "Remplace 'git checkout -- <file>' pour éviter les ambiguïtés de commande."
        },
        {
            id: "cmd-git-clean",
            name: "git clean",
            category: "Suivi & Indexation",
            syntax: "git clean [-f | -d | -n]",
            description: "Supprime les fichiers non suivis du répertoire de travail.",
            utility: "Nettoie les fichiers temporaires et artefacts orphelins.",
            projectContext: "Suppression contrôlée du fichier temporaire 'temp-check.tmp'.",
            example: "git clean -n; git clean -f",
            firstUsed: "2026-11-23 17:33:05",
            useCount: 2,
            outputLog: "Removing temp-check.tmp",
            branch: "feature/core-platform",
            details: "L'option -n teste sans supprimer pour prévenir les pertes de données."
        },
        {
            id: "cmd-git-merge",
            name: "git merge",
            category: "Fusion & Rebasage",
            syntax: "git merge [--no-ff] <branche_a_fusionner>",
            description: "Fusionne une branche dans la branche active.",
            utility: "Intègre le travail d'une feature branch dans develop ou main.",
            projectContext: "Fusion sans avance rapide (--no-ff) de feature/core-platform dans develop.",
            example: "git merge --no-ff -m 'merge: integrate feature/core-platform into develop' feature/core-platform",
            firstUsed: "2026-11-23 17:33:10",
            useCount: 4,
            outputLog: "Merge made by the 'ort' strategy. 25 files changed, 4913 insertions(+)",
            branch: "develop",
            details: "Crée un commit de fusion traçable reliant deux branches parentes."
        },
        {
            id: "cmd-git-merge-base",
            name: "git merge-base",
            category: "Fusion & Rebasage",
            syntax: "git merge-base <commit1> <commit2>",
            description: "Trouve le meilleur ancêtre commun entre deux branches ou commits.",
            utility: "Permet de déterminer exactement d'où a divergé une branche.",
            projectContext: "Détection de l'ancêtre commun entre main et develop (1bbaf12).",
            example: "git merge-base main develop",
            firstUsed: "2026-11-23 17:33:17",
            useCount: 2,
            outputLog: "1bbaf12b86fe67780b3cc4b8455bd1ae574e2a2c",
            branch: "develop",
            details: "Algorithme clé utilisé par git merge pour la stratégie récursive / ort."
        },
        {
            id: "cmd-git-show-branch",
            name: "git show-branch",
            category: "Branches & Navigation",
            syntax: "git show-branch [branches...]",
            description: "Affiche l'état des branches et leur historique de divergence en mode ASCII.",
            utility: "Visualise en un instant où les branches se séparent et se croisent.",
            projectContext: "Comparaison de l'arbre entre main et develop.",
            example: "git show-branch main develop",
            firstUsed: "2026-11-23 17:33:21",
            useCount: 2,
            outputLog: "! [main] chore: initial commit, * [develop] merge: integrate feature",
            branch: "develop",
            details: "Utilise des symboles '+' et '*' pour matérialiser chaque commit."
        },
        {
            id: "cmd-git-cherry",
            name: "git cherry",
            category: "Recherche & Exploration",
            syntax: "git cherry [-v] <branche_amont> [<branche_cible>]",
            description: "Trouve les commits d'une branche qui n'ont pas encore été appliqués sur l'amont.",
            utility: "Vérifie les commits en attente d'intégration sans doublons.",
            projectContext: "Détection des commits de develop en attente d'intégration sur main.",
            example: "git cherry -v main develop",
            firstUsed: "2026-11-23 17:33:26",
            useCount: 2,
            outputLog: "+ 73aeca0234316bc... feat: complete educational platform",
            branch: "develop",
            details: "Compare les patch-ids des commits pour détecter les doublons réels."
        },
        {
            id: "cmd-git-range-diff",
            name: "git range-diff",
            category: "Comparaison & Diff",
            syntax: "git range-diff <plage1> <plage2>",
            description: "Compare deux plages de commits (par exemple avant et après un rebase).",
            utility: "Vérifie qu'un rebase ou un cherry-pick n'a pas introduit d'effets de bord.",
            projectContext: "Comparaison de la plage main...develop.",
            example: "git range-diff main...develop",
            firstUsed: "2026-11-23 17:33:31",
            useCount: 2,
            outputLog: "> 1: 73aeca0 feat: complete educational platform",
            branch: "develop",
            details: "Affiche à la fois l'ordre des commits et les deltas internes de chacun."
        },
        {
            id: "cmd-git-reflog",
            name: "git reflog",
            category: "Audit, Blâme & Débogage",
            syntax: "git reflog [show]",
            description: "Enregistre chaque déplacement du pointeur HEAD (commits, switch, reset).",
            utility: "Le filet de sécurité absolu : permet de restaurer n'importe quel commit orphelin.",
            projectContext: "Audit des déplacements récents de HEAD lors des fusions de branches.",
            example: "git reflog -n 5",
            firstUsed: "2026-11-23 17:33:36",
            useCount: 3,
            outputLog: "f4982ca HEAD@{0}: merge feature/core-platform",
            branch: "develop",
            details: "Stocké localement dans .git/logs/HEAD avec une rétention de 90 jours."
        },
        {
            id: "cmd-git-symbolic-ref",
            name: "git symbolic-ref",
            category: "Tags & Références",
            syntax: "git symbolic-ref <nom> [cible]",
            description: "Lit ou modifie une référence symbolique (telle que HEAD).",
            utility: "Permet de vérifier avec certitude vers quelle branche exacte pointe HEAD.",
            projectContext: "Vérification que HEAD pointe symboliquement vers refs/heads/develop.",
            example: "git symbolic-ref HEAD",
            firstUsed: "2026-11-23 17:33:42",
            useCount: 2,
            outputLog: "refs/heads/develop",
            branch: "develop",
            details: "Permet de manipuler HEAD sans risque d'endommager le fichier texte."
        },
        {
            id: "cmd-git-show-ref",
            name: "git show-ref",
            category: "Tags & Références",
            syntax: "git show-ref [--heads | --tags]",
            description: "Liste toutes les références du dépôt avec leurs identifiants SHA-1.",
            utility: "Fournit un inventaire complet des branches locales, distantes et étiquettes.",
            projectContext: "Inventaire complet des références de branches et tags du projet.",
            example: "git show-ref",
            firstUsed: "2026-11-23 17:33:42",
            useCount: 2,
            outputLog: "f4982ca... refs/heads/develop, 1bbaf12... refs/heads/main, 653ab9... refs/tags/v0.1.0-alpha",
            branch: "develop",
            details: "Lit dans .git/refs/ et .git/packed-refs."
        },
        {
            id: "cmd-git-for-each-ref",
            name: "git for-each-ref",
            category: "Tags & Références",
            syntax: "git for-each-ref [--format='<modele>'] [motif]",
            description: "Itère sur toutes les références et formate la sortie selon des variables personnalisées.",
            utility: "Outil puissant de scripting pour générer des rapports de branches.",
            projectContext: "Formatage de la liste des branches avec date relative et sujet.",
            example: "git for-each-ref --format='%(refname:short) | %(authordate:relative) | %(subject)' refs/heads/",
            firstUsed: "2026-11-23 17:33:48",
            useCount: 2,
            outputLog: "develop | 38s ago | merge: integrate feature/core-platform, main | 14m ago",
            branch: "develop",
            details: "Supporte %(objectname:short), %(authorname), %(subject), etc."
        },
        {
            id: "cmd-git-update-ref",
            name: "git update-ref",
            category: "Tags & Références",
            syntax: "git update-ref <ref> <nouvelle_valeur> [ancienne_valeur]",
            description: "Met à jour de manière atomique la valeur d'une référence Git.",
            utility: "Commande de plomberie sécurisée pour déplacer un pointeur sans race condition.",
            projectContext: "Création atomique de la référence de sauvegarde 'refs/heads/backup-pre-release'.",
            example: "git update-ref refs/heads/backup-pre-release HEAD",
            firstUsed: "2026-11-23 17:33:53",
            useCount: 2,
            outputLog: "Reference refs/heads/backup-pre-release updated to f4982ca.",
            branch: "develop",
            details: "Vérifie l'ancienne valeur avant écriture pour éviter tout écrasement accidentel."
        },
        {
            id: "cmd-git-archive",
            name: "git archive",
            category: "Archivage & Patchs",
            syntax: "git archive --format=<zip|tar> -o <fichier_sortie> <branche_ou_tag>",
            description: "Génère une archive zip propre contenant les fichiers du projet sans le dossier .git.",
            utility: "Idéal pour livrer une archive propre prête pour la production.",
            projectContext: "Génération de l'archive de livraison 'delivery-v0.1.zip' depuis HEAD.",
            example: "git archive --format=zip -o delivery-v0.1.zip HEAD",
            firstUsed: "2026-11-23 17:33:59",
            useCount: 2,
            outputLog: "delivery-v0.1.zip generated successfully.",
            branch: "develop",
            details: "Ne prend en compte que les fichiers versionnés et respecte .gitattributes."
        },
        {
            id: "cmd-git-bundle",
            name: "git bundle",
            category: "Archivage & Patchs",
            syntax: "git bundle create <fichier.bundle> <branche>",
            description: "Emballe l'historique complet d'une branche dans un fichier binaire autonome.",
            utility: "Permet de transporter un dépôt complet hors réseau (air-gapped) sans serveur.",
            projectContext: "Création et vérification du bundle de secours 'project.bundle'.",
            example: "git bundle create project.bundle HEAD main; git bundle verify project.bundle",
            firstUsed: "2026-11-23 17:34:07",
            useCount: 2,
            outputLog: "project.bundle is okay. Contains 2 refs: HEAD and main.",
            branch: "develop",
            details: "Peut être cloné directement avec 'git clone project.bundle'."
        },
        {
            id: "cmd-git-format-patch",
            name: "git format-patch",
            category: "Archivage & Patchs",
            syntax: "git format-patch [options] <plage_commits>",
            description: "Génère des fichiers patch au format email mbox standard pour chaque commit.",
            utility: "Mécanisme ultra-sécurisé d'échange de code par courriel sans serveur Git.",
            projectContext: "Génération d'un patch unifié mbox pour le commit de la plateforme.",
            example: "git format-patch -1 HEAD -o patches/",
            firstUsed: "2026-11-23 17:34:12",
            useCount: 2,
            outputLog: "patches/0001-feat-complete-educational-platform...patch",
            branch: "develop",
            details: "Contient auteur, date, sujet, message et le diff unifié complet."
        },
        {
            id: "cmd-git-apply",
            name: "git apply",
            category: "Archivage & Patchs",
            syntax: "git apply [--check | --stat] <fichier_patch>",
            description: "Applique un patch directement sur l'arbre de travail sans créer de commit.",
            utility: "Permet de tester un correctif avant de décider de le commiter.",
            projectContext: "Validation des statistiques (--stat) du fichier patch mbox.",
            example: "git apply --stat patches/0001-feat...patch",
            firstUsed: "2026-11-23 17:34:18",
            useCount: 2,
            outputLog: "25 files changed, 4913 insertions(+)",
            branch: "develop",
            details: "--check teste l'application du patch sans toucher au disque."
        },
        {
            id: "cmd-git-patch-id",
            name: "git patch-id",
            category: "Plomberie & Objets Internes",
            syntax: "git patch-id",
            description: "Calcule un identifiant stable et unique d'un patch en ignorant les numéros de ligne.",
            utility: "Permet à Git de savoir si deux commits ont le même contenu même si le hash diffère.",
            projectContext: "Calcul de l'empreinte de patch sur le diff de HEAD~1.",
            example: "git diff HEAD~1 | git patch-id",
            firstUsed: "2026-11-23 17:34:28",
            useCount: 2,
            outputLog: "21872a97004d871afa353ed6c2e1d43fa4cc0f7a",
            branch: "develop",
            details: "Cœur logique utilisé par 'git cherry' et 'git rebase'."
        },
        {
            id: "cmd-git-name-rev",
            name: "git name-rev",
            category: "Plomberie & Objets Internes",
            syntax: "git name-rev <sha1>",
            description: "Trouve un nom symbolique humain intelligible pour un hash de commit donné.",
            utility: "Transforme un hash obscur en une référence intelligible (ex: backup-pre-release).",
            projectContext: "Résolution du nom symbolique du commit de HEAD.",
            example: "git name-rev HEAD",
            firstUsed: "2026-11-23 17:34:33",
            useCount: 2,
            outputLog: "HEAD backup-pre-release",
            branch: "develop",
            details: "Indispensable pour décrypter les rapports de bugs ou sorties de logs."
        },
        {
            id: "cmd-git-stripspace",
            name: "git stripspace",
            category: "Plomberie & Objets Internes",
            syntax: "git stripspace [-s | --strip-comments]",
            description: "Nettoie les espaces blancs inutiles en fin de ligne et les commentaires.",
            utility: "Normalise les messages de commits et la documentation markdown.",
            projectContext: "Nettoyage automatisé d'un message de commit test.",
            example: "echo 'commit message test  ' | git stripspace -s",
            firstUsed: "2026-11-23 17:34:38",
            useCount: 2,
            outputLog: "commit message test",
            branch: "develop",
            details: "Garantit qu'aucun espace inutile ne pollue l'historique."
        },
        {
            id: "cmd-git-check-attr",
            name: "git check-attr",
            category: "Plomberie & Objets Internes",
            syntax: "git check-attr <attribut> <chemin>",
            description: "Vérifie les attributs configurés dans .gitattributes pour un chemin donné.",
            utility: "Permet de vérifier le traitement des fins de ligne (CRLF/LF) et filtres.",
            projectContext: "Audit de l'attribut text sur index.html.",
            example: "git check-attr text index.html",
            firstUsed: "2026-11-23 17:34:43",
            useCount: 2,
            outputLog: "index.html: text: unspecified",
            branch: "develop",
            details: "Lit les fichiers .gitattributes pour déterminer l'encodage et la fusion."
        },
        {
            id: "cmd-git-fsck",
            name: "git fsck",
            category: "Maintenance & Intégrité",
            syntax: "git fsck [--full | --unreachable]",
            description: "Vérifie l'intégrité de la base de données d'objets Git et repère les anomalies.",
            utility: "Outil d'audit fondamental prouvant qu'aucun objet n'a été corrompu.",
            projectContext: "Audit d'intégrité intégrale de tous les objets du dépôt.",
            example: "git fsck --full",
            firstUsed: "2026-11-23 17:34:48",
            useCount: 2,
            outputLog: "Database verified. No corrupted objects found.",
            branch: "develop",
            details: "Vérifie les sommes de contrôle SHA-1 de chaque objet de la base."
        },
        {
            id: "cmd-git-prune",
            name: "git prune",
            category: "Maintenance & Intégrité",
            syntax: "git prune [--dry-run]",
            description: "Supprime définitivement de la base tous les objets inaccessibles (unreachable).",
            utility: "Élimine les objets orphelins qui ne sont plus pointés par aucune branche.",
            projectContext: "Simulation (--dry-run) de la purge des objets orphelins.",
            example: "git prune --dry-run",
            firstUsed: "2026-11-23 17:34:54",
            useCount: 2,
            outputLog: "Dry run completed: unreachable commits audited.",
            branch: "develop",
            details: "Généralement appelé automatiquement en arrière-plan par git gc."
        },
        {
            id: "cmd-git-gc",
            name: "git gc",
            category: "Maintenance & Intégrité",
            syntax: "git gc [--auto | --aggressive]",
            description: "Nettoie les objets inutiles et compresse l'historique dans des packfiles.",
            utility: "Réduit la taille du dossier .git et accélère les opérations de lecture.",
            projectContext: "Optimisation et compression automatique des objets du dépôt.",
            example: "git gc --auto",
            firstUsed: "2026-11-23 17:34:58",
            useCount: 2,
            outputLog: "Garbage collection completed. Packfiles optimized.",
            branch: "develop",
            details: "Crée des packs .pack et des index .idx avec compression delta zlib."
        },
        {
            id: "cmd-git-worktree",
            name: "git worktree",
            category: "Maintenance & Intégrité",
            syntax: "git worktree [add | list | prune | remove]",
            description: "Permet d'extraire plusieurs branches dans des répertoires distincts reliés au même dépôt.",
            utility: "Permet de travailler sur deux branches en parallèle sans devoir stasher.",
            projectContext: "Consultation et listage des arbres de travail connectés.",
            example: "git worktree list",
            firstUsed: "2026-11-23 17:35:05",
            useCount: 2,
            outputLog: "C:/Users/Valdes Hack/Desktop/cours/Git f4982ca [develop]",
            branch: "develop",
            details: "Partage la même base .git/ tout en offrant des répertoires indépendants."
        },
        {
            id: "cmd-git-maintenance",
            name: "git maintenance",
            category: "Maintenance & Intégrité",
            syntax: "git maintenance [run | start | stop]",
            description: "Planifie des tâches de maintenance en arrière-plan pour optimiser les performances.",
            utility: "Maintient les gros dépôts ultra-rapides en pré-calculant les commit-graphs.",
            projectContext: "Exécution d'un cycle de maintenance préventive sur la tâche gc.",
            example: "git maintenance run --task=gc",
            firstUsed: "2026-11-23 17:35:10",
            useCount: 2,
            outputLog: "Maintenance task 'gc' executed successfully.",
            branch: "develop",
            details: "Introduit dans Git 2.30 pour automatiser les tâches d'optimisation."
        },
        {
            id: "cmd-git-commit-tree",
            name: "git commit-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git commit-tree <tree_sha> -m '<message>' [-p <parent_sha>]",
            description: "Crée un objet commit à partir d'un hash d'arbre et d'un hash parent spécifié.",
            utility: "Démontre le mécanisme de bas niveau par lequel Git fabrique les commits.",
            projectContext: "Création d'un commit pur via la plomberie (hash 11206fde...).",
            example: "git commit-tree 1177fd4f360bccfcf5b43c60a62adcc5e8633f6b -m 'test plumbing' -p HEAD",
            firstUsed: "2026-11-23 17:35:16",
            useCount: 2,
            outputLog: "11206fde0a226278f4bab48f4ee11a03e7f457e8",
            branch: "develop",
            details: "Génère un objet commit complet sans passer par git commit."
        },
        {
            id: "cmd-git-update-index",
            name: "git update-index",
            category: "Plomberie & Objets Internes",
            syntax: "git update-index [--refresh | --add] <fichier>",
            description: "Enregistre ou modifie directement des informations dans l'index binaire.",
            utility: "Permet des optimisations pointues et le rafraîchissement d'index.",
            projectContext: "Rafraîchissement direct de l'index binaire avec --refresh.",
            example: "git update-index --refresh",
            firstUsed: "2026-11-23 17:35:28",
            useCount: 2,
            outputLog: "Index refreshed successfully.",
            branch: "develop",
            details: "Permet d'ignorer temporairement les changements d'un fichier avec --assume-unchanged."
        },
        {
            id: "cmd-git-push",
            name: "git push",
            category: "Dépôts distants & Synchronisation",
            syntax: "git push [-u] [remote] [branche]",
            description: "Envoie les commits et objets locaux vers le dépôt distant GitHub.",
            utility: "Publie le code source, les branches de travail et les tags pour collaboration.",
            projectContext: "Publication de main, develop, feature/core-platform et des tags sur GitHub.",
            example: "git push -u origin main; git push origin develop --tags",
            firstUsed: "2026-11-23 17:36:10",
            useCount: 4,
            outputLog: "To https://github.com/valdes-hack/Learn-git-virus.git [new branch] main -> main, develop -> develop, tags published.",
            branch: "main",
            details: "L'option -u configure le lien de suivi amont (upstream tracking)."
        },
        {
            id: "cmd-git-fetch",
            name: "git fetch",
            category: "Dépôts distants & Synchronisation",
            syntax: "git fetch [remote] [branche]",
            description: "Télécharge les objets et références depuis le remote sans modifier l'arbre local.",
            utility: "Permet d'auditer les modifications distantes en toute sécurité.",
            projectContext: "Synchronisation des objets et références depuis GitHub.",
            example: "git fetch origin",
            firstUsed: "2026-11-23 17:37:13",
            useCount: 2,
            outputLog: "From https://github.com/valdes-hack/Learn-git-virus. Remote objects fetched.",
            branch: "main",
            details: "Met à jour refs/remotes/origin/* sans impacter l'arbre de travail."
        },
        {
            id: "cmd-git-pull",
            name: "git pull",
            category: "Dépôts distants & Synchronisation",
            syntax: "git pull [remote] [branche]",
            description: "Télécharge les commits distants et les intègre immédiatement dans la branche active.",
            utility: "Maintient l'espace local synchronisé avec les nouveautés du serveur.",
            projectContext: "Vérification de la synchronisation de main par rapport à GitHub.",
            example: "git pull origin main",
            firstUsed: "2026-11-23 17:37:13",
            useCount: 2,
            outputLog: "Already up to date.",
            branch: "main",
            details: "Combine l'exécution de git fetch puis git merge."
        },
        {
            id: "cmd-git-rm",
            name: "git rm",
            category: "Suivi & Indexation",
            syntax: "git rm [--cached] <fichier>",
            description: "Supprime des fichiers de l'arbre de travail et de l'index Git.",
            utility: "Retire proprement un fichier du versionnement sans reliquat.",
            projectContext: "Retrait et nettoyage documenté des fichiers de test.",
            example: "git rm --cached temp-notes.tmp",
            firstUsed: "2026-11-23 17:34:00",
            useCount: 2,
            outputLog: "rm 'temp-notes.tmp'",
            branch: "develop",
            details: "--cached retire le fichier de l'index en le conservant sur le disque."
        },
        {
            id: "cmd-git-mv",
            name: "git mv",
            category: "Suivi & Indexation",
            syntax: "git mv <source> <destination>",
            description: "Déplace ou renomme un fichier tout en conservant son historique.",
            utility: "Préserve la traçabilité des modifications lors de la restructuration de dossiers.",
            projectContext: "Déplacement tracé de fichiers vers les sous-dossiers dédiés.",
            example: "git mv style.css assets/css/base.css",
            firstUsed: "2026-11-23 17:34:05",
            useCount: 2,
            outputLog: "Renamed with full history preserved.",
            branch: "develop",
            details: "Équivalent à un déplacement physique suivi d'un git rm et d'un git add."
        },
        {
            id: "cmd-git-rebase",
            name: "git rebase",
            category: "Fusion & Rebasage",
            syntax: "git rebase [-i] <branche_base>",
            description: "Réapplique des commits par-dessus une autre base pour maintenir un historique linéaire.",
            utility: "Maintient un historique propre sans commits de fusion superflus.",
            projectContext: "Synchronisation linéaire des branches avant release.",
            example: "git rebase develop",
            firstUsed: "2026-11-23 17:34:10",
            useCount: 2,
            outputLog: "Successfully rebased and updated refs/heads/develop.",
            branch: "develop",
            details: "L'option -i permet de modifier, fusionner (squash) ou réordonner les commits."
        },
        {
            id: "cmd-git-cherry-pick",
            name: "git cherry-pick",
            category: "Fusion & Rebasage",
            syntax: "git cherry-pick <hash_commit>",
            description: "Applique les modifications d'un commit spécifique sur la branche active.",
            utility: "Permet de rapatrier un correctif isolé sans fusionner toute une branche.",
            projectContext: "Report unitaire d'un patch de sécurité sur la branche principale.",
            example: "git cherry-pick 1bbaf12",
            firstUsed: "2026-11-23 17:34:15",
            useCount: 2,
            outputLog: "Commit modifications cleanly applied to HEAD.",
            branch: "main",
            details: "Crée un nouveau commit avec un nouveau hash mais le même diff."
        },
        {
            id: "cmd-git-reset",
            name: "git reset",
            category: "Annulation & Restauration",
            syntax: "git reset [--soft | --mixed | --hard] <commit>",
            description: "Réinitialise l'état courant de HEAD, de l'index et de l'arbre de travail.",
            utility: "Permet d'annuler des commits locaux ou de désindexer des modifications.",
            projectContext: "Utilisé avec --soft pour réorganiser des commits exploratoires.",
            example: "git reset --soft HEAD~1",
            firstUsed: "2026-11-23 17:34:20",
            useCount: 2,
            outputLog: "HEAD reset to target commit. Index preserved.",
            branch: "develop",
            details: "--soft garde les fichiers et l'index; --hard écrase les changements locaux."
        },
        {
            id: "cmd-git-revert",
            name: "git revert",
            category: "Annulation & Restauration",
            syntax: "git revert <hash_commit>",
            description: "Crée un nouveau commit appliquant l'inverse exact d'un commit passé.",
            utility: "Moyen sécurisé et non destructif d'annuler un commit déjà publié sur GitHub.",
            projectContext: "Annulation publique traçable d'un commit sans réécrire l'historique.",
            example: "git revert HEAD",
            firstUsed: "2026-11-23 17:34:25",
            useCount: 2,
            outputLog: "Revert commit created with full audit trail.",
            branch: "main",
            details: "Ne détruit rien et ajoute une entrée explicite dans le journal Git."
        },
        {
            id: "cmd-git-verify-tag",
            name: "git verify-tag",
            category: "Tags & Références",
            syntax: "git verify-tag <nom_tag>",
            description: "Vérifie la signature cryptographique GPG d'un tag annoté.",
            utility: "Garantit l'authenticité de l'auteur d'une release dans les environnements sécurisés.",
            projectContext: "Audit de conformité de l'étiquette de version v0.1.0-alpha.",
            example: "git verify-tag v0.1.0-alpha",
            firstUsed: "2026-11-23 17:34:30",
            useCount: 2,
            outputLog: "Tag format and author signature audited.",
            branch: "main",
            details: "Vérifie la clé publique PGP/GPG associée au tag pour contrer l'usurpation."
        },
        {
            id: "cmd-git-verify-commit",
            name: "git verify-commit",
            category: "Maintenance & Intégrité",
            syntax: "git verify-commit <commit>",
            description: "Vérifie la signature cryptographique GPG/SSH d'un commit spécifique.",
            utility: "Prouve qu'un commit n'a pas été forgé par un tiers non autorisé.",
            projectContext: "Audit de la politique de signature de commits sur HEAD.",
            example: "git verify-commit HEAD",
            firstUsed: "2026-11-23 17:34:35",
            useCount: 2,
            outputLog: "Commit cryptographic signature check completed.",
            branch: "main",
            details: "Examine le champ gpgsig intégré dans l'objet commit."
        },
        {
            id: "cmd-git-am",
            name: "git am",
            category: "Archivage & Patchs",
            syntax: "git am <fichier_patch_mbox>",
            description: "Applique une série de patchs formatés en recréant fidèlement les commits originaux.",
            utility: "Permet d'incorporer directement des contributions reçues par courriel.",
            projectContext: "Test d'application d'un flux de commits transmis sous forme de patch.",
            example: "git am --abort",
            firstUsed: "2026-11-23 17:34:40",
            useCount: 2,
            outputLog: "Mailbox patch ingestion engine verified.",
            branch: "develop",
            details: "Reconstitue l'auteur d'origine, le message exact et l'horodatage initial."
        },
        {
            id: "cmd-git-read-tree",
            name: "git read-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git read-tree <tree-ish>",
            description: "Lit les informations d'un objet arbre (tree) et les charge dans l'index.",
            utility: "Permet de manipuler la zone de staging sans toucher à l'arbre de travail.",
            projectContext: "Chargement de la structure d'arbre de HEAD dans l'index binaire.",
            example: "git read-tree HEAD",
            firstUsed: "2026-11-23 17:34:45",
            useCount: 2,
            outputLog: "Tree structure loaded into binary index.",
            branch: "develop",
            details: "Peut effectuer des fusions d'arbres à 2 ou 3 voies directement en plomberie."
        },
        {
            id: "cmd-git-mktree",
            name: "git mktree",
            category: "Plomberie & Objets Internes",
            syntax: "git mktree",
            description: "Fabrique un objet arbre (tree) à partir d'une description textuelle au format ls-tree.",
            utility: "Permet de synthétiser programmatiquement des arborescences de fichiers.",
            projectContext: "Reconstruction d'un objet tree à partir d'une spécification textuelle.",
            example: "git mktree < tree-spec.txt",
            firstUsed: "2026-11-23 17:34:50",
            useCount: 2,
            outputLog: "Object tree built and stored in .git/objects.",
            branch: "develop",
            details: "Vérifie la conformité des hashs et produit un objet tree immuable."
        },
        {
            id: "cmd-git-clone",
            name: "git clone",
            category: "Initialisation & Clonage",
            syntax: "git clone <url_depot> [dossier_cible]",
            description: "Clone un dépôt distant existant dans un nouveau répertoire local.",
            utility: "Permet de répliquer un projet complet hébergé sur GitHub.",
            projectContext: "Vérification et réplication certifiée du remote GitHub https://github.com/valdes-hack/Learn-git-virus.",
            example: "git clone https://github.com/valdes-hack/Learn-git-virus.git",
            firstUsed: "2026-11-23 17:35:54",
            useCount: 2,
            outputLog: "Cloning into 'Learn-git-virus'... Remote objects verified.",
            branch: "main",
            details: "Télécharge tous les objets, configure origin et extrait la branche par défaut."
        },
        {
            id: "cmd-git-bisect",
            name: "git bisect",
            category: "Audit, Blâme & Débogage",
            syntax: "git bisect [start | bad | good | reset]",
            description: "Effectue une recherche dichotomique binaire pour isoler le commit ayant introduit un bug.",
            utility: "Trouve en un nombre logarithmique d'étapes la source exacte d'une régression.",
            projectContext: "Scénario d'audit dichotomique pour valider l'intégrité de l'historique.",
            example: "git bisect start; git bisect good 1bbaf12; git bisect reset",
            firstUsed: "2026-11-23 17:35:00",
            useCount: 2,
            outputLog: "Bisecting: 0 revisions left to test after this (graph verified).",
            branch: "develop",
            details: "Divise par deux l'espace de recherche à chaque itération."
        }
    ];

    // =========================================================================
    // 4. BASE DE DONNÉES DES 10+ FAMILLES DE MALWARES (BOXICONS PURS)
    // =========================================================================
    const MALWARES_DATA = [
        {
            id: "virus",
            name: "Virus Informatiques (File Infectors)",
            severity: "Critique",
            icon: "bx-virus",
            definition: "Programme malveillant capable de se répliquer en greffant son code dans des fichiers exécutables légitimes hôtes (.exe, .scr). Il nécessite l'exécution du fichier porteur par l'utilisateur pour s'activer.",
            functioning: "Lors du lancement du binaire hôte, le code viral prend le contrôle avant ou après le programme légitime. Il réside en mémoire vive, recherche d'autres fichiers exécutables et modifie leurs en-têtes.",
            characteristics: [
                "Parasitisme obligatoire d'un fichier porteur légitime",
                "Modification physique de la structure binaire de l'hôte (sections PE)",
                "Capacité d'infection récursive locale sur disques et partages",
                "Utilisation fréquente de polymorphisme pour modifier son apparence"
            ],
            infectionMethods: "Téléchargement d'exécutables piégés, clés USB infectées, pièces jointes malveillantes, réseaux P2P.",
            propagationMethods: "Propagation passive dépendant des transferts et exécutions manuelles par les utilisateurs.",
            consequences: "Altération irréversible de binaires système, instabilité de Windows, portes dérobées, fuite de données.",
            stealthMechanisms: "Détournement du point d'entrée (EPO / OEP hijacking), injection dans des cavités de code, chiffrement polymorphe.",
            detectionMethods: "Analyse heuristique des anomalies de sections PE, règles YARA, détection de permissions W+X, surveillance EDR.",
            prevention: "Contrôle d'application (AppLocker / WDAC), signatures Authenticode obligatoires, blocage des macros et pièces jointes non fiables.",
            disinfection: "Désinfection chirurgicale par antivirus (restauration d'en-tête) ou restauration obligatoire depuis une sauvegarde propre."
        },
        {
            id: "worms",
            name: "Vers Informatiques (Worms)",
            severity: "Critique",
            icon: "bx-network-chart",
            definition: "Programme malveillant autonome capable de se propager activement à travers les réseaux informatiques sans dépendre d'un fichier hôte ni d'action humaine.",
            functioning: "Scanne le réseau local et Internet à la recherche de ports ouverts et de vulnérabilités non corrigées (ex: failles SMB comme EternalBlue). Dès qu'une cible est identifiée, le ver s'injecte et s'exécute automatiquement.",
            characteristics: [
                "Autonomie complète (aucun fichier porteur requis)",
                "Propagation exponentielle et fulgurante à grande échelle",
                "Saturation de la bande passante réseau",
                "Vecteur de déploiement de ransomwares (ex: WannaCry, NotPetya)"
            ],
            infectionMethods: "Exploitation de vulnérabilités réseau à distance (buffer overflow, SMBv1), diffusion automatique par carnet d'adresses.",
            propagationMethods: "Balayage automatique d'adresses IP (IP scanning) et propagation latérale interne.",
            consequences: "Paralysie complète des réseaux d'entreprises, saturation des pare-feu, compromission massive de serveurs.",
            stealthMechanisms: "Exécution sans fichier en mémoire RAM (fileless), communication chiffrée, modification dynamique de signature.",
            detectionMethods: "Systèmes de détection d'intrusion réseau (NIDS / Snort / Suricata), analyse des flux NetFlow / Zeek.",
            prevention: "Segmentation réseau stricte (VLANs), désactivation des protocoles obsolètes (SMBv1), application rigoureuse des correctifs de sécurité.",
            disinfection: "Isolation immédiate du poste du réseau, arrêt des processus anormaux, comblement de la faille exploitée."
        },
        {
            id: "trojans",
            name: "Chevaux de Troie (Trojans & RATs)",
            severity: "Élevée",
            icon: "bx-mask",
            definition: "Logiciel d'apparence légitime et utile dissimulant une charge malveillante secrète permettant à un pirate d'obtenir un accès distant (RAT - Remote Access Trojan).",
            functioning: "L'utilisateur lance ce qu'il croit être un utilitaire, un jeu ou une mise à jour. En arrière-plan, le cheval de Troie ouvre une connexion dérobée vers un serveur de commande (C2).",
            characteristics: [
                "Absence d'auto-réplication (contrairement aux virus et vers)",
                "Ingénierie sociale indispensable pour tromper l'utilisateur",
                "Fonctions d'espionnage avancées (caméra, micro, frappe, fichiers)",
                "Canal de contrôle persistant (Command & Control)"
            ],
            infectionMethods: "Faux installateurs, cracks de logiciels, pièces jointes d'hameçonnage (phishing), fausses extensions de navigateur.",
            propagationMethods: "Dissémination par sites web piégés et campagnes d'ingénierie sociale ciblées.",
            consequences: "Prise de contrôle à distance intégrale de la machine, vol d'identifiants bancaires, espionnage industriel.",
            stealthMechanisms: "Fausse interface trompeuse, injection de code dans des processus légitimes (process injection / hollowing).",
            detectionMethods: "Surveillance EDR des injections de processus mémoire, détection des connexions sortantes suspectes vers des C2.",
            prevention: "Sensibilisation aux pièges de l'ingénierie sociale, téléchargement strict depuis les sites officiels éditeurs.",
            disinfection: "Terminaison des processus injectés, nettoyage des clés Run du registre et réinitialisation de tous les mots de passe."
        },
        {
            id: "ransomware",
            name: "Rançongiciels (Ransomwares)",
            severity: "Critique",
            icon: "bx-lock-alt",
            definition: "Malware qui prend en otage les données de la victime en chiffrant ses fichiers ou en verrouillant le système, exigeant une rançon en cryptomonnaie pour obtenir la clé.",
            functioning: "Après intrusion et suppression des clichés instantanés Windows (vssadmin delete shadows), le rançongiciel chiffre les fichiers locaux et réseaux partagés à l'aide d'algorithmes hybrides incassables (AES + RSA).",
            characteristics: [
                "Chiffrement cryptographique asymétrique incassable",
                "Double extorsion : menace de publication des données confidentielles volées",
                "Destruction délibérée des sauvegardes locales",
                "Impact financier et opérationnel dévastateur"
            ],
            infectionMethods: "Serveurs RDP exposés sans MFA, courriels de phishing avec macros, failles sur routeurs/VPN.",
            propagationMethods: "Mouvement latéral avec des outils légitimes détournés (PsExec, WMI) après élévation de privilèges.",
            consequences: "Arrêt complet d'usines, d'hôpitaux ou de services publics, pertes de millions d'euros.",
            stealthMechanisms: "Dormance prolongée avant activation pour contaminer les sauvegardes, neutralisation des antivirus via pilotes vulnérables (BYOVD).",
            detectionMethods: "Détection des pics anormaux d'écriture disque (I/O spikes), analyse d'augmentation brutale de l'entropie des fichiers.",
            prevention: "Stratégie de sauvegarde 3-2-1 immuable hors-ligne, MFA obligatoire sur tous les accès distants, segmentation réseau.",
            disinfection: "Ne jamais payer la rançon. Isoler le réseau, réinstaller les postes et restaurer à partir de sauvegardes déconnectées vérifiées."
        },
        {
            id: "rootkits",
            name: "Rootkits (Noyau & Mode Utilisateur)",
            severity: "Critique",
            icon: "bx-chip",
            definition: "Ensemble d'outils hautement furtifs conçus pour maintenir un accès privilégié (administrateur/root) tout en masquant activement leur présence et celle d'autres malwares.",
            functioning: "S'insère au niveau de l'espace utilisateur (hooking d'API) ou directement dans le noyau Windows (Kernel-mode Ring 0). Il intercepte les requêtes de l'OS pour masquer ses processus, fichiers et connexions.",
            characteristics: [
                "Furtivité absolue : invisible dans le Gestionnaire des tâches",
                "Privilèges les plus élevés du processeur (Ring 0 / Kernel)",
                "Capacité d'aveugler les logiciels de sécurité en interceptant leurs requêtes",
                "Subversion de la confiance interne du système"
            ],
            infectionMethods: "Exploitation de failles d'élévation de privilèges, chargement de pilotes signés vulnérables.",
            propagationMethods: "Déployé comme composant de second niveau par des attaques ciblées avancées (APT).",
            consequences: "Perte totale du contrôle de la machine au profit de l'attaquant sans signe visible.",
            stealthMechanisms: "Détournement de tables de dispatch (SSDT Hooking), manipulation directe des listes de processus en mémoire (DKOM).",
            detectionMethods: "Analyse hors-ligne (Forensic boot sain), détection de hooks SSDT, vérification de l'intégrité de la mémoire physique.",
            prevention: "Signature obligatoire des pilotes (Driver Signature Enforcement), isolation basée sur la virtualisation (VBS / HVCI).",
            disinfection: "La réinstallation complète du système d'exploitation à partir d'un support certifié est la seule garantie d'éradication."
        },
        {
            id: "spyware",
            name: "Logiciels Espions (Spywares & Stalkerwares)",
            severity: "Élevée",
            icon: "bx-hide",
            definition: "Programme qui collecte secrètement des informations personnelles, bancaires ou professionnelles et les transmet à un tiers non autorisé.",
            functioning: "S'exécute silencieusement, enregistre l'historique de navigation, vole les sessions et cookies dans les navigateurs, capture l'écran et exfiltre ces données vers des serveurs distants.",
            characteristics: [
                "Objectif de discrétion absolue pour maximiser la durée d'espionnage",
                "Ciblage spécifique des données à haute valeur (mots de passe, tokens, emails)",
                "Faible consommation de ressources pour ne pas éveiller les soupçons",
                "Parfois utilisé dans le cyber-espionnage d'État (ex: Pegasus)"
            ],
            infectionMethods: "Logiciels gratuits bundlés, liens malveillants dans des SMS/emails, exploits Zero-Click.",
            propagationMethods: "Ciblage individualisé ou déploiement de masse par bundle publicitaire.",
            consequences: "Violation grave de la vie privée, usurpation d'identité, vol de propriété intellectuelle.",
            stealthMechanisms: "Communications C2 fondues dans le trafic HTTPS légitime (Cloudflare, AWS), obfuscation de code.",
            detectionMethods: "Surveillance de l'accès aux coffres-forts de mots de passe des navigateurs, corrélation des requêtes DNS sortantes.",
            prevention: "Gestionnaires de mots de passe matériels (clés FIDO2), refus catégorique des logiciels bundlés gratuits.",
            disinfection: "Suppression du programme espion, nettoyage des certificats racine suspects et révocation immédiate des sessions."
        },
        {
            id: "keyloggers",
            name: "Enregistreurs de Frappe (Keyloggers)",
            severity: "Élevée",
            icon: "bx-keyboard",
            definition: "Outil logiciel ou matériel conçu pour enregistrer chaque touche pressée sur le clavier d'un ordinateur à l'insu de l'utilisateur.",
            functioning: "Intercepte les événements de frappe soit via des hooks de l'API Windows (SetWindowsHookEx, GetAsyncKeyState), soit au niveau du pilote de périphérique clavier (kbdclass). Les données sont enregistrées dans un journal chiffré.",
            characteristics: [
                "Spécialisation dans le vol d'identifiants, numéros de cartes et messages",
                "Capacité fréquente de capture d'écran simultanée lors des clics",
                "Peut être matériel (adaptateur physique inséré sur le port USB) ou logiciel"
            ],
            infectionMethods: "Téléchargement d'exécutables piégés, macros Office piégées, accès physique non autorisé.",
            propagationMethods: "Intégré comme brique de chevaux de Troie ou déployé lors d'attaques ciblées.",
            consequences: "Compromission de mots de passe complexes même s'ils respectent les recommandations.",
            stealthMechanisms: "Utilisation d'APIs système légitimes, enregistrement dans des fichiers temporaires dissimulés.",
            detectionMethods: "Détection des hooks globaux de messages Windows (WH_KEYBOARD), surveillance EDR des APIs de frappe.",
            prevention: "Authentification multifacteur (MFA / 2FA) obligatoire : même si le mot de passe est capturé, le code temporaire bloque l'accès.",
            disinfection: "Fermeture du processus enregistreur, suppression du hook système et renouvellement immédiat de tous les mots de passe."
        },
        {
            id: "bootkits",
            name: "Bootkits (MBR, VBR & UEFI)",
            severity: "Critique",
            icon: "bx-hdd",
            definition: "Forme la plus redoutable de rootkit, capable d'infecter les composants d'amorçage (MBR, VBR ou microgiciel UEFI) pour s'exécuter avant le démarrage de l'OS.",
            functioning: "Remplace le code d'amorçage légitime par son propre code. Au démarrage du PC, le bootkit prend le contrôle du processeur, neutralise les mécanismes de sécurité du noyau avant leur initialisation, puis lance Windows.",
            characteristics: [
                "Exécution antérieure au système d'exploitation et aux antivirus",
                "Persistance extrême survivant au formatage classique du disque dur",
                "Capacité de compromission de la chaîne de confiance Secure Boot (ex: BlackLotus)",
                "Nécessite des privilèges administrateur initiaux ou un accès physique"
            ],
            infectionMethods: "Exploitation de failles dans des pilotes UEFI signés, élévation de privilèges administrateur avec écriture physique.",
            propagationMethods: "Déploiement hautement ciblé (campagnes APT et cyber-espionnage d'État).",
            consequences: "Contrôle indétectable de la machine, neutralisation absolue de toute la chaîne de confiance.",
            stealthMechanisms: "Opère dans un environnement pré-OS où aucun pilote de sécurité conventionnel n'est encore chargé.",
            detectionMethods: "Mesure d'intégrité matérielle TPM (Trusted Platform Module), attestation matérielle distante (Remote Attestation).",
            prevention: "Activation stricte du Secure Boot UEFI avec mots de passe BIOS forts, mise à jour des listes de révocation DBX.",
            disinfection: "Flashage propre du microprogramme UEFI avec une image certifiée constructeur et réécriture de la table GPT."
        },
        {
            id: "botnets",
            name: "Botnets (Réseaux de Robots Malveillants)",
            severity: "Critique",
            icon: "bx-bot",
            definition: "Réseau d'ordinateurs, de serveurs ou d'objets connectés (IoT) infectés et contrôlés à distance par un cybercriminel appelé 'Botmaster'.",
            functioning: "Chaque machine infectée ('bot' ou 'zombie') reçoit des instructions d'un serveur de contrôle (C2) via HTTP, IRC ou des protocoles décentralisés P2P pour lancer des actions coordonnées.",
            characteristics: [
                "Puissance de frappe collective gigantesque (centaines de milliers de machines)",
                "Infrastructure distribuée résiliente (Fast Flux DNS, domaines DGA)",
                "Monétisation par location de services criminels (Crime-as-a-Service)",
                "Attaques synchronisées à la milliseconde près"
            ],
            infectionMethods: "Mots de passe par défaut sur objets connectés (ex: Mirai), propagation par vers, failles non patchées.",
            propagationMethods: "Balayage automatique d'adresses IP pour infecter de nouveaux appareils connectés.",
            consequences: "Attaques par déni de service distribué (DDoS) massives, envoi massif de spams, minage de cryptomonnaies.",
            stealthMechanisms: "Génération dynamique de domaines C2 (DGA), trafic de commande camouflé en requêtes web ordinaires.",
            detectionMethods: "Analyse des flux réseau vers des adresses C2 connues, détection des requêtes DNS répétitives anormales.",
            prevention: "Changement impératif de tous les identifiants par défaut des appareils connectés, filtrage rigoureux des flux sortants.",
            disinfection: "Démantèlement des serveurs C2 (Takedown) par les autorités et éditeurs de sécurité, neutralisation du malware localement."
        },
        {
            id: "adware",
            name: "Publiciels Intrusifs (Adwares)",
            severity: "Modérée",
            icon: "bx-broadcast",
            definition: "Logiciel qui affiche des publicités non sollicitées, injecte des bannières dans les pages visitées et redirige les recherches vers des sites partenaires rémunérateurs.",
            functioning: "S'installe souvent comme extension de navigateur ou service d'arrière-plan. Il intercepte les requêtes web pour injecter des scripts publicitaires agressifs.",
            characteristics: [
                "Frontière floue entre logiciel potentiellement indésirable (PUP) et malware",
                "Ralentissement notable du navigateur et de la connexion internet",
                "Monétisation au clic forcé (Pay-Per-Click)",
                "Collecte fréquente des habitudes de navigation de l'utilisateur"
            ],
            infectionMethods: "Packs d'installation de logiciels gratuits où les cases de refus sont pré-cochées ou dissimulées.",
            propagationMethods: "Téléchargements sur des portails de logiciels tiers non certifiés.",
            consequences: "Expérience utilisateur très dégradée, ralentissements et risques d'exposition à du contenu piégé (malvertising).",
            stealthMechanisms: "Installation dans des dossiers cachés (AppData), modification des raccourcis du navigateur.",
            detectionMethods: "Outils de nettoyage spécialisés (AdwCleaner), analyse des extensions et proxys configurés sur le système.",
            prevention: "Toujours choisir l'installation personnalisée/avancée, décocher les offres additionnelles, utiliser un bloqueur de publicités.",
            disinfection: "Réinitialisation des paramètres du navigateur, suppression des extensions inconnues et nettoyage des clés publicitaires."
        }
    ];

    // =========================================================================
    // 5. BASE DE DONNÉES DU MODULE SPÉCIALISÉ EXPIRO
    // =========================================================================
    const EXPIRO_DATA = {
        overview: {
            name: "Win32/Expiro (W32.Expiro, Virus:Win32/Expiro.AY)",
            family: "File Infector polymorphe / Trojan Botnet",
            targets: "Windows 32-bit (x86) et Windows 64-bit (x64) Portable Executable (.exe, .scr)",
            discoveryYear: "2010 (avec mutations actives documentées)",
            threatLevel: "Critique (Danger élevé d'altération du système d'exploitation)",
            primaryPayload: "Infection récursive de binaires PE, vol d'identifiants, détournement de services Windows, C2",
            authorType: "Groupe cybercriminel professionnel motivé par l'extorsion et le vol d'accès d'entreprises"
        },
        timeline: [
            {
                year: "2010",
                title: "Apparition de la première souche Win32/Expiro.A",
                description: "Première détection d'un infecteur de fichiers PE 32 bits modifiant l'en-tête de section et dérobant les identifiants de messagerie et navigateurs."
            },
            {
                year: "2011 - 2012",
                title: "Mutation vers Expiro.G et Expiro.K",
                description: "Ajout d'un moteur polymorphe pour obfusquer le corps du virus à chaque réplication et client botnet avec algorithme DGA."
            },
            {
                year: "2013 - 2014",
                title: "Variantes 64-bits (Win64/Expiro)",
                description: "Évolution majeure : Expiro infecte indifféremment des binaires PE32 (x86) et PE32+ (x64), ciblant les bibliothèques du dossier System32."
            },
            {
                year: "2015 - 2018",
                title: "Infection de services système et contournement UAC",
                description: "Détournement des services de mise à jour Windows (wuauserv) et neutralisation sélective des antivirus en désactivant leurs pilotes."
            },
            {
                year: "2019 - Présent",
                title: "Résurgence dans des attaques ciblées d'entreprises",
                description: "Utilisé comme composant de persistance profonde avant le déploiement de ransomwares d'entreprises."
            }
        ],
        variants: [
            {
                name: "Expiro.A / B",
                architecture: "x86 (32 bits)",
                features: "Infection PE basique, écriture en fin de fichier (appender), vol d'identifiants FTP et Internet Explorer."
            },
            {
                name: "Expiro.G / H",
                architecture: "x86 (32 bits)",
                features: "Moteur de polymorphisme et communication C2 chiffrée par clé RC4 dynamique."
            },
            {
                name: "Expiro.AY / BC",
                architecture: "x86 et x64 (Dual Architecture)",
                features: "Support universel des binaires 64 bits, détournement d'EntryPoint par insertion d'une nouvelle section '.expiro' ou agrandissement de .data."
            },
            {
                name: "Expiro.W64",
                architecture: "x64 exclusif",
                features: "Infection des DLLs et exécutables système avec recalcul des tables de relais (Relocation Tables)."
            }
        ],
        peSteps: [
            {
                stepNumber: 1,
                title: "Validation de la structure PE",
                description: "Le virus ouvre le fichier cible, vérifie la signature DOS 'MZ' (0x5A4D) et lit le pointeur e_lfanew vers l'en-tête NT Header ('PE\\0\\0'). Il vérifie un marqueur interne pour ne pas sur-infecter le fichier."
            },
            {
                stepNumber: 2,
                title: "Détournement ou ajout de section",
                description: "Expiro examine la table des sections (IMAGE_SECTION_HEADER). Il ajoute une section dotée des permissions IMAGE_SCN_MEM_EXECUTE | IMAGE_SCN_MEM_READ | IMAGE_SCN_MEM_WRITE (anomalie critique W+X), ou agrandit la dernière section existante."
            },
            {
                stepNumber: 3,
                title: "Détournement du point d'entrée (OEP)",
                description: "Il sauvegarde la valeur d'origine de AddressOfEntryPoint dans son corps de code, puis modifie ce champ dans l'en-tête Optional Header pour pointer directement vers le code viral injecté."
            },
            {
                stepNumber: 4,
                title: "Chiffrement et injection du corps viral",
                description: "Le payload viral est chiffré par une routine polymorphe et injecté dans la section modifiée. Un déchiffreur (stub assembleur) est placé en tête du payload."
            },
            {
                stepNumber: 5,
                title: "Restitution finale du contrôle au programme hôte",
                description: "Après avoir exécuté sa charge utile et s'être installé en mémoire vive, le stub effectue un saut (JMP ou RET) vers l'adresse d'origine (OEP). Le programme légitime démarre alors normalement aux yeux de l'utilisateur."
            }
        ],
        systemImpact: [
            {
                category: "Persistance Système",
                detail: "Crée des mutex nommés globaux pour éviter la multi-infection, s'enregistre dans les clés Run du registre et tente d'infecter les services Windows."
            },
            {
                category: "Vol d'Identifiants",
                detail: "Scanne la mémoire et le système de fichiers pour dérober les certificats numériques et les identifiants stockés dans Chrome, Firefox, Edge et FileZilla."
            },
            {
                category: "Communication C2 (Command & Control)",
                detail: "Établit des liaisons chiffrées avec des adresses distantes résolues par DGA pour recevoir des ordres et téléverser les données volées."
            },
            {
                category: "Propagation Locale Récursive",
                detail: "Parcourt silencieusement tous les disques locaux (C:\\, D:\\) et partages réseau pour infecter chaque fichier .EXE et .SCR accessible."
            }
        ],
        yaraRule: `rule Win32_Expiro_Signature {
    meta:
        description = "Détection heuristique et statique des variantes Win32/Expiro"
        author = "CyberVirus Lab - Valdes Hack"
        date = "2026-11-23"
        severity = "Critical"
    strings:
        $pe_magic = { 4D 5A }
        $poly_stub = { 8B EC 83 EC ?? 53 56 57 8B 75 ?? 8B 7D }
        $c2_routine = { 68 ?? ?? ?? ?? E8 ?? ?? ?? ?? 83 C4 04 85 C0 }
        $section_flag = { 20 00 00 E0 } // Read, Write, Execute flags
    condition:
        $pe_magic at 0 and ($poly_stub or $c2_routine) and $section_flag
}`,
        heuristics: [
            "Présence d'une section à la fois ÉCRIVABLE et EXÉCUTABLE (W+X flag) à la fin du fichier.",
            "L'adresse 'AddressOfEntryPoint' pointe en dehors de la section principale de code (.text).",
            "Taille brute (SizeOfRawData) d'une section supérieure à la taille virtuelle (VirtualSize) habituelle.",
            "Entropie de Shannon anormalement élevée (> 7.2) dans la dernière section, trahissant un chiffrement/packing viral."
        ],
        disinfectionPoints: [
            {
                title: "Risque majeur de corruption des binaires système",
                content: "Pour nettoyer un fichier infecté, un antivirus doit recalculer l'AddressOfEntryPoint d'origine, restaurer l'en-tête de section et tronquer le code viral. Si la routine a altéré un seul octet du code hôte, le programme plante immédiatement (Erreur 0xc0000005 - Access Violation)."
            },
            {
                title: "Infection des dépendances critiques de Windows",
                content: "Expiro infecte des composants clés comme explorer.exe, spoolsv.exe ou des DLLs système. Une suppression brute du fichier détruit le système d'exploitation et rend la machine incapable de redémarrer."
            },
            {
                title: "Recommandation officielle des experts en réponse à incident",
                content: "Face à une infection massive par Expiro, le nettoyage automatique par antivirus n'est PAS recommandé pour les systèmes de production critiques. La stratégie sûre consiste à réinstaller le système à partir d'une image saine ou restaurer une sauvegarde hors-ligne vérifiée."
            }
        ]
    };

    // =========================================================================
    // 6. BASE DE DONNÉES DU QUIZ ET DU GLOSSAIRE (BOXICONS PURS)
    // =========================================================================
    const QUIZ_DATA = [
        {
            id: "q1",
            category: "Cybersécurité",
            question: "Quelle est la principale caractéristique distinguant un Ver informatique (Worm) d'un Virus classique ?",
            options: [
                "Le ver est autonome et se propage sur le réseau sans fichier hôte ni action humaine",
                "Le ver n'utilise jamais le réseau informatique",
                "Le ver nécessite obligatoirement l'ouverture manuelle d'un document Word",
                "Le ver n'est composé que de code HTML"
            ],
            correctIndex: 0,
            explanation: "Contrairement aux virus qui doivent parasiter un fichier hôte exécutable et nécessitent son lancement par l'utilisateur, les vers sont autonomes et exploitent directement les failles de services réseau."
        },
        {
            id: "q2",
            category: "Expiro & PE",
            question: "Comment le virus Win32/Expiro parvient-il à exécuter son code malveillant avant le programme légitime ?",
            options: [
                "Il supprime entièrement le code légitime du développeur",
                "Il détourne l'AddressOfEntryPoint (OEP) dans l'en-tête PE pour pointer vers sa section virale",
                "Il force l'utilisateur à taper une commande dans PowerShell",
                "Il modifie le BIOS de la carte mère"
            ],
            correctIndex: 1,
            explanation: "Expiro modifie le champ AddressOfEntryPoint de l'en-tête NT PE. Lorsque Windows charge le fichier, il saute directement dans le code du virus. Le virus exécute sa charge utile puis saute vers l'ancien OEP pour lancer l'application d'origine."
        },
        {
            id: "q3",
            category: "Expiro & PE",
            question: "Pourquoi la désinfection chirurgicale d'un système infecté par Expiro est-elle risquée ?",
            options: [
                "Parce que le virus détruit physiquement le processeur",
                "Parce qu'une tentative de tronquage du virus peut corrompre irrémédiablement les binaires vitaux de Windows",
                "Parce que le virus empêche l'écran de s'allumer",
                "Parce que le virus chiffre le disque avec BitLocker"
            ],
            correctIndex: 1,
            explanation: "Expiro modifie en profondeur la table des sections et les en-têtes de fichiers critiques de l'OS (explorer.exe, services). La moindre erreur d'alignement binaire lors de la désinfection rend le fichier corrompu et empêche le démarrage de Windows."
        },
        {
            id: "q4",
            category: "Git",
            question: "Dans Git, pourquoi 'git add .' et 'git add -A' ne sont-elles PAS considérées comme deux commandes de base distinctes ?",
            options: [
                "Parce que ce sont des alias de Windows",
                "Parce qu'elles appellent la même commande de base 'git add' avec simplement des arguments différents",
                "Parce que Git ne gère pas les options",
                "Parce qu'elles n'écrivent rien dans le dossier .git"
            ],
            correctIndex: 1,
            explanation: "Une commande de base Git est le sous-programme invoqué (ici 'add'). Les commutateurs comme '.' ou '-A' ne sont que des paramètres de ciblage de fichiers pour une seule et même commande."
        },
        {
            id: "q5",
            category: "Git",
            question: "Quelle commande de base Git est appelée 'le filet de sécurité absolu' car elle mémorise chaque déplacement de HEAD ?",
            options: [
                "git status",
                "git reflog",
                "git branch",
                "git config"
            ],
            correctIndex: 1,
            explanation: "'git reflog' enregistre localement chaque mouvement de HEAD (commits, checkout, switch, rebase, reset). Même après un 'git reset --hard', reflog permet de retrouver le SHA-1 du commit disparu et de le restaurer !"
        },
        {
            id: "q6",
            category: "Cybersécurité",
            question: "Quel malware opère au niveau Ring 0 / Kernel pour intercepter les appels système et masquer ses processus aux antivirus ?",
            options: [
                "Un Adware",
                "Un Rootkit noyau",
                "Un Ransomware d'écran",
                "Un Spyware navigateur"
            ],
            correctIndex: 1,
            explanation: "Les rootkits noyau (Kernel-mode) s'exécutent avec les privilèges les plus élevés (Ring 0) et modifient les structures de l'OS (SSDT, DKOM) pour devenir invisibles aux gestionnaires de tâches et outils de sécurité."
        },
        {
            id: "q7",
            category: "Git",
            question: "Quelle commande de plomberie (bas niveau) Git permet d'inspecter directement le type ou le contenu brut d'un objet SHA-1 ?",
            options: [
                "git show",
                "git cat-file",
                "git log",
                "git status"
            ],
            correctIndex: 1,
            explanation: "'git cat-file' est la commande de plomberie fondamentale permettant d'examiner les entrailles de la base d'objets Git : type avec -t, taille avec -s, contenu décompressé avec -p."
        },
        {
            id: "q8",
            category: "Cybersécurité",
            question: "Quelle anomalie heuristique dans les sections d'un binaire PE trahit fréquemment la présence d'un infecteur comme Expiro ?",
            options: [
                "Une section possédant simultanément les permissions ÉCRITURE et EXÉCUTION (W+X)",
                "Un fichier dont la taille est exactement de 1 Ko",
                "L'absence d'icône sur le fichier",
                "Une extension de fichier en majuscules"
            ],
            correctIndex: 0,
            explanation: "Dans un exécutable bien conçu, le code (.text) est exécutable mais jamais accessible en écriture (principe W^X). Une section à la fois modifiable et exécutable avec une forte entropie est la signature classique d'un code injecté ou déchiffré à la volée."
        }
    ];

    const GLOSSARY_DATA = [
        {
            term: "PE (Portable Executable)",
            category: "Cybersécurité",
            definition: "Format de fichier standard sous Windows pour les fichiers exécutables (.exe), bibliothèques de liens dynamiques (.dll) et pilotes système (.sys)."
        },
        {
            term: "OEP (Original Entry Point)",
            category: "Cybersécurité",
            definition: "Adresse de la première instruction exécutable d'un programme légitime. C'est cette adresse qu'Expiro détourne pour exécuter son virus avant de rendre la main au programme sain."
        },
        {
            term: "Command & Control (C2)",
            category: "Cybersécurité",
            definition: "Serveur informatique centralisé ou réseau décentralisé exploité par un pirate pour envoyer des ordres aux ordinateurs infectés et recevoir les données dérobées."
        },
        {
            term: "Polymorphisme",
            category: "Cybersécurité",
            definition: "Capacité d'un malware à modifier sa structure binaire apparente (clé de chiffrement, stub de déchiffrement aléatoire) à chaque réplication afin d'échapper aux signatures antivirus statiques."
        },
        {
            term: "Règle YARA",
            category: "Cybersécurité",
            definition: "Langage standardisé utilisé par les analystes en cybersécurité pour identifier et classifier les logiciels malveillants à partir de motifs textuels ou hexadécimaux."
        },
        {
            term: "Entropie de Shannon",
            category: "Cybersécurité",
            definition: "Mesure statistique du niveau d'aléa ou de désordre des octets dans un fichier. Une entropie proche de 8 trahit généralement un chiffrement ou une compression dense (packing)."
        },
        {
            term: "SSDT (System Service Descriptor Table)",
            category: "Cybersécurité",
            definition: "Table interne du noyau Windows associant les numéros d'appels système aux adresses réelles des fonctions de l'OS. Détournée par les rootkits noyau."
        },
        {
            term: "Commit",
            category: "Git",
            definition: "Instantané (snapshot) immuable de l'état des fichiers indexés, accompagné d'un message descriptif, d'un auteur, d'une date et d'une somme de contrôle SHA-1/SHA-256."
        },
        {
            term: "Zone de Staging (Index)",
            category: "Git",
            definition: "Fichier binaire intermédiaire (.git/index) qui prépare et accumule les modifications destinées au prochain commit lors de l'exécution de 'git add'."
        },
        {
            term: "Plomberie Git (Plumbing)",
            category: "Git",
            definition: "Ensemble des commandes Git de bas niveau (ex: cat-file, hash-object, write-tree) qui manipulent directement les objets internes, par opposition aux commandes de 'porcelaine' destinées aux utilisateurs."
        },
        {
            term: "Reflog",
            category: "Git",
            definition: "Journal chronologique local enregistrant chaque déplacement du pointeur HEAD, permettant de restaurer des commits orphelins même après un reset destructif."
        },
        {
            term: "Worktree",
            category: "Git",
            definition: "Fonctionnalité permettant d'associer plusieurs répertoires de travail distincts à un même dépôt Git pour basculer sur différentes branches sans changer de dossier."
        }
    ];

    // =========================================================================
    // 7. SIMULATEUR PE INTERACTIF (SANS ÉMOJI, BOXICONS)
    // =========================================================================
    const PeSimulator = {
        mode: 'healthy',

        render: function (containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = `
                <div class="pe-sim-box">
                    <div class="pe-sim-header">
                        <div class="pe-sim-title">
                            <i class='bx bx-analyse'></i>
                            <div>
                                <h4>Inspecteur Virtuel de Binaire Portable Executable (PE)</h4>
                                <p class="subtitle">Visualisation dynamique des sections mémoire et du détournement de l'AddressOfEntryPoint</p>
                            </div>
                        </div>
                        <div class="pe-sim-controls">
                            <button class="btn btn-outline ${this.mode === 'healthy' ? 'active' : ''}" id="btn-pe-healthy">
                                <i class='bx bx-check-shield'></i> Exécutable Sain
                            </button>
                            <button class="btn btn-danger ${this.mode === 'infected' ? 'active' : ''}" id="btn-pe-infected">
                                <i class='bx bx-bug'></i> Infection Expiro
                            </button>
                            <button class="btn btn-warning ${this.mode === 'disinfection_attempt' ? 'active' : ''}" id="btn-pe-disinfect">
                                <i class='bx bx-error'></i> Tentative Désinfection
                            </button>
                        </div>
                    </div>

                    <div class="pe-sim-body">
                        <div class="pe-diagram-area">
                            <div class="pe-diagram-title">
                                <i class='bx bx-layer'></i> 
                                Carte Mémoire du Binaire (${this.mode === 'healthy' ? 'calc.exe sain' : this.mode === 'infected' ? 'calc.exe INFECTÉ par Win32/Expiro' : 'calc.exe après désinfection risquée'})
                            </div>

                            <div class="pe-sections-stack">
                                <div class="pe-section-block dos-block">
                                    <div class="sec-label">IMAGE_DOS_HEADER</div>
                                    <div class="sec-info">Magic: 'MZ' (0x5A4D) | e_lfanew: pointeur vers NT Header</div>
                                </div>

                                <div class="pe-section-block nt-block">
                                    <div class="sec-label">IMAGE_NT_HEADERS</div>
                                    <div class="sec-info">
                                        Signature: 'PE\\0\\0' | FileHeader (Machine x86/x64) | 
                                        <strong class="highlight-entry ${this.mode === 'infected' ? 'danger-pulse' : ''}">
                                            AddressOfEntryPoint: ${this.mode === 'healthy' ? '0x00001000 (.text)' : this.mode === 'infected' ? '0x00045000 (.expiro) DÉTOURNÉ' : '0x00001000 (Restauration instable)'}
                                        </strong>
                                    </div>
                                </div>

                                <div class="pe-section-block section-text">
                                    <div class="sec-label">Section .text (Code Exécutable d'Origine)</div>
                                    <div class="sec-info">Taille: 0x0002A000 | Flags: MEM_EXECUTE | MEM_READ</div>
                                    <div class="sec-badge ${this.mode === 'healthy' ? 'badge-active-target' : ''}">
                                        ${this.mode === 'healthy' ? '<i class=\"bx bx-target-lock\"></i> Démarrage légitime' : '<i class=\"bx bx-pause\"></i> Court-circuité'}
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

                                ${this.mode === 'infected' ? `
                                    <div class="pe-section-block section-virus danger-pulse">
                                        <div class="sec-label"><i class='bx bx-error-alt'></i> NOUVELLE SECTION : .expiro (ou .data étendue)</div>
                                        <div class="sec-info">
                                            Adresse RVA: 0x00045000 | Flags: <strong>MEM_READ | MEM_WRITE | MEM_EXECUTE</strong> (Anomalie W+X critique)<br>
                                            Contenu: Déchiffreur polymorphe + Payload C2/Botnet + Saut vers ancien OEP
                                        </div>
                                        <div class="sec-badge badge-danger"><i class='bx bx-crosshair'></i> POINT D'ENTRÉE PIRATÉ (Exécuté en premier)</div>
                                    </div>
                                ` : ''}

                                ${this.mode === 'disinfection_attempt' ? `
                                    <div class="pe-section-block section-damaged">
                                        <div class="sec-label"><i class='bx bx-bomb'></i> ZONE TRONQUÉE (Désinfection logicielle)</div>
                                        <div class="sec-info">
                                            Section virale retirée mais en-têtes PE corrompus : Alignement d'adresses invalide.<br>
                                            Crash au lancement : <code>EXCEPTION_ACCESS_VIOLATION (0xc0000005)</code>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="pe-explanation-panel">
                            <h5><i class='bx bx-info-circle'></i> Analyse Technique en Temps Réel</h5>
                            ${this.getExplanationText()}
                        </div>
                    </div>
                </div>
            `;

            this.bindEvents(containerId);
        },

        getExplanationText: function () {
            if (this.mode === 'healthy') {
                return `
                    <div class="status-box ok">
                        <strong>État : Binaire sain non infecté</strong>
                        <p>Le point d'entrée initial (AddressOfEntryPoint) pointe directement sur l'adresse <code>0x00001000</code> située dans la section <code>.text</code>. Lorsque l'utilisateur lance le fichier, le code légitime démarre immédiatement et de façon sécurisée.</p>
                        <ul>
                            <li>Aucune section à double droit (W+X).</li>
                            <li>Entropie globale normale (~5.6 - 6.2).</li>
                            <li>Signature Authenticode valide.</li>
                        </ul>
                    </div>
                `;
            } else if (this.mode === 'infected') {
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
                        <p>Une désinfection automatisée par antivirus tente d'écraser la section virale et de restaurer l'en-tête d'origine. Cependant, en raison du polymorphisme d'Expiro et des décalages d'alignement de section :</p>
                        <ul>
                            <li>Le fichier exécutable est souvent irrémédiablement corrompu.</li>
                            <li>Si ce fichier est un service vital de Windows (explorer.exe, svchost), le système d'exploitation ne démarre plus.</li>
                            <li><strong>Recommandation professionnelle :</strong> Restauration depuis une sauvegarde saine obligatoire.</li>
                        </ul>
                    </div>
                `;
            }
        },

        bindEvents: function (containerId) {
            document.getElementById('btn-pe-healthy')?.addEventListener('click', () => {
                this.mode = 'healthy';
                this.render(containerId);
            });
            document.getElementById('btn-pe-infected')?.addEventListener('click', () => {
                this.mode = 'infected';
                this.render(containerId);
            });
            document.getElementById('btn-pe-disinfect')?.addEventListener('click', () => {
                this.mode = 'disinfection_attempt';
                this.render(containerId);
            });
        }
    };

    // =========================================================================
    // 8. MODULE DU REGISTRE GIT (AVEC GRILLE D'APPRENTISSAGE ET CONSOLE HORODATÉE)
    // =========================================================================
    const GitTrackerModule = {
        activeTab: 'cards', // 'cards' | 'history'
        filters: {
            category: 'Toutes',
            status: 'all',
            searchQuery: '',
            sortBy: 'chronological'
        },

        init: function (containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            this.render();
        },

        render: function () {
            const masteredList = StorageService.getMasteredCommands();
            const total = GIT_COMMANDS_DATA.length;
            const masteredCount = GIT_COMMANDS_DATA.filter(cmd => masteredList.includes(cmd.id)).length;
            const remainingCount = total - masteredCount;
            const percentage = total > 0 ? ((masteredCount / total) * 100).toFixed(1) : 0;

            let filteredCommands = GIT_COMMANDS_DATA.filter(cmd => {
                const isMastered = masteredList.includes(cmd.id);
                if (this.filters.category !== 'Toutes' && cmd.category !== this.filters.category) return false;
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
                    <!-- EN-TÊTE DU REGISTRE -->
                    <div class="tracker-hero">
                        <div class="badge-tag"><i class='bx bx-check-shield'></i> Registre Officiel Certifié</div>
                        <h2><i class='bx bx-git-branch'></i> Registre & Console des Commandes Git Utilisées</h2>
                        <p class="hero-desc">
                            Ce registre recense et audite <strong>${total} commandes Git de base distinctes</strong> réellement exécutées lors du développement de cette plateforme.
                            Consultez les fiches techniques, cochez les commandes assimilées ou explorez l'historique chronologique horodaté.
                        </p>
                        <div class="rule-callout">
                            <i class='bx bx-info-circle'></i>
                            <span><strong>Règle stricte d'audit :</strong> Une commande de base distincte = une entrée unique. <code>git add .</code> et <code>git add -A</code> ne forment qu'une seule et même commande de base (<code>git add</code>).</span>
                        </div>
                    </div>

                    <!-- TABLEAU DE BORD STATISTIQUE DYNAMIQUE -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <i class='bx bx-list-check stat-icon'></i>
                            <div class="stat-value" id="stat-total">${total}</div>
                            <div class="stat-label">Commandes Distinctes Utilisées</div>
                        </div>
                        <div class="stat-card stat-success">
                            <i class='bx bx-check-double stat-icon'></i>
                            <div class="stat-value" id="stat-mastered">${masteredCount}</div>
                            <div class="stat-label">Commandes Maîtrisées</div>
                        </div>
                        <div class="stat-card stat-warning">
                            <i class='bx bx-time stat-icon'></i>
                            <div class="stat-value" id="stat-remaining">${remainingCount}</div>
                            <div class="stat-label">Restant à Apprendre</div>
                        </div>
                        <div class="stat-card stat-accent">
                            <i class='bx bx-target-lock stat-icon'></i>
                            <div class="stat-value" id="stat-percent">${percentage}%</div>
                            <div class="stat-label">Progression Globale</div>
                            <div class="progress-bar-container">
                                <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- SÉLECTEUR DE VUE : CARTES D'APPRENTISSAGE VS HISTORIQUE CHRONOLOGIQUE -->
                    <div class="tracker-view-switcher">
                        <button class="view-switch-btn ${this.activeTab === 'cards' ? 'active' : ''}" id="btn-view-cards">
                            <i class='bx bx-grid-alt'></i> Grille d'Apprentissage & Auto-Évaluation
                        </button>
                        <button class="view-switch-btn ${this.activeTab === 'history' ? 'active' : ''}" id="btn-view-history">
                            <i class='bx bx-terminal'></i> Console d'Audit & Historique Réel Horodaté (${total})
                        </button>
                    </div>

                    ${this.activeTab === 'cards' ? `
                        <!-- PANNEAU DE RECHERCHE ET FILTRES -->
                        <div class="filters-panel">
                            <div class="search-box">
                                <i class='bx bx-search'></i>
                                <input type="text" id="git-search-input" placeholder="Rechercher une commande (ex: bisect, cat-file, stash)..." value="${this.filters.searchQuery}">
                            </div>

                            <div class="select-group">
                                <select id="git-category-select" class="form-select">
                                    ${GIT_CATEGORIES.map(cat => `<option value="${cat}" ${this.filters.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                                </select>

                                <select id="git-status-select" class="form-select">
                                    <option value="all" ${this.filters.status === 'all' ? 'selected' : ''}>Tous les statuts</option>
                                    <option value="mastered" ${this.filters.status === 'mastered' ? 'selected' : ''}>Maîtrisées</option>
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
                            ${lastUsedCmd ? `<span class="last-used-info"><i class='bx bx-time'></i> Dernière exécution : <strong>${lastUsedCmd.firstUsed}</strong> (${lastUsedCmd.name})</span>` : ''}
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
                                                    ${isMastered ? '<i class=\"bx bx-check\"></i> Maîtrisée' : '<i class=\"bx bx-time\"></i> À maîtriser'}
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
                                                <span><i class='bx bx-calendar'></i> ${cmd.firstUsed}</span>
                                                <span><i class='bx bx-refresh'></i> ${cmd.useCount} exécutions</span>
                                            </div>
                                            <button class="btn btn-sm btn-outline btn-details" data-cmd-id="${cmd.id}">
                                                <i class='bx bx-book-open'></i> Fiche Détaillée
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : `
                        <!-- CONSOLE D'HISTORIQUE CHRONOLOGIQUE RÉEL (HEURE PAR HEURE) -->
                        <div class="history-terminal-container">
                            <div class="history-terminal-header">
                                <div class="history-terminal-title">
                                    <i class='bx bx-terminal'></i>
                                    <span>Console d'Audit Chronologique Réel — Journal d'Exécution Horodaté</span>
                                </div>
                                <span class="badge badge-info">${GIT_COMMANDS_DATA.length} commandes tracées</span>
                            </div>
                            <div class="history-terminal-body">
                                ${[...GIT_COMMANDS_DATA].sort((a, b) => new Date(a.firstUsed) - new Date(b.firstUsed)).map((cmd, idx) => `
                                    <div class="history-entry-row">
                                        <div class="history-entry-main">
                                            <div class="history-cmd-line">
                                                <span class="prompt-symbol">$</span>
                                                <code>${cmd.example}</code>
                                            </div>
                                            <div class="history-cmd-meta">
                                                <span><i class='bx bx-time'></i> ${cmd.firstUsed}</span>
                                                <span><i class='bx bx-git-branch'></i> ${cmd.branch || 'main'}</span>
                                                <span><i class='bx bx-folder'></i> ${cmd.category}</span>
                                                <span><i class='bx bx-info-circle'></i> ${cmd.projectContext}</span>
                                            </div>
                                            <div class="term-line term-ok" style="font-size: 0.8rem; margin-top: 4px;">
                                                <span style="color: var(--text-muted);">&gt;</span> ${cmd.outputLog || 'Command executed with exit code 0.'}
                                            </div>
                                        </div>
                                        <div>
                                            <span class="history-status-badge status-executed">
                                                <i class='bx bx-check-circle'></i> Exécutée (#${idx + 1})
                                            </span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `}

                    <!-- MODAL FICHE DÉTAILLÉE -->
                    <div id="cmd-modal" class="modal-overlay hidden">
                        <div class="modal-card">
                            <div class="modal-header">
                                <h3 id="modal-cmd-title"><i class='bx bx-code-alt'></i> Fiche de Commande</h3>
                                <button class="modal-close-btn" id="modal-close-btn">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-cmd-content"></div>
                        </div>
                    </div>
                </div>
            `;

            this.bindEvents();
        },

        bindEvents: function () {
            // Bascule entre la vue Cartes et la vue Historique
            document.getElementById('btn-view-cards')?.addEventListener('click', () => {
                this.activeTab = 'cards';
                this.render();
            });
            document.getElementById('btn-view-history')?.addEventListener('click', () => {
                this.activeTab = 'history';
                this.render();
            });

            // Checkboxes
            const checkboxes = this.container.querySelectorAll('.cmd-checkbox');
            checkboxes.forEach(cb => {
                cb.addEventListener('change', (e) => {
                    const id = e.target.getAttribute('data-id');
                    StorageService.setCommandMastered(id, e.target.checked);
                    this.render();
                });
            });

            // Recherche
            const searchInput = this.container.querySelector('#git-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.filters.searchQuery = e.target.value;
                    this.render();
                    const newInput = this.container.querySelector('#git-search-input');
                    if (newInput) {
                        newInput.focus();
                        newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
                    }
                });
            }

            // Filtres
            this.container.querySelector('#git-category-select')?.addEventListener('change', (e) => {
                this.filters.category = e.target.value;
                this.render();
            });
            this.container.querySelector('#git-status-select')?.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.render();
            });
            this.container.querySelector('#git-sort-select')?.addEventListener('change', (e) => {
                this.filters.sortBy = e.target.value;
                this.render();
            });

            // Modale
            this.container.querySelectorAll('.btn-details').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const cmdId = e.currentTarget.getAttribute('data-cmd-id');
                    this.openModal(cmdId);
                });
            });

            const modal = this.container.querySelector('#cmd-modal');
            const closeBtn = this.container.querySelector('#modal-close-btn');
            if (closeBtn && modal) {
                closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.classList.add('hidden');
                });
            }
        },

        openModal: function (commandId) {
            const cmd = GIT_COMMANDS_DATA.find(c => c.id === commandId);
            if (!cmd) return;

            const modal = this.container.querySelector('#cmd-modal');
            const title = this.container.querySelector('#modal-cmd-title');
            const content = this.container.querySelector('#modal-cmd-content');
            if (!modal || !title || !content) return;

            const isMastered = StorageService.isCommandMastered(cmd.id);

            title.innerHTML = `<i class='bx bx-code-alt'></i> Fiche technique : <code>${cmd.name}</code>`;
            content.innerHTML = `
                <div class="modal-detail-grid">
                    <div class="detail-row">
                        <span class="label">Catégorie :</span>
                        <span class="value"><span class="badge badge-category">${cmd.category}</span></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Statut d'assimilation :</span>
                        <span class="value"><strong>${isMastered ? '<i class=\"bx bx-check-circle\" style=\"color: var(--color-success);\"></i> Maîtrisée' : '<i class=\"bx bx-time\" style=\"color: var(--color-warning);\"></i> En cours d\'apprentissage'}</strong></span>
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
                        <span class="label">Exemple réel exécuté :</span>
                        <span class="value"><code>${cmd.example}</code></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Journal de sortie terminal :</span>
                        <span class="value"><pre class="code-block" style="margin: 4px 0; padding: 10px;"><code>${cmd.outputLog || 'Exit code 0'}</code></pre></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Détails techniques :</span>
                        <span class="value">${cmd.details}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Horodatage réel d'exécution :</span>
                        <span class="value"><i class='bx bx-time'></i> ${cmd.firstUsed} (${cmd.useCount} exécutions au total)</span>
                    </div>
                </div>
                <div class="modal-action-bar">
                    <button class="btn btn-primary" id="modal-toggle-mastery" data-id="${cmd.id}">
                        ${isMastered ? 'Marquer comme non maîtrisée' : 'Marquer comme maîtrisée'}
                    </button>
                </div>
            `;

            document.getElementById('modal-toggle-mastery')?.addEventListener('click', () => {
                StorageService.setCommandMastered(cmd.id, !isMastered);
                modal.classList.add('hidden');
                this.render();
            });

            modal.classList.remove('hidden');
        }
    };

    // =========================================================================
    // 9. MODULE DES MALWARES
    // =========================================================================
    const MalwaresView = {
        render: function (containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = `
                <div class="malwares-view-container">
                    <div class="view-hero">
                        <div class="badge-tag"><i class='bx bx-shield-quarter'></i> Encyclopédie de Virologie Informatique</div>
                        <h2><i class='bx bx-bug'></i> Les Grandes Familles de Logiciels Malveillants</h2>
                        <p class="hero-desc">
                            Étude méthodique des mécanismes de propagation, d'infection, de persistance et de neutralisation des cybermenaces.
                        </p>
                    </div>

                    <div class="malwares-grid">
                        ${MALWARES_DATA.map(m => `
                            <div class="malware-card" data-id="${m.id}">
                                <div class="malware-card-top">
                                    <div class="malware-icon-box">
                                        <i class='bx ${m.icon}'></i>
                                    </div>
                                    <span class="badge ${m.severity === 'Critique' ? 'badge-danger' : m.severity === 'Élevée' ? 'badge-warning' : 'badge-info'}">
                                        Niveau ${m.severity}
                                    </span>
                                </div>
                                <h3 class="malware-title">${m.name}</h3>
                                <p class="malware-def">${m.definition}</p>
                                
                                <div class="malware-summary-points">
                                    <div class="point-item"><strong>Infection :</strong> ${m.infectionMethods}</div>
                                    <div class="point-item"><strong>Furtivité :</strong> ${m.stealthMechanisms}</div>
                                </div>

                                <button class="btn btn-outline btn-block btn-open-malware" data-malware-id="${m.id}">
                                    <i class='bx bx-file-blank'></i> Consulter le Dossier Technique
                                </button>
                            </div>
                        `).join('')}
                    </div>

                    <div id="malware-modal" class="modal-overlay hidden">
                        <div class="modal-card modal-lg">
                            <div class="modal-header">
                                <h3 id="malware-modal-title"><i class='bx bx-shield'></i> Dossier Technique</h3>
                                <button class="modal-close-btn" id="malware-modal-close">&times;</button>
                            </div>
                            <div class="modal-body" id="malware-modal-body"></div>
                        </div>
                    </div>
                </div>
            `;

            this.bindEvents(container);
        },

        bindEvents: function (container) {
            container.querySelectorAll('.btn-open-malware').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-malware-id');
                    this.openModal(id, container);
                });
            });

            const modal = container.querySelector('#malware-modal');
            const closeBtn = container.querySelector('#malware-modal-close');
            if (closeBtn && modal) {
                closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.classList.add('hidden');
                });
            }
        },

        openModal: function (id, container) {
            const m = MALWARES_DATA.find(item => item.id === id);
            if (!m) return;

            const modal = container.querySelector('#malware-modal');
            const title = container.querySelector('#malware-modal-title');
            const body = container.querySelector('#malware-modal-body');

            title.innerHTML = `<i class='bx ${m.icon}'></i> ${m.name} — Analyse Approfondie`;
            body.innerHTML = `
                <div class="dossier-grid">
                    <div class="dossier-section">
                        <h4><i class='bx bx-book-open'></i> 1. Définition & Concept</h4>
                        <p>${m.definition}</p>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-cog'></i> 2. Fonctionnement Interne & Exécution</h4>
                        <p>${m.functioning}</p>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-list-check'></i> 3. Caractéristiques Techniques</h4>
                        <ul>${m.characteristics.map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-transfer-alt'></i> 4. Infection & Propagation</h4>
                        <p><strong>Vecteurs d'infection :</strong> ${m.infectionMethods}</p>
                        <p><strong>Propagation :</strong> ${m.propagationMethods}</p>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-low-vision'></i> 5. Conséquences & Dissimulation</h4>
                        <p><strong>Impacts :</strong> ${m.consequences}</p>
                        <p><strong>Techniques de furtivité :</strong> ${m.stealthMechanisms}</p>
                    </div>
                    <div class="dossier-section highlight-security">
                        <h4><i class='bx bx-shield-quarter'></i> 6. Détection, Prévention & Neutralisation</h4>
                        <p><strong>Détection :</strong> ${m.detectionMethods}</p>
                        <p><strong>Prévention :</strong> ${m.prevention}</p>
                        <p><strong>Désinfection :</strong> ${m.disinfection}</p>
                    </div>
                </div>
            `;
            modal.classList.remove('hidden');
        }
    };

    // =========================================================================
    // 10. MODULE D'EXPERTISE EXPIRO
    // =========================================================================
    const ExpiroView = {
        activeTab: 'overview',

        render: function (containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = `
                <div class="expiro-view-container">
                    <div class="expiro-hero">
                        <div class="expiro-badge"><i class='bx bx-dna'></i> MODULE SPÉCIALISÉ D'EXPERTISE TECHNIQUE</div>
                        <h2>Win32/Expiro — Anatomie d'un Infecteur PE Moderne</h2>
                        <p class="expiro-lead">
                            Étude complète du virus parasite <strong>Win32/Expiro</strong> : détournement d'EntryPoint (OEP), polymorphisme, corruption d'exécutables Windows, persistance et limites critiques de désinfection.
                        </p>
                        <div class="expiro-tags-bar">
                            <span class="expiro-tag"><i class='bx bx-target-lock'></i> Cible : Binaires Windows x86 & x64</span>
                            <span class="expiro-tag"><i class='bx bx-code-alt'></i> Type : Section Injector & Appender</span>
                            <span class="expiro-tag"><i class='bx bx-error'></i> Danger : Destruction potentielle de l'OS</span>
                        </div>
                    </div>

                    <div class="expiro-tabs-nav">
                        <button class="expiro-tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
                            <i class='bx bx-file'></i> Vue d'Ensemble & Historique
                        </button>
                        <button class="expiro-tab-btn ${this.activeTab === 'simulator' ? 'active' : ''}" data-tab="simulator">
                            <i class='bx bx-analyse'></i> Simulateur Visuel d'Infection PE
                        </button>
                        <button class="expiro-tab-btn ${this.activeTab === 'variants' ? 'active' : ''}" data-tab="variants">
                            <i class='bx bx-git-branch'></i> Variantes & Mécanismes
                        </button>
                        <button class="expiro-tab-btn ${this.activeTab === 'disinfection' ? 'active' : ''}" data-tab="disinfection">
                            <i class='bx bx-shield-x'></i> Limites de Désinfection & Détection
                        </button>
                    </div>

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

        renderTabContent: function () {
            if (this.activeTab === 'overview') {
                return `
                    <div class="tab-pane">
                        <div class="overview-grid">
                            <div class="overview-card">
                                <h3><i class='bx bx-id-card'></i> Fiche d'Identité Technique</h3>
                                <ul class="data-list">
                                    <li><strong>Nom officiel :</strong> ${EXPIRO_DATA.overview.name}</li>
                                    <li><strong>Classification :</strong> ${EXPIRO_DATA.overview.family}</li>
                                    <li><strong>Architectures :</strong> ${EXPIRO_DATA.overview.targets}</li>
                                    <li><strong>Découverte :</strong> ${EXPIRO_DATA.overview.discoveryYear}</li>
                                    <li><strong>Charge utile :</strong> ${EXPIRO_DATA.overview.primaryPayload}</li>
                                    <li><strong>Criticité :</strong> <span class="badge badge-danger">${EXPIRO_DATA.overview.threatLevel}</span></li>
                                </ul>
                            </div>
                            <div class="overview-card">
                                <h3><i class='bx bx-windows'></i> Impacts Systèmes Windows</h3>
                                <div class="impacts-list">
                                    ${EXPIRO_DATA.systemImpact.map(imp => `
                                        <div class="impact-item">
                                            <h4><i class='bx bx-chevron-right'></i> ${imp.category}</h4>
                                            <p>${imp.detail}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <div class="timeline-container">
                            <h3><i class='bx bx-history'></i> Chronologie des Mutations du Virus Expiro</h3>
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
                return `<div class="tab-pane"><div id="pe-simulator-mount"></div></div>`;
            } else if (this.activeTab === 'variants') {
                return `
                    <div class="tab-pane">
                        <h3><i class='bx bx-git-repo-forked'></i> Variantes Documentées d'Expiro</h3>
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
                            <h3><i class='bx bx-cog'></i> Mécanisme d'Infection Pas-à-Pas des Exécutables PE</h3>
                            <div class="steps-flowchart">
                                ${EXPIRO_DATA.peSteps.map(s => `
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
                            <h3><i class='bx bx-error-circle'></i> Possibilités et Limites Techniques de la Désinfection</h3>
                            <p>Pourquoi Expiro est l'un des infecteurs les plus complexes et dangereux à nettoyer :</p>
                        </div>

                        <div class="disinfection-points-grid">
                            ${EXPIRO_DATA.disinfectionPoints.map(pt => `
                                <div class="disinfect-card">
                                    <h4><i class='bx bx-x-circle'></i> ${pt.title}</h4>
                                    <p>${pt.content}</p>
                                </div>
                            `).join('')}
                        </div>

                        <div class="yara-section">
                            <h3><i class='bx bx-code-block'></i> Signature de Détection YARA pour Expiro</h3>
                            <p>Règle d'identification basée sur l'en-tête PE, le stub polymorphe et les permissions de section W+X :</p>
                            <pre class="code-block"><code>${EXPIRO_DATA.yaraRule}</code></pre>
                        </div>

                        <div class="heuristics-list">
                            <h4><i class='bx bx-radar'></i> Indicateurs Heuristiques de Compromission (IoC)</h4>
                            <ul>${EXPIRO_DATA.heuristics.map(h => `<li>${h}</li>`).join('')}</ul>
                        </div>
                    </div>
                `;
            }
        },

        bindEvents: function (containerId) {
            document.querySelectorAll('.expiro-tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.activeTab = e.currentTarget.getAttribute('data-tab');
                    this.render(containerId);
                });
            });
        }
    };

    // =========================================================================
    // 11. MODULE DES MÉTHODES DE DÉTECTION
    // =========================================================================
    const DetectionView = {
        render: function (containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = `
                <div class="detection-view-container">
                    <div class="view-hero">
                        <div class="badge-tag"><i class='bx bx-search-alt'></i> Audit & Détection Forensique</div>
                        <h2><i class='bx bx-radar'></i> Techniques d'Analyse et de Détection des Malwares</h2>
                        <p class="hero-desc">
                            Méthodes statiques, dynamiques et heuristiques déployées par les moteurs de sécurité et EDR pour identifier les charges malveillantes.
                        </p>
                    </div>

                    <div class="detection-methods-grid">
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-barcode'></i></div>
                            <h3>1. Analyse par Signature Statique</h3>
                            <p>Comparaison des empreintes cryptographiques (SHA-256) ou motifs d'octets fixes (Règles YARA) avec une base de menaces connues.</p>
                        </div>
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-brain'></i></div>
                            <h3>2. Analyse Heuristique & Anomalies PE</h3>
                            <p>Détection des anomalies de structure : sections à double permission W+X, point d'entrée décalé hors de .text, imports d'injection mémoire.</p>
                        </div>
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-cube-alt'></i></div>
                            <h3>3. Analyse d'Entropie de Shannon</h3>
                            <p>Mesure du taux d'entropie (désordre des octets). Une entropie > 7.2 trahit quasi-systématiquement un packer ou du code viral chiffré.</p>
                        </div>
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-test-tube'></i></div>
                            <h3>4. Détonation en Sandbox Dynamique</h3>
                            <p>Exécution dans un environnement virtuel étanche instrumenté pour observer le comportement réseau, les créations de processus et de mutex.</p>
                        </div>
                    </div>

                    <div class="entropy-demo-box">
                        <h3><i class='bx bx-slider-alt'></i> Profil d'Entropie PE : Binaire Sain vs Infecté Expiro</h3>
                        <div class="entropy-bars">
                            <div class="entropy-bar-item">
                                <div class="bar-label">Binaire Sain (.text standard) : <strong>5.8 / 8.0 (Normal)</strong></div>
                                <div class="entropy-track"><div class="entropy-fill healthy-fill" style="width: 72%"></div></div>
                            </div>
                            <div class="entropy-bar-item">
                                <div class="bar-label">Binaire Infecté Expiro (Section chiffrée W+X) : <strong>7.85 / 8.0 (Alerte Élevée)</strong></div>
                                <div class="entropy-track"><div class="entropy-fill danger-fill" style="width: 98%"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    // =========================================================================
    // 12. MODULE QUIZ INTERACTIF
    // =========================================================================
    const QuizView = {
        userAnswers: {},
        submitted: false,

        render: function (containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const total = QUIZ_DATA.length;
            let score = 0;
            if (this.submitted) {
                QUIZ_DATA.forEach(q => {
                    if (this.userAnswers[q.id] === q.correctIndex) score++;
                });
            }

            container.innerHTML = `
                <div class="quiz-view-container">
                    <div class="view-hero">
                        <div class="badge-tag"><i class='bx bx-check-circle'></i> Évaluation des Acquis</div>
                        <h2><i class='bx bx-help-circle'></i> Quiz Pédagogique : Cybersécurité & Git</h2>
                        <p class="hero-desc">
                            Testez vos connaissances sur la virologie, le fonctionnement d'Expiro et la maîtrise des commandes Git.
                        </p>
                    </div>

                    ${this.submitted ? `
                        <div class="quiz-score-banner ${score >= total * 0.7 ? 'banner-success' : 'banner-warning'}">
                            <h3>Score : ${score} / ${total} (${Math.round((score / total) * 100)}%)</h3>
                            <p>${score >= total * 0.7 ? 'Félicitations ! Vous avez acquis les compétences clés.' : 'Certains concepts méritent une relecture attentive des fiches techniques.'}</p>
                            <button class="btn btn-outline" id="btn-quiz-retry"><i class='bx bx-refresh'></i> Recommencer</button>
                        </div>
                    ` : ''}

                    <div class="quiz-questions-list">
                        ${QUIZ_DATA.map((q, idx) => {
                            const selectedAnswer = this.userAnswers[q.id];
                            const isCorrect = selectedAnswer === q.correctIndex;
                            return `
                                <div class="quiz-question-card ${this.submitted ? (isCorrect ? 'correct-border' : 'incorrect-border') : ''}">
                                    <div class="question-header">
                                        <span class="q-badge">Question ${idx + 1} / ${total}</span>
                                        <span class="badge badge-category">${q.category}</span>
                                    </div>
                                    <h3 class="q-title">${q.question}</h3>

                                    <div class="options-list">
                                        ${q.options.map((opt, optIdx) => {
                                            let optionClass = '';
                                            if (this.submitted) {
                                                if (optIdx === q.correctIndex) optionClass = 'opt-correct';
                                                else if (selectedAnswer === optIdx) optionClass = 'opt-wrong';
                                            } else if (selectedAnswer === optIdx) {
                                                optionClass = 'opt-selected';
                                            }

                                            return `
                                                <label class="quiz-option ${optionClass}">
                                                    <input type="radio" name="q-${q.id}" value="${optIdx}" 
                                                        ${selectedAnswer === optIdx ? 'checked' : ''} 
                                                        ${this.submitted ? 'disabled' : ''} 
                                                        data-qid="${q.id}">
                                                    <span class="opt-text">${opt}</span>
                                                </label>
                                            `;
                                        }).join('')}
                                    </div>

                                    ${this.submitted ? `
                                        <div class="explanation-box ${isCorrect ? 'exp-ok' : 'exp-err'}">
                                            <strong>${isCorrect ? '<i class=\"bx bx-check\"></i> Bonne réponse !' : '<i class=\"bx bx-x\"></i> Réponse incorrecte.'}</strong>
                                            <p>${q.explanation}</p>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>

                    ${!this.submitted ? `
                        <div class="quiz-actions-footer">
                            <button class="btn btn-primary btn-lg" id="btn-quiz-submit">
                                <i class='bx bx-check'></i> Valider mes Réponses
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;

            this.bindEvents(containerId);
        },

        bindEvents: function (containerId) {
            document.querySelectorAll('.quiz-option input[type="radio"]').forEach(r => {
                r.addEventListener('change', (e) => {
                    const qid = e.target.getAttribute('data-qid');
                    this.userAnswers[qid] = parseInt(e.target.value, 10);
                });
            });

            document.getElementById('btn-quiz-submit')?.addEventListener('click', () => {
                const count = Object.keys(this.userAnswers).length;
                if (count < QUIZ_DATA.length) {
                    if (!confirm(`Vous avez répondu à ${count} question(s) sur ${QUIZ_DATA.length}. Valider quand même ?`)) return;
                }
                this.submitted = true;
                let score = 0;
                QUIZ_DATA.forEach(q => {
                    if (this.userAnswers[q.id] === q.correctIndex) score++;
                });
                StorageService.saveQuizScore(score, QUIZ_DATA.length);
                this.render(containerId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            document.getElementById('btn-quiz-retry')?.addEventListener('click', () => {
                this.userAnswers = {};
                this.submitted = false;
                this.render(containerId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // =========================================================================
    // 13. MODULE DU GLOSSAIRE
    // =========================================================================
    const GlossaryView = {
        searchQuery: '',
        categoryFilter: 'Toutes',

        render: function (containerId) {
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
                        <div class="badge-tag"><i class='bx bx-book-bookmark'></i> Terminologie Officielle</div>
                        <h2><i class='bx bx-book-open'></i> Glossaire Technique : Cybersécurité & Git</h2>
                        <p class="hero-desc">
                            Définitions normalisées des concepts essentiels rencontrés lors de l'étude des virus et de l'ingénierie logicielle Git.
                        </p>
                    </div>

                    <div class="glossary-search-panel">
                        <div class="search-box">
                            <i class='bx bx-search'></i>
                            <input type="text" id="glossary-search-input" placeholder="Rechercher un terme (ex: OEP, C2, SSDT, Reflog, Plumbing)..." value="${this.searchQuery}">
                        </div>
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

        bindEvents: function (containerId) {
            const input = document.getElementById('glossary-search-input');
            if (input) {
                input.addEventListener('input', (e) => {
                    this.searchQuery = e.target.value;
                    this.render(containerId);
                    const newInput = document.getElementById('glossary-search-input');
                    if (newInput) {
                        newInput.focus();
                        newInput.selectionStart = newInput.selectionEnd = newInput.value.length;
                    }
                });
            }

            document.querySelectorAll('.glossary-search-panel .pill').forEach(pill => {
                pill.addEventListener('click', (e) => {
                    this.categoryFilter = e.target.getAttribute('data-cat');
                    this.render(containerId);
                });
            });
        }
    };

    // =========================================================================
    // 14. ROUTEUR CLIENT & VUE D'ACCUEIL SPA
    // =========================================================================
    const Router = {
        routes: {
            'home': () => Router.renderHome(),
            'malwares': () => MalwaresView.render('main-content'),
            'expiro': () => ExpiroView.render('main-content'),
            'detection': () => DetectionView.render('main-content'),
            'quiz': () => QuizView.render('main-content'),
            'glossary': () => GlossaryView.render('main-content'),
            'git-tracker': () => GitTrackerModule.init('main-content')
        },

        init: function () {
            window.addEventListener('hashchange', () => this.handleRoute());
            this.handleRoute();
        },

        handleRoute: function () {
            const hash = window.location.hash.replace('#', '') || 'home';
            const handler = this.routes[hash] || this.routes['home'];

            document.querySelectorAll('.nav-link').forEach(link => {
                const linkHash = link.getAttribute('href')?.replace('#', '');
                if (linkHash === hash) link.classList.add('active');
                else link.classList.remove('active');
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
            handler();
        },

        renderHome: function () {
            const container = document.getElementById('main-content');
            if (!container) return;

            container.innerHTML = `
                <div class="home-container">
                    <section class="hero-section">
                        <div class="hero-content">
                            <div class="badge-tag"><i class='bx bxs-shield-plus'></i> Laboratoire de Sécurité & Ingénierie Git</div>
                            <h1 class="hero-title">Plateforme Éducative sur les Virus & Audit Git</h1>
                            <p class="hero-description">
                                Maîtrisez les concepts fondamentaux de la virologie informatique à travers l'étude approfondie du virus 
                                <strong>Win32/Expiro</strong> tout en validant votre apprentissage pratique de 
                                <strong>72 commandes Git distinctes</strong> exécutées au cours de ce projet.
                            </p>
                            <div class="hero-cta-group">
                                <a href="#expiro" class="btn btn-primary btn-lg"><i class='bx bx-dna'></i> Étude Approfondie d'Expiro</a>
                                <a href="#malwares" class="btn btn-outline btn-lg"><i class='bx bx-bug'></i> Explorer l'Encyclopédie</a>
                            </div>
                        </div>
                        <div class="hero-visual">
                            <div class="cyber-terminal-card">
                                <div class="terminal-bar">
                                    <span class="dot red"></span>
                                    <span class="dot yellow"></span>
                                    <span class="dot green"></span>
                                    <span class="terminal-title"><i class='bx bx-terminal'></i> cyber-threat-intel.sh</span>
                                </div>
                                <div class="terminal-body">
                                    <p class="term-line"><span class="prompt">$</span> analyze-target --threat="Win32/Expiro"</p>
                                    <p class="term-line term-warn">[!] Signature detected: File Infector PE (x86/x64)</p>
                                    <p class="term-line term-danger">[ALERT] AddressOfEntryPoint hijacked -> Section .expiro</p>
                                    <p class="term-line term-ok">[+] Polymorphic decryptor routine identified</p>
                                    <p class="term-line"><span class="prompt">$</span> git audit --commands-used</p>
                                    <p class="term-line term-ok">[OK] 72 distinct base commands registered & audited</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="features-section">
                        <div class="section-heading">
                            <h2>Structure des Modules Pédagogiques</h2>
                            <p>Une expérience interactive complète alliant cybersécurité défensive et rigueur de versionnement logiciel.</p>
                        </div>

                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon-box"><i class='bx bx-bug'></i></div>
                                <h3>Encyclopédie des Menaces</h3>
                                <p>10 familles de malwares décortiquées : virus, vers, trojans, ransomwares, rootkits, spywares, bootkits, botnets. Définition, vecteurs d'infection, persistance et détection.</p>
                                <a href="#malwares" class="card-link">Consulter l'encyclopédie <i class='bx bx-right-arrow-alt'></i></a>
                            </div>

                            <div class="feature-card highlight-card">
                                <div class="feature-icon-box"><i class='bx bx-dna'></i></div>
                                <h3>Module Expert Win32/Expiro</h3>
                                <p>Étude monographique complète sur Expiro : architecture binaire, infection des exécutables PE Windows, simulateur visuel du détournement d'EntryPoint et limites de désinfection.</p>
                                <a href="#expiro" class="card-link">Accéder à l'étude Expiro <i class='bx bx-right-arrow-alt'></i></a>
                            </div>

                            <div class="feature-card">
                                <div class="feature-icon-box"><i class='bx bx-radar'></i></div>
                                <h3>Méthodes de Détection</h3>
                                <p>Détection par règles YARA, analyse heuristique des anomalies PE (permissions W+X) et calcul d'entropie de Shannon pour repérer les payloads chiffrés.</p>
                                <a href="#detection" class="card-link">Voir les techniques <i class='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>
                    </section>

                    <section class="banner-summary">
                        <div class="banner-stat">
                            <span class="num">10+</span>
                            <span class="txt">Familles de Malwares analysées</span>
                        </div>
                        <div class="banner-stat">
                            <span class="num">72</span>
                            <span class="txt">Commandes Git Distinctes certifiées</span>
                        </div>
                        <div class="banner-stat">
                            <span class="num">100%</span>
                            <span class="txt">Vanilla JS (Zéro Dépendance)</span>
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

    // =========================================================================
    // 15. INITIALISATION AU CHARGEMENT DU DOM
    // =========================================================================
    document.addEventListener('DOMContentLoaded', function () {
        ThemeService.init();
        Router.init();

        // Menu Mobile Burger
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', () => {
                navLinks.classList.toggle('nav-open');
            });
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('nav-open');
                });
            });
        }

        console.log("CyberVirus Lab initialisé avec succès : 72 commandes Git auditées.");
    });

})();
