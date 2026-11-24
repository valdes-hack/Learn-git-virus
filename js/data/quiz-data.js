/**
 * QUIZ DATA - Évaluations interactives sur la Cybersécurité et Git
 */

export const QUIZ_DATA = [
    {
        id: "q1",
        category: "Cybersécurité",
        question: "Quelle est la principale caractéristique distinguant un Ver informatique (Worm) d'un Virus classique ?",
        options: [
            "Le ver est autonome et se propage sans fichier hôte ni action humaine",
            "Le ver n'utilise jamais le réseau informatique",
            "Le ver nécessite l'ouverture manuelle d'un document Word infecté",
            "Le ver n'est composé que de code HTML"
        ],
        correctIndex: 0,
        explanation: "Contrairement aux virus qui doivent parasiter un fichier hôte (PE, document) et nécessitent son exécution par l'utilisateur, les vers sont autonomes et exploitent directement les failles de services réseau."
    },
    {
        id: "q2",
        category: "Expiro & PE",
        question: "Comment le virus Win32/Expiro parvient-il à exécuter son code malveillant avant le programme légitime ?",
        options: [
            "Il supprime entièrement le code légitime du développeur",
            "Il détourne l'AddressOfEntryPoint (OEP) dans l'en-tête PE pour pointer vers sa section virale",
            "Il force l'utilisateur à taper une commande dans le terminal PowerShell",
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
            "Parce qu'elles appellent la même commande de base 'git add' avec simplement des arguments ou options différents",
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
