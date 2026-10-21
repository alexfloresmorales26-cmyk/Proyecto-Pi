/**
 * APP.JS - Lógica principal de "Matemática Básica"
 * Implementación estricta del Diagrama de Flujo (Pág. 9) y Diseño (Pág. 10)
 */

class MathApp {
  constructor() {
    this.user = {
      name: "Pequeño Matemático",
      avatar: "🦕",
      grade: "1º Primaria",
      level: 1,
      xp: 40,
      completedTopics: [],
      history: []
    };

    this.currentTopic = null;
    this.currentQuestionIndex = 0;
    this.quizAnswers = []; // { questionId, selectedIndex, isCorrect }
    this.currentFactIndex = 0;

    this.init();
  }

  init() {
    this.loadUserData();
    this.renderTopics();
    this.renderFunFact();
    this.updateUserHeader();
    this.setupEventListeners();
    this.checkFirstVisit();
    this.checkCookieConsent();
  }

  // Cargar datos de usuario guardados
  loadUserData() {
    const saved = localStorage.getItem("matematica_basica_user");
    if (saved) {
      try {
        this.user = JSON.parse(saved);
      } catch (e) {
        console.error("Error al cargar usuario", e);
      }
    }
  }

  saveUserData() {
    localStorage.setItem("matematica_basica_user", JSON.stringify(this.user));
    this.updateUserHeader();
  }

  // Verifica si ya es usuario o es la primera vez
  checkFirstVisit() {
    const hasVisited = localStorage.getItem("matematica_basica_visited");
    if (!hasVisited) {
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

  acceptCookies() {
    localStorage.setItem("matematica_basica_cookies_accepted", "true");
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.classList.remove("show");
    this.closeModal("modal-cookies");
    sound.playCorrect();
  }

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
    const levelEl = document.getElementById("header-level-text");
    const xpFillEl = document.getElementById("header-xp-fill");
    const gradeBadge = document.getElementById("dashboard-grade-text");

    if (avatarEl) avatarEl.textContent = this.user.avatar;
    if (nameEl) nameEl.textContent = this.user.name;
    if (levelEl) levelEl.textContent = `Nivel ${this.user.level}`;
    if (xpFillEl) xpFillEl.style.width = `${Math.min(100, (this.user.xp % 100))}%`;
    if (gradeBadge) gradeBadge.textContent = `Grado escolar: ${this.user.grade}`;
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
            ${isCompleted ? "⭐ Completado" : topic.badge}
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

  nextFunFact() {
    sound.playClick();
    this.currentFactIndex = (this.currentFactIndex + 1) % APP_DATA.funFacts.length;
    this.renderFunFact();
  }

  // Navegar entre vistas
  showView(viewId) {
    document.querySelectorAll(".view-section").forEach(v => v.classList.remove("active"));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
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

    // Renderizar puntos clave
    if (keypointsContainer) {
      keypointsContainer.innerHTML = topic.lesson.keyPoints.map(kp => `
        <div class="keypoint-item">
          <h5>${kp.title}</h5>
          <p>${kp.text}</p>
          <div class="keypoint-formula">${kp.formula}</div>
        </div>
      `).join("");
    }

    // Renderizar widget interactivo dinámico según el tema
    if (widgetContainer) {
      widgetContainer.innerHTML = this.getInteractiveWidgetHTML(topic);
      this.attachWidgetListeners(topic);
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
            <button class="btn-secondary active" id="btn-shape-square" style="padding:6px 12px;">Cuadrado</button>
            <button class="btn-secondary" id="btn-shape-rect" style="padding:6px 12px;">Rectángulo</button>
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
              <p style="color: #475569; font-weight: 600;">Es equivalente a <strong>2/4</strong> y <strong>4/8</strong>.</p>
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

  setFractionDisplay(fraction, decimal, label) {
    sound.playClick();
    const text = document.getElementById("fraction-text");
    if (text) {
      text.textContent = `${fraction} de la pizza = ${decimal} (${label})`;
    }
  }

  // Iniciar Cuestionario / Reto Práctico (Paso 5 del diagrama)
  startQuiz() {
    if (!this.currentTopic) return;
    sound.playClick();
    this.currentQuestionIndex = 0;
    this.quizAnswers = [];
    this.showView("view-quiz");
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const topic = this.currentTopic;
    const q = topic.quiz[this.currentQuestionIndex];
    const totalQ = topic.quiz.length;

    document.getElementById("quiz-topic-title").textContent = `${topic.icon} Reto: ${topic.title}`;
    document.getElementById("quiz-progress-text").textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${totalQ}`;
    document.getElementById("quiz-progress-fill").style.width = `${((this.currentQuestionIndex + 1) / totalQ) * 100}%`;

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

  // Verificar respuesta (Paso 6 del diagrama)
  selectAnswer(selectedIdx) {
    const q = this.currentTopic.quiz[this.currentQuestionIndex];
    const isCorrect = selectedIdx === q.correctIndex;

    this.quizAnswers.push({
      question: q.question,
      selectedText: q.options[selectedIdx],
      correctText: q.options[q.correctIndex],
      hint: q.hint,
      explanation: q.explanation,
      isCorrect: isCorrect
    });

    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.correctIndex) {
        b.classList.add("correct");
      } else if (idx === selectedIdx && !isCorrect) {
        b.classList.add("incorrect");
      }
    });

    const feedbackBox = document.getElementById("quiz-feedback-box");
    const nextBtn = document.getElementById("quiz-next-btn");

    if (isCorrect) {
      sound.playCorrect();
      feedbackBox.className = "quiz-feedback-box correct show";
      feedbackBox.innerHTML = `<strong>¡Excelente trabajo! 🎉</strong> ${q.explanation}`;
    } else {
      sound.playIncorrect();
      feedbackBox.className = "quiz-feedback-box incorrect show";
      feedbackBox.innerHTML = `<strong>¡Casi lo logras! 💡</strong> Pista: ${q.hint}`;
    }

    nextBtn.style.display = "inline-block";
    const isLast = this.currentQuestionIndex === this.currentTopic.quiz.length - 1;
    nextBtn.textContent = isLast ? "Ver Resultados Finales ⭐" : "Siguiente Pregunta ➡️";
  }

  nextQuestion() {
    sound.playClick();
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.currentTopic.quiz.length) {
      this.renderCurrentQuestion();
    } else {
      this.evaluateQuizResults();
    }
  }

  // ¿Aprobó? Evaluación y Ramas del Diagrama de Flujo
  evaluateQuizResults() {
    const total = this.quizAnswers.length;
    const correctCount = this.quizAnswers.filter(a => a.isCorrect).length;
    const scorePercent = Math.round((correctCount / total) * 100);
    const passed = scorePercent >= 70; // Criterio de aprobación del diagrama

    // Guardar en el historial
    this.user.history.push({
      topicId: this.currentTopic.id,
      topicTitle: this.currentTopic.title,
      score: scorePercent,
      date: new Date().toLocaleDateString(),
      passed: passed
    });

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
      titleEl.textContent = "¡Felicidades, Aprobaste con Éxito!";
      msgEl.textContent = `¡Excelente esfuerzo! Has demostrado que dominas el tema de ${this.currentTopic.title}. Sumaste +100 XP a tu perfil.`;

      // Otorgar recompensas
      this.user.xp += 100;
      this.user.level = Math.floor(this.user.xp / 100) + 1;
      if (!this.user.completedTopics.includes(this.currentTopic.id)) {
        this.user.completedTopics.push(this.currentTopic.id);
      }
      this.saveUserData();
      this.renderTopics();

      approvedActions.style.display = "flex";
      failedActions.style.display = "none";
      errorsSection.style.display = "none";
    } else {
      // Rama: NO APROBÓ -> Mostrar resultados y sugerir estudiar más
      sound.playIncorrect();
      iconEl.textContent = "🌱";
      titleEl.textContent = "¡Buen intento! Cada error te ayuda a aprender";
      msgEl.textContent = `Obtuviste ${scorePercent}%. Para aprobar necesitas al menos un 70%. Te sugerimos revisar los errores y consejos didácticos a continuación antes de reintentar.`;

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

    list.innerHTML = incorrects.map(item => `
      <div class="error-item">
        <div class="error-item-question">❓ ${item.question}</div>
        <div class="error-item-answers">
          <span style="color: #dc2626;">❌ Tu respuesta: <strong>${item.selectedText}</strong></span>
          <span style="color: #16a34a;">✔️ Respuesta correcta: <strong>${item.correctText}</strong></span>
        </div>
        <div class="error-item-suggestion">
          💡 <strong>Sugerencia para recordar:</strong> ${item.hint}
        </div>
      </div>
    `).join("");
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

  closeModal(modalId) {
    sound.playClick();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  // Configuración de listeners generales
  setupEventListeners() {
    // Botón de siguiente curiosidad
    document.getElementById("btn-next-fact")?.addEventListener("click", () => this.nextFunFact());

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
      this.startQuiz();
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
      this.startQuiz();
    });

    document.getElementById("btn-study-lesson-again")?.addEventListener("click", () => {
      sound.playClick();
      this.openTopicLesson(this.currentTopic.id);
    });

    document.getElementById("btn-save-attempt-home")?.addEventListener("click", () => {
      sound.playClick();
      this.showView("view-dashboard");
    });

    // Header buttons (Menu hamburguesa, Perfil)
    document.getElementById("btn-hamburger-menu")?.addEventListener("click", () => {
      this.openModal("modal-menu-credits");
    });

    document.getElementById("header-user-btn")?.addEventListener("click", () => {
      this.renderProfileStats();
      this.openModal("modal-user-profile");
    });

    // Selector de grado escolar
    document.getElementById("dashboard-grade-btn")?.addEventListener("click", () => {
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

      this.saveUserData();
      localStorage.setItem("matematica_basica_visited", "true");
      this.closeModal("modal-user-welcome");
      sound.playCorrect();
    });

    // Continuar como invitado
    document.getElementById("btn-guest-mode")?.addEventListener("click", () => {
      this.user.name = "Invitado Curioso";
      this.user.avatar = "⭐";
      this.saveUserData();
      localStorage.setItem("matematica_basica_visited", "true");
      this.closeModal("modal-user-welcome");
      sound.playClick();
    });

    // Toggle de sonido
    document.getElementById("btn-toggle-sound")?.addEventListener("click", () => {
      const isEnabled = sound.toggle();
      const statusText = document.getElementById("sound-status-text");
      if (statusText) statusText.textContent = isEnabled ? "Sonido: Activado 🔊" : "Sonido: Silenciado 🔇";
      sound.playClick();
    });

    // Pestaña y Banner de Cookies
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

  renderProfileStats() {
    document.getElementById("profile-display-avatar").textContent = this.user.avatar;
    document.getElementById("profile-display-name").textContent = this.user.name;
    document.getElementById("profile-display-grade").textContent = this.user.grade;
    document.getElementById("profile-display-level").textContent = `Nivel ${this.user.level}`;
    document.getElementById("profile-display-xp").textContent = `${this.user.xp} XP`;
    document.getElementById("profile-completed-count").textContent = `${this.user.completedTopics.length} de ${APP_DATA.topics.length}`;

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
  }
}

// Iniciar aplicación al cargar el DOM
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new MathApp();
});
