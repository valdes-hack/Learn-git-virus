/**
 * StorageManager - Gestionnaire de persistance locale (localStorage)
 * Gère l'état d'apprentissage des commandes Git, les préférences de thème et les scores.
 */
export const StorageManager = {
    KEYS: {
        MASTERED_COMMANDS: 'cybervirus_git_mastered_commands',
        THEME: 'cybervirus_theme',
        QUIZ_SCORES: 'cybervirus_quiz_scores'
    },

    getMasteredCommands() {
        try {
            const data = localStorage.getItem(this.KEYS.MASTERED_COMMANDS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Erreur lors de la lecture des commandes maîtrisées:", e);
            return [];
        }
    },

    setCommandMastered(commandId, isMastered) {
        try {
            const list = new Set(this.getMasteredCommands());
            if (isMastered) {
                list.add(commandId);
            } else {
                list.delete(commandId);
            }
            localStorage.setItem(this.KEYS.MASTERED_COMMANDS, JSON.stringify(Array.from(list)));
            return Array.from(list);
        } catch (e) {
            console.error("Erreur lors de la sauvegarde de la commande:", e);
            return [];
        }
    },

    isCommandMastered(commandId) {
        const list = this.getMasteredCommands();
        return list.includes(commandId);
    },

    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'dark';
    },

    setTheme(theme) {
        localStorage.setItem(this.KEYS.THEME, theme);
    },

    saveQuizScore(score, total) {
        const history = this.getQuizScores();
        history.push({
            date: new Date().toISOString(),
            score,
            total,
            percentage: Math.round((score / total) * 100)
        });
        localStorage.setItem(this.KEYS.QUIZ_SCORES, JSON.stringify(history));
    },

    getQuizScores() {
        try {
            const data = localStorage.getItem(this.KEYS.QUIZ_SCORES);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }
};
