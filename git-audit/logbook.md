# 📓 Journal de Bord d'Audit Git (Logbook)

Ce document retrace la progression chronologique des exécutions réelles des commandes Git effectuées lors de la conception et du développement de la plateforme **CyberVirus Lab**.

---

## Session 1 : Initialisation, Configuration et Socle Technique

### Phase 1 à 4 : Mise en place du dépôt
- **Commande 1 :** `git init`
  - *Rôle :* Initialise le dépôt Git local dans le répertoire cible `c:\Users\Valdes Hack\Desktop\cours\Git`.
  - *Résultat :* Création du répertoire `.git/`.
- **Commande 2 :** `git config`
  - *Rôle :* Définit l'identité de l'auteur (`Valdes Hack`, `valdes-hack@github.com`) et la branche par défaut.
- **Commande 3 :** `git status`
  - *Rôle :* Contrôle l'état des fichiers untracked (.gitignore, README.md).
- **Commande 4 :** `git branch`
  - *Rôle :* Renomme la branche initiale en `main`.
- **Commande 5 :** `git add`
  - *Rôle :* Indexe les premiers fichiers structurants.
- **Commande 6 :** `git commit`
  - *Rôle :* Enregistre le commit initial `1bbaf12`.
- **Commande 7 :** `git log`
  - *Rôle :* Vérifie la présence du commit dans l'arbre d'historique.
- **Commande 8 :** `git switch`
  - *Rôle :* Crée et bascule sur la branche d'intégration `develop`.
- **Commande 9 :** `git show`
  - *Rôle :* Inspecte les statistiques et le diff du commit racine.
- **Commande 10 :** `git rev-parse`
  - *Rôle :* Commande de plomberie identifiant la racine absolue du dépôt (`--show-toplevel`).
- **Commande 11 :** `git var`
  - *Rôle :* Lit la variable d'environnement Git `GIT_AUTHOR_IDENT`.
- **Commande 12 :** `git ls-files`
  - *Rôle :* Liste les fichiers enregistrés dans l'index binaire.
- **Commande 13 :** `git cat-file`
  - *Rôle :* Vérifie le type d'objet Git sous le capot (`commit`).
- **Commande 14 :** `git count-objects`
  - *Rôle :* Compte les objets déballés et la mémoire disque occupée.
- **Commande 15 :** `git check-ref-format`
  - *Rôle :* Valide la syntaxe des futures branches de fonctionnalités.
- **Commande 16 :** `git check-ignore`
  - *Rôle :* Vérifie l'application effective des règles d'exclusion de `.gitignore`.
- **Commande 17 :** `git shortlog`
  - *Rôle :* Résume les contributions par auteur.
- **Commande 18 :** `git describe`
  - *Rôle :* Affiche l'identifiant lisible du dernier commit accessible.
- **Commande 19 :** `git tag`
  - *Rôle :* Crée le premier tag annoté `v0.1.0-alpha`.
- **Commande 20 :** `git remote`
  - *Rôle :* Associe le dépôt distant GitHub `https://github.com/valdes-hack/Learn-git-virus.git`.
