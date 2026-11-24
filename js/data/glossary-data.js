/**
 * GLOSSARY DATA - Glossaire Spécialisé Cybersécurité, Virologie & Git
 */

export const GLOSSARY_DATA = [
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
