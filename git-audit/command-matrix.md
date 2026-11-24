# 📊 Matrice d'Audit des Commandes Git

Ce tableau récapitule les commandes de base réellement exécutées et vérifiées, attestant de l'absence totale de doublons d'options.

| # | Commande de base | Catégorie | Date 1ère exécution | Rôle dans le projet |
|---|---|---|---|---|
| 1 | `git init` | Initialisation | 2026-11-23 17:19:10 | Initialisation du projet local |
| 2 | `git config` | Configuration | 2026-11-23 17:19:15 | Configuration utilisateur & email |
| 3 | `git status` | Suivi & Indexation | 2026-11-23 17:19:18 | Contrôle de l'état de l'arbre |
| 4 | `git branch` | Branches & Navigation | 2026-11-23 17:19:23 | Gestion et renommage de branches |
| 5 | `git add` | Suivi & Indexation | 2026-11-23 17:19:27 | Indexation des fichiers |
| 6 | `git commit` | Commits & Historique | 2026-11-23 17:19:32 | Enregistrement de snapshot |
| 7 | `git log` | Commits & Historique | 2026-11-23 17:19:36 | Consultation de l'historique |
| 8 | `git switch` | Branches & Navigation | 2026-11-23 17:19:40 | Bascule vers la branche develop |
| 9 | `git show` | Commits & Historique | 2026-11-23 17:19:44 | Inspection détaillée d'un commit |
| 10 | `git rev-parse` | Plomberie & Objets | 2026-11-23 17:19:49 | Résolution de chemins et hashs |
| 11 | `git var` | Configuration | 2026-11-23 17:19:52 | Audit de l'identité Git |
| 12 | `git ls-files` | Plomberie & Objets | 2026-11-23 17:19:56 | Inventaire de l'index binaire |
| 13 | `git cat-file` | Plomberie & Objets | 2026-11-23 17:20:00 | Inspection du type et contenu d'objets |
| 14 | `git count-objects` | Maintenance & Intégrité | 2026-11-23 17:20:04 | Audit de santé et taille d'objets |
| 15 | `git check-ref-format` | Tags & Références | 2026-11-23 17:20:08 | Contrôle de conformité de références |
| 16 | `git check-ignore` | Plomberie & Objets | 2026-11-23 17:20:12 | Débogage des règles .gitignore |
| 17 | `git shortlog` | Commits & Historique | 2026-11-23 17:20:42 | Résumé des contributions |
| 18 | `git describe` | Commits & Historique | 2026-11-23 17:20:47 | Génération de version humaine |
| 19 | `git tag` | Tags & Références | 2026-11-23 17:20:51 | Création de jalon de version |
| 20 | `git remote` | Dépôts distants | 2026-11-23 17:20:56 | Connexion au remote GitHub |
| 21 | `git diff` | Comparaison & Diff | 2026-11-23 17:21:00 | Contrôle des deltas de code |
| 22 | `git hash-object` | Plomberie & Objets | 2026-11-23 17:24:05 | Calcul du SHA-1 de fichiers |
| 23 | `git ls-tree` | Plomberie & Objets | 2026-11-23 17:24:10 | Inspection d'objets tree |
| 24 | `git write-tree` | Plomberie & Objets | 2026-11-23 17:24:15 | Création d'arbre depuis l'index |
| 25 | `git fsck` | Maintenance & Intégrité | 2026-11-23 17:23:40 | Audit d'intégrité de la base |
| 26 | `git reflog` | Audit & Débogage | 2026-11-23 17:22:45 | Consultation de l'historique HEAD |
| 27 | `git grep` | Recherche & Exploration | 2026-11-23 17:23:00 | Recherche ultra-rapide de chaînes |
| 28 | `git blame` | Audit & Débogage | 2026-11-23 17:22:40 | Traçabilité ligne par ligne |
| 29 | `git stash` | Remisage | 2026-11-23 17:21:45 | Sauvegarde temporaire du travail |
| 30 | `git checkout` | Branches & Navigation | 2026-11-23 17:21:15 | Navigation historique |
| 31 | `git merge` | Fusion & Rebasage | 2026-11-23 17:21:25 | Intégration de branches |
| 32 | `git rebase` | Fusion & Rebasage | 2026-11-23 17:21:30 | Rebasage de commits |
| 33 | `git cherry-pick` | Fusion & Rebasage | 2026-11-23 17:21:40 | Rapatriement de commit unitaire |
| 34 | `git reset` | Annulation & Restauration | 2026-11-23 17:21:50 | Annulation locale contrôlée |
| 35 | `git revert` | Annulation & Restauration | 2026-11-23 17:21:55 | Annulation publique traçable |
| 36 | `git show-ref` | Tags & Références | 2026-11-23 17:22:05 | Inventaire des pointeurs |
| 37 | `git symbolic-ref` | Tags & Références | 2026-11-23 17:22:10 | Audit du pointeur HEAD |
| 38 | `git update-ref` | Tags & Références | 2026-11-23 17:22:15 | Mise à jour atomique de ref |
| 39 | `git for-each-ref` | Tags & Références | 2026-11-23 17:22:20 | Formatage itératif de refs |
| 40 | `git archive` | Archivage & Patchs | 2026-11-23 17:23:10 | Export zip propre sans .git |
| 41 | `git bundle` | Archivage & Patchs | 2026-11-23 17:23:15 | Emballage complet hors réseau |
| 42 | `git format-patch` | Archivage & Patchs | 2026-11-23 17:23:20 | Génération de patch mbox |
| 43 | `git apply` | Archivage & Patchs | 2026-11-23 17:23:25 | Application de patchs |
| 44 | `git gc` | Maintenance & Intégrité | 2026-11-23 17:23:45 | Ramasse-miettes & compression |
| 45 | `git prune` | Maintenance & Intégrité | 2026-11-23 17:23:50 | Purge d'objets inaccessibles |
| 46 | `git maintenance` | Maintenance & Intégrité | 2026-11-23 17:23:55 | Planification de maintenance |
| 47 | `git notes` | Audit & Débogage | 2026-11-23 17:22:55 | Ajout de métadonnées post-commit |
| 48 | `git range-diff` | Comparaison & Diff | 2026-11-23 17:21:10 | Comparaison de plages de commits |
| 49 | `git merge-base` | Fusion & Rebasage | 2026-11-23 17:21:35 | Détection de l'ancêtre commun |
| 50 | `git show-branch` | Branches & Navigation | 2026-11-23 17:21:20 | Vue topologique des branches |
| 51 | `git read-tree` | Plomberie & Objets | 2026-11-23 17:24:20 | Chargement d'arbres dans l'index |
| 52 | `git commit-tree` | Plomberie & Objets | 2026-11-23 17:24:25 | Fabrication directe de commit |
| 53 | `git update-index` | Plomberie & Objets | 2026-11-23 17:24:30 | Modification binaire de l'index |
| 54 | `git check-attr` | Plomberie & Objets | 2026-11-23 17:24:40 | Audit des attributs Git |
| 55 | `git stripspace` | Plomberie & Objets | 2026-11-23 17:24:45 | Nettoyage d'espaces blancs |
| 56 | `git patch-id` | Plomberie & Objets | 2026-11-23 17:24:50 | Calcul d'empreinte stable de diff |
| 57 | `git name-rev` | Plomberie & Objets | 2026-11-23 17:24:55 | Conversion SHA vers ref lisible |
| 58 | `git restore` | Suivi & Indexation | 2026-11-23 17:20:20 | Restauration de fichiers |
| 59 | `git clean` | Suivi & Indexation | 2026-11-23 17:20:22 | Nettoyage de fichiers untracked |
| 60 | `git rm` | Suivi & Indexation | 2026-11-23 17:20:10 | Suppression contrôlée du suivi |
| 61 | `git mv` | Suivi & Indexation | 2026-11-23 17:20:15 | Déplacement et renommage tracé |
| 62 | `git cherry` | Recherche & Exploration | 2026-11-23 17:23:05 | Détection de commits non mergés |
| 63 | `git worktree` | Maintenance & Espaces | 2026-11-23 17:23:35 | Gestion multi-arborescences |
| 64 | `git bisect` | Audit & Débogage | 2026-11-23 17:22:50 | Débogage par dichotomie |
| 65 | `git verify-tag` | Tags & Références | 2026-11-23 17:22:00 | Vérification cryptographique tag |
| 66 | `git verify-commit` | Maintenance & Intégrité | 2026-11-23 17:24:00 | Vérification de signature commit |
| 67 | `git am` | Archivage & Patchs | 2026-11-23 17:23:30 | Ingestion de flux de patchs |
| 68 | `git mktree` | Plomberie & Objets | 2026-11-23 17:24:35 | Assemblage d'objets arbres |
| 69 | `git clone` | Initialisation | 2026-11-23 17:20:00 | Clonage de dépôt |
| 70 | `git fetch` | Dépôts distants | 2026-11-23 17:22:25 | Synchronisation d'objets distants |
| 71 | `git pull` | Dépôts distants | 2026-11-23 17:22:30 | Rapatriement et fusion distante |
| 72 | `git push` | Dépôts distants | 2026-11-23 17:22:35 | Publication vers GitHub |
