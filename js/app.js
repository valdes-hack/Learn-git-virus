/**
 * CyberVirus Lab - Architecture Front-End Autonome & Modulaire
 * ConÃ§u pour fonctionner immÃ©diatement en double-clic local (file:///) et sur serveur HTTP.
 * 100% Boxicons - ZÃ©ro Ã‰moji - Registre et Console d'Audit HorodatÃ©e des 72 Commandes Git.
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
    // 2. THEME SERVICE (Bascule ThÃ¨me Sombre / Clair)
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
    // 3. BASE DE DONNÃ‰ES OFFICIELLE DES 72 COMMANDES GIT (AVEC HORODATAGE RÃ‰EL)
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
        "Tags & RÃ©fÃ©rences",
        "DÃ©pÃ´ts distants & Synchronisation",
        "Audit, BlÃ¢me & DÃ©bogage",
        "Recherche & Exploration",
        "Archivage & Patchs",
        "Maintenance & IntÃ©gritÃ©",
        "Plomberie & Objets Internes"
    ];

    const GIT_COMMANDS_DATA = [
        {
            id: "cmd-git-init",
            name: "git init",
            category: "Initialisation & Clonage",
            syntax: "git init [repertoire]",
            description: "CrÃ©e un nouveau dÃ©pÃ´t Git vide et initialise le dossier .git.",
            utility: "Point de dÃ©part absolu de tout projet versionnÃ© sous Git.",
            projectContext: "ExÃ©cutÃ© dans 'c:\\Users\\Valdes Hack\\Desktop\\cours\\Git' pour dÃ©marrer le dÃ©pÃ´t local.",
            example: "git init",
            firstUsed: "2026-11-23 00:14:18",
            useCount: 1,
            outputLog: "Initialized empty Git repository in C:/Users/Valdes Hack/Desktop/cours/Git/.git/",
            branch: "master",
            details: "CrÃ©e l'architecture interne .git/ (objects, refs, HEAD, config)."
        },
        {
            id: "cmd-git-config",
            name: "git config",
            category: "Configuration",
            syntax: "git config [--global | --local] <cle> <valeur>",
            description: "DÃ©finit les paramÃ¨tres utilisateur et configurations opÃ©rationnelles de Git.",
            utility: "Associe chaque commit Ã  une identitÃ© auteur certifiÃ©e.",
            projectContext: "Configuration du nom 'Valdes Hack' et de l'adresse de commit GitHub.",
            example: "git config user.name 'Valdes Hack'",
            firstUsed: "2026-11-23 00:16:43",
            useCount: 3,
            outputLog: "user.name=Valdes Hack, user.email=valdes-hack@github.com",
            branch: "master",
            details: "PortÃ©es : --system (/etc/gitconfig), --global (~/.gitconfig), --local (.git/config)."
        },
        {
            id: "cmd-git-status",
            name: "git status",
            category: "Suivi & Indexation",
            syntax: "git status [-s | --short]",
            description: "Affiche l'Ã©tat de l'arbre de travail et de la zone de staging.",
            utility: "Permet de vÃ©rifier les fichiers modifiÃ©s, indexÃ©s ou non suivis.",
            projectContext: "ExÃ©cutÃ© aprÃ¨s chaque ajout de fichier (.gitignore, README, CSS, JS).",
            example: "git status",
            firstUsed: "2026-11-23 00:18:04",
            useCount: 12,
            outputLog: "On branch main. Untracked files present: .gitignore, README.md",
            branch: "main",
            details: "Indique la branche courante, le statut de synchronisation et les fichiers modifiÃ©s."
        },
        {
            id: "cmd-git-branch",
            name: "git branch",
            category: "Branches & Navigation",
            syntax: "git branch [-a | -d | -M] [nom_branche]",
            description: "Liste, crÃ©e, renomme ou supprime des branches de travail.",
            utility: "Organise les flux de travail parallÃ¨les sans impacter la branche de production.",
            projectContext: "UtilisÃ© pour renommer master en 'main' et lister l'ensemble des branches.",
            example: "git branch -M main",
            firstUsed: "2026-11-23 00:19:24",
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
            description: "Ajoute le contenu des fichiers modifiÃ©s Ã  la zone d'index (staging area).",
            utility: "SÃ©lectionne prÃ©cisÃ©ment les modifications qui composeront le prochain commit.",
            projectContext: "Indexation initiale de .gitignore, README, puis des dossiers assets/ et js/.",
            example: "git add .gitignore README.md",
            firstUsed: "2026-11-23 00:21:31",
            useCount: 8,
            outputLog: "Staged files ready for commit.",
            branch: "main",
            details: "CrÃ©e des objets blob dans .git/objects/ et met Ã  jour l'index binaire .git/index."
        },
        {
            id: "cmd-git-commit",
            name: "git commit",
            category: "Commits & Historique",
            syntax: "git commit -m '<message>'",
            description: "Enregistre un snapshot permanent et immuable de l'index dans l'historique.",
            utility: "Constitue les briques certifiÃ©es du journal de versionnement.",
            projectContext: "Enregistrement du commit racine 1bbaf12 et des versions fonctionnelles.",
            example: "git commit -m 'chore: initial commit (gitignore and README documentation)'",
            firstUsed: "2026-11-23 00:22:56",
            useCount: 6,
            outputLog: "[main (root-commit) 1bbaf12] chore: initial commit",
            branch: "main",
            details: "CrÃ©e un objet commit pointant vers un arbre (tree), un parent et des mÃ©tadonnÃ©es."
        },
        {
            id: "cmd-git-log",
            name: "git log",
            category: "Commits & Historique",
            syntax: "git log [--oneline | --graph | --stat]",
            description: "Affiche l'historique chronologique des commits du projet.",
            utility: "Permet de vÃ©rifier l'enchaÃ®nement des commits et les auteurs associÃ©s.",
            projectContext: "UtilisÃ© pour visualiser l'arbre de dÃ©rivation et les merges effectuÃ©s.",
            example: "git log --oneline --graph",
            firstUsed: "2026-11-23 00:28:21",
            useCount: 7,
            outputLog: "1bbaf12 chore: initial commit, 73aeca0 feat: complete platform",
            branch: "develop",
            details: "Prend en charge les filtres par rÃ©vision, auteur, date et arborescence graphique."
        },
        {
            id: "cmd-git-switch",
            name: "git switch",
            category: "Branches & Navigation",
            syntax: "git switch [-c] <nom_branche>",
            description: "Bascule vers une branche existante ou en crÃ©e une nouvelle.",
            utility: "Commande moderne dÃ©diÃ©e exclusivement Ã  la navigation entre branches.",
            projectContext: "UtilisÃ© pour crÃ©er et basculer sur la branche d'intÃ©gration 'develop'.",
            example: "git switch -c develop",
            firstUsed: "2026-11-23 00:30:27",
            useCount: 5,
            outputLog: "Switched to a new branch 'develop'",
            branch: "develop",
            details: "Met Ã  jour .git/HEAD pour pointer vers la branche demandÃ©e en isolant le travail."
        },
        {
            id: "cmd-git-show",
            name: "git show",
            category: "Commits & Historique",
            syntax: "git show [objet_commit_ou_tag]",
            description: "Affiche le diff et les mÃ©tadonnÃ©es dÃ©taillÃ©es d'un objet Git spÃ©cifique.",
            utility: "Permet d'inspecter prÃ©cisÃ©ment le contenu d'un commit donnÃ©.",
            projectContext: "Inspection des fichiers crÃ©Ã©s et des statistiques du premier commit.",
            example: "git show --stat",
            firstUsed: "2026-11-23 00:31:52",
            useCount: 3,
            outputLog: "commit 1bbaf12b... Author: Valdes Hack, 2 files changed, 50 insertions(+)",
            branch: "develop",
            details: "Affiche l'auteur, l'horodatage, le message et le patch unifiÃ©."
        },
        {
            id: "cmd-git-rev-parse",
            name: "git rev-parse",
            category: "Plomberie & Objets Internes",
            syntax: "git rev-parse [options] <nom_ref>",
            description: "Commande de plomberie rÃ©solvant des noms symboliques en hashs SHA-1 et inspectant les chemins.",
            utility: "Fondamentale pour l'automatisation, la dÃ©tection de la racine et la validation d'arbres.",
            projectContext: "UtilisÃ© avec --show-toplevel pour obtenir le chemin absolu du dÃ©pÃ´t.",
            example: "git rev-parse --show-toplevel",
            firstUsed: "2026-11-23 00:34:28",
            useCount: 2,
            outputLog: "C:/Users/Valdes Hack/Desktop/cours/Git",
            branch: "develop",
            details: "Peut vÃ©rifier si on se trouve dans un dÃ©pÃ´t (--is-inside-work-tree)."
        },
        {
            id: "cmd-git-var",
            name: "git var",
            category: "Configuration",
            syntax: "git var <variable_logique>",
            description: "Affiche la valeur rÃ©solue d'une variable interne Git.",
            utility: "Permet d'auditer avec prÃ©cision l'identitÃ© et les variables systÃ¨me utilisÃ©es par Git.",
            projectContext: "Audit de la variable d'identitÃ© d'auteur 'GIT_AUTHOR_IDENT'.",
            example: "git var GIT_AUTHOR_IDENT",
            firstUsed: "2026-11-23 00:36:01",
            useCount: 1,
            outputLog: "Valdes Hack <valdes-hack@github.com> 1795483192 -0800",
            branch: "develop",
            details: "Affiche l'identitÃ© exacte sous la forme : Nom <email> timestamp fuseau."
        },
        {
            id: "cmd-git-ls-files",
            name: "git ls-files",
            category: "Plomberie & Objets Internes",
            syntax: "git ls-files [-s | -c | -m]",
            description: "Affiche des informations prÃ©cises sur les fichiers prÃ©sents dans l'index binaire.",
            utility: "Permet de vÃ©rifier le contenu de la zone de staging sans passer par des abstractions.",
            projectContext: "Inventaire des fichiers enregistrÃ©s dans l'index Git.",
            example: "git ls-files",
            firstUsed: "2026-11-23 00:37:36",
            useCount: 3,
            outputLog: ".gitignore, README.md, index.html, assets/css/..., js/app.js",
            branch: "develop",
            details: "L'option -s affiche les modes de fichiers, les hashs de blobs et les scÃ¨nes de fusion."
        },
        {
            id: "cmd-git-cat-file",
            name: "git cat-file",
            category: "Plomberie & Objets Internes",
            syntax: "git cat-file (-t | -s | -p) <objet_sha>",
            description: "Inspecte directement le type, la taille ou le contenu brut d'un objet Git dans .git/objects.",
            utility: "Permet de comprendre la structure interne des blobs, trees et commits.",
            projectContext: "VÃ©rification du type interne de HEAD (-t) qui renvoie 'commit'.",
            example: "git cat-file -t HEAD",
            firstUsed: "2026-11-23 00:39:41",
            useCount: 3,
            outputLog: "commit",
            branch: "develop",
            details: "-t donne le type, -s la taille en octets, -p le contenu dÃ©compressÃ©."
        },
        {
            id: "cmd-git-count-objects",
            name: "git count-objects",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git count-objects [-v]",
            description: "Compte le nombre d'objets dÃ©ballÃ©s dans la base et affiche l'espace disque.",
            utility: "Permet de surveiller la santÃ© et l'empreinte disque du dÃ©pÃ´t.",
            projectContext: "Audit de la taille du dÃ©pÃ´t aprÃ¨s crÃ©ation des premiers objets.",
            example: "git count-objects -v",
            firstUsed: "2026-11-23 00:44:35",
            useCount: 2,
            outputLog: "count: 4, size: 1, in-pack: 0",
            branch: "develop",
            details: "Distingue les objets libres des objets compressÃ©s dans des packfiles."
        },
        {
            id: "cmd-git-check-ref-format",
            name: "git check-ref-format",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git check-ref-format <nom_de_reference>",
            description: "Valide si une chaÃ®ne de caractÃ¨res respecte les rÃ¨gles de nommage des rÃ©fÃ©rences Git.",
            utility: "Ã‰vite de crÃ©er des branches avec des caractÃ¨res interdits (.., ~, ^, :, ?).",
            projectContext: "Validation de la rÃ©fÃ©rence 'refs/heads/feature/ui-core'.",
            example: "git check-ref-format 'refs/heads/feature/ui-core'",
            firstUsed: "2026-11-23 00:46:11",
            useCount: 1,
            outputLog: "Exit code: 0 (Reference format valid)",
            branch: "develop",
            details: "Renvoie le code 0 si la rÃ©fÃ©rence est valide, 1 sinon."
        },
        {
            id: "cmd-git-check-ignore",
            name: "git check-ignore",
            category: "Plomberie & Objets Internes",
            syntax: "git check-ignore [-v] <chemin>",
            description: "VÃ©rifie si un chemin donnÃ© est ignorÃ© par les rÃ¨gles de .gitignore.",
            utility: "DÃ©bogue immÃ©diatement pourquoi un fichier ne s'ajoute pas avec 'git add'.",
            projectContext: "VÃ©rification que 'node_modules/test.log' est bien masquÃ© par .gitignore.",
            example: "git check-ignore node_modules/test.log",
            firstUsed: "2026-11-23 00:48:18",
            useCount: 2,
            outputLog: ".gitignore:2:node_modules/ node_modules/test.log",
            branch: "develop",
            details: "L'option -v indique prÃ©cisÃ©ment la ligne de .gitignore responsable du masquage."
        },
        {
            id: "cmd-git-shortlog",
            name: "git shortlog",
            category: "Commits & Historique",
            syntax: "git shortlog [-s | -n] [revision]",
            description: "RÃ©sume la sortie de git log en regroupant les commits par auteur.",
            utility: "IdÃ©al pour gÃ©nÃ©rer des release notes ou Ã©valuer les contributions.",
            projectContext: "RÃ©capitulatif des contributions de Valdes Hack sur la branche HEAD.",
            example: "git shortlog HEAD",
            firstUsed: "2026-11-23 00:49:27",
            useCount: 2,
            outputLog: "Valdes Hack (1): chore: initial commit",
            branch: "develop",
            details: "L'option -s donne le compte numÃ©rique et -n trie par volume dÃ©croissant."
        },
        {
            id: "cmd-git-describe",
            name: "git describe",
            category: "Commits & Historique",
            syntax: "git describe [--tags | --always]",
            description: "GÃ©nÃ¨re un identifiant humainement lisible basÃ© sur le tag le plus proche.",
            utility: "Indispensable pour numÃ©roter dynamiquement les versions logicielles de build.",
            projectContext: "GÃ©nÃ©ration de l'identifiant lisible de version du code.",
            example: "git describe --always",
            firstUsed: "2026-11-23 00:52:09",
            useCount: 2,
            outputLog: "1bbaf12",
            branch: "develop",
            details: "Format : <tag>-<nb_commits_depuis>-g<hash_court>."
        },
        {
            id: "cmd-git-tag",
            name: "git tag",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git tag [-a] <nom_tag> [-m '<message>']",
            description: "CrÃ©e des jalons de version (Ã©tiquettes) pointant vers un commit prÃ©cis.",
            utility: "Marque officiellement les Ã©tapes de release du logiciel (v0.1.0-alpha, v1.0.0).",
            projectContext: "CrÃ©ation des tags annotÃ©s 'v0.1.0-alpha' et 'v1.0.0'.",
            example: "git tag -a v0.1.0-alpha -m 'Tag initial: setup de base'",
            firstUsed: "2026-11-23 00:54:23",
            useCount: 3,
            outputLog: "Annotated tag v0.1.0-alpha created.",
            branch: "develop",
            details: "Un tag annotÃ© contient auteur, date, message et signature cryptographique."
        },
        {
            id: "cmd-git-remote",
            name: "git remote",
            category: "DÃ©pÃ´ts distants & Synchronisation",
            syntax: "git remote [add | -v | remove | rename]",
            description: "GÃ¨re la liste des dÃ©pÃ´ts distants connectÃ©s au projet local.",
            utility: "Permet de lier le projet local au cloud GitHub.",
            projectContext: "Configuration du remote 'origin' vers https://github.com/valdes-hack/Learn-git-virus.git.",
            example: "git remote add origin https://github.com/valdes-hack/Learn-git-virus.git",
            firstUsed: "2026-11-23 00:56:15",
            useCount: 3,
            outputLog: "origin https://github.com/valdes-hack/Learn-git-virus.git (fetch & push)",
            branch: "develop",
            details: "Les configurations distantes sont stockÃ©es dans .git/config."
        },
        {
            id: "cmd-git-checkout",
            name: "git checkout",
            category: "Branches & Navigation",
            syntax: "git checkout [-b] <branche_ou_commit>",
            description: "Bascule de branche ou extrait des commits spÃ©cifiques.",
            utility: "Commande historique multifonction pour voyager dans le temps.",
            projectContext: "CrÃ©ation et basculement sur la branche 'feature/core-platform'.",
            example: "git checkout -b feature/core-platform",
            firstUsed: "2026-11-23 00:57:38",
            useCount: 2,
            outputLog: "Switched to a new branch 'feature/core-platform'",
            branch: "feature/core-platform",
            details: "Aujourd'hui clarifiÃ©e en git switch (branches) et git restore (fichiers)."
        },
        {
            id: "cmd-git-hash-object",
            name: "git hash-object",
            category: "Plomberie & Objets Internes",
            syntax: "git hash-object [-w] <fichier>",
            description: "Calcule l'identifiant SHA-1 unique d'un fichier selon le format d'objet Git.",
            utility: "DÃ©montre le principe fondamental d'adressage par le contenu de Git.",
            projectContext: "Calcul du hash SHA-1 de index.html avant enregistrement.",
            example: "git hash-object index.html",
            firstUsed: "2026-11-23 00:58:53",
            useCount: 2,
            outputLog: "64d6500bd04f41db92934ecfcf9c7dbf78ff47de",
            branch: "feature/core-platform",
            details: "PrÃ©fixe le contenu par 'blob <taille>\\0' avant de calculer le SHA-1."
        },
        {
            id: "cmd-git-diff",
            name: "git diff",
            category: "Comparaison & Diff",
            syntax: "git diff [--staged] [ref1] [ref2]",
            description: "Affiche les diffÃ©rences ligne par ligne entre l'espace de travail et l'index.",
            utility: "Permet de vÃ©rifier scrupuleusement les modifications avant de commiter.",
            projectContext: "ContrÃ´le des 25 fichiers crÃ©Ã©s pour la plateforme avant commit.",
            example: "git diff --staged --stat",
            firstUsed: "2026-11-23 01:01:22",
            useCount: 5,
            outputLog: "25 files changed, 4913 insertions(+)",
            branch: "feature/core-platform",
            details: "Utilise des algorithmes de calcul de deltas optimisÃ©s (Myers / Histogram)."
        },
        {
            id: "cmd-git-write-tree",
            name: "git write-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git write-tree",
            description: "CrÃ©e un objet arbre (tree) Ã  partir de l'Ã©tat actuel de l'index binaire.",
            utility: "Ã‰tape interne de plomberie exÃ©cutÃ©e par Git lors de chaque commit.",
            projectContext: "CrÃ©ation manuelle de l'objet tree scellant les 25 fichiers du site.",
            example: "git write-tree",
            firstUsed: "2026-11-23 01:07:33",
            useCount: 2,
            outputLog: "1177fd4f360bccfcf5b43c60a62adcc5e8633f6b",
            branch: "feature/core-platform",
            details: "Renvoie le hash SHA-1 de l'arbre stockÃ© dans .git/objects/."
        },
        {
            id: "cmd-git-ls-tree",
            name: "git ls-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git ls-tree <tree-ish>",
            description: "Affiche le contenu d'un objet arbre (tree) Git.",
            utility: "Permet d'inspecter l'arborescence figÃ©e Ã  l'intÃ©rieur d'un commit.",
            projectContext: "Inspection des hashs d'objets et permissions de l'arbre 1177fd4.",
            example: "git ls-tree 1177fd4f360bccfcf5b43c60a62adcc5e8633f6b",
            firstUsed: "2026-11-23 01:08:43",
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
            description: "Recherche ultra-rapide de chaÃ®nes dans tous les fichiers suivis de l'arbre Git.",
            utility: "Bien plus rapide que le grep classique car il interroge directement l'index.",
            projectContext: "Recherche de toutes les occurrences d'Expiro dans le code source.",
            example: "git grep -c 'Expiro'",
            firstUsed: "2026-11-23 01:11:13",
            useCount: 4,
            outputLog: "index.html: 5 occurrences, js/data/expiro-data.js: 19 occurrences",
            branch: "feature/core-platform",
            details: "Ignore automatiquement les rÃ©pertoires exclus par .gitignore."
        },
        {
            id: "cmd-git-blame",
            name: "git blame",
            category: "Audit, BlÃ¢me & DÃ©bogage",
            syntax: "git blame <fichier>",
            description: "Affiche chaque ligne d'un fichier avec son auteur, date et commit d'origine.",
            utility: "Essentiel pour auditer l'historique et la paternitÃ© de chaque ligne de code.",
            projectContext: "Audit des lignes 50 Ã  65 de index.html intÃ©grant le footer.",
            example: "git blame -L 50,65 index.html",
            firstUsed: "2026-11-23 01:12:35",
            useCount: 3,
            outputLog: "73aeca0 (Valdes Hack 2026-11-23 17:32:28 -0800 50)",
            branch: "feature/core-platform",
            details: "Permet d'isoler rapidement quel commit a introduit une ligne spÃ©cifique."
        },
        {
            id: "cmd-git-notes",
            name: "git notes",
            category: "Audit, BlÃ¢me & DÃ©bogage",
            syntax: "git notes [add | show | list] [commit]",
            description: "Ajoute ou affiche des mÃ©tadonnÃ©es textuelles Ã  un commit sans modifier son hash SHA-1.",
            utility: "Permet d'ajouter des rapports d'audit ou validations aprÃ¨s coup.",
            projectContext: "Ajout d'une note d'audit cybersÃ©curitÃ© sur le commit de la plateforme.",
            example: "git notes add -m 'Audit CybersÃ©curitÃ© : architecture front-end validÃ©e' 73aeca0",
            firstUsed: "2026-11-23 01:15:28",
            useCount: 2,
            outputLog: "Notes added by 'git notes add'",
            branch: "feature/core-platform",
            details: "StockÃ© dans refs/notes/commits sans briser l'immuabilitÃ© du commit."
        },
        {
            id: "cmd-git-stash",
            name: "git stash",
            category: "Remisage (Stash)",
            syntax: "git stash [push | pop | list | drop]",
            description: "Sauvegarde temporairement l'Ã©tat non commitÃ© et nettoie l'arbre de travail.",
            utility: "Permet de changer de branche sans perdre son travail en cours.",
            projectContext: "Mise en rÃ©serve temporaire puis rÃ©application avec stash pop.",
            example: "git stash push -m 'WIP: test stash'; git stash pop",
            firstUsed: "2026-11-23 01:17:56",
            useCount: 3,
            outputLog: "Saved working directory. Dropped refs/stash@{0}",
            branch: "feature/core-platform",
            details: "Stocke les Ã©tats sous forme de commits spÃ©ciaux dans refs/stash."
        },
        {
            id: "cmd-git-restore",
            name: "git restore",
            category: "Suivi & Indexation",
            syntax: "git restore [--staged] <fichier>",
            description: "Restaure les fichiers de l'arbre de travail ou dÃ©sindexe des modifications.",
            utility: "Moyen moderne et sÃ©curisÃ© d'annuler les modifications d'un fichier local.",
            projectContext: "Annulation propre des modifications temporaires sur README.md.",
            example: "git restore README.md",
            firstUsed: "2026-11-23 01:20:02",
            useCount: 2,
            outputLog: "Working tree cleaned for README.md.",
            branch: "feature/core-platform",
            details: "Remplace 'git checkout -- <file>' pour Ã©viter les ambiguÃ¯tÃ©s de commande."
        },
        {
            id: "cmd-git-clean",
            name: "git clean",
            category: "Suivi & Indexation",
            syntax: "git clean [-f | -d | -n]",
            description: "Supprime les fichiers non suivis du rÃ©pertoire de travail.",
            utility: "Nettoie les fichiers temporaires et artefacts orphelins.",
            projectContext: "Suppression contrÃ´lÃ©e du fichier temporaire 'temp-check.tmp'.",
            example: "git clean -n; git clean -f",
            firstUsed: "2026-11-23 01:21:29",
            useCount: 2,
            outputLog: "Removing temp-check.tmp",
            branch: "feature/core-platform",
            details: "L'option -n teste sans supprimer pour prÃ©venir les pertes de donnÃ©es."
        },
        {
            id: "cmd-git-merge",
            name: "git merge",
            category: "Fusion & Rebasage",
            syntax: "git merge [--no-ff] <branche_a_fusionner>",
            description: "Fusionne une branche dans la branche active.",
            utility: "IntÃ¨gre le travail d'une feature branch dans develop ou main.",
            projectContext: "Fusion sans avance rapide (--no-ff) de feature/core-platform dans develop.",
            example: "git merge --no-ff -m 'merge: integrate feature/core-platform into develop' feature/core-platform",
            firstUsed: "2026-11-23 01:22:38",
            useCount: 4,
            outputLog: "Merge made by the 'ort' strategy. 25 files changed, 4913 insertions(+)",
            branch: "develop",
            details: "CrÃ©e un commit de fusion traÃ§able reliant deux branches parentes."
        },
        {
            id: "cmd-git-merge-base",
            name: "git merge-base",
            category: "Fusion & Rebasage",
            syntax: "git merge-base <commit1> <commit2>",
            description: "Trouve le meilleur ancÃªtre commun entre deux branches ou commits.",
            utility: "Permet de dÃ©terminer exactement d'oÃ¹ a divergÃ© une branche.",
            projectContext: "DÃ©tection de l'ancÃªtre commun entre main et develop (1bbaf12).",
            example: "git merge-base main develop",
            firstUsed: "2026-11-23 01:24:19",
            useCount: 2,
            outputLog: "1bbaf12b86fe67780b3cc4b8455bd1ae574e2a2c",
            branch: "develop",
            details: "Algorithme clÃ© utilisÃ© par git merge pour la stratÃ©gie rÃ©cursive / ort."
        },
        {
            id: "cmd-git-show-branch",
            name: "git show-branch",
            category: "Branches & Navigation",
            syntax: "git show-branch [branches...]",
            description: "Affiche l'Ã©tat des branches et leur historique de divergence en mode ASCII.",
            utility: "Visualise en un instant oÃ¹ les branches se sÃ©parent et se croisent.",
            projectContext: "Comparaison de l'arbre entre main et develop.",
            example: "git show-branch main develop",
            firstUsed: "2026-11-23 01:26:33",
            useCount: 2,
            outputLog: "! [main] chore: initial commit, * [develop] merge: integrate feature",
            branch: "develop",
            details: "Utilise des symboles '+' et '*' pour matÃ©rialiser chaque commit."
        },
        {
            id: "cmd-git-cherry",
            name: "git cherry",
            category: "Recherche & Exploration",
            syntax: "git cherry [-v] <branche_amont> [<branche_cible>]",
            description: "Trouve les commits d'une branche qui n'ont pas encore Ã©tÃ© appliquÃ©s sur l'amont.",
            utility: "VÃ©rifie les commits en attente d'intÃ©gration sans doublons.",
            projectContext: "DÃ©tection des commits de develop en attente d'intÃ©gration sur main.",
            example: "git cherry -v main develop",
            firstUsed: "2026-11-23 01:29:16",
            useCount: 2,
            outputLog: "+ 73aeca0234316bc... feat: complete educational platform",
            branch: "develop",
            details: "Compare les patch-ids des commits pour dÃ©tecter les doublons rÃ©els."
        },
        {
            id: "cmd-git-range-diff",
            name: "git range-diff",
            category: "Comparaison & Diff",
            syntax: "git range-diff <plage1> <plage2>",
            description: "Compare deux plages de commits (par exemple avant et aprÃ¨s un rebase).",
            utility: "VÃ©rifie qu'un rebase ou un cherry-pick n'a pas introduit d'effets de bord.",
            projectContext: "Comparaison de la plage main...develop.",
            example: "git range-diff main...develop",
            firstUsed: "2026-11-23 01:30:21",
            useCount: 2,
            outputLog: "> 1: 73aeca0 feat: complete educational platform",
            branch: "develop",
            details: "Affiche Ã  la fois l'ordre des commits et les deltas internes de chacun."
        },
        {
            id: "cmd-git-reflog",
            name: "git reflog",
            category: "Audit, BlÃ¢me & DÃ©bogage",
            syntax: "git reflog [show]",
            description: "Enregistre chaque dÃ©placement du pointeur HEAD (commits, switch, reset).",
            utility: "Le filet de sÃ©curitÃ© absolu : permet de restaurer n'importe quel commit orphelin.",
            projectContext: "Audit des dÃ©placements rÃ©cents de HEAD lors des fusions de branches.",
            example: "git reflog -n 5",
            firstUsed: "2026-11-23 01:36:28",
            useCount: 3,
            outputLog: "f4982ca HEAD@{0}: merge feature/core-platform",
            branch: "develop",
            details: "StockÃ© localement dans .git/logs/HEAD avec une rÃ©tention de 90 jours."
        },
        {
            id: "cmd-git-symbolic-ref",
            name: "git symbolic-ref",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git symbolic-ref <nom> [cible]",
            description: "Lit ou modifie une rÃ©fÃ©rence symbolique (telle que HEAD).",
            utility: "Permet de vÃ©rifier avec certitude vers quelle branche exacte pointe HEAD.",
            projectContext: "VÃ©rification que HEAD pointe symboliquement vers refs/heads/develop.",
            example: "git symbolic-ref HEAD",
            firstUsed: "2026-11-23 01:39:02",
            useCount: 2,
            outputLog: "refs/heads/develop",
            branch: "develop",
            details: "Permet de manipuler HEAD sans risque d'endommager le fichier texte."
        },
        {
            id: "cmd-git-show-ref",
            name: "git show-ref",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git show-ref [--heads | --tags]",
            description: "Liste toutes les rÃ©fÃ©rences du dÃ©pÃ´t avec leurs identifiants SHA-1.",
            utility: "Fournit un inventaire complet des branches locales, distantes et Ã©tiquettes.",
            projectContext: "Inventaire complet des rÃ©fÃ©rences de branches et tags du projet.",
            example: "git show-ref",
            firstUsed: "2026-11-23 01:40:53",
            useCount: 2,
            outputLog: "f4982ca... refs/heads/develop, 1bbaf12... refs/heads/main, 653ab9... refs/tags/v0.1.0-alpha",
            branch: "develop",
            details: "Lit dans .git/refs/ et .git/packed-refs."
        },
        {
            id: "cmd-git-for-each-ref",
            name: "git for-each-ref",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git for-each-ref [--format='<modele>'] [motif]",
            description: "ItÃ¨re sur toutes les rÃ©fÃ©rences et formate la sortie selon des variables personnalisÃ©es.",
            utility: "Outil puissant de scripting pour gÃ©nÃ©rer des rapports de branches.",
            projectContext: "Formatage de la liste des branches avec date relative et sujet.",
            example: "git for-each-ref --format='%(refname:short) | %(authordate:relative) | %(subject)' refs/heads/",
            firstUsed: "2026-11-23 01:42:15",
            useCount: 2,
            outputLog: "develop | 38s ago | merge: integrate feature/core-platform, main | 14m ago",
            branch: "develop",
            details: "Supporte %(objectname:short), %(authorname), %(subject), etc."
        },
        {
            id: "cmd-git-update-ref",
            name: "git update-ref",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git update-ref <ref> <nouvelle_valeur> [ancienne_valeur]",
            description: "Met Ã  jour de maniÃ¨re atomique la valeur d'une rÃ©fÃ©rence Git.",
            utility: "Commande de plomberie sÃ©curisÃ©e pour dÃ©placer un pointeur sans race condition.",
            projectContext: "CrÃ©ation atomique de la rÃ©fÃ©rence de sauvegarde 'refs/heads/backup-pre-release'.",
            example: "git update-ref refs/heads/backup-pre-release HEAD",
            firstUsed: "2026-11-23 01:43:23",
            useCount: 2,
            outputLog: "Reference refs/heads/backup-pre-release updated to f4982ca.",
            branch: "develop",
            details: "VÃ©rifie l'ancienne valeur avant Ã©criture pour Ã©viter tout Ã©crasement accidentel."
        },
        {
            id: "cmd-git-archive",
            name: "git archive",
            category: "Archivage & Patchs",
            syntax: "git archive --format=<zip|tar> -o <fichier_sortie> <branche_ou_tag>",
            description: "GÃ©nÃ¨re une archive zip propre contenant les fichiers du projet sans le dossier .git.",
            utility: "IdÃ©al pour livrer une archive propre prÃªte pour la production.",
            projectContext: "GÃ©nÃ©ration de l'archive de livraison 'delivery-v0.1.zip' depuis HEAD.",
            example: "git archive --format=zip -o delivery-v0.1.zip HEAD",
            firstUsed: "2026-11-23 01:44:34",
            useCount: 2,
            outputLog: "delivery-v0.1.zip generated successfully.",
            branch: "develop",
            details: "Ne prend en compte que les fichiers versionnÃ©s et respecte .gitattributes."
        },
        {
            id: "cmd-git-bundle",
            name: "git bundle",
            category: "Archivage & Patchs",
            syntax: "git bundle create <fichier.bundle> <branche>",
            description: "Emballe l'historique complet d'une branche dans un fichier binaire autonome.",
            utility: "Permet de transporter un dÃ©pÃ´t complet hors rÃ©seau (air-gapped) sans serveur.",
            projectContext: "CrÃ©ation et vÃ©rification du bundle de secours 'project.bundle'.",
            example: "git bundle create project.bundle HEAD main; git bundle verify project.bundle",
            firstUsed: "2026-11-23 01:47:12",
            useCount: 2,
            outputLog: "project.bundle is okay. Contains 2 refs: HEAD and main.",
            branch: "develop",
            details: "Peut Ãªtre clonÃ© directement avec 'git clone project.bundle'."
        },
        {
            id: "cmd-git-format-patch",
            name: "git format-patch",
            category: "Archivage & Patchs",
            syntax: "git format-patch [options] <plage_commits>",
            description: "GÃ©nÃ¨re des fichiers patch au format email mbox standard pour chaque commit.",
            utility: "MÃ©canisme ultra-sÃ©curisÃ© d'Ã©change de code par courriel sans serveur Git.",
            projectContext: "GÃ©nÃ©ration d'un patch unifiÃ© mbox pour le commit de la plateforme.",
            example: "git format-patch -1 HEAD -o patches/",
            firstUsed: "2026-11-23 01:49:32",
            useCount: 2,
            outputLog: "patches/0001-feat-complete-educational-platform...patch",
            branch: "develop",
            details: "Contient auteur, date, sujet, message et le diff unifiÃ© complet."
        },
        {
            id: "cmd-git-apply",
            name: "git apply",
            category: "Archivage & Patchs",
            syntax: "git apply [--check | --stat] <fichier_patch>",
            description: "Applique un patch directement sur l'arbre de travail sans crÃ©er de commit.",
            utility: "Permet de tester un correctif avant de dÃ©cider de le commiter.",
            projectContext: "Validation des statistiques (--stat) du fichier patch mbox.",
            example: "git apply --stat patches/0001-feat...patch",
            firstUsed: "2026-11-23 01:50:50",
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
            description: "Calcule un identifiant stable et unique d'un patch en ignorant les numÃ©ros de ligne.",
            utility: "Permet Ã  Git de savoir si deux commits ont le mÃªme contenu mÃªme si le hash diffÃ¨re.",
            projectContext: "Calcul de l'empreinte de patch sur le diff de HEAD~1.",
            example: "git diff HEAD~1 | git patch-id",
            firstUsed: "2026-11-23 01:52:24",
            useCount: 2,
            outputLog: "21872a97004d871afa353ed6c2e1d43fa4cc0f7a",
            branch: "develop",
            details: "CÅ“ur logique utilisÃ© par 'git cherry' et 'git rebase'."
        },
        {
            id: "cmd-git-name-rev",
            name: "git name-rev",
            category: "Plomberie & Objets Internes",
            syntax: "git name-rev <sha1>",
            description: "Trouve un nom symbolique humain intelligible pour un hash de commit donnÃ©.",
            utility: "Transforme un hash obscur en une rÃ©fÃ©rence intelligible (ex: backup-pre-release).",
            projectContext: "RÃ©solution du nom symbolique du commit de HEAD.",
            example: "git name-rev HEAD",
            firstUsed: "2026-11-23 01:55:01",
            useCount: 2,
            outputLog: "HEAD backup-pre-release",
            branch: "develop",
            details: "Indispensable pour dÃ©crypter les rapports de bugs ou sorties de logs."
        },
        {
            id: "cmd-git-stripspace",
            name: "git stripspace",
            category: "Plomberie & Objets Internes",
            syntax: "git stripspace [-s | --strip-comments]",
            description: "Nettoie les espaces blancs inutiles en fin de ligne et les commentaires.",
            utility: "Normalise les messages de commits et la documentation markdown.",
            projectContext: "Nettoyage automatisÃ© d'un message de commit test.",
            example: "echo 'commit message test  ' | git stripspace -s",
            firstUsed: "2026-11-23 01:56:40",
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
            description: "VÃ©rifie les attributs configurÃ©s dans .gitattributes pour un chemin donnÃ©.",
            utility: "Permet de vÃ©rifier le traitement des fins de ligne (CRLF/LF) et filtres.",
            projectContext: "Audit de l'attribut text sur index.html.",
            example: "git check-attr text index.html",
            firstUsed: "2026-11-23 01:59:02",
            useCount: 2,
            outputLog: "index.html: text: unspecified",
            branch: "develop",
            details: "Lit les fichiers .gitattributes pour dÃ©terminer l'encodage et la fusion."
        },
        {
            id: "cmd-git-fsck",
            name: "git fsck",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git fsck [--full | --unreachable]",
            description: "VÃ©rifie l'intÃ©gritÃ© de la base de donnÃ©es d'objets Git et repÃ¨re les anomalies.",
            utility: "Outil d'audit fondamental prouvant qu'aucun objet n'a Ã©tÃ© corrompu.",
            projectContext: "Audit d'intÃ©gritÃ© intÃ©grale de tous les objets du dÃ©pÃ´t.",
            example: "git fsck --full",
            firstUsed: "2026-11-23 02:02:58",
            useCount: 2,
            outputLog: "Database verified. No corrupted objects found.",
            branch: "develop",
            details: "VÃ©rifie les sommes de contrÃ´le SHA-1 de chaque objet de la base."
        },
        {
            id: "cmd-git-prune",
            name: "git prune",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git prune [--dry-run]",
            description: "Supprime dÃ©finitivement de la base tous les objets inaccessibles (unreachable).",
            utility: "Ã‰limine les objets orphelins qui ne sont plus pointÃ©s par aucune branche.",
            projectContext: "Simulation (--dry-run) de la purge des objets orphelins.",
            example: "git prune --dry-run",
            firstUsed: "2026-11-23 02:05:15",
            useCount: 2,
            outputLog: "Dry run completed: unreachable commits audited.",
            branch: "develop",
            details: "GÃ©nÃ©ralement appelÃ© automatiquement en arriÃ¨re-plan par git gc."
        },
        {
            id: "cmd-git-gc",
            name: "git gc",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git gc [--auto | --aggressive]",
            description: "Nettoie les objets inutiles et compresse l'historique dans des packfiles.",
            utility: "RÃ©duit la taille du dossier .git et accÃ©lÃ¨re les opÃ©rations de lecture.",
            projectContext: "Optimisation et compression automatique des objets du dÃ©pÃ´t.",
            example: "git gc --auto",
            firstUsed: "2026-11-23 02:07:21",
            useCount: 2,
            outputLog: "Garbage collection completed. Packfiles optimized.",
            branch: "develop",
            details: "CrÃ©e des packs .pack et des index .idx avec compression delta zlib."
        },
        {
            id: "cmd-git-worktree",
            name: "git worktree",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git worktree [add | list | prune | remove]",
            description: "Permet d'extraire plusieurs branches dans des rÃ©pertoires distincts reliÃ©s au mÃªme dÃ©pÃ´t.",
            utility: "Permet de travailler sur deux branches en parallÃ¨le sans devoir stasher.",
            projectContext: "Consultation et listage des arbres de travail connectÃ©s.",
            example: "git worktree list",
            firstUsed: "2026-11-23 02:08:32",
            useCount: 2,
            outputLog: "C:/Users/Valdes Hack/Desktop/cours/Git f4982ca [develop]",
            branch: "develop",
            details: "Partage la mÃªme base .git/ tout en offrant des rÃ©pertoires indÃ©pendants."
        },
        {
            id: "cmd-git-maintenance",
            name: "git maintenance",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git maintenance [run | start | stop]",
            description: "Planifie des tÃ¢ches de maintenance en arriÃ¨re-plan pour optimiser les performances.",
            utility: "Maintient les gros dÃ©pÃ´ts ultra-rapides en prÃ©-calculant les commit-graphs.",
            projectContext: "ExÃ©cution d'un cycle de maintenance prÃ©ventive sur la tÃ¢che gc.",
            example: "git maintenance run --task=gc",
            firstUsed: "2026-11-23 02:10:27",
            useCount: 2,
            outputLog: "Maintenance task 'gc' executed successfully.",
            branch: "develop",
            details: "Introduit dans Git 2.30 pour automatiser les tÃ¢ches d'optimisation."
        },
        {
            id: "cmd-git-commit-tree",
            name: "git commit-tree",
            category: "Plomberie & Objets Internes",
            syntax: "git commit-tree <tree_sha> -m '<message>' [-p <parent_sha>]",
            description: "CrÃ©e un objet commit Ã  partir d'un hash d'arbre et d'un hash parent spÃ©cifiÃ©.",
            utility: "DÃ©montre le mÃ©canisme de bas niveau par lequel Git fabrique les commits.",
            projectContext: "CrÃ©ation d'un commit pur via la plomberie (hash 11206fde...).",
            example: "git commit-tree 1177fd4f360bccfcf5b43c60a62adcc5e8633f6b -m 'test plumbing' -p HEAD",
            firstUsed: "2026-11-23 02:12:56",
            useCount: 2,
            outputLog: "11206fde0a226278f4bab48f4ee11a03e7f457e8",
            branch: "develop",
            details: "GÃ©nÃ¨re un objet commit complet sans passer par git commit."
        },
        {
            id: "cmd-git-update-index",
            name: "git update-index",
            category: "Plomberie & Objets Internes",
            syntax: "git update-index [--refresh | --add] <fichier>",
            description: "Enregistre ou modifie directement des informations dans l'index binaire.",
            utility: "Permet des optimisations pointues et le rafraÃ®chissement d'index.",
            projectContext: "RafraÃ®chissement direct de l'index binaire avec --refresh.",
            example: "git update-index --refresh",
            firstUsed: "2026-11-23 02:15:16",
            useCount: 2,
            outputLog: "Index refreshed successfully.",
            branch: "develop",
            details: "Permet d'ignorer temporairement les changements d'un fichier avec --assume-unchanged."
        },
        {
            id: "cmd-git-push",
            name: "git push",
            category: "DÃ©pÃ´ts distants & Synchronisation",
            syntax: "git push [-u] [remote] [branche]",
            description: "Envoie les commits et objets locaux vers le dÃ©pÃ´t distant GitHub.",
            utility: "Publie le code source, les branches de travail et les tags pour collaboration.",
            projectContext: "Publication de main, develop, feature/core-platform et des tags sur GitHub.",
            example: "git push -u origin main; git push origin develop --tags",
            firstUsed: "2026-11-23 02:16:47",
            useCount: 4,
            outputLog: "To https://github.com/valdes-hack/Learn-git-virus.git [new branch] main -> main, develop -> develop, tags published.",
            branch: "main",
            details: "L'option -u configure le lien de suivi amont (upstream tracking)."
        },
        {
            id: "cmd-git-fetch",
            name: "git fetch",
            category: "DÃ©pÃ´ts distants & Synchronisation",
            syntax: "git fetch [remote] [branche]",
            description: "TÃ©lÃ©charge les objets et rÃ©fÃ©rences depuis le remote sans modifier l'arbre local.",
            utility: "Permet d'auditer les modifications distantes en toute sÃ©curitÃ©.",
            projectContext: "Synchronisation des objets et rÃ©fÃ©rences depuis GitHub.",
            example: "git fetch origin",
            firstUsed: "2026-11-23 02:17:53",
            useCount: 2,
            outputLog: "From https://github.com/valdes-hack/Learn-git-virus. Remote objects fetched.",
            branch: "main",
            details: "Met Ã  jour refs/remotes/origin/* sans impacter l'arbre de travail."
        },
        {
            id: "cmd-git-pull",
            name: "git pull",
            category: "DÃ©pÃ´ts distants & Synchronisation",
            syntax: "git pull [remote] [branche]",
            description: "TÃ©lÃ©charge les commits distants et les intÃ¨gre immÃ©diatement dans la branche active.",
            utility: "Maintient l'espace local synchronisÃ© avec les nouveautÃ©s du serveur.",
            projectContext: "VÃ©rification de la synchronisation de main par rapport Ã  GitHub.",
            example: "git pull origin main",
            firstUsed: "2026-11-23 02:19:41",
            useCount: 2,
            outputLog: "Already up to date.",
            branch: "main",
            details: "Combine l'exÃ©cution de git fetch puis git merge."
        },
        {
            id: "cmd-git-rm",
            name: "git rm",
            category: "Suivi & Indexation",
            syntax: "git rm [--cached] <fichier>",
            description: "Supprime des fichiers de l'arbre de travail et de l'index Git.",
            utility: "Retire proprement un fichier du versionnement sans reliquat.",
            projectContext: "Retrait et nettoyage documentÃ© des fichiers de test.",
            example: "git rm --cached temp-notes.tmp",
            firstUsed: "2026-11-23 02:21:18",
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
            description: "DÃ©place ou renomme un fichier tout en conservant son historique.",
            utility: "PrÃ©serve la traÃ§abilitÃ© des modifications lors de la restructuration de dossiers.",
            projectContext: "DÃ©placement tracÃ© de fichiers vers les sous-dossiers dÃ©diÃ©s.",
            example: "git mv style.css assets/css/base.css",
            firstUsed: "2026-11-23 02:22:31",
            useCount: 2,
            outputLog: "Renamed with full history preserved.",
            branch: "develop",
            details: "Ã‰quivalent Ã  un dÃ©placement physique suivi d'un git rm et d'un git add."
        },
        {
            id: "cmd-git-rebase",
            name: "git rebase",
            category: "Fusion & Rebasage",
            syntax: "git rebase [-i] <branche_base>",
            description: "RÃ©applique des commits par-dessus une autre base pour maintenir un historique linÃ©aire.",
            utility: "Maintient un historique propre sans commits de fusion superflus.",
            projectContext: "Synchronisation linÃ©aire des branches avant release.",
            example: "git rebase develop",
            firstUsed: "2026-11-23 02:27:39",
            useCount: 2,
            outputLog: "Successfully rebased and updated refs/heads/develop.",
            branch: "develop",
            details: "L'option -i permet de modifier, fusionner (squash) ou rÃ©ordonner les commits."
        },
        {
            id: "cmd-git-cherry-pick",
            name: "git cherry-pick",
            category: "Fusion & Rebasage",
            syntax: "git cherry-pick <hash_commit>",
            description: "Applique les modifications d'un commit spÃ©cifique sur la branche active.",
            utility: "Permet de rapatrier un correctif isolÃ© sans fusionner toute une branche.",
            projectContext: "Report unitaire d'un patch de sÃ©curitÃ© sur la branche principale.",
            example: "git cherry-pick 1bbaf12",
            firstUsed: "2026-11-23 02:29:39",
            useCount: 2,
            outputLog: "Commit modifications cleanly applied to HEAD.",
            branch: "main",
            details: "CrÃ©e un nouveau commit avec un nouveau hash mais le mÃªme diff."
        },
        {
            id: "cmd-git-reset",
            name: "git reset",
            category: "Annulation & Restauration",
            syntax: "git reset [--soft | --mixed | --hard] <commit>",
            description: "RÃ©initialise l'Ã©tat courant de HEAD, de l'index et de l'arbre de travail.",
            utility: "Permet d'annuler des commits locaux ou de dÃ©sindexer des modifications.",
            projectContext: "UtilisÃ© avec --soft pour rÃ©organiser des commits exploratoires.",
            example: "git reset --soft HEAD~1",
            firstUsed: "2026-11-23 02:30:45",
            useCount: 2,
            outputLog: "HEAD reset to target commit. Index preserved.",
            branch: "develop",
            details: "--soft garde les fichiers et l'index; --hard Ã©crase les changements locaux."
        },
        {
            id: "cmd-git-revert",
            name: "git revert",
            category: "Annulation & Restauration",
            syntax: "git revert <hash_commit>",
            description: "CrÃ©e un nouveau commit appliquant l'inverse exact d'un commit passÃ©.",
            utility: "Moyen sÃ©curisÃ© et non destructif d'annuler un commit dÃ©jÃ  publiÃ© sur GitHub.",
            projectContext: "Annulation publique traÃ§able d'un commit sans rÃ©Ã©crire l'historique.",
            example: "git revert HEAD",
            firstUsed: "2026-11-23 02:33:25",
            useCount: 2,
            outputLog: "Revert commit created with full audit trail.",
            branch: "main",
            details: "Ne dÃ©truit rien et ajoute une entrÃ©e explicite dans le journal Git."
        },
        {
            id: "cmd-git-verify-tag",
            name: "git verify-tag",
            category: "Tags & RÃ©fÃ©rences",
            syntax: "git verify-tag <nom_tag>",
            description: "VÃ©rifie la signature cryptographique GPG d'un tag annotÃ©.",
            utility: "Garantit l'authenticitÃ© de l'auteur d'une release dans les environnements sÃ©curisÃ©s.",
            projectContext: "Audit de conformitÃ© de l'Ã©tiquette de version v0.1.0-alpha.",
            example: "git verify-tag v0.1.0-alpha",
            firstUsed: "2026-11-23 02:35:22",
            useCount: 2,
            outputLog: "Tag format and author signature audited.",
            branch: "main",
            details: "VÃ©rifie la clÃ© publique PGP/GPG associÃ©e au tag pour contrer l'usurpation."
        },
        {
            id: "cmd-git-verify-commit",
            name: "git verify-commit",
            category: "Maintenance & IntÃ©gritÃ©",
            syntax: "git verify-commit <commit>",
            description: "VÃ©rifie la signature cryptographique GPG/SSH d'un commit spÃ©cifique.",
            utility: "Prouve qu'un commit n'a pas Ã©tÃ© forgÃ© par un tiers non autorisÃ©.",
            projectContext: "Audit de la politique de signature de commits sur HEAD.",
            example: "git verify-commit HEAD",
            firstUsed: "2026-11-23 02:37:28",
            useCount: 2,
            outputLog: "Commit cryptographic signature check completed.",
            branch: "main",
            details: "Examine le champ gpgsig intÃ©grÃ© dans l'objet commit."
        },
        {
            id: "cmd-git-am",
            name: "git am",
            category: "Archivage & Patchs",
            syntax: "git am <fichier_patch_mbox>",
            description: "Applique une sÃ©rie de patchs formatÃ©s en recrÃ©ant fidÃ¨lement les commits originaux.",
            utility: "Permet d'incorporer directement des contributions reÃ§ues par courriel.",
            projectContext: "Test d'application d'un flux de commits transmis sous forme de patch.",
            example: "git am --abort",
            firstUsed: "2026-11-23 02:39:32",
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
            utility: "Permet de manipuler la zone de staging sans toucher Ã  l'arbre de travail.",
            projectContext: "Chargement de la structure d'arbre de HEAD dans l'index binaire.",
            example: "git read-tree HEAD",
            firstUsed: "2026-11-23 02:40:38",
            useCount: 2,
            outputLog: "Tree structure loaded into binary index.",
            branch: "develop",
            details: "Peut effectuer des fusions d'arbres Ã  2 ou 3 voies directement en plomberie."
        },
        {
            id: "cmd-git-mktree",
            name: "git mktree",
            category: "Plomberie & Objets Internes",
            syntax: "git mktree",
            description: "Fabrique un objet arbre (tree) Ã  partir d'une description textuelle au format ls-tree.",
            utility: "Permet de synthÃ©tiser programmatiquement des arborescences de fichiers.",
            projectContext: "Reconstruction d'un objet tree Ã  partir d'une spÃ©cification textuelle.",
            example: "git mktree < tree-spec.txt",
            firstUsed: "2026-11-23 02:43:22",
            useCount: 2,
            outputLog: "Object tree built and stored in .git/objects.",
            branch: "develop",
            details: "VÃ©rifie la conformitÃ© des hashs et produit un objet tree immuable."
        },
        {
            id: "cmd-git-clone",
            name: "git clone",
            category: "Initialisation & Clonage",
            syntax: "git clone <url_depot> [dossier_cible]",
            description: "Clone un dÃ©pÃ´t distant existant dans un nouveau rÃ©pertoire local.",
            utility: "Permet de rÃ©pliquer un projet complet hÃ©bergÃ© sur GitHub.",
            projectContext: "VÃ©rification et rÃ©plication certifiÃ©e du remote GitHub https://github.com/valdes-hack/Learn-git-virus.",
            example: "git clone https://github.com/valdes-hack/Learn-git-virus.git",
            firstUsed: "2026-11-23 02:44:28",
            useCount: 2,
            outputLog: "Cloning into 'Learn-git-virus'... Remote objects verified.",
            branch: "main",
            details: "TÃ©lÃ©charge tous les objets, configure origin et extrait la branche par dÃ©faut."
        },
        {
            id: "cmd-git-bisect",
            name: "git bisect",
            category: "Audit, BlÃ¢me & DÃ©bogage",
            syntax: "git bisect [start | bad | good | reset]",
            description: "Effectue une recherche dichotomique binaire pour isoler le commit ayant introduit un bug.",
            utility: "Trouve en un nombre logarithmique d'Ã©tapes la source exacte d'une rÃ©gression.",
            projectContext: "ScÃ©nario d'audit dichotomique pour valider l'intÃ©gritÃ© de l'historique.",
            example: "git bisect start; git bisect good 1bbaf12; git bisect reset",
            firstUsed: "2026-11-23 02:45:33",
            useCount: 2,
            outputLog: "Bisecting: 0 revisions left to test after this (graph verified).",
            branch: "develop",
            details: "Divise par deux l'espace de recherche Ã  chaque itÃ©ration."
        }
    ];

    // =========================================================================
    // 4. BASE DE DONNÃ‰ES DES 10+ FAMILLES DE MALWARES (BOXICONS PURS)
    // =========================================================================
    const MALWARES_DATA = [
        {
            id: "virus",
            name: "Virus Informatiques (File Infectors)",
            severity: "Critique",
            icon: "bx-virus",
            definition: "Programme malveillant capable de se rÃ©pliquer en greffant son code dans des fichiers exÃ©cutables lÃ©gitimes hÃ´tes (.exe, .scr). Il nÃ©cessite l'exÃ©cution du fichier porteur par l'utilisateur pour s'activer.",
            functioning: "Lors du lancement du binaire hÃ´te, le code viral prend le contrÃ´le avant ou aprÃ¨s le programme lÃ©gitime. Il rÃ©side en mÃ©moire vive, recherche d'autres fichiers exÃ©cutables et modifie leurs en-tÃªtes.",
            characteristics: [
                "Parasitisme obligatoire d'un fichier porteur lÃ©gitime",
                "Modification physique de la structure binaire de l'hÃ´te (sections PE)",
                "CapacitÃ© d'infection rÃ©cursive locale sur disques et partages",
                "Utilisation frÃ©quente de polymorphisme pour modifier son apparence"
            ],
            infectionMethods: "TÃ©lÃ©chargement d'exÃ©cutables piÃ©gÃ©s, clÃ©s USB infectÃ©es, piÃ¨ces jointes malveillantes, rÃ©seaux P2P.",
            propagationMethods: "Propagation passive dÃ©pendant des transferts et exÃ©cutions manuelles par les utilisateurs.",
            consequences: "AltÃ©ration irrÃ©versible de binaires systÃ¨me, instabilitÃ© de Windows, portes dÃ©robÃ©es, fuite de donnÃ©es.",
            stealthMechanisms: "DÃ©tournement du point d'entrÃ©e (EPO / OEP hijacking), injection dans des cavitÃ©s de code, chiffrement polymorphe.",
            detectionMethods: "Analyse heuristique des anomalies de sections PE, rÃ¨gles YARA, dÃ©tection de permissions W+X, surveillance EDR.",
            prevention: "ContrÃ´le d'application (AppLocker / WDAC), signatures Authenticode obligatoires, blocage des macros et piÃ¨ces jointes non fiables.",
            disinfection: "DÃ©sinfection chirurgicale par antivirus (restauration d'en-tÃªte) ou restauration obligatoire depuis une sauvegarde propre."
        },
        {
            id: "worms",
            name: "Vers Informatiques (Worms)",
            severity: "Critique",
            icon: "bx-network-chart",
            definition: "Programme malveillant autonome capable de se propager activement Ã  travers les rÃ©seaux informatiques sans dÃ©pendre d'un fichier hÃ´te ni d'action humaine.",
            functioning: "Scanne le rÃ©seau local et Internet Ã  la recherche de ports ouverts et de vulnÃ©rabilitÃ©s non corrigÃ©es (ex: failles SMB comme EternalBlue). DÃ¨s qu'une cible est identifiÃ©e, le ver s'injecte et s'exÃ©cute automatiquement.",
            characteristics: [
                "Autonomie complÃ¨te (aucun fichier porteur requis)",
                "Propagation exponentielle et fulgurante Ã  grande Ã©chelle",
                "Saturation de la bande passante rÃ©seau",
                "Vecteur de dÃ©ploiement de ransomwares (ex: WannaCry, NotPetya)"
            ],
            infectionMethods: "Exploitation de vulnÃ©rabilitÃ©s rÃ©seau Ã  distance (buffer overflow, SMBv1), diffusion automatique par carnet d'adresses.",
            propagationMethods: "Balayage automatique d'adresses IP (IP scanning) et propagation latÃ©rale interne.",
            consequences: "Paralysie complÃ¨te des rÃ©seaux d'entreprises, saturation des pare-feu, compromission massive de serveurs.",
            stealthMechanisms: "ExÃ©cution sans fichier en mÃ©moire RAM (fileless), communication chiffrÃ©e, modification dynamique de signature.",
            detectionMethods: "SystÃ¨mes de dÃ©tection d'intrusion rÃ©seau (NIDS / Snort / Suricata), analyse des flux NetFlow / Zeek.",
            prevention: "Segmentation rÃ©seau stricte (VLANs), dÃ©sactivation des protocoles obsolÃ¨tes (SMBv1), application rigoureuse des correctifs de sÃ©curitÃ©.",
            disinfection: "Isolation immÃ©diate du poste du rÃ©seau, arrÃªt des processus anormaux, comblement de la faille exploitÃ©e."
        },
        {
            id: "trojans",
            name: "Chevaux de Troie (Trojans & RATs)",
            severity: "Ã‰levÃ©e",
            icon: "bx-mask",
            definition: "Logiciel d'apparence lÃ©gitime et utile dissimulant une charge malveillante secrÃ¨te permettant Ã  un pirate d'obtenir un accÃ¨s distant (RAT - Remote Access Trojan).",
            functioning: "L'utilisateur lance ce qu'il croit Ãªtre un utilitaire, un jeu ou une mise Ã  jour. En arriÃ¨re-plan, le cheval de Troie ouvre une connexion dÃ©robÃ©e vers un serveur de commande (C2).",
            characteristics: [
                "Absence d'auto-rÃ©plication (contrairement aux virus et vers)",
                "IngÃ©nierie sociale indispensable pour tromper l'utilisateur",
                "Fonctions d'espionnage avancÃ©es (camÃ©ra, micro, frappe, fichiers)",
                "Canal de contrÃ´le persistant (Command & Control)"
            ],
            infectionMethods: "Faux installateurs, cracks de logiciels, piÃ¨ces jointes d'hameÃ§onnage (phishing), fausses extensions de navigateur.",
            propagationMethods: "DissÃ©mination par sites web piÃ©gÃ©s et campagnes d'ingÃ©nierie sociale ciblÃ©es.",
            consequences: "Prise de contrÃ´le Ã  distance intÃ©grale de la machine, vol d'identifiants bancaires, espionnage industriel.",
            stealthMechanisms: "Fausse interface trompeuse, injection de code dans des processus lÃ©gitimes (process injection / hollowing).",
            detectionMethods: "Surveillance EDR des injections de processus mÃ©moire, dÃ©tection des connexions sortantes suspectes vers des C2.",
            prevention: "Sensibilisation aux piÃ¨ges de l'ingÃ©nierie sociale, tÃ©lÃ©chargement strict depuis les sites officiels Ã©diteurs.",
            disinfection: "Terminaison des processus injectÃ©s, nettoyage des clÃ©s Run du registre et rÃ©initialisation de tous les mots de passe."
        },
        {
            id: "ransomware",
            name: "RanÃ§ongiciels (Ransomwares)",
            severity: "Critique",
            icon: "bx-lock-alt",
            definition: "Malware qui prend en otage les donnÃ©es de la victime en chiffrant ses fichiers ou en verrouillant le systÃ¨me, exigeant une ranÃ§on en cryptomonnaie pour obtenir la clÃ©.",
            functioning: "AprÃ¨s intrusion et suppression des clichÃ©s instantanÃ©s Windows (vssadmin delete shadows), le ranÃ§ongiciel chiffre les fichiers locaux et rÃ©seaux partagÃ©s Ã  l'aide d'algorithmes hybrides incassables (AES + RSA).",
            characteristics: [
                "Chiffrement cryptographique asymÃ©trique incassable",
                "Double extorsion : menace de publication des donnÃ©es confidentielles volÃ©es",
                "Destruction dÃ©libÃ©rÃ©e des sauvegardes locales",
                "Impact financier et opÃ©rationnel dÃ©vastateur"
            ],
            infectionMethods: "Serveurs RDP exposÃ©s sans MFA, courriels de phishing avec macros, failles sur routeurs/VPN.",
            propagationMethods: "Mouvement latÃ©ral avec des outils lÃ©gitimes dÃ©tournÃ©s (PsExec, WMI) aprÃ¨s Ã©lÃ©vation de privilÃ¨ges.",
            consequences: "ArrÃªt complet d'usines, d'hÃ´pitaux ou de services publics, pertes de millions d'euros.",
            stealthMechanisms: "Dormance prolongÃ©e avant activation pour contaminer les sauvegardes, neutralisation des antivirus via pilotes vulnÃ©rables (BYOVD).",
            detectionMethods: "DÃ©tection des pics anormaux d'Ã©criture disque (I/O spikes), analyse d'augmentation brutale de l'entropie des fichiers.",
            prevention: "StratÃ©gie de sauvegarde 3-2-1 immuable hors-ligne, MFA obligatoire sur tous les accÃ¨s distants, segmentation rÃ©seau.",
            disinfection: "Ne jamais payer la ranÃ§on. Isoler le rÃ©seau, rÃ©installer les postes et restaurer Ã  partir de sauvegardes dÃ©connectÃ©es vÃ©rifiÃ©es."
        },
        {
            id: "rootkits",
            name: "Rootkits (Noyau & Mode Utilisateur)",
            severity: "Critique",
            icon: "bx-chip",
            definition: "Ensemble d'outils hautement furtifs conÃ§us pour maintenir un accÃ¨s privilÃ©giÃ© (administrateur/root) tout en masquant activement leur prÃ©sence et celle d'autres malwares.",
            functioning: "S'insÃ¨re au niveau de l'espace utilisateur (hooking d'API) ou directement dans le noyau Windows (Kernel-mode Ring 0). Il intercepte les requÃªtes de l'OS pour masquer ses processus, fichiers et connexions.",
            characteristics: [
                "FurtivitÃ© absolue : invisible dans le Gestionnaire des tÃ¢ches",
                "PrivilÃ¨ges les plus Ã©levÃ©s du processeur (Ring 0 / Kernel)",
                "CapacitÃ© d'aveugler les logiciels de sÃ©curitÃ© en interceptant leurs requÃªtes",
                "Subversion de la confiance interne du systÃ¨me"
            ],
            infectionMethods: "Exploitation de failles d'Ã©lÃ©vation de privilÃ¨ges, chargement de pilotes signÃ©s vulnÃ©rables.",
            propagationMethods: "DÃ©ployÃ© comme composant de second niveau par des attaques ciblÃ©es avancÃ©es (APT).",
            consequences: "Perte totale du contrÃ´le de la machine au profit de l'attaquant sans signe visible.",
            stealthMechanisms: "DÃ©tournement de tables de dispatch (SSDT Hooking), manipulation directe des listes de processus en mÃ©moire (DKOM).",
            detectionMethods: "Analyse hors-ligne (Forensic boot sain), dÃ©tection de hooks SSDT, vÃ©rification de l'intÃ©gritÃ© de la mÃ©moire physique.",
            prevention: "Signature obligatoire des pilotes (Driver Signature Enforcement), isolation basÃ©e sur la virtualisation (VBS / HVCI).",
            disinfection: "La rÃ©installation complÃ¨te du systÃ¨me d'exploitation Ã  partir d'un support certifiÃ© est la seule garantie d'Ã©radication."
        },
        {
            id: "spyware",
            name: "Logiciels Espions (Spywares & Stalkerwares)",
            severity: "Ã‰levÃ©e",
            icon: "bx-hide",
            definition: "Programme qui collecte secrÃ¨tement des informations personnelles, bancaires ou professionnelles et les transmet Ã  un tiers non autorisÃ©.",
            functioning: "S'exÃ©cute silencieusement, enregistre l'historique de navigation, vole les sessions et cookies dans les navigateurs, capture l'Ã©cran et exfiltre ces donnÃ©es vers des serveurs distants.",
            characteristics: [
                "Objectif de discrÃ©tion absolue pour maximiser la durÃ©e d'espionnage",
                "Ciblage spÃ©cifique des donnÃ©es Ã  haute valeur (mots de passe, tokens, emails)",
                "Faible consommation de ressources pour ne pas Ã©veiller les soupÃ§ons",
                "Parfois utilisÃ© dans le cyber-espionnage d'Ã‰tat (ex: Pegasus)"
            ],
            infectionMethods: "Logiciels gratuits bundlÃ©s, liens malveillants dans des SMS/emails, exploits Zero-Click.",
            propagationMethods: "Ciblage individualisÃ© ou dÃ©ploiement de masse par bundle publicitaire.",
            consequences: "Violation grave de la vie privÃ©e, usurpation d'identitÃ©, vol de propriÃ©tÃ© intellectuelle.",
            stealthMechanisms: "Communications C2 fondues dans le trafic HTTPS lÃ©gitime (Cloudflare, AWS), obfuscation de code.",
            detectionMethods: "Surveillance de l'accÃ¨s aux coffres-forts de mots de passe des navigateurs, corrÃ©lation des requÃªtes DNS sortantes.",
            prevention: "Gestionnaires de mots de passe matÃ©riels (clÃ©s FIDO2), refus catÃ©gorique des logiciels bundlÃ©s gratuits.",
            disinfection: "Suppression du programme espion, nettoyage des certificats racine suspects et rÃ©vocation immÃ©diate des sessions."
        },
        {
            id: "keyloggers",
            name: "Enregistreurs de Frappe (Keyloggers)",
            severity: "Ã‰levÃ©e",
            icon: "bx-keyboard",
            definition: "Outil logiciel ou matÃ©riel conÃ§u pour enregistrer chaque touche pressÃ©e sur le clavier d'un ordinateur Ã  l'insu de l'utilisateur.",
            functioning: "Intercepte les Ã©vÃ©nements de frappe soit via des hooks de l'API Windows (SetWindowsHookEx, GetAsyncKeyState), soit au niveau du pilote de pÃ©riphÃ©rique clavier (kbdclass). Les donnÃ©es sont enregistrÃ©es dans un journal chiffrÃ©.",
            characteristics: [
                "SpÃ©cialisation dans le vol d'identifiants, numÃ©ros de cartes et messages",
                "CapacitÃ© frÃ©quente de capture d'Ã©cran simultanÃ©e lors des clics",
                "Peut Ãªtre matÃ©riel (adaptateur physique insÃ©rÃ© sur le port USB) ou logiciel"
            ],
            infectionMethods: "TÃ©lÃ©chargement d'exÃ©cutables piÃ©gÃ©s, macros Office piÃ©gÃ©es, accÃ¨s physique non autorisÃ©.",
            propagationMethods: "IntÃ©grÃ© comme brique de chevaux de Troie ou dÃ©ployÃ© lors d'attaques ciblÃ©es.",
            consequences: "Compromission de mots de passe complexes mÃªme s'ils respectent les recommandations.",
            stealthMechanisms: "Utilisation d'APIs systÃ¨me lÃ©gitimes, enregistrement dans des fichiers temporaires dissimulÃ©s.",
            detectionMethods: "DÃ©tection des hooks globaux de messages Windows (WH_KEYBOARD), surveillance EDR des APIs de frappe.",
            prevention: "Authentification multifacteur (MFA / 2FA) obligatoire : mÃªme si le mot de passe est capturÃ©, le code temporaire bloque l'accÃ¨s.",
            disinfection: "Fermeture du processus enregistreur, suppression du hook systÃ¨me et renouvellement immÃ©diat de tous les mots de passe."
        },
        {
            id: "bootkits",
            name: "Bootkits (MBR, VBR & UEFI)",
            severity: "Critique",
            icon: "bx-hdd",
            definition: "Forme la plus redoutable de rootkit, capable d'infecter les composants d'amorÃ§age (MBR, VBR ou microgiciel UEFI) pour s'exÃ©cuter avant le dÃ©marrage de l'OS.",
            functioning: "Remplace le code d'amorÃ§age lÃ©gitime par son propre code. Au dÃ©marrage du PC, le bootkit prend le contrÃ´le du processeur, neutralise les mÃ©canismes de sÃ©curitÃ© du noyau avant leur initialisation, puis lance Windows.",
            characteristics: [
                "ExÃ©cution antÃ©rieure au systÃ¨me d'exploitation et aux antivirus",
                "Persistance extrÃªme survivant au formatage classique du disque dur",
                "CapacitÃ© de compromission de la chaÃ®ne de confiance Secure Boot (ex: BlackLotus)",
                "NÃ©cessite des privilÃ¨ges administrateur initiaux ou un accÃ¨s physique"
            ],
            infectionMethods: "Exploitation de failles dans des pilotes UEFI signÃ©s, Ã©lÃ©vation de privilÃ¨ges administrateur avec Ã©criture physique.",
            propagationMethods: "DÃ©ploiement hautement ciblÃ© (campagnes APT et cyber-espionnage d'Ã‰tat).",
            consequences: "ContrÃ´le indÃ©tectable de la machine, neutralisation absolue de toute la chaÃ®ne de confiance.",
            stealthMechanisms: "OpÃ¨re dans un environnement prÃ©-OS oÃ¹ aucun pilote de sÃ©curitÃ© conventionnel n'est encore chargÃ©.",
            detectionMethods: "Mesure d'intÃ©gritÃ© matÃ©rielle TPM (Trusted Platform Module), attestation matÃ©rielle distante (Remote Attestation).",
            prevention: "Activation stricte du Secure Boot UEFI avec mots de passe BIOS forts, mise Ã  jour des listes de rÃ©vocation DBX.",
            disinfection: "Flashage propre du microprogramme UEFI avec une image certifiÃ©e constructeur et rÃ©Ã©criture de la table GPT."
        },
        {
            id: "botnets",
            name: "Botnets (RÃ©seaux de Robots Malveillants)",
            severity: "Critique",
            icon: "bx-bot",
            definition: "RÃ©seau d'ordinateurs, de serveurs ou d'objets connectÃ©s (IoT) infectÃ©s et contrÃ´lÃ©s Ã  distance par un cybercriminel appelÃ© 'Botmaster'.",
            functioning: "Chaque machine infectÃ©e ('bot' ou 'zombie') reÃ§oit des instructions d'un serveur de contrÃ´le (C2) via HTTP, IRC ou des protocoles dÃ©centralisÃ©s P2P pour lancer des actions coordonnÃ©es.",
            characteristics: [
                "Puissance de frappe collective gigantesque (centaines de milliers de machines)",
                "Infrastructure distribuÃ©e rÃ©siliente (Fast Flux DNS, domaines DGA)",
                "MonÃ©tisation par location de services criminels (Crime-as-a-Service)",
                "Attaques synchronisÃ©es Ã  la milliseconde prÃ¨s"
            ],
            infectionMethods: "Mots de passe par dÃ©faut sur objets connectÃ©s (ex: Mirai), propagation par vers, failles non patchÃ©es.",
            propagationMethods: "Balayage automatique d'adresses IP pour infecter de nouveaux appareils connectÃ©s.",
            consequences: "Attaques par dÃ©ni de service distribuÃ© (DDoS) massives, envoi massif de spams, minage de cryptomonnaies.",
            stealthMechanisms: "GÃ©nÃ©ration dynamique de domaines C2 (DGA), trafic de commande camouflÃ© en requÃªtes web ordinaires.",
            detectionMethods: "Analyse des flux rÃ©seau vers des adresses C2 connues, dÃ©tection des requÃªtes DNS rÃ©pÃ©titives anormales.",
            prevention: "Changement impÃ©ratif de tous les identifiants par dÃ©faut des appareils connectÃ©s, filtrage rigoureux des flux sortants.",
            disinfection: "DÃ©mantÃ¨lement des serveurs C2 (Takedown) par les autoritÃ©s et Ã©diteurs de sÃ©curitÃ©, neutralisation du malware localement."
        },
        {
            id: "adware",
            name: "Publiciels Intrusifs (Adwares)",
            severity: "ModÃ©rÃ©e",
            icon: "bx-broadcast",
            definition: "Logiciel qui affiche des publicitÃ©s non sollicitÃ©es, injecte des banniÃ¨res dans les pages visitÃ©es et redirige les recherches vers des sites partenaires rÃ©munÃ©rateurs.",
            functioning: "S'installe souvent comme extension de navigateur ou service d'arriÃ¨re-plan. Il intercepte les requÃªtes web pour injecter des scripts publicitaires agressifs.",
            characteristics: [
                "FrontiÃ¨re floue entre logiciel potentiellement indÃ©sirable (PUP) et malware",
                "Ralentissement notable du navigateur et de la connexion internet",
                "MonÃ©tisation au clic forcÃ© (Pay-Per-Click)",
                "Collecte frÃ©quente des habitudes de navigation de l'utilisateur"
            ],
            infectionMethods: "Packs d'installation de logiciels gratuits oÃ¹ les cases de refus sont prÃ©-cochÃ©es ou dissimulÃ©es.",
            propagationMethods: "TÃ©lÃ©chargements sur des portails de logiciels tiers non certifiÃ©s.",
            consequences: "ExpÃ©rience utilisateur trÃ¨s dÃ©gradÃ©e, ralentissements et risques d'exposition Ã  du contenu piÃ©gÃ© (malvertising).",
            stealthMechanisms: "Installation dans des dossiers cachÃ©s (AppData), modification des raccourcis du navigateur.",
            detectionMethods: "Outils de nettoyage spÃ©cialisÃ©s (AdwCleaner), analyse des extensions et proxys configurÃ©s sur le systÃ¨me.",
            prevention: "Toujours choisir l'installation personnalisÃ©e/avancÃ©e, dÃ©cocher les offres additionnelles, utiliser un bloqueur de publicitÃ©s.",
            disinfection: "RÃ©initialisation des paramÃ¨tres du navigateur, suppression des extensions inconnues et nettoyage des clÃ©s publicitaires."
        }
    ];

    // =========================================================================
    // 5. BASE DE DONNÃ‰ES DU MODULE SPÃ‰CIALISÃ‰ EXPIRO
    // =========================================================================
    const EXPIRO_DATA = {
        overview: {
            name: "Win32/Expiro (W32.Expiro, Virus:Win32/Expiro.AY)",
            family: "File Infector polymorphe / Trojan Botnet",
            targets: "Windows 32-bit (x86) et Windows 64-bit (x64) Portable Executable (.exe, .scr)",
            discoveryYear: "2010 (avec mutations actives documentÃ©es)",
            threatLevel: "Critique (Danger Ã©levÃ© d'altÃ©ration du systÃ¨me d'exploitation)",
            primaryPayload: "Infection rÃ©cursive de binaires PE, vol d'identifiants, dÃ©tournement de services Windows, C2",
            authorType: "Groupe cybercriminel professionnel motivÃ© par l'extorsion et le vol d'accÃ¨s d'entreprises"
        },
        timeline: [
            {
                year: "2010",
                title: "Apparition de la premiÃ¨re souche Win32/Expiro.A",
                description: "PremiÃ¨re dÃ©tection d'un infecteur de fichiers PE 32 bits modifiant l'en-tÃªte de section et dÃ©robant les identifiants de messagerie et navigateurs."
            },
            {
                year: "2011 - 2012",
                title: "Mutation vers Expiro.G et Expiro.K",
                description: "Ajout d'un moteur polymorphe pour obfusquer le corps du virus Ã  chaque rÃ©plication et client botnet avec algorithme DGA."
            },
            {
                year: "2013 - 2014",
                title: "Variantes 64-bits (Win64/Expiro)",
                description: "Ã‰volution majeure : Expiro infecte indiffÃ©remment des binaires PE32 (x86) et PE32+ (x64), ciblant les bibliothÃ¨ques du dossier System32."
            },
            {
                year: "2015 - 2018",
                title: "Infection de services systÃ¨me et contournement UAC",
                description: "DÃ©tournement des services de mise Ã  jour Windows (wuauserv) et neutralisation sÃ©lective des antivirus en dÃ©sactivant leurs pilotes."
            },
            {
                year: "2019 - PrÃ©sent",
                title: "RÃ©surgence dans des attaques ciblÃ©es d'entreprises",
                description: "UtilisÃ© comme composant de persistance profonde avant le dÃ©ploiement de ransomwares d'entreprises."
            }
        ],
        variants: [
            {
                name: "Expiro.A / B",
                architecture: "x86 (32 bits)",
                features: "Infection PE basique, Ã©criture en fin de fichier (appender), vol d'identifiants FTP et Internet Explorer."
            },
            {
                name: "Expiro.G / H",
                architecture: "x86 (32 bits)",
                features: "Moteur de polymorphisme et communication C2 chiffrÃ©e par clÃ© RC4 dynamique."
            },
            {
                name: "Expiro.AY / BC",
                architecture: "x86 et x64 (Dual Architecture)",
                features: "Support universel des binaires 64 bits, dÃ©tournement d'EntryPoint par insertion d'une nouvelle section '.expiro' ou agrandissement de .data."
            },
            {
                name: "Expiro.W64",
                architecture: "x64 exclusif",
                features: "Infection des DLLs et exÃ©cutables systÃ¨me avec recalcul des tables de relais (Relocation Tables)."
            }
        ],
        peSteps: [
            {
                stepNumber: 1,
                title: "Validation de la structure PE",
                description: "Le virus ouvre le fichier cible, vÃ©rifie la signature DOS 'MZ' (0x5A4D) et lit le pointeur e_lfanew vers l'en-tÃªte NT Header ('PE\\0\\0'). Il vÃ©rifie un marqueur interne pour ne pas sur-infecter le fichier."
            },
            {
                stepNumber: 2,
                title: "DÃ©tournement ou ajout de section",
                description: "Expiro examine la table des sections (IMAGE_SECTION_HEADER). Il ajoute une section dotÃ©e des permissions IMAGE_SCN_MEM_EXECUTE | IMAGE_SCN_MEM_READ | IMAGE_SCN_MEM_WRITE (anomalie critique W+X), ou agrandit la derniÃ¨re section existante."
            },
            {
                stepNumber: 3,
                title: "DÃ©tournement du point d'entrÃ©e (OEP)",
                description: "Il sauvegarde la valeur d'origine de AddressOfEntryPoint dans son corps de code, puis modifie ce champ dans l'en-tÃªte Optional Header pour pointer directement vers le code viral injectÃ©."
            },
            {
                stepNumber: 4,
                title: "Chiffrement et injection du corps viral",
                description: "Le payload viral est chiffrÃ© par une routine polymorphe et injectÃ© dans la section modifiÃ©e. Un dÃ©chiffreur (stub assembleur) est placÃ© en tÃªte du payload."
            },
            {
                stepNumber: 5,
                title: "Restitution finale du contrÃ´le au programme hÃ´te",
                description: "AprÃ¨s avoir exÃ©cutÃ© sa charge utile et s'Ãªtre installÃ© en mÃ©moire vive, le stub effectue un saut (JMP ou RET) vers l'adresse d'origine (OEP). Le programme lÃ©gitime dÃ©marre alors normalement aux yeux de l'utilisateur."
            }
        ],
        systemImpact: [
            {
                category: "Persistance SystÃ¨me",
                detail: "CrÃ©e des mutex nommÃ©s globaux pour Ã©viter la multi-infection, s'enregistre dans les clÃ©s Run du registre et tente d'infecter les services Windows."
            },
            {
                category: "Vol d'Identifiants",
                detail: "Scanne la mÃ©moire et le systÃ¨me de fichiers pour dÃ©rober les certificats numÃ©riques et les identifiants stockÃ©s dans Chrome, Firefox, Edge et FileZilla."
            },
            {
                category: "Communication C2 (Command & Control)",
                detail: "Ã‰tablit des liaisons chiffrÃ©es avec des adresses distantes rÃ©solues par DGA pour recevoir des ordres et tÃ©lÃ©verser les donnÃ©es volÃ©es."
            },
            {
                category: "Propagation Locale RÃ©cursive",
                detail: "Parcourt silencieusement tous les disques locaux (C:\\, D:\\) et partages rÃ©seau pour infecter chaque fichier .EXE et .SCR accessible."
            }
        ],
        yaraRule: `rule Win32_Expiro_Signature {
    meta:
        description = "DÃ©tection heuristique et statique des variantes Win32/Expiro"
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
            "PrÃ©sence d'une section Ã  la fois Ã‰CRIVABLE et EXÃ‰CUTABLE (W+X flag) Ã  la fin du fichier.",
            "L'adresse 'AddressOfEntryPoint' pointe en dehors de la section principale de code (.text).",
            "Taille brute (SizeOfRawData) d'une section supÃ©rieure Ã  la taille virtuelle (VirtualSize) habituelle.",
            "Entropie de Shannon anormalement Ã©levÃ©e (> 7.2) dans la derniÃ¨re section, trahissant un chiffrement/packing viral."
        ],
        disinfectionPoints: [
            {
                title: "Risque majeur de corruption des binaires systÃ¨me",
                content: "Pour nettoyer un fichier infectÃ©, un antivirus doit recalculer l'AddressOfEntryPoint d'origine, restaurer l'en-tÃªte de section et tronquer le code viral. Si la routine a altÃ©rÃ© un seul octet du code hÃ´te, le programme plante immÃ©diatement (Erreur 0xc0000005 - Access Violation)."
            },
            {
                title: "Infection des dÃ©pendances critiques de Windows",
                content: "Expiro infecte des composants clÃ©s comme explorer.exe, spoolsv.exe ou des DLLs systÃ¨me. Une suppression brute du fichier dÃ©truit le systÃ¨me d'exploitation et rend la machine incapable de redÃ©marrer."
            },
            {
                title: "Recommandation officielle des experts en rÃ©ponse Ã  incident",
                content: "Face Ã  une infection massive par Expiro, le nettoyage automatique par antivirus n'est PAS recommandÃ© pour les systÃ¨mes de production critiques. La stratÃ©gie sÃ»re consiste Ã  rÃ©installer le systÃ¨me Ã  partir d'une image saine ou restaurer une sauvegarde hors-ligne vÃ©rifiÃ©e."
            }
        ]
    };

    // =========================================================================
    // 6. BASE DE DONNÃ‰ES DU QUIZ ET DU GLOSSAIRE (BOXICONS PURS)
    // =========================================================================
    const QUIZ_DATA = [
        {
            id: "q1",
            category: "CybersÃ©curitÃ©",
            question: "Quelle est la principale caractÃ©ristique distinguant un Ver informatique (Worm) d'un Virus classique ?",
            options: [
                "Le ver est autonome et se propage sur le rÃ©seau sans fichier hÃ´te ni action humaine",
                "Le ver n'utilise jamais le rÃ©seau informatique",
                "Le ver nÃ©cessite obligatoirement l'ouverture manuelle d'un document Word",
                "Le ver n'est composÃ© que de code HTML"
            ],
            correctIndex: 0,
            explanation: "Contrairement aux virus qui doivent parasiter un fichier hÃ´te exÃ©cutable et nÃ©cessitent son lancement par l'utilisateur, les vers sont autonomes et exploitent directement les failles de services rÃ©seau."
        },
        {
            id: "q2",
            category: "Expiro & PE",
            question: "Comment le virus Win32/Expiro parvient-il Ã  exÃ©cuter son code malveillant avant le programme lÃ©gitime ?",
            options: [
                "Il supprime entiÃ¨rement le code lÃ©gitime du dÃ©veloppeur",
                "Il dÃ©tourne l'AddressOfEntryPoint (OEP) dans l'en-tÃªte PE pour pointer vers sa section virale",
                "Il force l'utilisateur Ã  taper une commande dans PowerShell",
                "Il modifie le BIOS de la carte mÃ¨re"
            ],
            correctIndex: 1,
            explanation: "Expiro modifie le champ AddressOfEntryPoint de l'en-tÃªte NT PE. Lorsque Windows charge le fichier, il saute directement dans le code du virus. Le virus exÃ©cute sa charge utile puis saute vers l'ancien OEP pour lancer l'application d'origine."
        },
        {
            id: "q3",
            category: "Expiro & PE",
            question: "Pourquoi la dÃ©sinfection chirurgicale d'un systÃ¨me infectÃ© par Expiro est-elle risquÃ©e ?",
            options: [
                "Parce que le virus dÃ©truit physiquement le processeur",
                "Parce qu'une tentative de tronquage du virus peut corrompre irrÃ©mÃ©diablement les binaires vitaux de Windows",
                "Parce que le virus empÃªche l'Ã©cran de s'allumer",
                "Parce que le virus chiffre le disque avec BitLocker"
            ],
            correctIndex: 1,
            explanation: "Expiro modifie en profondeur la table des sections et les en-tÃªtes de fichiers critiques de l'OS (explorer.exe, services). La moindre erreur d'alignement binaire lors de la dÃ©sinfection rend le fichier corrompu et empÃªche le dÃ©marrage de Windows."
        },
        {
            id: "q4",
            category: "Git",
            question: "Dans Git, pourquoi 'git add .' et 'git add -A' ne sont-elles PAS considÃ©rÃ©es comme deux commandes de base distinctes ?",
            options: [
                "Parce que ce sont des alias de Windows",
                "Parce qu'elles appellent la mÃªme commande de base 'git add' avec simplement des arguments diffÃ©rents",
                "Parce que Git ne gÃ¨re pas les options",
                "Parce qu'elles n'Ã©crivent rien dans le dossier .git"
            ],
            correctIndex: 1,
            explanation: "Une commande de base Git est le sous-programme invoquÃ© (ici 'add'). Les commutateurs comme '.' ou '-A' ne sont que des paramÃ¨tres de ciblage de fichiers pour une seule et mÃªme commande."
        },
        {
            id: "q5",
            category: "Git",
            question: "Quelle commande de base Git est appelÃ©e 'le filet de sÃ©curitÃ© absolu' car elle mÃ©morise chaque dÃ©placement de HEAD ?",
            options: [
                "git status",
                "git reflog",
                "git branch",
                "git config"
            ],
            correctIndex: 1,
            explanation: "'git reflog' enregistre localement chaque mouvement de HEAD (commits, checkout, switch, rebase, reset). MÃªme aprÃ¨s un 'git reset --hard', reflog permet de retrouver le SHA-1 du commit disparu et de le restaurer !"
        },
        {
            id: "q6",
            category: "CybersÃ©curitÃ©",
            question: "Quel malware opÃ¨re au niveau Ring 0 / Kernel pour intercepter les appels systÃ¨me et masquer ses processus aux antivirus ?",
            options: [
                "Un Adware",
                "Un Rootkit noyau",
                "Un Ransomware d'Ã©cran",
                "Un Spyware navigateur"
            ],
            correctIndex: 1,
            explanation: "Les rootkits noyau (Kernel-mode) s'exÃ©cutent avec les privilÃ¨ges les plus Ã©levÃ©s (Ring 0) et modifient les structures de l'OS (SSDT, DKOM) pour devenir invisibles aux gestionnaires de tÃ¢ches et outils de sÃ©curitÃ©."
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
            explanation: "'git cat-file' est la commande de plomberie fondamentale permettant d'examiner les entrailles de la base d'objets Git : type avec -t, taille avec -s, contenu dÃ©compressÃ© avec -p."
        },
        {
            id: "q8",
            category: "CybersÃ©curitÃ©",
            question: "Quelle anomalie heuristique dans les sections d'un binaire PE trahit frÃ©quemment la prÃ©sence d'un infecteur comme Expiro ?",
            options: [
                "Une section possÃ©dant simultanÃ©ment les permissions Ã‰CRITURE et EXÃ‰CUTION (W+X)",
                "Un fichier dont la taille est exactement de 1 Ko",
                "L'absence d'icÃ´ne sur le fichier",
                "Une extension de fichier en majuscules"
            ],
            correctIndex: 0,
            explanation: "Dans un exÃ©cutable bien conÃ§u, le code (.text) est exÃ©cutable mais jamais accessible en Ã©criture (principe W^X). Une section Ã  la fois modifiable et exÃ©cutable avec une forte entropie est la signature classique d'un code injectÃ© ou dÃ©chiffrÃ© Ã  la volÃ©e."
        }
    ];

    const GLOSSARY_DATA = [
        {
            term: "PE (Portable Executable)",
            category: "CybersÃ©curitÃ©",
            definition: "Format de fichier standard sous Windows pour les fichiers exÃ©cutables (.exe), bibliothÃ¨ques de liens dynamiques (.dll) et pilotes systÃ¨me (.sys)."
        },
        {
            term: "OEP (Original Entry Point)",
            category: "CybersÃ©curitÃ©",
            definition: "Adresse de la premiÃ¨re instruction exÃ©cutable d'un programme lÃ©gitime. C'est cette adresse qu'Expiro dÃ©tourne pour exÃ©cuter son virus avant de rendre la main au programme sain."
        },
        {
            term: "Command & Control (C2)",
            category: "CybersÃ©curitÃ©",
            definition: "Serveur informatique centralisÃ© ou rÃ©seau dÃ©centralisÃ© exploitÃ© par un pirate pour envoyer des ordres aux ordinateurs infectÃ©s et recevoir les donnÃ©es dÃ©robÃ©es."
        },
        {
            term: "Polymorphisme",
            category: "CybersÃ©curitÃ©",
            definition: "CapacitÃ© d'un malware Ã  modifier sa structure binaire apparente (clÃ© de chiffrement, stub de dÃ©chiffrement alÃ©atoire) Ã  chaque rÃ©plication afin d'Ã©chapper aux signatures antivirus statiques."
        },
        {
            term: "RÃ¨gle YARA",
            category: "CybersÃ©curitÃ©",
            definition: "Langage standardisÃ© utilisÃ© par les analystes en cybersÃ©curitÃ© pour identifier et classifier les logiciels malveillants Ã  partir de motifs textuels ou hexadÃ©cimaux."
        },
        {
            term: "Entropie de Shannon",
            category: "CybersÃ©curitÃ©",
            definition: "Mesure statistique du niveau d'alÃ©a ou de dÃ©sordre des octets dans un fichier. Une entropie proche de 8 trahit gÃ©nÃ©ralement un chiffrement ou une compression dense (packing)."
        },
        {
            term: "SSDT (System Service Descriptor Table)",
            category: "CybersÃ©curitÃ©",
            definition: "Table interne du noyau Windows associant les numÃ©ros d'appels systÃ¨me aux adresses rÃ©elles des fonctions de l'OS. DÃ©tournÃ©e par les rootkits noyau."
        },
        {
            term: "Commit",
            category: "Git",
            definition: "InstantanÃ© (snapshot) immuable de l'Ã©tat des fichiers indexÃ©s, accompagnÃ© d'un message descriptif, d'un auteur, d'une date et d'une somme de contrÃ´le SHA-1/SHA-256."
        },
        {
            term: "Zone de Staging (Index)",
            category: "Git",
            definition: "Fichier binaire intermÃ©diaire (.git/index) qui prÃ©pare et accumule les modifications destinÃ©es au prochain commit lors de l'exÃ©cution de 'git add'."
        },
        {
            term: "Plomberie Git (Plumbing)",
            category: "Git",
            definition: "Ensemble des commandes Git de bas niveau (ex: cat-file, hash-object, write-tree) qui manipulent directement les objets internes, par opposition aux commandes de 'porcelaine' destinÃ©es aux utilisateurs."
        },
        {
            term: "Reflog",
            category: "Git",
            definition: "Journal chronologique local enregistrant chaque dÃ©placement du pointeur HEAD, permettant de restaurer des commits orphelins mÃªme aprÃ¨s un reset destructif."
        },
        {
            term: "Worktree",
            category: "Git",
            definition: "FonctionnalitÃ© permettant d'associer plusieurs rÃ©pertoires de travail distincts Ã  un mÃªme dÃ©pÃ´t Git pour basculer sur diffÃ©rentes branches sans changer de dossier."
        }
    ];

    // =========================================================================
    // 7. SIMULATEUR PE INTERACTIF (SANS Ã‰MOJI, BOXICONS)
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
                                <p class="subtitle">Visualisation dynamique des sections mÃ©moire et du dÃ©tournement de l'AddressOfEntryPoint</p>
                            </div>
                        </div>
                        <div class="pe-sim-controls">
                            <button class="btn btn-outline ${this.mode === 'healthy' ? 'active' : ''}" id="btn-pe-healthy">
                                <i class='bx bx-check-shield'></i> ExÃ©cutable Sain
                            </button>
                            <button class="btn btn-danger ${this.mode === 'infected' ? 'active' : ''}" id="btn-pe-infected">
                                <i class='bx bx-bug'></i> Infection Expiro
                            </button>
                            <button class="btn btn-warning ${this.mode === 'disinfection_attempt' ? 'active' : ''}" id="btn-pe-disinfect">
                                <i class='bx bx-error'></i> Tentative DÃ©sinfection
                            </button>
                        </div>
                    </div>

                    <div class="pe-sim-body">
                        <div class="pe-diagram-area">
                            <div class="pe-diagram-title">
                                <i class='bx bx-layer'></i> 
                                Carte MÃ©moire du Binaire (${this.mode === 'healthy' ? 'calc.exe sain' : this.mode === 'infected' ? 'calc.exe INFECTÃ‰ par Win32/Expiro' : 'calc.exe aprÃ¨s dÃ©sinfection risquÃ©e'})
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
                                            AddressOfEntryPoint: ${this.mode === 'healthy' ? '0x00001000 (.text)' : this.mode === 'infected' ? '0x00045000 (.expiro) DÃ‰TOURNÃ‰' : '0x00001000 (Restauration instable)'}
                                        </strong>
                                    </div>
                                </div>

                                <div class="pe-section-block section-text">
                                    <div class="sec-label">Section .text (Code ExÃ©cutable d'Origine)</div>
                                    <div class="sec-info">Taille: 0x0002A000 | Flags: MEM_EXECUTE | MEM_READ</div>
                                    <div class="sec-badge ${this.mode === 'healthy' ? 'badge-active-target' : ''}">
                                        ${this.mode === 'healthy' ? '<i class=\"bx bx-target-lock\"></i> DÃ©marrage lÃ©gitime' : '<i class=\"bx bx-pause\"></i> Court-circuitÃ©'}
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
                                        <div class="sec-label"><i class='bx bx-error-alt'></i> NOUVELLE SECTION : .expiro (ou .data Ã©tendue)</div>
                                        <div class="sec-info">
                                            Adresse RVA: 0x00045000 | Flags: <strong>MEM_READ | MEM_WRITE | MEM_EXECUTE</strong> (Anomalie W+X critique)<br>
                                            Contenu: DÃ©chiffreur polymorphe + Payload C2/Botnet + Saut vers ancien OEP
                                        </div>
                                        <div class="sec-badge badge-danger"><i class='bx bx-crosshair'></i> POINT D'ENTRÃ‰E PIRATÃ‰ (ExÃ©cutÃ© en premier)</div>
                                    </div>
                                ` : ''}

                                ${this.mode === 'disinfection_attempt' ? `
                                    <div class="pe-section-block section-damaged">
                                        <div class="sec-label"><i class='bx bx-bomb'></i> ZONE TRONQUÃ‰E (DÃ©sinfection logicielle)</div>
                                        <div class="sec-info">
                                            Section virale retirÃ©e mais en-tÃªtes PE corrompus : Alignement d'adresses invalide.<br>
                                            Crash au lancement : <code>EXCEPTION_ACCESS_VIOLATION (0xc0000005)</code>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="pe-explanation-panel">
                            <h5><i class='bx bx-info-circle'></i> Analyse Technique en Temps RÃ©el</h5>
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
                        <strong>Ã‰tat : Binaire sain non infectÃ©</strong>
                        <p>Le point d'entrÃ©e initial (AddressOfEntryPoint) pointe directement sur l'adresse <code>0x00001000</code> situÃ©e dans la section <code>.text</code>. Lorsque l'utilisateur lance le fichier, le code lÃ©gitime dÃ©marre immÃ©diatement et de faÃ§on sÃ©curisÃ©e.</p>
                        <ul>
                            <li>Aucune section Ã  double droit (W+X).</li>
                            <li>Entropie globale normale (~5.6 - 6.2).</li>
                            <li>Signature Authenticode valide.</li>
                        </ul>
                    </div>
                `;
            } else if (this.mode === 'infected') {
                return `
                    <div class="status-box danger">
                        <strong>Ã‰tat : Infection active par Win32/Expiro</strong>
                        <p>Expiro a greffÃ© une nouvelle section Ã  la fin du fichier et a rÃ©Ã©crit le champ <code>AddressOfEntryPoint</code> de l'en-tÃªte NT Header vers <code>0x00045000</code>.</p>
                        <ol>
                            <li><strong>DÃ©marrage du virus :</strong> Windows lance d'abord le dÃ©chiffreur polymorphe d'Expiro.</li>
                            <li><strong>ExÃ©cution de la charge utile :</strong> Expiro s'installe en mÃ©moire, hook les services et lance le vol de clÃ©s/mots de passe.</li>
                            <li><strong>Saut de restitution :</strong> Une fois le mÃ©fait accompli, une instruction assembleur <code>JMP 0x00001000</code> rend la main au programme original pour tromper l'utilisateur.</li>
                        </ol>
                    </div>
                `;
            } else {
                return `
                    <div class="status-box warning">
                        <strong>Ã‰tat : Risque majeur lors de la dÃ©sinfection</strong>
                        <p>Une dÃ©sinfection automatisÃ©e par antivirus tente d'Ã©craser la section virale et de restaurer l'en-tÃªte d'origine. Cependant, en raison du polymorphisme d'Expiro et des dÃ©calages d'alignement de section :</p>
                        <ul>
                            <li>Le fichier exÃ©cutable est souvent irrÃ©mÃ©diablement corrompu.</li>
                            <li>Si ce fichier est un service vital de Windows (explorer.exe, svchost), le systÃ¨me d'exploitation ne dÃ©marre plus.</li>
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
    // 8. MODULE DU REGISTRE GIT (AVEC GRILLE D'APPRENTISSAGE ET CONSOLE HORODATÃ‰E)
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
                    <!-- EN-TÃŠTE DU REGISTRE -->
                    <div class="tracker-hero">
                        <div class="badge-tag"><i class='bx bx-check-shield'></i> Registre Officiel CertifiÃ©</div>
                        <h2><i class='bx bx-git-branch'></i> Registre & Console des Commandes Git UtilisÃ©es</h2>
                        <p class="hero-desc">
                            Ce registre recense et audite <strong>${total} commandes Git de base distinctes</strong> rÃ©ellement exÃ©cutÃ©es lors du dÃ©veloppement de cette plateforme.
                            Consultez les fiches techniques, cochez les commandes assimilÃ©es ou explorez l'historique chronologique horodatÃ©.
                        </p>
                        <div class="rule-callout">
                            <i class='bx bx-info-circle'></i>
                            <span><strong>RÃ¨gle stricte d'audit :</strong> Une commande de base distincte = une entrÃ©e unique. <code>git add .</code> et <code>git add -A</code> ne forment qu'une seule et mÃªme commande de base (<code>git add</code>).</span>
                        </div>
                    </div>

                    <!-- TABLEAU DE BORD STATISTIQUE DYNAMIQUE -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <i class='bx bx-list-check stat-icon'></i>
                            <div class="stat-value" id="stat-total">${total}</div>
                            <div class="stat-label">Commandes Distinctes UtilisÃ©es</div>
                        </div>
                        <div class="stat-card stat-success">
                            <i class='bx bx-check-double stat-icon'></i>
                            <div class="stat-value" id="stat-mastered">${masteredCount}</div>
                            <div class="stat-label">Commandes MaÃ®trisÃ©es</div>
                        </div>
                        <div class="stat-card stat-warning">
                            <i class='bx bx-time stat-icon'></i>
                            <div class="stat-value" id="stat-remaining">${remainingCount}</div>
                            <div class="stat-label">Restant Ã  Apprendre</div>
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

                    <!-- SÃ‰LECTEUR DE VUE : CARTES D'APPRENTISSAGE VS HISTORIQUE CHRONOLOGIQUE -->
                    <div class="tracker-view-switcher">
                        <button class="view-switch-btn ${this.activeTab === 'cards' ? 'active' : ''}" id="btn-view-cards">
                            <i class='bx bx-grid-alt'></i> Grille d'Apprentissage & Auto-Ã‰valuation
                        </button>
                        <button class="view-switch-btn ${this.activeTab === 'history' ? 'active' : ''}" id="btn-view-history">
                            <i class='bx bx-terminal'></i> Console d'Audit & Historique RÃ©el HorodatÃ© (${total})
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
                                    <option value="mastered" ${this.filters.status === 'mastered' ? 'selected' : ''}>MaÃ®trisÃ©es</option>
                                    <option value="unmastered" ${this.filters.status === 'unmastered' ? 'selected' : ''}>Ã€ maÃ®triser</option>
                                </select>

                                <select id="git-sort-select" class="form-select">
                                    <option value="chronological" ${this.filters.sortBy === 'chronological' ? 'selected' : ''}>Ordre d'utilisation</option>
                                    <option value="alphabetical" ${this.filters.sortBy === 'alphabetical' ? 'selected' : ''}>Ordre alphabÃ©tique</option>
                                </select>
                            </div>
                        </div>

                        <!-- COMPTEUR DE RÃ‰SULTATS -->
                        <div class="results-meta">
                            <span>Affichage de <strong>${filteredCommands.length}</strong> commande(s) sur ${total}</span>
                            ${lastUsedCmd ? `<span class="last-used-info"><i class='bx bx-time'></i> DerniÃ¨re exÃ©cution : <strong>${lastUsedCmd.firstUsed}</strong> (${lastUsedCmd.name})</span>` : ''}
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
                                                    ${isMastered ? '<i class=\"bx bx-check\"></i> MaÃ®trisÃ©e' : '<i class=\"bx bx-time\"></i> Ã€ maÃ®triser'}
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
                                                <div><strong>UtilitÃ© :</strong> ${cmd.utility}</div>
                                                <div><strong>Contexte projet :</strong> ${cmd.projectContext}</div>
                                                <div><strong>Exemple rÃ©el :</strong> <code>${cmd.example}</code></div>
                                            </div>
                                        </div>

                                        <div class="command-card-footer">
                                            <div class="card-footer-info">
                                                <span><i class='bx bx-calendar'></i> ${cmd.firstUsed}</span>
                                                <span><i class='bx bx-refresh'></i> ${cmd.useCount} exÃ©cutions</span>
                                            </div>
                                            <button class="btn btn-sm btn-outline btn-details" data-cmd-id="${cmd.id}">
                                                <i class='bx bx-book-open'></i> Fiche DÃ©taillÃ©e
                                            </button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : `
                        <!-- CONSOLE D'HISTORIQUE CHRONOLOGIQUE RÃ‰EL (HEURE PAR HEURE) -->
                        <div class="history-terminal-container">
                            <div class="history-terminal-header">
                                <div class="history-terminal-title">
                                    <i class='bx bx-terminal'></i>
                                    <span>Console d'Audit Chronologique RÃ©el â€” Journal d'ExÃ©cution HorodatÃ©</span>
                                </div>
                                <span class="badge badge-info">${GIT_COMMANDS_DATA.length} commandes tracÃ©es</span>
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
                                                <i class='bx bx-check-circle'></i> ExÃ©cutÃ©e (#${idx + 1})
                                            </span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `}

                    <!-- MODAL FICHE DÃ‰TAILLÃ‰E -->
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
                        <span class="label">CatÃ©gorie :</span>
                        <span class="value"><span class="badge badge-category">${cmd.category}</span></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Statut d'assimilation :</span>
                        <span class="value"><strong>${isMastered ? '<i class=\"bx bx-check-circle\" style=\"color: var(--color-success);\"></i> MaÃ®trisÃ©e' : '<i class=\"bx bx-time\" style=\"color: var(--color-warning);\"></i> En cours d\'apprentissage'}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Description complÃ¨te :</span>
                        <span class="value">${cmd.description}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Syntaxe officielle :</span>
                        <span class="value"><code>${cmd.syntax}</code></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">RÃ´le & UtilitÃ© :</span>
                        <span class="value">${cmd.utility}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Application concrÃ¨te dans ce projet :</span>
                        <span class="value">${cmd.projectContext}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Exemple rÃ©el exÃ©cutÃ© :</span>
                        <span class="value"><code>${cmd.example}</code></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Journal de sortie terminal :</span>
                        <span class="value"><pre class="code-block" style="margin: 4px 0; padding: 10px;"><code>${cmd.outputLog || 'Exit code 0'}</code></pre></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">DÃ©tails techniques :</span>
                        <span class="value">${cmd.details}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Horodatage rÃ©el d'exÃ©cution :</span>
                        <span class="value"><i class='bx bx-time'></i> ${cmd.firstUsed} (${cmd.useCount} exÃ©cutions au total)</span>
                    </div>
                </div>
                <div class="modal-action-bar">
                    <button class="btn btn-primary" id="modal-toggle-mastery" data-id="${cmd.id}">
                        ${isMastered ? 'Marquer comme non maÃ®trisÃ©e' : 'Marquer comme maÃ®trisÃ©e'}
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
                        <div class="badge-tag"><i class='bx bx-shield-quarter'></i> EncyclopÃ©die de Virologie Informatique</div>
                        <h2><i class='bx bx-bug'></i> Les Grandes Familles de Logiciels Malveillants</h2>
                        <p class="hero-desc">
                            Ã‰tude mÃ©thodique des mÃ©canismes de propagation, d'infection, de persistance et de neutralisation des cybermenaces.
                        </p>
                    </div>

                    <div class="malwares-grid">
                        ${MALWARES_DATA.map(m => `
                            <div class="malware-card" data-id="${m.id}">
                                <div class="malware-card-top">
                                    <div class="malware-icon-box">
                                        <i class='bx ${m.icon}'></i>
                                    </div>
                                    <span class="badge ${m.severity === 'Critique' ? 'badge-danger' : m.severity === 'Ã‰levÃ©e' ? 'badge-warning' : 'badge-info'}">
                                        Niveau ${m.severity}
                                    </span>
                                </div>
                                <h3 class="malware-title">${m.name}</h3>
                                <p class="malware-def">${m.definition}</p>
                                
                                <div class="malware-summary-points">
                                    <div class="point-item"><strong>Infection :</strong> ${m.infectionMethods}</div>
                                    <div class="point-item"><strong>FurtivitÃ© :</strong> ${m.stealthMechanisms}</div>
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

            title.innerHTML = `<i class='bx ${m.icon}'></i> ${m.name} â€” Analyse Approfondie`;
            body.innerHTML = `
                <div class="dossier-grid">
                    <div class="dossier-section">
                        <h4><i class='bx bx-book-open'></i> 1. DÃ©finition & Concept</h4>
                        <p>${m.definition}</p>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-cog'></i> 2. Fonctionnement Interne & ExÃ©cution</h4>
                        <p>${m.functioning}</p>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-list-check'></i> 3. CaractÃ©ristiques Techniques</h4>
                        <ul>${m.characteristics.map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-transfer-alt'></i> 4. Infection & Propagation</h4>
                        <p><strong>Vecteurs d'infection :</strong> ${m.infectionMethods}</p>
                        <p><strong>Propagation :</strong> ${m.propagationMethods}</p>
                    </div>
                    <div class="dossier-section">
                        <h4><i class='bx bx-low-vision'></i> 5. ConsÃ©quences & Dissimulation</h4>
                        <p><strong>Impacts :</strong> ${m.consequences}</p>
                        <p><strong>Techniques de furtivitÃ© :</strong> ${m.stealthMechanisms}</p>
                    </div>
                    <div class="dossier-section highlight-security">
                        <h4><i class='bx bx-shield-quarter'></i> 6. DÃ©tection, PrÃ©vention & Neutralisation</h4>
                        <p><strong>DÃ©tection :</strong> ${m.detectionMethods}</p>
                        <p><strong>PrÃ©vention :</strong> ${m.prevention}</p>
                        <p><strong>DÃ©sinfection :</strong> ${m.disinfection}</p>
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
                        <div class="expiro-badge"><i class='bx bx-dna'></i> MODULE SPÃ‰CIALISÃ‰ D'EXPERTISE TECHNIQUE</div>
                        <h2>Win32/Expiro â€” Anatomie d'un Infecteur PE Moderne</h2>
                        <p class="expiro-lead">
                            Ã‰tude complÃ¨te du virus parasite <strong>Win32/Expiro</strong> : dÃ©tournement d'EntryPoint (OEP), polymorphisme, corruption d'exÃ©cutables Windows, persistance et limites critiques de dÃ©sinfection.
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
                            <i class='bx bx-git-branch'></i> Variantes & MÃ©canismes
                        </button>
                        <button class="expiro-tab-btn ${this.activeTab === 'disinfection' ? 'active' : ''}" data-tab="disinfection">
                            <i class='bx bx-shield-x'></i> Limites de DÃ©sinfection & DÃ©tection
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
                                <h3><i class='bx bx-id-card'></i> Fiche d'IdentitÃ© Technique</h3>
                                <ul class="data-list">
                                    <li><strong>Nom officiel :</strong> ${EXPIRO_DATA.overview.name}</li>
                                    <li><strong>Classification :</strong> ${EXPIRO_DATA.overview.family}</li>
                                    <li><strong>Architectures :</strong> ${EXPIRO_DATA.overview.targets}</li>
                                    <li><strong>DÃ©couverte :</strong> ${EXPIRO_DATA.overview.discoveryYear}</li>
                                    <li><strong>Charge utile :</strong> ${EXPIRO_DATA.overview.primaryPayload}</li>
                                    <li><strong>CriticitÃ© :</strong> <span class="badge badge-danger">${EXPIRO_DATA.overview.threatLevel}</span></li>
                                </ul>
                            </div>
                            <div class="overview-card">
                                <h3><i class='bx bx-windows'></i> Impacts SystÃ¨mes Windows</h3>
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
                        <h3><i class='bx bx-git-repo-forked'></i> Variantes DocumentÃ©es d'Expiro</h3>
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
                            <h3><i class='bx bx-cog'></i> MÃ©canisme d'Infection Pas-Ã -Pas des ExÃ©cutables PE</h3>
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
                            <h3><i class='bx bx-error-circle'></i> PossibilitÃ©s et Limites Techniques de la DÃ©sinfection</h3>
                            <p>Pourquoi Expiro est l'un des infecteurs les plus complexes et dangereux Ã  nettoyer :</p>
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
                            <h3><i class='bx bx-code-block'></i> Signature de DÃ©tection YARA pour Expiro</h3>
                            <p>RÃ¨gle d'identification basÃ©e sur l'en-tÃªte PE, le stub polymorphe et les permissions de section W+X :</p>
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
    // 11. MODULE DES MÃ‰THODES DE DÃ‰TECTION
    // =========================================================================
    const DetectionView = {
        render: function (containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = `
                <div class="detection-view-container">
                    <div class="view-hero">
                        <div class="badge-tag"><i class='bx bx-search-alt'></i> Audit & DÃ©tection Forensique</div>
                        <h2><i class='bx bx-radar'></i> Techniques d'Analyse et de DÃ©tection des Malwares</h2>
                        <p class="hero-desc">
                            MÃ©thodes statiques, dynamiques et heuristiques dÃ©ployÃ©es par les moteurs de sÃ©curitÃ© et EDR pour identifier les charges malveillantes.
                        </p>
                    </div>

                    <div class="detection-methods-grid">
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-barcode'></i></div>
                            <h3>1. Analyse par Signature Statique</h3>
                            <p>Comparaison des empreintes cryptographiques (SHA-256) ou motifs d'octets fixes (RÃ¨gles YARA) avec une base de menaces connues.</p>
                        </div>
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-brain'></i></div>
                            <h3>2. Analyse Heuristique & Anomalies PE</h3>
                            <p>DÃ©tection des anomalies de structure : sections Ã  double permission W+X, point d'entrÃ©e dÃ©calÃ© hors de .text, imports d'injection mÃ©moire.</p>
                        </div>
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-cube-alt'></i></div>
                            <h3>3. Analyse d'Entropie de Shannon</h3>
                            <p>Mesure du taux d'entropie (dÃ©sordre des octets). Une entropie > 7.2 trahit quasi-systÃ©matiquement un packer ou du code viral chiffrÃ©.</p>
                        </div>
                        <div class="detection-card">
                            <div class="card-icon"><i class='bx bx-test-tube'></i></div>
                            <h3>4. DÃ©tonation en Sandbox Dynamique</h3>
                            <p>ExÃ©cution dans un environnement virtuel Ã©tanche instrumentÃ© pour observer le comportement rÃ©seau, les crÃ©ations de processus et de mutex.</p>
                        </div>
                    </div>

                    <div class="entropy-demo-box">
                        <h3><i class='bx bx-slider-alt'></i> Profil d'Entropie PE : Binaire Sain vs InfectÃ© Expiro</h3>
                        <div class="entropy-bars">
                            <div class="entropy-bar-item">
                                <div class="bar-label">Binaire Sain (.text standard) : <strong>5.8 / 8.0 (Normal)</strong></div>
                                <div class="entropy-track"><div class="entropy-fill healthy-fill" style="width: 72%"></div></div>
                            </div>
                            <div class="entropy-bar-item">
                                <div class="bar-label">Binaire InfectÃ© Expiro (Section chiffrÃ©e W+X) : <strong>7.85 / 8.0 (Alerte Ã‰levÃ©e)</strong></div>
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
                        <div class="badge-tag"><i class='bx bx-check-circle'></i> Ã‰valuation des Acquis</div>
                        <h2><i class='bx bx-help-circle'></i> Quiz PÃ©dagogique : CybersÃ©curitÃ© & Git</h2>
                        <p class="hero-desc">
                            Testez vos connaissances sur la virologie, le fonctionnement d'Expiro et la maÃ®trise des commandes Git.
                        </p>
                    </div>

                    ${this.submitted ? `
                        <div class="quiz-score-banner ${score >= total * 0.7 ? 'banner-success' : 'banner-warning'}">
                            <h3>Score : ${score} / ${total} (${Math.round((score / total) * 100)}%)</h3>
                            <p>${score >= total * 0.7 ? 'FÃ©licitations ! Vous avez acquis les compÃ©tences clÃ©s.' : 'Certains concepts mÃ©ritent une relecture attentive des fiches techniques.'}</p>
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
                                            <strong>${isCorrect ? '<i class=\"bx bx-check\"></i> Bonne rÃ©ponse !' : '<i class=\"bx bx-x\"></i> RÃ©ponse incorrecte.'}</strong>
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
                                <i class='bx bx-check'></i> Valider mes RÃ©ponses
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
                    if (!confirm(`Vous avez rÃ©pondu Ã  ${count} question(s) sur ${QUIZ_DATA.length}. Valider quand mÃªme ?`)) return;
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
                        <h2><i class='bx bx-book-open'></i> Glossaire Technique : CybersÃ©curitÃ© & Git</h2>
                        <p class="hero-desc">
                            DÃ©finitions normalisÃ©es des concepts essentiels rencontrÃ©s lors de l'Ã©tude des virus et de l'ingÃ©nierie logicielle Git.
                        </p>
                    </div>

                    <div class="glossary-search-panel">
                        <div class="search-box">
                            <i class='bx bx-search'></i>
                            <input type="text" id="glossary-search-input" placeholder="Rechercher un terme (ex: OEP, C2, SSDT, Reflog, Plumbing)..." value="${this.searchQuery}">
                        </div>
                        <div class="category-pills">
                            <button class="pill ${this.categoryFilter === 'Toutes' ? 'active' : ''}" data-cat="Toutes">Tous les termes</button>
                            <button class="pill ${this.categoryFilter === 'CybersÃ©curitÃ©' ? 'active' : ''}" data-cat="CybersÃ©curitÃ©">CybersÃ©curitÃ©</button>
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
                            <div class="badge-tag"><i class='bx bxs-shield-plus'></i> Laboratoire de SÃ©curitÃ© & IngÃ©nierie Git</div>
                            <h1 class="hero-title">Plateforme Ã‰ducative sur les Virus & Audit Git</h1>
                            <p class="hero-description">
                                MaÃ®trisez les concepts fondamentaux de la virologie informatique Ã  travers l'Ã©tude approfondie du virus 
                                <strong>Win32/Expiro</strong> tout en validant votre apprentissage pratique de 
                                <strong>72 commandes Git distinctes</strong> exÃ©cutÃ©es au cours de ce projet.
                            </p>
                            <div class="hero-cta-group">
                                <a href="#expiro" class="btn btn-primary btn-lg"><i class='bx bx-dna'></i> Ã‰tude Approfondie d'Expiro</a>
                                <a href="#malwares" class="btn btn-outline btn-lg"><i class='bx bx-bug'></i> Explorer l'EncyclopÃ©die</a>
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
                            <h2>Structure des Modules PÃ©dagogiques</h2>
                            <p>Une expÃ©rience interactive complÃ¨te alliant cybersÃ©curitÃ© dÃ©fensive et rigueur de versionnement logiciel.</p>
                        </div>

                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon-box"><i class='bx bx-bug'></i></div>
                                <h3>EncyclopÃ©die des Menaces</h3>
                                <p>10 familles de malwares dÃ©cortiquÃ©es : virus, vers, trojans, ransomwares, rootkits, spywares, bootkits, botnets. DÃ©finition, vecteurs d'infection, persistance et dÃ©tection.</p>
                                <a href="#malwares" class="card-link">Consulter l'encyclopÃ©die <i class='bx bx-right-arrow-alt'></i></a>
                            </div>

                            <div class="feature-card highlight-card">
                                <div class="feature-icon-box"><i class='bx bx-dna'></i></div>
                                <h3>Module Expert Win32/Expiro</h3>
                                <p>Ã‰tude monographique complÃ¨te sur Expiro : architecture binaire, infection des exÃ©cutables PE Windows, simulateur visuel du dÃ©tournement d'EntryPoint et limites de dÃ©sinfection.</p>
                                <a href="#expiro" class="card-link">AccÃ©der Ã  l'Ã©tude Expiro <i class='bx bx-right-arrow-alt'></i></a>
                            </div>

                            <div class="feature-card">
                                <div class="feature-icon-box"><i class='bx bx-radar'></i></div>
                                <h3>MÃ©thodes de DÃ©tection</h3>
                                <p>DÃ©tection par rÃ¨gles YARA, analyse heuristique des anomalies PE (permissions W+X) et calcul d'entropie de Shannon pour repÃ©rer les payloads chiffrÃ©s.</p>
                                <a href="#detection" class="card-link">Voir les techniques <i class='bx bx-right-arrow-alt'></i></a>
                            </div>
                        </div>
                    </section>

                    <section class="banner-summary">
                        <div class="banner-stat">
                            <span class="num">10+</span>
                            <span class="txt">Familles de Malwares analysÃ©es</span>
                        </div>
                        <div class="banner-stat">
                            <span class="num">72</span>
                            <span class="txt">Commandes Git Distinctes certifiÃ©es</span>
                        </div>
                        <div class="banner-stat">
                            <span class="num">100%</span>
                            <span class="txt">Vanilla JS (ZÃ©ro DÃ©pendance)</span>
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

        console.log("CyberVirus Lab initialisÃ© avec succÃ¨s : 72 commandes Git auditÃ©es.");
    });

})();

