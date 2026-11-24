/**
 * EXPIRO DATA - Étude Technique Approfondie du Virus Win32/Expiro
 * Données d'analyse binaire, mécanisme d'infection PE, variantes et désinfection.
 */

export const EXPIRO_DATA = {
    overview: {
        name: "Win32/Expiro (W32.Expiro, Virus:Win32/Expiro.AY)",
        family: "File Infector polymorphe / Trojan Botnet",
        targets: "Windows 32-bit (x86) et Windows 64-bit (x64) Portable Executable (.exe, .scr)",
        discoveryYear: "2010 (avec évolutions majeures documentées jusqu'à aujourd'hui)",
        threatLevel: "Critique (Danger élevé d'altération du système d'exploitation)",
        primaryPayload: "Infection récursive de binaires PE, vol d'identifiants, hook de services Windows, communication C2",
        authorType: "Groupe cybercriminel professionnel motivé par l'extorsion et le vol d'accès d'entreprises"
    },

    timeline: [
        {
            year: "2010",
            title: "Apparition de la première souche Win32/Expiro.A",
            description: "Première détection d'un infecteur de fichiers PE 32 bits capable de modifier l'en-tête de section et de voler les identifiants de messagerie Outlook et navigateurs."
        },
        {
            year: "2011 - 2012",
            title: "Mutation vers Expiro.G et Expiro.K",
            description: "Ajout d'un moteur polymorphe partiel pour obfusquer le corps du virus à chaque infection et déploiement d'un client botnet avec algorithme DGA (Domain Generation Algorithm)."
        },
        {
            year: "2013 - 2014",
            title: "Variantes 64-bits (Win64/Expiro)",
            description: "Évolution majeure : Expiro devient l'un des rares infecteurs capables de corrompre indifféremment des binaires PE32 et PE32+ (64-bit), ciblant les bibliothèques et exécutables du système Windows."
        },
        {
            year: "2015 - 2018",
            title: "Infection de services système et contournement UAC",
            description: "Détournement des services de mise à jour Windows (wuauserv) et neutralisation sélective des antivirus par désactivation de leurs pilotes de sécurité."
        },
        {
            year: "2019 - Présent",
            title: "Résurgence et réutilisation dans des attaques ciblées",
            description: "Utilisé comme composant d'intrusion et de persistance persistante avant déploiement de ransomwares d'entreprises."
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
            features: "Introduction du moteur de polymorphisme et de la communication C2 chiffrée par clé RC4 dynamique."
        },
        {
            name: "Expiro.AY / BC",
            architecture: "x86 et x64 (Dual Architecture)",
            features: "Support universel des binaires 64 bits, détournement d'EntryPoint par insertion d'une nouvelle section '.expiro' ou agrandissement de la dernière section."
        },
        {
            name: "Expiro.W64",
            architecture: "x64 exclusif",
            features: "Optimisé pour infecter les DLLs système et exécutables du dossier System32 avec gestion des tables de relais (Relocation Tables)."
        }
    ],

    peInfectionMechanics: {
        title: "Anatomie de l'Infection d'un Fichier Portable Executable (PE)",
        summary: "Expiro est un infecteur de type 'Appender' ou 'Section Injector'. Il ne détruit pas le programme d'origine, mais greffe son propre code et redirige l'adresse d'exécution initiale (OEP).",
        steps: [
            {
                stepNumber: 1,
                title: "Validation de la structure PE",
                description: "Le virus ouvre le fichier cible, vérifie la signature DOS 'MZ' (0x5A4D) et lit le pointeur e_lfanew vers l'en-tête NT Header ('PE\\0\\0' - 0x00004550). Il s'assure que le fichier n'est pas déjà infecté en vérifiant un marqueur spécifique."
            },
            {
                stepNumber: 2,
                title: "Détournement ou ajout de section",
                description: "Expiro examine la table des sections (IMAGE_SECTION_HEADER). Soit il ajoute une nouvelle section avec des permissions en lecture/écriture/exécution (IMAGE_SCN_MEM_EXECUTE | IMAGE_SCN_MEM_READ | IMAGE_SCN_MEM_WRITE), soit il étend la dernière section existante (.rdata ou .data)."
            },
            {
                stepNumber: 3,
                title: "Détournement du point d'entrée (OEP - Original Entry Point)",
                description: "Il sauvegarde la valeur légitime de 'AddressOfEntryPoint' dans son propre corps de code, puis modifie ce champ dans l'en-tête Optional Header pour faire pointer l'exécution directement vers son code viral injecté."
            },
            {
                stepNumber: 4,
                title: "Chiffrement et injection du corps viral",
                description: "Le payload viral est chiffré à l'aide d'une routine polymorphe et injecté dans la section modifiée. Un déchiffreur (stub) unique en langage assembleur est placé en tête du payload."
            },
            {
                stepNumber: 5,
                title: "Restitution finale du contrôle au programme hôte",
                description: "Après que le code d'Expiro s'est exécuté et s'est installé en mémoire vive (RAM), le stub effectue un saut (JMP ou RET) vers l'adresse d'origine (OEP). Pour l'utilisateur, le logiciel légitime se lance comme si de rien n'était !"
            }
        ]
    },

    peStructureBeforeAfter: {
        normal: {
            title: "Fichier PE Sain (Avant Infection)",
            sections: [
                { name: "DOS Header (MZ)", size: "64 octets", role: "Compatibilité MS-DOS historique" },
                { name: "NT Headers (PE)", size: "Signature + File Header + Optional Header", role: "Spécifie l'AddressOfEntryPoint (ex: 0x00001000)" },
                { name: "Section .text", size: "Code exécutable légitime", flags: "READ | EXECUTE" },
                { name: "Section .rdata", size: "Constantes et tables d'importation (IAT)", flags: "READ ONLY" },
                { name: "Section .data", size: "Variables globales initialisées", flags: "READ | WRITE" }
            ],
            entryPointTarget: "Section .text (Code d'origine du développeur)"
        },
        infected: {
            title: "Fichier PE Infecté par Expiro (Après Infection)",
            sections: [
                { name: "DOS Header (MZ)", size: "64 octets", role: "Inchangé" },
                { name: "NT Headers (PE)", size: "AddressOfEntryPoint MODIFIÉ", role: "Pointe désormais vers 0x00045000 (Section virale) !" },
                { name: "Section .text", size: "Code d'origine intact mais court-circuité", flags: "READ | EXECUTE" },
                { name: "Section .rdata", size: "Imports intacts", flags: "READ ONLY" },
                { name: "Section .data", size: "Variables d'origine", flags: "READ | WRITE" },
                { name: "Section .expiro (ou .data étendue)", size: "Payload viral chiffré + Stub de déchiffrement polymorphe", flags: "READ | WRITE | EXECUTE (Anomalie critique)" }
            ],
            entryPointTarget: "Section virale -> Exécution du malware en premier -> Saut vers l'OEP légitime"
        }
    },

    systemImpact: [
        {
            category: "Persistance Système",
            detail: "Crée des mutex nommés globaux (ex: 'kjsdfkjhsdf7834') pour éviter la multi-infection d'un même processus. S'enregistre dans les clés Run du registre et tente d'infecter les services Windows."
        },
        {
            category: "Vol d'Identifiants",
            detail: "Scanne la mémoire et le système de fichiers pour dérober les certificats numériques, identifiants des navigateurs (Chrome, Firefox, Edge, Opera) et clients FTP (FileZilla)."
        },
        {
            category: "Communication C2 (Command & Control)",
            detail: "Établit des liaisons chiffrées avec des adresses IP distantes codées en dur ou générées via DGA pour recevoir des instructions et téléverser les données volées."
        },
        {
            category: "Propagation Locale Récursive",
            detail: "Parcourt silencieusement tous les disques locaux (C:\\, D:\\) et les lecteurs réseau partagés pour infecter chaque fichier .EXE et .SCR accessible en écriture."
        }
    ],

    detectionMethods: {
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
        ]
    },

    disinfectionAndLimits: {
        title: "Possibilités et Limites Techniques de la Désinfection",
        description: "Pourquoi Expiro est l'un des virus les plus difficiles et dangereux à nettoyer :",
        points: [
            {
                title: "Risque majeur de corruption des binaires système",
                content: "Pour nettoyer un fichier infecté, un antivirus doit recalculer l'AddressOfEntryPoint d'origine, restaurer l'en-tête de section et tronquer le code viral. Si la routine de déchiffrement a altéré un seul octet du code hôte, le programme plante immédiatement (Erreur 0xc0000005 - Access Violation)."
            },
            {
                title: "Infection des dépendances critiques de Windows",
                content: "Expiro infecte souvent des composants clés comme explorer.exe, spoolsv.exe ou des DLLs système. Une suppression brute du fichier détruit le système d'exploitation et rend la machine incapable de redémarrer."
            },
            {
                title: "Recommandation officielle des experts en réponse à incident",
                content: "Face à une infection massive par Expiro, le nettoyage automatique par antivirus n'est PAS recommandé pour les systèmes de production critiques. La stratégie sûre consiste à réinstaller le système à partir d'une image saine ou restaurer une sauvegarde hors-ligne vérifiée."
            }
        ]
    }
};
