/**
 * QUIZ VIEW MODULE - Évaluation Pédagogique Interactive
 */
import { QUIZ_DATA } from '../data/quiz-data.js';
import { StorageManager } from '../services/storage.js';

export const QuizView = {
    userAnswers: {}, // { questionId: selectedIndex }
    submitted: false,

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const total = QUIZ_DATA.length;
        let score = 0;
        if (this.submitted) {
            QUIZ_DATA.forEach(q => {
                if (this.userAnswers[q.id] === q.correctIndex) {
                    score++;
                }
            });
        }

        container.innerHTML = `
            <div class="quiz-view-container">
                <div class="view-hero">
                    <div class="badge-tag">🎯 Évaluation Interactive</div>
                    <h2>Validation des Compétences : Cybersécurité & Git</h2>
                    <p class="hero-desc">
                        Testez votre maîtrise des concepts de virologie, du fonctionnement interne d'Expiro et des mécanismes fondamentaux de Git.
                    </p>
                </div>

                ${this.submitted ? `
                    <div class="quiz-score-banner ${score >= total * 0.7 ? 'banner-success' : 'banner-warning'}">
                        <h3>Résultat de l'Évaluation : ${score} / ${total} (${Math.round((score / total) * 100)}%)</h3>
                        <p>${score >= total * 0.7 ? 'Félicitations ! Vous avez acquis les compétences clés.' : 'Certains concepts méritent une relecture attentive des fiches techniques.'}</p>
                        <button class="btn btn-outline" id="btn-quiz-retry">🔄 Recommencer le Quiz</button>
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
                                        <strong>${isCorrect ? '✅ Bonne réponse !' : '❌ Réponse incorrecte.'}</strong>
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
                            Valider mes Réponses
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        this.bindEvents(containerId);
    },

    bindEvents(containerId) {
        const radios = document.querySelectorAll('.quiz-option input[type="radio"]');
        radios.forEach(r => {
            r.addEventListener('change', (e) => {
                const qid = e.target.getAttribute('data-qid');
                this.userAnswers[qid] = parseInt(e.target.value, 10);
            });
        });

        document.getElementById('btn-quiz-submit')?.addEventListener('click', () => {
            const answeredCount = Object.keys(this.userAnswers).length;
            if (answeredCount < QUIZ_DATA.length) {
                if (!confirm(`Vous n'avez répondu qu'à ${answeredCount} question(s) sur ${QUIZ_DATA.length}. Voulez-vous tout de même soumettre ?`)) {
                    return;
                }
            }
            this.submitted = true;
            let score = 0;
            QUIZ_DATA.forEach(q => {
                if (this.userAnswers[q.id] === q.correctIndex) score++;
            });
            StorageManager.saveQuizScore(score, QUIZ_DATA.length);
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
