/**
 * APP.JS - Lógica principal de "Matemática Básica"
 * Implementación estricta del Diagrama de Flujo (Pág. 9) y Diseño (Pág. 10)
 *
 * ============================================================================
 *  MAPA DEL CÓDIGO (lo más importante de este archivo)
 * ============================================================================
 *  1. PERSISTENCIA      -> loadUserData() / saveUserData()  (localStorage)
 *  2. NAVEGACIÓN        -> showView()  (dashboard, lección, reto, resultados)
 *  3. RACHAS            -> quizStreak (aciertos seguidos) + dailyStreak (días)
 *  4. MOTOR DEL RETO    -> startQuiz() -> selectAnswer() -> nextQuestion()
 *                         * Ronda 1: al fallar, la pregunta se salta sola
 *                         * Repaso: solo las falladas, hasta acertarlas
 *                         * Puntaje = aciertos ronda 1 + preguntas reparadas
 *  5. RESULTADOS        -> evaluateQuizResults()  (XP, nivel, insignias)
 *  6. RANKING GLOBAL    -> submitScoreToRanking() / renderRanking()  (nube)
 *  7. MODO INVITADO     -> requireProfile()  (sin perfil no se juega)
 *  8. PRIVACIDAD        -> openPrivacyModal() / deleteRankingRecord()
 *                         (alias por defecto, no se envia el grado, borrado real)
 * ============================================================================
 */

// URL del texto completo de la Política de Privacidad y Uso (archivo POLITICA.md)
const PRIVACY_POLICY_URL = "https://github.com/alexfloresmorales26-cmyk/Proyecto-Pi/blob/main/POLITICA.md";

class MathApp {
  constructor() {
    this.user = {
      name: "Pequeño Matemático",
      avatar: "🦕",
      grade: "1º Primaria",
      level: 1,
      xp: 40, // XP inicial al crear el perfil (se suman +100 al aprobar el primer reto)
      guest: false,
      bestStreak: 0,
      completedTopics: [],
      history: [],
      rewards: []
    };

    this.currentTopic = null;
    this.currentQuestionIndex = 0;
    this.quizAnswers = []; // { questionId, selectedIndex, isCorrect }
    this.currentFactIndex = 0;
    this.currentTipIndex = 0;
    this.currentQuizTipIndex = 0;
    this.quizStreak = 0; // Racha de respuestas correctas seguidas

    // Mecánica nueva: ronda 1 (si falla, salta sola) + repaso final solo de las falladas
    this.quizPhase = "round1";        // "round1" | "review"
    this.reviewQueue = [];            // índices de preguntas falladas en la ronda 1
    this.reviewPos = 0;               // posición actual dentro del repaso
    this.fixedInReview = new Set();   // índices de preguntas acertadas en el repaso
    this.autoAdvanceTimer = null;     // temporizador del salto automático tras fallar
    this.practiceMode = false;        // Modo Práctica: no da XP ni cuenta en el ranking

    // PRIVACIDAD: alias público (nunca el nombre real), interruptor y opt-out
    this.rankingAlias = "";

    this.init();
  }

  // Arranque de la app: carga el perfil, dibuja la pantalla y engancha los botones
  // OJO: el orden importa (primero los datos, despues la UI y los listeners)
  init() {
    this.loadUserData();
    this.renderTopics();
    this.renderFunFact();
    this.renderHeroTip();
    this.renderQuizTips();
    this.startTipsRotation();
    this.updateUserHeader();
    this.setupEventListeners();
    this.checkFirstVisit();
    this.checkCookieConsent();
    this.refreshDailyStreak();
  }

  // ==========================================================================
  //  RACHA DE DÍAS: días consecutivos de práctica (se reinicia si dejas de venir)
  // ==========================================================================

  // Fecha local "YYYY-MM-DD" (sin horas, para comparar solo días)
  todayKey() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  }

  // Diferencia en días entre fecha guardada (YYYY-MM-DD) y hoy
  daysBetween(prevKey) {
    const prev = new Date(`${prevKey}T00:00:00`);
    const now = new Date(`${this.todayKey()}T00:00:00`);
    return Math.round((now - prev) / 86400000);
  }

  // Marcar que el niño practicó hoy: sube o mantiene la racha de días
  markPracticedToday() {
    const today = this.todayKey();
    if (this.user.lastPracticed === today) return; // ya sumo hoy

    const gap = this.user.lastPracticed ? this.daysBetween(this.user.lastPracticed) : null;
    if (gap === 1) {
      // Vino ayer y hoy: la racha crece
      this.user.dailyStreak = (this.user.dailyStreak || 0) + 1;
    } else {
      // Primer día o dejo de venir 1+ días: la racha se reinicia
      this.user.dailyStreak = 1;
    }
    this.user.lastPracticed = today;
    this.saveUserData();
  }

  // Al abrir la app: si la racha esta activa se conserva; si dejo de venir, se rompe
  refreshDailyStreak() {
    if (!this.user || this.user.guest) return;
    if (!this.user.lastPracticed) return; // nunca ha practicado: racha empieza al practicar
    const gap = this.daysBetween(this.user.lastPracticed);
    if (gap > 1) {
      this.user.dailyStreak = 0; // se rompió la racha de días
      this.user.lastPracticed = null;
      this.saveUserData();
    }
  }

  // Cargar datos de usuario guardados
  loadUserData() {
    const saved = localStorage.getItem("matematica_basica_user");
    if (saved) {
      try {
        this.user = JSON.parse(saved);
        // Compatibilidad con perfiles creados antes del sistema de recompensas
        if (this.user && !Array.isArray(this.user.rewards)) {
          this.user.rewards = [];
        }
        if (this.user.guest === undefined) {
          this.user.guest = false;
        }
        if (this.user.bestStreak === undefined) {
          this.user.bestStreak = 0;
        }
        // Compatibilidad con perfiles anteriores a la racha de días
        if (this.user.dailyStreak === undefined) this.user.dailyStreak = 0;
        if (this.user.lastPracticed === undefined) this.user.lastPracticed = null;
        // Compatibilidad con perfiles anteriores a la política de privacidad
        // (por defecto se muestra un alias, nunca el nombre real)
        if (this.user.showNameInRanking === undefined) this.user.showNameInRanking = false;
        if (this.user.rankingOptOut === undefined) this.user.rankingOptOut = false;
        if (!this.user.rankingAlias) this.user.rankingAlias = this.buildRankingAlias();
      } catch (e) {
        console.error("Error al cargar usuario", e);
      }
    }
  }

  // GUARDAR EL PERFIL (localStorage) y refrescar el header al instante
  saveUserData() {
    localStorage.setItem("matematica_basica_user", JSON.stringify(this.user));
    this.updateUserHeader();
  }

  // ==========================================================================
  //  PRIVACIDAD Y USO: modal, interruptores y borrado del registro en la nube
  // ==========================================================================

  // Abrir el modal de privacidad y reflejar el estado actual
  openPrivacyModal() {
    const chkName = document.getElementById("chk-show-name-ranking");
    const chkOptOut = document.getElementById("chk-ranking-optout");
    if (chkName) chkName.checked = !!this.user.showNameInRanking;
    if (chkOptOut) chkOptOut.checked = !!this.user.rankingOptOut;
    this.updatePrivacyStatus();
    this.openModal("modal-privacy");
  }

  // Refrescar el texto de estado del modal de privacidad
  updatePrivacyStatus() {
    const aliasLabel = document.getElementById("privacy-alias-label");
    const statusText = document.getElementById("privacy-status-text");
    if (aliasLabel) aliasLabel.textContent = this.user.rankingAlias || this.buildRankingAlias();
    if (!statusText) return;

    if (this.user.guest) {
      statusText.textContent = "Modo Invitado: no se envía nada a la nube.";
    } else if (this.user.rankingOptOut) {
      statusText.textContent = "🚫 No apareces en el ranking: tus datos no salen de este dispositivo.";
    } else if (this.user.showNameInRanking) {
      statusText.textContent = `👀 En el ranking se muestra tu apodo "${this.user.name}".`;
    } else {
      statusText.textContent = `🕶️ En el ranking solo se ve tu alias "${this.user.rankingAlias || this.buildRankingAlias()}".`;
    }
  }

  // Borrado del registro en la nube con doble confirmacion (pensado para niños)
  async confirmDeleteRankingRecord() {
    if (this.user.guest) {
      alert("🔒 En Modo Invitado no hay ningún registro en el ranking.");
      return;
    }
    const ok1 = confirm("☁️ ¿Quieres borrar tu registro del ranking global?\n\nSe eliminará tu fila de la nube (alias, avatar, nivel, XP y rachas).\nTus avances locales se conservan.");
    if (!ok1) return;
    const ok2 = confirm("⚠️ ¿Seguro? Esta acción no se puede deshacer.");
    if (!ok2) return;

    const ok = await this.deleteRankingRecord();
    if (ok) {
      alert("✅ Tu registro del ranking fue borrado. Tu perfil local sigue intacto.");
      this.updatePrivacyStatus();
      this.renderRanking();
    } else {
      alert("⚠️ No se pudo completar el borrado. Revisa tu conexión e inténtalo de nuevo.");
    }
  }

  // ==========================================================================
  //  RANKING GLOBAL (base de datos en la nube via REST)
  // ==========================================================================

  // Identificador estable del jugador en este dispositivo (su fila en la nube)
  rankingUserId() {
    let id = localStorage.getItem("matematica_basica_ranking_id");
    if (!id) {
      id = "p" + Date.now() + Math.random().toString(36).slice(2, 7);
      localStorage.setItem("matematica_basica_ranking_id", id);
    }
    return id;
  }

  // Leer el registro de jugadores del objeto en la nube
  async cloudGet() {
    const res = await fetch(`${CLOUD_DB.endpoint}/objects/${CLOUD_DB.objectId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const obj = await res.json();
    return { players: (obj && obj.data && obj.data.players) || {} };
  }

  // Alias público para el ranking: NO es el nombre real del niño.
  // Se genera a partir del identificador del dispositivo (ej. "Matemático 1F2A").
  buildRankingAlias() {
    const id = this.rankingUserId ? this.rankingUserId() : "000000";
    const suffix = String(id).slice(-4).toUpperCase();
    return `Matemático/a ${suffix}`;
  }

  // Nombre público que se envía al ranking: alias o apodo real según la preferencia
  publicRankingName() {
    return this.user.showNameInRanking ? this.user.name : (this.user.rankingAlias || this.buildRankingAlias());
  }

  // Enviar el perfil y los puntos al ranking en la nube (se llama al aprobar un reto)
  // PRIVACIDAD: por defecto se envía un ALIAS (no el nombre real) y NUNCA el grado escolar.
  async submitScoreToRanking(scorePercent) {
    if (!window.cloudConfigured || !this.user || this.user.guest) return;
    if (this.user.rankingOptOut) return; // el niño pidió no aparecer en el ranking
    this.lastScorePercent = scorePercent;

    try {
      const registry = await this.cloudGet();
      registry.players[this.rankingUserId()] = {
        name: this.publicRankingName(),
        alias: this.user.rankingAlias || this.buildRankingAlias(),
        isAlias: !this.user.showNameInRanking,
        avatar: this.user.avatar,
        // El grado escolar se queda SOLO en el dispositivo: no viaja a la nube
        level: this.user.level,
        xp: this.user.xp,
        bestStreak: this.user.bestStreak || 0,
        dayStreak: this.user.dailyStreak || 0,
        quizzesPassed: (this.user.completedTopics || []).length,
        lastScore: scorePercent,
        updatedAt: Date.now()
      };

      await fetch(`${CLOUD_DB.endpoint}/objects/${CLOUD_DB.objectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: registry })
      });
    } catch (e) {
      console.warn("No se pudo enviar al ranking:", e);
    }
  }

  // BORRAR MI REGISTRO DEL RANKING (derecho de supresión).
  // La API permite DELETE del objeto completo, pero eso borraría el ranking entero,
  // así que se lee, se quita SOLO mi fila y se vuelve a guardar el resto.
  async deleteRankingRecord() {
    if (!window.cloudConfigured) return false;
    const myId = this.rankingUserId();
    try {
      const registry = await this.cloudGet();
      if (!registry.players[myId]) {
        // No habia registro: solo limpiamos el identificador local
        localStorage.removeItem("matematica_basica_ranking_id");
        return true;
      }
      delete registry.players[myId];
      await fetch(`${CLOUD_DB.endpoint}/objects/${CLOUD_DB.objectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: registry })
      });
      localStorage.removeItem("matematica_basica_ranking_id");
      this.user.rankingAlias = this.buildRankingAlias();
      this.saveUserData();
      return true;
    } catch (e) {
      console.warn("No se pudo borrar el registro del ranking:", e);
      return false;
    }
  }

  // Tabla de los mejores 10 jugadores por XP (lectura de la nube)
  async renderRanking() {
    const container = document.getElementById("ranking-content");
    if (!container) return;

    if (!window.cloudConfigured) {
      container.innerHTML = `
        <p style="font-size: 0.85rem; color: #64748b; text-align: center; padding: 8px 0;">
          🛠️ Ranking no disponible: falta la configuración de la base de datos en la nube.
        </p>`;
      return;
    }

    try {
      const registry = await this.cloudGet();
      const players = Object.entries(registry.players)
        .map(([id, p]) => ({ id, ...p }))
        .sort((a, b) => (b.xp || 0) - (a.xp || 0) || (b.lastScore || 0) - (a.lastScore || 0))
        .slice(0, 10);

      if (players.length === 0) {
        container.innerHTML = `
          <p style="font-size: 0.85rem; color: #64748b; text-align: center; padding: 8px 0;">
            Aún no hay jugadores en el ranking. ¡Aprueba un reto para ser el primero! 🚀
          </p>`;
        return;
      }

      const myId = this.rankingUserId();
      const medals = ["🥇", "🥈", "🥉"];

      container.innerHTML = `
        <div class="ranking-table-wrap">
          <table class="ranking-table">
            <thead>
              <tr><th>#</th><th>Jugador</th><th>Nivel</th><th>XP</th><th>📅</th></tr>
            </thead>
            <tbody>
              ${players.map((p, i) => `
                <tr class="${p.id === myId ? "me" : ""}">
                  <td>${medals[i] || (i + 1)}</td>
                  <td>${p.avatar || "🦕"} ${p.name || "Anónimo"} ${p.isAlias ? '<span title="Alias: no es el nombre real">🕶️</span>' : ""}</td>
                  <td>${p.level || 1}</td>
                  <td><strong>${p.xp || 0}</strong></td>
                  <td>${p.dayStreak ? `📅 ${p.dayStreak}` : "—"}</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>`;
    } catch (e) {
      container.innerHTML = `
        <p style="font-size: 0.85rem; color: #b91c1c; text-align: center; padding: 8px 0;">
          ⚠️ No se pudo cargar el ranking. Intenta de nuevo más tarde.
        </p>`;
      console.warn("Error al leer el ranking:", e);
    }
  }

  // Verifica si ya es usuario o es la primera vez
  checkFirstVisit() {
    const hasVisited = localStorage.getItem("matematica_basica_visited");
    if (!hasVisited) {
      // Precargar el grado actual en el selector antes de abrir el modal
      const gradeSelect = document.getElementById('select-student-grade');
      if (gradeSelect && this.user.grade) {
        // Seleccionar la opción que corresponda al grado actual
        const options = gradeSelect.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === this.user.grade) {
            options.selectedIndex = i;
            break;
          }
        }
      }
      this.openModal("modal-user-welcome");
    }
  }

  // Comprobar consentimiento de almacenamiento local / cookies
  checkCookieConsent() {
    const accepted = localStorage.getItem("matematica_basica_cookies_accepted");
    if (!accepted) {
      setTimeout(() => {
        const banner = document.getElementById("cookie-banner");
        if (banner) banner.classList.add("show");
      }, 700);
    }
  }

  // Guardar la aceptacion de cookies y cerrar el modal
  acceptCookies() {
    localStorage.setItem("matematica_basica_cookies_accepted", "true");
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.classList.remove("show");
    this.closeModal("modal-cookies");
    sound.playCorrect();
  }

  // BORRAR TODO (boton del modal de cookies): perfil, visitas y cookie
  clearAllData() {
    if (confirm("¿Estás seguro de que deseas borrar todos tus avances, nivel y estrellitas? Esta acción reiniciará tu progreso escolar.")) {
      localStorage.removeItem("matematica_basica_user");
      localStorage.removeItem("matematica_basica_visited");
      localStorage.removeItem("matematica_basica_cookies_accepted");
      sound.playClick();
      alert("Tus datos han sido reiniciados correctamente.");
      location.reload();
    }
  }

  // Actualiza la barra superior con avatar, nivel y XP
  updateUserHeader() {
    const avatarEl = document.getElementById("header-avatar");
    const nameEl = document.getElementById("header-user-name");
    const xpFillEl = document.getElementById("header-xp-fill");
    const gradeBadge = document.getElementById("dashboard-grade-text");

    if (avatarEl) avatarEl.textContent = this.user.avatar;
    if (nameEl) nameEl.textContent = this.user.name;
    if (xpFillEl) xpFillEl.style.width = `${Math.min(100, (this.user.xp % 100))}%`;
    if (gradeBadge) gradeBadge.textContent = `Grado escolar: ${this.user.grade}`;

    // Racha de días en el header (solo si ya hay racha)
    const dayStreakEl = document.getElementById("header-day-streak");
    if (dayStreakEl) {
      const days = this.user?.dailyStreak || 0;
      if (days > 0) {
        dayStreakEl.style.display = "inline-flex";
        dayStreakEl.querySelector(".day-streak-count").textContent = days;
        dayStreakEl.title = `Practicaste ${days} ${days === 1 ? "día" : "días"} seguidos`;
      } else {
        dayStreakEl.style.display = "none";
      }
    }
  }

  // Renderizar las tarjetas de temas del documento
  renderTopics(filterText = "") {
    const grid = document.getElementById("topics-grid");
    if (!grid) return;

    grid.innerHTML = "";
    const filter = filterText.toLowerCase().trim();

    const filteredTopics = APP_DATA.topics.filter(t => 
      t.title.toLowerCase().includes(filter) || 
      t.subtitle.toLowerCase().includes(filter) ||
      t.description.toLowerCase().includes(filter)
    );

    if (filteredTopics.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">No encontramos ningún tema que coincida con "${filterText}".</p>`;
      return;
    }

    filteredTopics.forEach(topic => {
      const isCompleted = this.user.completedTopics.includes(topic.id);
      const card = document.createElement("div");
      card.className = `topic-card ${topic.colorClass}`;
      card.innerHTML = `
        <div class="card-top">
          <div class="card-icon">${topic.icon}</div>
          <span class="card-status-badge">
            ${isCompleted ? "✅ Superado" : topic.badge}
          </span>
        </div>
        <h4>${topic.title}</h4>
        <p>${topic.subtitle}</p>
      `;

      card.addEventListener("click", () => {
        sound.playClick();
        this.openTopicLesson(topic.id);
      });

      grid.appendChild(card);
    });
  }

  // Rotar datos curiosos
  renderFunFact() {
    const factText = document.getElementById("fun-fact-text");
    if (factText) {
      factText.textContent = APP_DATA.funFacts[this.currentFactIndex];
    }
  }

  // Cambiar al siguiente dato curioso
  nextFunFact() {
    sound.playClick();
    this.currentFactIndex = (this.currentFactIndex + 1) % APP_DATA.funFacts.length;
    this.renderFunFact();
  }

  // Consejos para aprender del hero (clic para avanzar, rotación automática)
  renderHeroTip() {
    const tipText = document.getElementById("hero-tip-text");
    if (!tipText) return;

    tipText.textContent = APP_DATA.studyTips[this.currentTipIndex];

    const dots = document.getElementById("hero-tip-dots");
    if (dots) {
      dots.innerHTML = APP_DATA.studyTips.map((_, i) =>
        `<span class="hero-tip-dot${i === this.currentTipIndex ? " active" : ""}"></span>`
      ).join("");
    }
  }

  // Rotar el consejo del hero (con sonido opcional)
  nextHeroTip(playSound = false) {
    if (playSound) sound.playClick();
    this.currentTipIndex = (this.currentTipIndex + 1) % APP_DATA.studyTips.length;
    this.renderHeroTip();
  }

  // Rotación automática de los consejos del hero cada 9 segundos
  startTipsRotation() {
    setInterval(() => this.nextHeroTip(), 9000);
  }

  // Establecer la forma (cuadrado/rectángulo) en el laboratorio de geometría
  setShape(shape) {
    const visual = document.getElementById('shape-visual-box');
    const sideVal = document.getElementById('shape-side-val');
    const periVal = document.getElementById('shape-peri-val');
    const areaVal = document.getElementById('shape-area-val');
    const btnSquare = document.getElementById('btn-shape-square');
    const btnRect = document.getElementById('btn-shape-rect');
    if (shape === 'square') {
      visual.textContent = '4 cm';
      sideVal.textContent = '4';
      periVal.textContent = '16 cm';
      areaVal.textContent = '16 cm²';
      btnSquare.classList.add('active');
      btnRect.classList.remove('active');
    } else if (shape === 'rect') {
      visual.textContent = 'Rectángulo';
      sideVal.textContent = '5';
      periVal.textContent = '18 cm';
      areaVal.textContent = '25 cm²';
      btnSquare.classList.remove('active');
      btnRect.classList.add('active');
    }
  }

  // Consejos de resolución en la vista de quiz
  renderQuizTips() {
    const tipText = document.getElementById("quiz-tip-text");
    if (!tipText || !APP_DATA.quizTips) return;

    tipText.textContent = APP_DATA.quizTips[this.currentQuizTipIndex];

    const dots = document.getElementById("quiz-tip-dots");
    if (dots) {
      dots.innerHTML = APP_DATA.quizTips.map((_, i) =>
        `<span class="hero-tip-dot${i === this.currentQuizTipIndex ? " active" : ""}"></span>`
      ).join("");
    }
  }

  // Rotar los consejos de resolución del quiz
  nextQuizTip(playSound = false) {
    if (playSound) sound.playClick();
    this.currentQuizTipIndex = (this.currentQuizTipIndex + 1) % APP_DATA.quizTips.length;
    this.renderQuizTips();
  }

  // Estrellas de racha: una por cada respuesta correcta seguida (se rompe al fallar)
  renderQuizStreak() {
    const container = document.getElementById("quiz-streak-stars");
    if (!container) return;

    const streak = this.quizStreak || 0;

    // Número de racha junto a la llama
    const countEl = document.getElementById("streak-count");
    if (countEl) countEl.textContent = streak;
    const shown = Math.min(streak, 5);

    let html = Array.from({ length: shown }, () => `<span class="streak-star">⭐</span>`).join("");
    if (streak > 5) {
      html += `<span class="streak-star streak-star-more">+${streak - 5}</span>`;
    }
    container.innerHTML = html;

    container.title = streak > 0
      ? `Racha: ${streak} respuestas correctas seguidas`
      : "Racha de respuestas correctas";
  }

  // Recompensas al subir de nivel: desbloquear insignias y celebrar
  checkLevelUp(previousLevel) {
    const unlocks = APP_DATA.levelRewards.filter(r => r.level > previousLevel && r.level <= this.user.level);

    unlocks.forEach(r => {
      if (!this.user.rewards.includes(r.id)) this.user.rewards.push(r.id);
    });

    if (unlocks.length > 0) {
      // Celebrar después de ver los resultados del cuestionario
      setTimeout(() => this.openRewardModal(unlocks[unlocks.length - 1]), 2600);
    }
  }

  // Mostrar la insignia desbloqueada
  openRewardModal(reward) {
    document.getElementById("reward-level-title").textContent = `¡Nivel ${reward.level} alcanzado!`;
    document.getElementById("reward-icon").textContent = reward.icon;
    document.getElementById("reward-name").textContent = reward.name;
    document.getElementById("reward-description").textContent = reward.description;

    const nextReward = APP_DATA.levelRewards.find(r => r.level > this.user.level);
    const hint = document.getElementById("reward-next-hint");
    if (hint) {
      hint.textContent = nextReward
        ? `Tu próxima recompensa: ${nextReward.icon} ${nextReward.name} en el Nivel ${nextReward.level}.`
        : "¡Ya tienes todas las recompensas disponibles! ¡Brillas de verdad!";
    }

    this.launchConfetti();
    sound.playVictory();
    this.openModal("modal-level-reward");
  }

  // Colección de recompensas por nivel (modal de Nivel)
  renderRewards() {
    const container = document.getElementById("level-rewards-list");
    if (!container) return;

    container.innerHTML = APP_DATA.levelRewards.slice().reverse().map(r => {
      const unlocked = this.user.rewards.includes(r.id);

      return `
        <div class="reward-item ${unlocked ? "unlocked" : "locked"}">
          <span class="reward-item-icon">${unlocked ? r.icon : "🔒"}</span>
          <div class="reward-item-info">
            <strong>Nivel ${r.level} · ${r.name}</strong>
            <p>${r.description}</p>
          </div>
          <span class="reward-item-state">${unlocked ? "✔ Ganada" : `Nivel ${r.level}`}</span>
        </div>`;
    }).join("");
  }

  // Navegar entre vistas
  showView(viewId) {
    document.querySelectorAll(".view-section").forEach(v => v.classList.remove("active"));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Renderizar temas al mostrar el dashboard
    if (viewId === "view-dashboard") {
      this.renderTopics();
    }
  }

  // Abrir lección interactiva (Paso 4 del diagrama)
  openTopicLesson(topicId) {
    const topic = APP_DATA.topics.find(t => t.id === topicId);
    if (!topic) return;

    this.currentTopic = topic;
    const lessonTitle = document.getElementById("lesson-topic-title");
    const lessonIntro = document.getElementById("lesson-intro-text");
    const keypointsContainer = document.getElementById("lesson-keypoints");
    const widgetContainer = document.getElementById("lesson-interactive-widget");

    if (lessonTitle) lessonTitle.textContent = `${topic.icon} ${topic.title}`;
    if (lessonIntro) lessonIntro.textContent = topic.lesson.intro;

    // Renderizar puntos clave (cada tarjeta revela un dato extra al hover o al tocar)
    if (keypointsContainer) {
      keypointsContainer.innerHTML = topic.lesson.keyPoints.map(kp => `
        <div class="keypoint-item" tabindex="0" role="button" aria-label="Toca o pasa el ratón para más información">
          <h5>${kp.title}<span class="keypoint-info-badge">ℹ️ <span class="keypoint-info-label">info</span></span></h5>
          <p>${kp.text}</p>
          <div class="keypoint-formula">${kp.formula}</div>
          <div class="keypoint-tip"><span class="keypoint-tip-icon">💡</span>${kp.extra || ""}</div>
        </div>
      `).join("");
      // Escucha táctil/clic: en celular no hay hover, así que un toque alterna la info extra
      keypointsContainer.querySelectorAll(".keypoint-item").forEach(card => {
        card.addEventListener("click", e => {
          e.stopPropagation();
          const wasOpen = card.classList.contains("open");
          keypointsContainer.querySelectorAll(".keypoint-item.open").forEach(c => c.classList.remove("open"));
          if (!wasOpen) card.classList.add("open");
          sound.playClick();
        });
      });
    }

    // Renderizar widget interactivo dinámico según el tema
    if (widgetContainer) {
      widgetContainer.innerHTML = this.getInteractiveWidgetHTML(topic);
      this.attachWidgetListeners(topic);
    }

    // Si el reto ya fue superado: bloquear el cuestionario de este tema
    const quizBtn = document.getElementById("btn-lesson-start-quiz");
    if (quizBtn) {
      const alreadyPassed = this.user.completedTopics.includes(topic.id);
      if (alreadyPassed) {
        quizBtn.disabled = true;
        quizBtn.textContent = "✅ Reto Superado";
        quizBtn.title = "Ya aprobaste este reto. ¡Elige otro tema para seguir avanzando!";
      } else {
        quizBtn.disabled = false;
        quizBtn.textContent = "¡Hacer Cuestionario! 🎯";
        quizBtn.title = "";
      }
    }

    this.showView("view-lesson");
  }

  // Generador de Widgets Interactivos Didácticos
  getInteractiveWidgetHTML(topic) {
    switch (topic.id) {
      case "medicion":
        return `
          <div class="widget-title">📏 Mini-Laboratorio: Mide el lápiz con la regla</div>
          <div class="ruler-interactive">
            <div id="measured-object" style="font-size: 3rem; transform: scaleX(1); transition: all 0.2s;">✏️</div>
            <div class="ruler-ticks">
              <span>0 cm</span><span>2 cm</span><span>4 cm</span><span>6 cm</span><span>8 cm</span><span>10 cm</span><span>12 cm</span>
            </div>
            <input type="range" id="ruler-slider" class="ruler-slider" min="2" max="12" value="6" step="1">
            <p><strong>Longitud del lápiz:</strong> <span id="ruler-value-text" style="color:#0284c7; font-size:1.2rem;">6 centímetros</span> (<span id="ruler-mm-text">60 mm</span>)</p>
          </div>
        `;
      case "operaciones":
        return `
          <div class="widget-title">🍎 Repartir manzanas (Multiplicación y División)</div>
          <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin: 12px 0;">
            <button class="btn-secondary" id="btn-calc-sub" style="padding: 6px 14px;">-</button>
            <span id="apple-count-display" style="font-size: 1.5rem; font-weight: 800; color: #15803d;">6 Manzanas</span>
            <button class="btn-secondary" id="btn-calc-add" style="padding: 6px 14px;">+</button>
          </div>
          <div id="apples-visual-area" style="font-size: 2rem; min-height: 48px; letter-spacing: 4px;">🍎🍎🍎🍎🍎🍎</div>
          <p style="margin-top: 10px; font-weight: 700; color: #166534;" id="division-explanation">
            Si las repartimos entre 2 niños, ¡a cada uno le tocan 3 manzanas! (6 ÷ 2 = 3)
          </p>
        `;
      case "geometria":
        return `
          <div class="widget-title">📐 Calculadora Visual de Perímetro y Área</div>
          <div style="display:flex; justify-content:center; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
            <button class="btn-secondary active" id="btn-shape-square" style="padding:6px 12px;" onclick="app.setShape('square')">Cuadrado</button>
            <button class="btn-secondary" id="btn-shape-rect" style="padding:6px 12px;" onclick="app.setShape('rect')">Rectángulo</button>
          </div>
          <div id="shape-visual-box" style="width: 100px; height: 100px; background: #e9d5ff; border: 3px solid #8b5cf6; margin: 0 auto 14px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #5b21b6; transition: all 0.3s;">
            4 cm
          </div>
          <input type="range" id="shape-slider" class="ruler-slider" min="2" max="10" value="4">
          <p style="margin-top: 10px; font-weight: 700;">
            Lado: <span id="shape-side-val">4</span> cm | 
            <span style="color: #0284c7;">Perímetro (4 lados): <strong id="shape-peri-val">16 cm</strong></span> | 
            <span style="color: #10b981;">Área: <strong id="shape-area-val">16 cm²</strong></span>
          </p>
        `;
      case "calculo-mental":
        return `
          <div class="widget-title">🍕 Rebanadas de Pizza y Fracciones Equivalentes</div>
          <div class="pizza-container">
            <div style="font-size: 4rem;">🍕</div>
            <div style="text-align: left;">
              <p style="font-size: 1.2rem; font-weight: 800; color: #0284c7;" id="fraction-text">1/2 de la pizza = 0.5 (Mitad)</p>
              <p style="color: #475569; font-weight: 600;" id="fraction-equiv">Es equivalente a <strong>2/4</strong> y <strong>4/8</strong>.</p>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; justify-content: center; gap: 10px;">
            <button class="btn-secondary" onclick="app.setFractionDisplay('1/4', 0.25, 'Un cuarto')">1/4 (25%)</button>
            <button class="btn-secondary" onclick="app.setFractionDisplay('1/2', 0.5, 'La mitad')">1/2 (50%)</button>
            <button class="btn-secondary" onclick="app.setFractionDisplay('3/4', 0.75, 'Tres cuartos')">3/4 (75%)</button>
          </div>
        `;
      case "algebra":
        return `
          <div class="widget-title">⚖️ La Balanza del Álgebra: Descubre el secreto de x</div>
          <p style="color: #475569; margin-bottom: 12px; font-weight: 600;">Ecuación: <strong>x + 5 = 12</strong></p>
          <div class="balance-container">
            <div class="mystery-box" id="mystery-box-x">x</div>
            <span>+</span>
            <span style="background: #fef08a; padding: 10px 16px; border-radius: 12px; border: 2px solid #eab308;">5</span>
            <span style="font-size: 2rem;">=</span>
            <span style="background: #bbf7d0; padding: 10px 16px; border-radius: 12px; border: 2px solid #22c55e;">12</span>
          </div>
          <div style="margin-top: 18px;">
            <button class="btn-primary-blue" id="btn-reveal-x" style="padding: 8px 18px; font-size: 0.95rem;">
              🔍 Restar 5 a ambos lados para descubrir x
            </button>
            <p id="algebra-reveal-text" style="margin-top: 10px; font-weight: 800; color: #166534; display: none;">
              ¡Genial! x = 12 - 5 = <strong>7</strong>. Comprobación: 7 + 5 = 12 ✔️
            </p>
          </div>
        `;
      default:
        return `
          <div class="widget-title">📊 Reto de Pensamiento Matemático</div>
          <p>Lee con atención cada ejemplo para aplicar tus habilidades en el cuestionario interactivo.</p>
        `;
    }
  }

  // Conectar los controles del widget interactivo según el tema (regla, pizza, figuras...)
  attachWidgetListeners(topic) {
    if (topic.id === "medicion") {
      const slider = document.getElementById("ruler-slider");
      const valText = document.getElementById("ruler-value-text");
      const mmText = document.getElementById("ruler-mm-text");
      const obj = document.getElementById("measured-object");
      if (slider) {
        slider.addEventListener("input", (e) => {
          const val = e.target.value;
          valText.textContent = `${val} centímetros`;
          mmText.textContent = `${val * 10} mm`;
          obj.style.transform = `scaleX(${0.5 + val * 0.1})`;
        });
      }
    } else if (topic.id === "operaciones") {
      let apples = 6;
      const display = document.getElementById("apple-count-display");
      const visual = document.getElementById("apples-visual-area");
      const expl = document.getElementById("division-explanation");

      const updateApples = () => {
        display.textContent = `${apples} Manzanas`;
        visual.textContent = "🍎".repeat(apples);
        expl.textContent = `Si las repartimos entre 2 niños, ¡a cada uno le tocan ${apples / 2} manzanas! (${apples} ÷ 2 = ${apples / 2})`;
      };

      document.getElementById("btn-calc-sub")?.addEventListener("click", () => {
        if (apples > 2) { apples -= 2; updateApples(); sound.playClick(); }
      });
      document.getElementById("btn-calc-add")?.addEventListener("click", () => {
        if (apples < 12) { apples += 2; updateApples(); sound.playClick(); }
      });
    } else if (topic.id === "geometria") {
      const slider = document.getElementById("shape-slider");
      const box = document.getElementById("shape-visual-box");
      const sideVal = document.getElementById("shape-side-val");
      const periVal = document.getElementById("shape-peri-val");
      const areaVal = document.getElementById("shape-area-val");

      if (slider) {
        slider.addEventListener("input", (e) => {
          const s = parseInt(e.target.value);
          box.style.width = `${s * 20}px`;
          box.style.height = `${s * 20}px`;
          box.textContent = `${s} cm`;
          sideVal.textContent = s;
          periVal.textContent = `${s * 4} cm`;
          areaVal.textContent = `${s * s} cm²`;
        });
      }
    } else if (topic.id === "algebra") {
      const btnReveal = document.getElementById("btn-reveal-x");
      const textReveal = document.getElementById("algebra-reveal-text");
      const boxX = document.getElementById("mystery-box-x");

      btnReveal?.addEventListener("click", () => {
        sound.playCorrect();
        boxX.textContent = "7";
        boxX.style.background = "#22c55e";
        textReveal.style.display = "block";
      });
    }
  }

  // Widget de fracciones: cambiar la equivalencia que se muestra
  setFractionDisplay(fraction, decimal, label) {
    sound.playClick();
    const text = document.getElementById("fraction-text");
    if (text) {
      text.textContent = `${fraction} de la pizza = ${decimal} (${label})`;
    }
    // Update equivalence text per fraction
    const equiv = document.getElementById("fraction-equiv");
    if (equiv) {
      switch(fraction) {
        case "1/2":
          equiv.textContent = "Es equivalente a 2/4 y 4/8";
          break;
        case "1/4":
          equiv.textContent = "Es equivalente a 2/8";
          break;
        case "3/4":
          equiv.textContent = "Es equivalente a 6/8";
          break;
        default:
          equiv.textContent = "";
      }
    }
  }

  // Bloqueo Modo Invitado: puede ver todas las opciones, pero jugar requiere perfil
  requireProfile() {
    if (this.user.guest) {
      alert("👀 Estás en Modo Invitado: puedes ver todas las opciones, pero para jugar debes crear tu perfil.");
      // Precargar el grado actual en el selector antes de abrir el modal
      const gradeSelect = document.getElementById('select-student-grade');
      if (gradeSelect && this.user.grade) {
        // Seleccionar la opción que corresponda al grado actual
        const options = gradeSelect.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === this.user.grade) {
            options.selectedIndex = i;
            break;
          }
        }
      }
      this.openModal("modal-user-welcome");
      return false;
    }
    return true;
  }

  // Iniciar Cuestionario / Reto Práctico (Paso 5 del diagrama)
  // practice = true -> Modo Práctica: no da XP, no cuenta en el ranking y permite
  // repetir retos ya superados (ideal para entrenar sin presión).
  startQuiz(practice = false) {
    if (!this.requireProfile()) return;
    if (!this.currentTopic) return;

    this.practiceMode = !!practice;

    // Protección adicional: un reto ya superado no se puede repetir
    // (en modo práctica sí se puede, para entrenar sin límite)
    if (!this.practiceMode && this.user.completedTopics.includes(this.currentTopic.id)) {
      alert("✅ Ya superaste este reto. ¡Elige otro tema para seguir avanzando!");
      return;
    }

    sound.playClick();
    clearTimeout(this.autoAdvanceTimer);
    this.autoAdvanceTimer = null;
    this.currentQuestionIndex = 0;
    this.quizAnswers = [];
    this.quizStreak = 0;
    this.quizPhase = "round1";
    this.reviewQueue = [];
    this.reviewPos = 0;
    this.fixedInReview = new Set();

    // La racha de días se marca al empezar a practicar (no en resultados,
    // para premiar aunque abandone) 
    this.markPracticedToday();
    // Asegurar que el aviso de repaso esté oculto al iniciar
    const banner = document.getElementById("review-intro-banner");
    const card = document.getElementById("quiz-question-card");
    if (banner) banner.style.display = "none";
    if (card) card.style.display = "block";

    this.showView("view-quiz");
    this.renderCurrentQuestion();
    this.renderQuizStreak();

    // Aviso visible del Modo Práctica
    const practiceBadge = document.getElementById("practice-badge");
    if (practiceBadge) practiceBadge.style.display = this.practiceMode ? "inline-block" : "none";
  }

  // Índice real de la pregunta que se está mostrando (ronda 1 o repaso)
  currentQuizQuestionIndex() {
    return this.quizPhase === "review"
      ? this.reviewQueue[this.reviewPos]
      : this.currentQuestionIndex;
  }

  // Aviso antes de entrar al repaso de errores
  showReviewIntro() {
    const n = this.reviewQueue.length;
    const banner = document.getElementById("review-intro-banner");
    const text = document.getElementById("review-intro-text");
    const card = document.getElementById("quiz-question-card");
    if (text) {
      text.textContent = `Fallaste ${n} ${n === 1 ? "pregunta" : "preguntas"} en la primera ronda. Vamos a repasarlas: si las aciertas ahora, contarán para tu puntaje final. ¡Tú puedes!`;
    }
    if (banner) banner.style.display = "block";
    if (card) card.style.display = "none";
    document.getElementById("quiz-topic-title").textContent = `📝 Repaso: ${this.currentTopic.title}`;
    document.getElementById("quiz-progress-text").textContent = `Repaso de ${n} ${n === 1 ? "pregunta" : "preguntas"}`;
    document.getElementById("quiz-progress-fill").style.width = "0%";
    // Conectar el botón (se clona para evitar listeners duplicados)
    const btn = document.getElementById("btn-start-review");
    if (btn) {
      const fresh = btn.cloneNode(true);
      btn.parentNode.replaceChild(fresh, btn);
      fresh.addEventListener("click", () => {
        sound.playClick();
        this.beginReview();
      });
    }
  }

  beginReview() {
    const banner = document.getElementById("review-intro-banner");
    const card = document.getElementById("quiz-question-card");
    if (banner) banner.style.display = "none";
    if (card) card.style.display = "block";
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    // Asegurar visibilidad correcta (por si venimos del aviso de repaso)
    const banner = document.getElementById("review-intro-banner");
    const card = document.getElementById("quiz-question-card");
    if (banner) banner.style.display = "none";
    if (card) card.style.display = "block";

    const topic = this.currentTopic;
    const qIndex = this.currentQuizQuestionIndex();
    const q = topic.quiz[qIndex];
    const totalQ = topic.quiz.length;
    const isReview = this.quizPhase === "review";

    document.getElementById("quiz-topic-title").textContent = isReview
      ? `${topic.icon} Repaso: ${topic.title}`
      : `${topic.icon} Reto: ${topic.title}`;

    if (isReview) {
      document.getElementById("quiz-progress-text").textContent = `📝 Repaso ${this.reviewPos + 1} de ${this.reviewQueue.length} (solo las que fallaste)`;
      document.getElementById("quiz-progress-fill").style.width = `${((this.reviewPos + 1) / this.reviewQueue.length) * 100}%`;
    } else {
      document.getElementById("quiz-progress-text").textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${totalQ}`;
      document.getElementById("quiz-progress-fill").style.width = `${((this.currentQuestionIndex + 1) / totalQ) * 100}%`;
    }

    const badgeEl = document.querySelector("#view-quiz .question-badge");
    if (badgeEl) {
      badgeEl.textContent = isReview ? "📝 Repaso de errores" : "Pregunta Interactiva";
    }

    document.getElementById("question-title-text").textContent = q.question;

    const optionsContainer = document.getElementById("options-grid");
    const feedbackBox = document.getElementById("quiz-feedback-box");
    const nextBtn = document.getElementById("quiz-next-btn");

    feedbackBox.className = "quiz-feedback-box";
    feedbackBox.innerHTML = "";
    nextBtn.style.display = "none";

    const letters = ["A", "B", "C", "D"];
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
      <button class="option-btn" data-index="${idx}">
        <span class="option-letter">${letters[idx]}</span>
        <span>${opt}</span>
      </button>
    `).join("");

    optionsContainer.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const selectedIdx = parseInt(btn.getAttribute("data-index"));
        this.selectAnswer(selectedIdx);
      });
    });
  }

  // Verificar respuesta.
  // Ronda 1: si falla, la pregunta se anota y SALTA SOLA a la siguiente.
  // Repaso final: solo las preguntas falladas, con reintento hasta acertar.
  selectAnswer(selectedIdx) {
    const qIndex = this.currentQuizQuestionIndex();
    const q = this.currentTopic.quiz[qIndex];
    const isCorrect = selectedIdx === q.correctIndex;
    const isReview = this.quizPhase === "review";
    const isFirstAttempt = !isReview && this.quizAnswers.length === this.currentQuestionIndex;

    if (isFirstAttempt) {
      this.quizAnswers.push({
        index: qIndex,
        question: q.question,
        selectedText: q.options[selectedIdx],
        correctText: q.options[q.correctIndex],
        hint: q.hint,
        explanation: q.explanation,
        isCorrect: isCorrect
      });
    }

    const buttons = document.querySelectorAll(".option-btn");
    const feedbackBox = document.getElementById("quiz-feedback-box");
    const nextBtn = document.getElementById("quiz-next-btn");

    if (isCorrect) {
      sound.playCorrect();
      this.quizStreak++;
      this.renderQuizStreak();
      buttons.forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.correctIndex) {
          b.classList.add("correct");
        }
      });

      // Guardar la mejor racha históricamente en el perfil
      const isNewRecord = this.quizStreak > (this.user.bestStreak || 0);
      if (isNewRecord) {
        this.user.bestStreak = this.quizStreak;
        this.saveUserData();
      }

      // En el repaso, la pregunta reparada cuenta para el puntaje final
      if (isReview) this.fixedInReview.add(qIndex);

      feedbackBox.className = "quiz-feedback-box correct show";
      if (isReview) {
        feedbackBox.innerHTML = `<strong>¡Reparado! ✅</strong> ${q.explanation} <em>Ya la sabes: cuenta para tu puntaje final.</em>`;
      } else {
        feedbackBox.innerHTML = isFirstAttempt
          ? `<strong>¡Muy bien! 🎉</strong> ${q.explanation}`
          : `<strong>¡Ahora sí lo logras! 🎉</strong> ${q.explanation}`;
      }
      if (isNewRecord) {
        feedbackBox.insertAdjacentHTML("beforeend", `<div class="streak-record-note">🔥 ¡Nuevo récord de racha: ${this.quizStreak} aciertos seguidos!</div>`);
      }

      nextBtn.style.display = "inline-block";
      const isLast = isReview
        ? this.reviewPos === this.reviewQueue.length - 1
        : this.currentQuestionIndex === this.currentTopic.quiz.length - 1;
      nextBtn.textContent = isLast
        ? "Ver Resultados Finales ⭐"
        : (isReview ? "Siguiente del repaso ➡️" : "Siguiente Pregunta ➡️");
    } else {
      sound.playIncorrect();
      this.quizStreak = 0; // La racha se rompe con cualquier error
      this.renderQuizStreak();

      if (isReview) {
        // Repaso: se queda en la pregunta con pista y botón de reintentar
        buttons.forEach((b, idx) => {
          if (idx === selectedIdx) {
            b.disabled = true;
            b.classList.add("incorrect");
          }
        });

        const mensajesAliento = [
          "¡Ánimo! Sigue intentando, lo vas a lograr.",
          "¡Tú puedes! Prueba con otra respuesta.",
          "¡No te rindas! Cada intento te acerca más a la respuesta correcta.",
          "¡Vamos! Intenta de nuevo, seguro aciertas la próxima."
        ];
        const aliento = mensajesAliento[Math.floor(Math.random() * mensajesAliento.length)];
        feedbackBox.className = "quiz-feedback-box incorrect show";
        feedbackBox.innerHTML = `<strong>¡Casi lo logras! 💡</strong> Pista: ${q.hint}<br><em> ${aliento}</em><button class="btn-retry-question" id="btn-retry-question">🔁 Reintentar pregunta</button>`;

        const retryBtn = feedbackBox.querySelector("#btn-retry-question");
        retryBtn?.addEventListener("click", () => {
          sound.playClick();
          this.renderCurrentQuestion();
        });

        nextBtn.style.display = "none";
        return;
      }

      // Ronda 1: se anota como fallada y salta automáticamente (sin atascarse)
      this.reviewQueue.push(qIndex);
      buttons.forEach(b => { b.disabled = true; });
      buttons[selectedIdx]?.classList.add("incorrect");

      const mensajesAlientoRonda1 = [
        "¡Ánimo! No importa, seguimos con la siguiente.",
        "¡Tú puedes! La repasaremos al final.",
        "¡No te preocupes! Vamos con la siguiente pregunta.",
        "¡Ánimo! La volveremos a ver en el repaso final."
      ];
      const alientoR1 = mensajesAlientoRonda1[Math.floor(Math.random() * mensajesAlientoRonda1.length)];
      feedbackBox.className = "quiz-feedback-box incorrect show";
      feedbackBox.innerHTML = `<strong>¡Casi lo logras! 💡</strong> Pista: ${q.hint}<br><em>📝 Quedó anotada: la volverás a ver en el repaso final. ${alientoR1}</em>`;

      nextBtn.style.display = "none";

      // Salto automático: espera un momento para leer la pista y avanza
      clearTimeout(this.autoAdvanceTimer);
      const expectedIndex = this.currentQuestionIndex;
      this.autoAdvanceTimer = setTimeout(() => {
        this.autoAdvanceTimer = null;
        const quizView = document.getElementById("view-quiz");
        if (this.quizPhase === "round1" &&
            this.currentQuestionIndex === expectedIndex &&
            quizView?.classList.contains("active")) {
          this.nextQuestion();
        }
      }, 2200);
    }
  }

  nextQuestion() {
    sound.playClick();
    clearTimeout(this.autoAdvanceTimer);
    this.autoAdvanceTimer = null;

    if (this.quizPhase === "review") {
      this.reviewPos++;
      if (this.reviewPos >= this.reviewQueue.length) {
        this.evaluateQuizResults();
      } else {
        this.renderCurrentQuestion();
      }
      return;
    }

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.currentTopic.quiz.length) {
      this.renderCurrentQuestion();
    } else if (this.reviewQueue.length > 0) {
      // Terminó la ronda 1 y hubo fallos: mostrar aviso y pasar al repaso
      this.quizPhase = "review";
      this.reviewPos = 0;
      this.showReviewIntro();
    } else {
      this.evaluateQuizResults();
    }
  }

  // ¿Aprobó? Evaluación y Ramas del Diagrama de Flujo
  // Puntaje final: aciertos de la ronda 1 + preguntas reparadas en el repaso.
  evaluateQuizResults() {
    clearTimeout(this.autoAdvanceTimer);
    this.autoAdvanceTimer = null;
    // Ocultar aviso de repaso si estuviera visible
    const banner = document.getElementById("review-intro-banner");
    const card = document.getElementById("quiz-question-card");
    if (banner) banner.style.display = "none";
    if (card) card.style.display = "block";

    const total = this.quizAnswers.length;
    const round1Correct = this.quizAnswers.filter(a => a.isCorrect).length;
    const reviewedFixed = this.fixedInReview.size;
    const correctCount = Math.min(round1Correct + reviewedFixed, total);
    const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = scorePercent >= 70; // Criterio de aprobación del diagrama

    // MODO PRÁCTICA: no cuenta para nada (ni historial, ni XP, ni ranking)
    if (!this.practiceMode) {
      // Guardar en el historial (con el grado escolar vigente al momento del intento)
      this.user.history.push({
        topicId: this.currentTopic.id,
        topicTitle: this.currentTopic.title,
        score: scorePercent,
        date: new Date().toLocaleDateString(),
        passed: passed,
        grade: this.user.grade
      });
    }

    const iconEl = document.getElementById("results-status-icon");
    const titleEl = document.getElementById("results-status-title");
    const scoreEl = document.getElementById("results-score-percent");
    const msgEl = document.getElementById("results-status-message");
    const approvedActions = document.getElementById("results-approved-actions");
    const failedActions = document.getElementById("results-failed-actions");
    const errorsSection = document.getElementById("errors-breakdown-section");

    scoreEl.textContent = `${scorePercent}% (${correctCount} de ${total})`;

    if (passed) {
      // Rama: SÍ APROBÓ
      sound.playVictory();
      this.launchConfetti();
      iconEl.textContent = "🏆";
      titleEl.textContent = this.practiceMode
        ? "¡Entrenamiento completado! 🎓"
        : "¡Felicidades! ¡Aprobaste!";
      msgEl.textContent = this.practiceMode
        ? `¡Buen trabajo! Repasaste el tema de ${this.currentTopic.title} (${scorePercent}%). En Modo Práctica no suman XP ni cuentan para el ranking: ¡entrena con libertad!`
        : `¡Buen trabajo! Ya te sabes el tema de ${this.currentTopic.title}.` +
          (reviewedFixed > 0
            ? ` Repasaste ${reviewedFixed} ${reviewedFixed === 1 ? "pregunta" : "preguntas"} y ahora las sabes todas.`
            : " ¡Y todo a la primera!") +
          ` Sumaste +100 XP a tu perfil.`;

      // En Modo Práctica NO se otorgan XP, nivel ni insignias (solo entrenamiento)
      if (!this.practiceMode) {
        // Otorgar recompensas: XP, nivel e insignias desbloqueadas
        const previousLevel = this.user.level;
        this.user.xp += 100;
        this.user.level = Math.floor(this.user.xp / 100) + 1;
        this.checkLevelUp(previousLevel);
        if (!this.user.completedTopics.includes(this.currentTopic.id)) {
          this.user.completedTopics.push(this.currentTopic.id);
        }
        this.saveUserData();
        this.renderTopics();

        // Mostrar en pantalla a qué nivel se llego tras subir
        const levelBanner = document.getElementById("level-up-banner");
        if (levelBanner) {
          if (this.user.level > previousLevel) {
            levelBanner.textContent = `🌟 ¡Subiste al Nivel ${this.user.level}! Sumaste +100 XP y desbloqueaste una insignia nueva.`;
            levelBanner.style.display = "inline-block";
          } else {
            levelBanner.style.display = "none";
          }
        }

        // Refrescar la barra de nivel del header ahora mismo
        this.updateUserHeader();

        // Publicar puntaje en el ranking global (nube), si esta configurado
        this.submitScoreToRanking(scorePercent);
      } else {
        // En práctica: ocultar banner de nivel y refrescar el header sin cambios
        const levelBanner = document.getElementById("level-up-banner");
        if (levelBanner) levelBanner.style.display = "none";
        this.updateUserHeader();
      }

      approvedActions.style.display = "flex";
      failedActions.style.display = "none";

      // Si hubo fallos en la ronda 1, mostrar el resumen (ya reparados en el repaso)
      if (this.quizAnswers.some(a => !a.isCorrect)) {
        this.renderErrorsAndSuggestions();
        errorsSection.style.display = "block";
      } else {
        errorsSection.style.display = "none";
      }
    } else {
      // Rama: NO APROBÓ -> Mostrar resultados y sugerir estudiar más
      sound.playIncorrect();
      iconEl.textContent = "🌱";
      titleEl.textContent = "¡Buen intento! Cada error te ayuda a aprender";
      msgEl.textContent = this.practiceMode
        ? `Obtuviste ${scorePercent}% en este entrenamiento. Repasa los errores y vuelve a intentarlo cuando quieras: en Modo Práctica no pierdes nada.`
        : `Obtuviste ${scorePercent}%. Para aprobar necesitas al menos un 70%. Mira los errores y los consejos que te dejamos abajo, y vuelve a intentarlo cuando quieras.`;

      // Si no aprobo, no hay subida de nivel: ocultar el banner
      const levelBanner = document.getElementById("level-up-banner");
      if (levelBanner) levelBanner.style.display = "none";

      this.saveUserData();

      approvedActions.style.display = "none";
      failedActions.style.display = "flex";

      // Mostrar errores y dar sugerencias (diagrama de flujo)
      this.renderErrorsAndSuggestions();
      errorsSection.style.display = "block";
    }

    this.showView("view-results");
  }

  renderErrorsAndSuggestions() {
    const list = document.getElementById("errors-list-container");
    const incorrects = this.quizAnswers.filter(a => !a.isCorrect);

    if (incorrects.length === 0) {
      list.innerHTML = "<p>¡No tuviste ningún error!</p>";
      return;
    }

    list.innerHTML = incorrects.map(item => {
      const fixed = this.fixedInReview.has(item.index);
      return `
      <div class="error-item">
        <div class="error-item-question">❓ ${item.question}</div>
        <div class="error-item-answers">
          <span style="color: #dc2626;">❌ Tu respuesta: <strong>${item.selectedText}</strong></span>
          <span style="color: #16a34a;">✔️ Respuesta correcta: <strong>${item.correctText}</strong></span>
        </div>
        ${fixed
          ? `<div class="error-item-suggestion" style="color: #15803d;">✅ <strong>La acertaste en el repaso final:</strong> ¡ya la dominas!</div>`
          : `<div class="error-item-suggestion">💡 <strong>Sugerencia para recordar:</strong> ${item.hint}</div>`}
      </div>
    `;
    }).join("");
  }

  // Efecto de Confeti con Canvas puro
  launchConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6", "#f43f5e"];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 5 + 3,
        angle: Math.random() * 360,
        spin: Math.random() * 10 - 5
      });
    }

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frame++;
      if (frame < 180) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    render();
  }

  // Modales
  openModal(modalId) {
    sound.playClick();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  }

  // Cerrar un modal
  closeModal(modalId) {
    sound.playClick();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  // Configuración de listeners generales
  setupEventListeners() {
    // Botón de siguiente curiosidad
    document.getElementById("btn-next-fact")?.addEventListener("click", () => this.nextFunFact());

    // Consejo del hero: clic o teclado para avanzar
    const heroTips = document.getElementById("hero-tips");
    heroTips?.addEventListener("click", () => this.nextHeroTip(true));
    heroTips?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.nextHeroTip(true);
      }
    });

    // Consejo de resolución del quiz: clic o teclado para avanzar
    const quizTips = document.getElementById("quiz-tips");
    quizTips?.addEventListener("click", () => this.nextQuizTip(true));
    quizTips?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.nextQuizTip(true);
      }
    });

    // Botón comenzar a aprender del Hero
    document.getElementById("btn-hero-start")?.addEventListener("click", () => {
      sound.playClick();
      // Abre el primer tema disponible o el que no esté completado
      const firstUncompleted = APP_DATA.topics.find(t => !this.user.completedTopics.includes(t.id)) || APP_DATA.topics[0];
      this.openTopicLesson(firstUncompleted.id);
    });

    // Botones de lección y cuestionario
    document.getElementById("btn-lesson-back")?.addEventListener("click", () => {
      sound.playClick();
      this.showView("view-dashboard");
    });

    document.getElementById("btn-lesson-start-quiz")?.addEventListener("click", () => {
      this.startQuiz(false);
    });

    // Modo Práctica: mismo reto pero sin XP, sin ranking y sin bloquearse
    document.getElementById("btn-lesson-practice")?.addEventListener("click", () => {
      this.startQuiz(true);
    });

    document.getElementById("quiz-next-btn")?.addEventListener("click", () => {
      this.nextQuestion();
    });

    document.getElementById("btn-quiz-abandon")?.addEventListener("click", () => {
      if (confirm("¿Quieres salir del cuestionario? Tu progreso en este intento no se guardará.")) {
        sound.playClick();
        this.showView("view-dashboard");
      }
    });

    // Acciones de Resultados
    document.getElementById("btn-another-topic")?.addEventListener("click", () => {
      sound.playClick();
      this.showView("view-dashboard");
      document.getElementById("topics-section-container")?.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("btn-results-home")?.addEventListener("click", () => {
      sound.playClick();
      this.showView("view-dashboard");
    });

    document.getElementById("btn-retry-quiz")?.addEventListener("click", () => {
      sound.playClick();
      // Mantiene el modo (práctica o reto real) en el que se terminó el intento
      this.startQuiz(this.practiceMode);
    });

    document.getElementById("btn-study-lesson-again")?.addEventListener("click", () => {
      sound.playClick();
      this.openTopicLesson(this.currentTopic.id);
    });

    document.getElementById("btn-save-attempt-home")?.addEventListener("click", () => {
      sound.playClick();
      this.showView("view-dashboard");
    });

    // Header buttons (Menú hamburguesa, Perfil)
    document.getElementById("btn-hamburger-menu")?.addEventListener("click", () => {
      this.openModal("modal-menu-credits");
      this.renderRanking();
    });

    // Boton de actualizar el ranking global
    document.getElementById("btn-refresh-ranking")?.addEventListener("click", () => {
      sound.playClick();
      this.renderRanking();
    });

    // ======================================================================
    //  PRIVACIDAD Y USO (política de privacidad)
    // ======================================================================

    // Abrir la política desde el menú lateral
    document.getElementById("btn-open-privacy-menu")?.addEventListener("click", () => {
      this.openPrivacyModal();
    });

    // Abrir la política desde el modal de cookies
    document.getElementById("btn-cookies-open-privacy")?.addEventListener("click", () => {
      this.closeModal("modal-cookies");
      this.openPrivacyModal();
    });

    // Cerrar el modal de privacidad
    document.getElementById("btn-privacy-close")?.addEventListener("click", () => {
      this.closeModal("modal-privacy");
    });

    // Ver el texto completo de la política (archivo POLITICA.md del repositorio)
    document.getElementById("btn-open-policy")?.addEventListener("click", () => {
      sound.playClick();
      window.open(PRIVACY_POLICY_URL, "_blank", "noopener");
    });

    // Interruptor: mostrar el apodo real en el ranking
    document.getElementById("chk-show-name-ranking")?.addEventListener("change", (e) => {
      this.user.showNameInRanking = e.target.checked;
      this.saveUserData();
      this.updatePrivacyStatus();
      // Si ya estamos en el ranking, actualizamos nuestra fila al instante
      if (e.target.checked) {
        this.submitScoreToRanking(this.lastScorePercent || 0);
      }
    });

    // Interruptor: no aparecer en el ranking global
    document.getElementById("chk-ranking-optout")?.addEventListener("change", (e) => {
      this.user.rankingOptOut = e.target.checked;
      this.saveUserData();
      this.updatePrivacyStatus();
      if (e.target.checked) {
        // Si estaba en el ranking, se borra su fila de la nube
        this.deleteRankingRecord().then(() => this.updatePrivacyStatus());
      }
    });

    // Borrar mi registro del ranking (derecho de supresión)
    document.getElementById("btn-delete-ranking-record")?.addEventListener("click", () => {
      this.confirmDeleteRankingRecord();
    });

    document.getElementById("btn-cookies-delete-ranking")?.addEventListener("click", () => {
      this.confirmDeleteRankingRecord();
    });

    document.getElementById("header-user-btn")?.addEventListener("click", () => {
      this.renderProfileStats();
      this.openModal("modal-user-profile");
    });

    // Barra de Nivel (header) -> Estadísticas de conocimiento por grado
    const openLevelStats = () => {
      document.getElementById("level-stats-title").textContent = `Nivel ${this.user.level}`;
      document.getElementById("level-stats-xp").textContent = `${this.user.xp} XP`;
      document.getElementById("level-stats-topics").textContent = `${this.user.completedTopics.length} de ${APP_DATA.topics.length}`;
      document.getElementById("level-stats-streak").textContent = `${this.user.bestStreak || 0} aciertos`;
      const days = this.user.dailyStreak || 0;
      const dayStreakEl = document.getElementById("level-stats-day-streak");
      if (dayStreakEl) {
        dayStreakEl.textContent = days > 0
          ? `${days} ${days === 1 ? "día" : "días"} seguidos`
          : "Aún no hay racha: practica hoy";
      }
      this.renderGradeStats("level-grade-stats");
      this.renderRewards();
      this.openModal("modal-level-stats");
    };
    document.getElementById("level-badge")?.addEventListener("click", openLevelStats);
    document.getElementById("level-badge")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLevelStats();
      }
    });

    // Selector de grado escolar
    document.getElementById("dashboard-grade-btn")?.addEventListener("click", () => {
      // Precargar el grado actual en el selector antes de abrir el modal
      const gradeSelect = document.getElementById('select-student-grade');
      if (gradeSelect && this.user.grade) {
        // Seleccionar la opción que corresponda al grado actual
        const options = gradeSelect.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === this.user.grade) {
            options.selectedIndex = i;
            break;
          }
        }
      } else if (gradeSelect) {
        // Si no hay grado guardado, mantener el seleccionado actual (no resetear)
        // El grado actual ya está reflejado en el span dashboard-grade-text
      }
      this.openModal("modal-user-welcome");
    });

    // Formulario de bienvenida / perfil
    const avatarBtns = document.querySelectorAll(".avatar-choice");
    let chosenAvatar = this.user.avatar || "🦕";

    avatarBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playClick();
        avatarBtns.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        chosenAvatar = btn.getAttribute("data-avatar");
      });
    });

    document.getElementById("btn-save-profile")?.addEventListener("click", () => {
      const nameInput = document.getElementById("input-student-name");
      const gradeSelect = document.getElementById("select-student-grade");

      if (nameInput && nameInput.value.trim()) {
        this.user.name = nameInput.value.trim();
      }
      if (gradeSelect) {
        this.user.grade = gradeSelect.value;
      }
      this.user.avatar = chosenAvatar;
      this.user.guest = false;

      this.saveUserData();
      localStorage.setItem("matematica_basica_visited", "true");
      this.closeModal("modal-user-welcome");
      sound.playCorrect();
    });

    // Continuar como invitado (solo navegación/visualización)
    document.getElementById("btn-guest-mode")?.addEventListener("click", () => {
      this.user.name = "Invitado Curioso";
      this.user.avatar = "⭐";
      this.user.guest = true;
      this.saveUserData();
      localStorage.setItem("matematica_basica_visited", "true");
      this.closeModal("modal-user-welcome");
      sound.playClick();
      alert("👋 Modo Invitado activado: puedes explorar todas las opciones, pero para jugar crea tu perfil.");
    });

    // Toggle de sonido
    document.getElementById("btn-toggle-sound")?.addEventListener("click", () => {
      const isEnabled = sound.toggle();
      const statusText = document.getElementById("sound-status-text");
      if (statusText) statusText.textContent = isEnabled ? "Sonido: Activado 🔊" : "Sonido: Silenciado 🔇";
      sound.playClick();
    });

    // Política y Banner de Cookies
    document.getElementById("btn-cookie-accept")?.addEventListener("click", () => {
      this.acceptCookies();
    });

    document.getElementById("btn-cookie-info")?.addEventListener("click", () => {
      sound.playClick();
      this.openModal("modal-cookies");
    });

    document.getElementById("btn-open-cookies-menu")?.addEventListener("click", () => {
      this.closeModal("modal-menu-credits");
      this.openModal("modal-cookies");
    });

    document.getElementById("btn-cookies-accept-modal")?.addEventListener("click", () => {
      this.acceptCookies();
    });

    document.getElementById("btn-cookies-clear-data")?.addEventListener("click", () => {
      this.clearAllData();
    });
  }

  // MODAL PERFIL: datos del niño, racha, racha de días e últimos intentos
  renderProfileStats() {
    document.getElementById("profile-display-avatar").textContent = this.user.avatar;
    document.getElementById("profile-display-name").textContent = this.user.name;
    document.getElementById("profile-display-grade").textContent = this.user.grade;
    document.getElementById("profile-display-level").textContent = `Nivel ${this.user.level}`;
    document.getElementById("profile-display-xp").textContent = `${this.user.xp} XP`;
    document.getElementById("profile-completed-count").textContent = `${this.user.completedTopics.length} de ${APP_DATA.topics.length}`;
    document.getElementById("profile-best-streak").textContent = `${this.user.bestStreak || 0} aciertos`;

    const dayStreak = this.user.dailyStreak || 0;
    const profileDayStreak = document.getElementById("profile-day-streak");
    if (profileDayStreak) {
      profileDayStreak.textContent = dayStreak > 0
        ? `${dayStreak} ${dayStreak === 1 ? "día" : "días"} seguidos`
        : "Practica hoy para empezar";
    }

    const historyContainer = document.getElementById("profile-history-list");
    if (historyContainer) {
      if (this.user.history.length === 0) {
        historyContainer.innerHTML = "<p style='color:#64748b;'>Aún no has realizado ningún cuestionario. ¡Elige un tema para empezar!</p>";
      } else {
        historyContainer.innerHTML = this.user.history.slice(-5).reverse().map(h => `
          <div style="display:flex; justify-content:space-between; padding:8px 12px; background:#f8fafc; border-radius:8px; margin-bottom:6px; font-size:0.9rem;">
            <span>${h.passed ? "⭐" : "🌱"} ${h.topicTitle}</span>
            <strong>${h.score}% (${h.passed ? "Aprobado" : "Intento"})</strong>
          </div>
        `).join("");
      }
    }

    this.renderGradeStats();
  }

  // Estadísticas de conocimiento: promedio de aciertos por grado escolar
  // containerId permite renderizar en el modal de Perfil o en el de Nivel
  renderGradeStats(containerId = "profile-grade-stats") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const grades = ["1º Primaria", "2º Primaria", "3º Primaria", "4º Primaria", "5º Primaria", "6º Primaria"];

    // Agrupar puntajes por grado (los intentos antiguos sin grado usan el actual)
    const scoresByGrade = {};
    this.user.history.forEach(h => {
      const grade = h.grade || this.user.grade;
      if (!scoresByGrade[grade]) scoresByGrade[grade] = [];
      scoresByGrade[grade].push(h.score);
    });

    container.innerHTML = grades.map(g => {
      const scores = scoresByGrade[g] || [];

      // Grados sin intentos -> "Sin datos"
      if (scores.length === 0) {
        return `
          <div class="grade-stat-item">
            <span class="grade-stat-label">${g}</span>
            <div class="grade-stat-bar">
              <div class="grade-stat-fill" style="width: 0%; background: #cbd5e1;"></div>
            </div>
            <span class="grade-stat-value">Sin datos</span>
          </div>`;
      }

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      const color = avg >= 70 ? "#10b981" : avg >= 50 ? "#f59e0b" : "#ef4444";

      return `
        <div class="grade-stat-item">
          <span class="grade-stat-label">${g}</span>
          <div class="grade-stat-bar">
            <div class="grade-stat-fill" style="width: ${avg}%; background: ${color};"></div>
          </div>
          <span class="grade-stat-value" style="color: ${color};">${avg}%</span>
        </div>`;
    }).join("");
  }
}

// Iniciar aplicación al cargar el DOM
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new MathApp();
});
// Force rebuild mar 10 nov 2026 18:10:55 CST
