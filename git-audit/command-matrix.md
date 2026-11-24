# ðŸ“Š Matrice d'Audit des Commandes Git

Ce tableau rÃ©capitule les commandes de base rÃ©ellement exÃ©cutÃ©es et vÃ©rifiÃ©es, attestant de l'absence totale de doublons d'options.

| # | Commande de base | CatÃ©gorie | Date 1Ã¨re exÃ©cution | RÃ´le dans le projet |
|---|---|---|---|---|
| 1 | `git init` | Initialisation | 2026-11-23 00:14:18 | Initialisation du projet local |
| 2 | `git config` | Configuration | 2026-11-23 00:16:43 | Configuration utilisateur & email |
| 3 | `git status` | Suivi & Indexation | 2026-11-23 00:18:04 | ContrÃ´le de l'Ã©tat de l'arbre |
| 4 | `git branch` | Branches & Navigation | 2026-11-23 00:19:24 | Gestion et renommage de branches |
| 5 | `git add` | Suivi & Indexation | 2026-11-23 00:21:31 | Indexation des fichiers |
| 6 | `git commit` | Commits & Historique | 2026-11-23 00:22:56 | Enregistrement de snapshot |
| 7 | `git log` | Commits & Historique | 2026-11-23 00:28:21 | Consultation de l'historique |
| 8 | `git switch` | Branches & Navigation | 2026-11-23 00:30:27 | Bascule vers la branche develop |
| 9 | `git show` | Commits & Historique | 2026-11-23 00:31:52 | Inspection dÃ©taillÃ©e d'un commit |
| 10 | `git rev-parse` | Plomberie & Objets | 2026-11-23 00:34:28 | RÃ©solution de chemins et hashs |
| 11 | `git var` | Configuration | 2026-11-23 00:36:01 | Audit de l'identitÃ© Git |
| 12 | `git ls-files` | Plomberie & Objets | 2026-11-23 00:37:36 | Inventaire de l'index binaire |
| 13 | `git cat-file` | Plomberie & Objets | 2026-11-23 00:39:41 | Inspection du type et contenu d'objets |
| 14 | `git count-objects` | Maintenance & IntÃ©gritÃ© | 2026-11-23 00:44:35 | Audit de santÃ© et taille d'objets |
| 15 | `git check-ref-format` | Tags & RÃ©fÃ©rences | 2026-11-23 00:46:11 | ContrÃ´le de conformitÃ© de rÃ©fÃ©rences |
| 16 | `git check-ignore` | Plomberie & Objets | 2026-11-23 00:48:18 | DÃ©bogage des rÃ¨gles .gitignore |
| 17 | `git shortlog` | Commits & Historique | 2026-11-23 00:49:27 | RÃ©sumÃ© des contributions |
| 18 | `git describe` | Commits & Historique | 2026-11-23 00:52:09 | GÃ©nÃ©ration de version humaine |
| 19 | `git tag` | Tags & RÃ©fÃ©rences | 2026-11-23 00:54:23 | CrÃ©ation de jalon de version |
| 20 | `git remote` | DÃ©pÃ´ts distants | 2026-11-23 00:56:15 | Connexion au remote GitHub |
| 21 | `git diff` | Comparaison & Diff | 2026-11-23 00:57:38 | ContrÃ´le des deltas de code |
| 22 | `git hash-object` | Plomberie & Objets | 2026-11-23 00:58:53 | Calcul du SHA-1 de fichiers |
| 23 | `git ls-tree` | Plomberie & Objets | 2026-11-23 01:01:22 | Inspection d'objets tree |
| 24 | `git write-tree` | Plomberie & Objets | 2026-11-23 01:07:33 | CrÃ©ation d'arbre depuis l'index |
| 25 | `git fsck` | Maintenance & IntÃ©gritÃ© | 2026-11-23 01:08:43 | Audit d'intÃ©gritÃ© de la base |
| 26 | `git reflog` | Audit & DÃ©bogage | 2026-11-23 01:11:13 | Consultation de l'historique HEAD |
| 27 | `git grep` | Recherche & Exploration | 2026-11-23 01:12:35 | Recherche ultra-rapide de chaÃ®nes |
| 28 | `git blame` | Audit & DÃ©bogage | 2026-11-23 01:15:28 | TraÃ§abilitÃ© ligne par ligne |
| 29 | `git stash` | Remisage | 2026-11-23 01:17:56 | Sauvegarde temporaire du travail |
| 30 | `git checkout` | Branches & Navigation | 2026-11-23 01:20:02 | Navigation historique |
| 31 | `git merge` | Fusion & Rebasage | 2026-11-23 01:21:29 | IntÃ©gration de branches |
| 32 | `git rebase` | Fusion & Rebasage | 2026-11-23 01:22:38 | Rebasage de commits |
| 33 | `git cherry-pick` | Fusion & Rebasage | 2026-11-23 01:24:19 | Rapatriement de commit unitaire |
| 34 | `git reset` | Annulation & Restauration | 2026-11-23 01:26:33 | Annulation locale contrÃ´lÃ©e |
| 35 | `git revert` | Annulation & Restauration | 2026-11-23 01:29:16 | Annulation publique traÃ§able |
| 36 | `git show-ref` | Tags & RÃ©fÃ©rences | 2026-11-23 01:30:21 | Inventaire des pointeurs |
| 37 | `git symbolic-ref` | Tags & RÃ©fÃ©rences | 2026-11-23 01:36:28 | Audit du pointeur HEAD |
| 38 | `git update-ref` | Tags & RÃ©fÃ©rences | 2026-11-23 01:39:02 | Mise Ã  jour atomique de ref |
| 39 | `git for-each-ref` | Tags & RÃ©fÃ©rences | 2026-11-23 01:40:53 | Formatage itÃ©ratif de refs |
| 40 | `git archive` | Archivage & Patchs | 2026-11-23 01:42:15 | Export zip propre sans .git |
| 41 | `git bundle` | Archivage & Patchs | 2026-11-23 01:43:23 | Emballage complet hors rÃ©seau |
| 42 | `git format-patch` | Archivage & Patchs | 2026-11-23 01:44:34 | GÃ©nÃ©ration de patch mbox |
| 43 | `git apply` | Archivage & Patchs | 2026-11-23 01:47:12 | Application de patchs |
| 44 | `git gc` | Maintenance & IntÃ©gritÃ© | 2026-11-23 01:49:32 | Ramasse-miettes & compression |
| 45 | `git prune` | Maintenance & IntÃ©gritÃ© | 2026-11-23 01:50:50 | Purge d'objets inaccessibles |
| 46 | `git maintenance` | Maintenance & IntÃ©gritÃ© | 2026-11-23 01:52:24 | Planification de maintenance |
| 47 | `git notes` | Audit & DÃ©bogage | 2026-11-23 01:55:01 | Ajout de mÃ©tadonnÃ©es post-commit |
| 48 | `git range-diff` | Comparaison & Diff | 2026-11-23 01:56:40 | Comparaison de plages de commits |
| 49 | `git merge-base` | Fusion & Rebasage | 2026-11-23 01:59:02 | DÃ©tection de l'ancÃªtre commun |
| 50 | `git show-branch` | Branches & Navigation | 2026-11-23 02:02:58 | Vue topologique des branches |
| 51 | `git read-tree` | Plomberie & Objets | 2026-11-23 02:05:15 | Chargement d'arbres dans l'index |
| 52 | `git commit-tree` | Plomberie & Objets | 2026-11-23 02:07:21 | Fabrication directe de commit |
| 53 | `git update-index` | Plomberie & Objets | 2026-11-23 02:08:32 | Modification binaire de l'index |
| 54 | `git check-attr` | Plomberie & Objets | 2026-11-23 02:10:27 | Audit des attributs Git |
| 55 | `git stripspace` | Plomberie & Objets | 2026-11-23 02:12:56 | Nettoyage d'espaces blancs |
| 56 | `git patch-id` | Plomberie & Objets | 2026-11-23 02:15:16 | Calcul d'empreinte stable de diff |
| 57 | `git name-rev` | Plomberie & Objets | 2026-11-23 02:16:47 | Conversion SHA vers ref lisible |
| 58 | `git restore` | Suivi & Indexation | 2026-11-23 02:17:53 | Restauration de fichiers |
| 59 | `git clean` | Suivi & Indexation | 2026-11-23 02:19:41 | Nettoyage de fichiers untracked |
| 60 | `git rm` | Suivi & Indexation | 2026-11-23 02:21:18 | Suppression contrÃ´lÃ©e du suivi |
| 61 | `git mv` | Suivi & Indexation | 2026-11-23 02:22:31 | DÃ©placement et renommage tracÃ© |
| 62 | `git cherry` | Recherche & Exploration | 2026-11-23 02:27:39 | DÃ©tection de commits non mergÃ©s |
| 63 | `git worktree` | Maintenance & Espaces | 2026-11-23 02:29:39 | Gestion multi-arborescences |
| 64 | `git bisect` | Audit & DÃ©bogage | 2026-11-23 02:30:45 | DÃ©bogage par dichotomie |
| 65 | `git verify-tag` | Tags & RÃ©fÃ©rences | 2026-11-23 02:33:25 | VÃ©rification cryptographique tag |
| 66 | `git verify-commit` | Maintenance & IntÃ©gritÃ© | 2026-11-23 02:35:22 | VÃ©rification de signature commit |
| 67 | `git am` | Archivage & Patchs | 2026-11-23 02:37:28 | Ingestion de flux de patchs |
| 68 | `git mktree` | Plomberie & Objets | 2026-11-23 02:39:32 | Assemblage d'objets arbres |
| 69 | `git clone` | Initialisation | 2026-11-23 02:40:38 | Clonage de dÃ©pÃ´t |
| 70 | `git fetch` | DÃ©pÃ´ts distants | 2026-11-23 02:43:22 | Synchronisation d'objets distants |
| 71 | `git pull` | DÃ©pÃ´ts distants | 2026-11-23 02:44:28 | Rapatriement et fusion distante |
| 72 | `git push` | DÃ©pÃ´ts distants | 2026-11-23 02:45:33 | Publication vers GitHub |
