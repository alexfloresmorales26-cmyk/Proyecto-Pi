# AGENTS.md — Matemática Básica (Proyecto-Pi)

Guía para agentes de código que trabajan en este repositorio.

## Proyecto

App educativa de matemáticas para primaria. **Sitio 100% estático**: HTML + CSS + JS vanilla (ES6+ + funciones flecha). No hay bundler, gestor de paquetes (`package.json`), tests, lint ni CI. La máquina **no tiene Node.js instalado**, así que no se puede usar `node --check`; verificar sintaxis revisando el código o eligiendo el archivo desplegado.

## Estructura

- `index.html` — entrada única; contiene todas las vistas y los modales (bienvenida, perfil, nivel/estadísticas, créditos, cookies).
- `js/data.js` — `APP_DATA`: temas (lecciones y cuestionarios), `funFacts`, `studyTips`, datos del proyecto. La UI carga todo desde aquí; no duplicar contenido en HTML.
- `js/app.js` — clase `MathApp` (`app`, global): render, navegación de vistas (`showView`), cuestionarios, persistencia. Patrón de listeners: `document.getElementById("id")?.addEventListener(...)` dentro de `setupEventListeners()`.
- `js/audio.js` — efectos de sonido vía `sound.playClick()` / `playCorrect()` / `playVictory()`.
- `js/firebase-config.js` — constante `CLOUD_DB` (endpoint + `objectId`) de la base de datos en la nube usada por el ranking. El nombre del archivo es histórico (antes se planeó Firebase); migrar a Firebase/Supabase es cambiar aquí y la sección RANKING GLOBAL de `app.js`.
- `css/styles.css` — estilos globales; pasar por hover/clic en badges clickeables. Al final hay un bloque `@media (max-width: 640px)` con los ajustes de celular (texto legible, botones anchos, tabla del ranking con scroll) y otro para `420px`.

## Convenciones y datos

- Todo el texto de UI va en español. Los `<h2>/<h3>` del HTML omiten acentos ("matematico", "Sabias que"); los textos en `data.js` sí suelen llevar acentos — imitar el estilo del archivo editado.
- Mensajes de commit cortos y en español. El usuario también habla español.
- Sesión del usuario en `localStorage` (si se agregan dimensiones de almacenamiento nuevo, documentarlo y ajustar el modal de Cookies):
  - `matematica_basica_user` (perfil: name, avatar, grade, level, xp, guest, completedTopics, history, rewards, bestStreak, dailyStreak, lastPracticed)
  - `matematica_basica_visited`
  - `matematica_basica_cookies_accepted`
  - `matematica_basica_ranking_id` — identificador estable del jugador para su fila en el ranking (no es perfil, no se borra al limpiar datos)
- Recompensas por nivel: tabla `APP_DATA.levelRewards` (nivel ≥ 2, `id`, `icon`, `name`). `user.rewards` guarda los `id`; `checkLevelUp()` desbloquea y muestra `modal-level-reward`. Cargar perfiles antiguos con `rewards = []` por defecto.
- Ranking global: base de datos en la nube en `js/firebase-config.js` (`CLOUD_DB`, objeto de restful-api.dev con `data.players`). Al aprobar un reto se registra al jugador (`submitScoreToRanking`, invitados no); la tabla se lee en `renderRanking()` y se muestra en `modal-menu-credits`. La API es de práctica: puede limpiar datos a largo plazo; si hay que migrar (Firebase/Supabase), cambiar `CLOUD_DB` y la sección RANKING GLOBAL de app.js.
- Historial de cuestionarios (`user.history[]`): guardar también `grade` del usuario en el momento del intento. Los intentos previos a esta convención no lo traen. OJO: ese `grade` es **solo local** (sirve para las estadísticas por grado del Perfil) y **nunca** debe copiarse al payload de la nube — el único bloque que escribe en la nube es `submitScoreToRanking()` y `deleteRankingRecord()`.
- Reglas de barra de progreso: aprobar un cuestionario requiere **>= 70%** del puntaje final y otorga **+100 XP**; nivel = `floor(xp / 100) + 1`. Los retos tienen **10 preguntas por tema** (el motor usa `topic.quiz.length`, así que agregar/editar preguntas solo cambia `js/data.js`). Consejos de resolución del quiz: array `quizTips` en `data.js`, renderizados en `#quiz-tips` (misma mecánica de los tips del hero).
- Info extra de apartados: cada `keyPoint` puede tener la propiedad `extra` (dato curioso). Se muestra en un tooltip `.keypoint-tip` al hover (escritorio) o al tocar la tarjeta (celular alterna la clase `open`; el listener se agrega al re-render de la lección). Al agregar apartados nuevos, incluir `extra` para no dejar la tarjeta sin tooltip.
- Mecánica del quiz (IMPORTANTE, cambiada en 2026-11-07): la ronda 1 tiene las 10 preguntas; al fallar, la opción se marca en rojo, se muestra la pista y **el reto salta solo** a la siguiente (2.2 s, `autoAdvanceTimer`); la pregunta fallada se guarda en `reviewQueue`. Al terminar la ronda 1, si hubo fallos, se muestra el aviso "¡Hora del repaso!" y se repasan **solo esas preguntas** (ahí sí se bloquea la opción y se reintenta hasta acertar; `fixedInReview` guarda las reparadas). El **puntaje final = aciertos de la ronda 1 + preguntas reparadas en el repaso** (`evaluateQuizResults`), así que fallar y corregir no penaliza. `quizAnswers` guarda un registro por pregunta (el primer intento de la ronda 1).
- Estados del quiz: `quizPhase` ("round1" | "review"), `reviewPos` (posición dentro del repaso), `reviewQueue` (índices fallados), `fixedInReview` (Set de índices reparados).
- Mejor racha: `user.bestStreak` (aciertos seguidos, se rompe al fallar) se guarda en `localStorage` en cuanto se rompe el récord; se muestra en el modal de Perfil y de Nivel (`profile-best-streak`, `level-stats-streak`).
- Racha de días: `user.dailyStreak` + `user.lastPracticed` (fecha local `YYYY-MM-DD`). Se marca al empezar un reto (`markPracticedToday()`): si se practica el día siguiente al último, la racha sube; si se dejan de pasar 1+ días, `refreshDailyStreak()` (se ejecuta en `init()`) la reinicia a 0. Se muestra en el header (`#header-day-streak`), en el Perfil (`profile-day-streak`), en Nivel (`level-stats-day-streak`) y se envía al ranking como `dayStreak` (columna 📅).
- Modo Práctica: `startQuiz(true)` / `this.practiceMode`. No da XP, no guarda historial, no marca el tema como superado, no envía al ranking y permite repetir retos ya superados. Botón `#btn-lesson-practice`; insignia visible en el reto (`#practice-badge`). El botón "Reintentar" de resultados conserva el modo (`startQuiz(this.practiceMode)`).
- Comentarios: el código se documenta en español. La cabecera de `js/app.js` y `js/data.js` tiene un MAPA con las secciones clave; las funciones importantes llevan comentario una línea arriba. Mantener ese estilo al editar.
- Política de privacidad (obligatorio al tocar el ranking): el archivo `POLITICA.md` es la fuente de verdad (v1.0 · 08-11-2026). Reglas inviolables del ranking:
  - **Nunca enviar `grade` (grado escolar) a la nube**: solo se guarda en el dispositivo.
  - Por defecto se envía un **alias** (`user.rankingAlias`, tipo "Matemático/a 1F2A"), nunca el nombre real. El nombre real solo viaja si `user.showNameInRanking` está activo (interruptor "👀").
  - `user.rankingOptOut` = true → no se envía nada (interruptor "🙈").
  - `deleteRankingRecord()` borra de verdad la fila: `GET` → quitar SOLO la fila propia → `PATCH` del resto (un `DELETE` del objeto borraría el ranking entero).
  - Campos nuevos del perfil: `rankingAlias`, `showNameInRanking` (false por defecto), `rankingOptOut` (false por defecto). Al cargar perfiles antiguos, se rellenan con esos valores por defecto.
  - Textos de UI sobre privacidad: deben ser **veraces** (antes decía "no recopilamos datos personales" y sí se enviaba nombre y grado). No prometer "no se recopilan datos" sin matizar el ranking.
  - Modal nuevo: `modal-privacy` (botones `btn-open-privacy-menu`, `btn-open-policy`, `btn-delete-ranking-record`, `chk-show-name-ranking`, `chk-ranking-optout`). El enlace al texto completo usa `PRIVACY_POLICY_URL` (arriba de `app.js`).

## Despliegue (Git + Vercel)

- Remoto: `https://github.com/alexfloresmorales26-cmyk/Proyecto-Pi.git`, rama `main`.
- **Cada push a `main` despliega automáticamente en Vercel** (proyecto "aprende-jugando", cuenta `alejandro-0456`). Considerar los pushes como despliegues.
- URL en vivo que usa el usuario: `https://mi-proyecto-wheat-five.vercel.app/` (el dominio `aprende-jugando.vercel.app` y el de dashboard dan 404 para el público).
- Proyecto Vercel: **`aprende-jugando`** (equipo `alejandro-0456`); los despliegues traen "Deployment Protection" habilitado, así que las URLs de deployment directo exigen SSO.
- ⚠️ Desdoblamiento en caliente observado (2026-11-07): ocasionalmente el dominio en vivo queda anclado a un despliegue anterior aunque el push a `main` complete; si tras ~10 min no refleja un cambio, pedir al usuario "Promote to Production" en `https://vercel.com/alejandro-0456/aprende-jugando/deployments` — no hay forma de arreglarlo desde el código.
- `gh` CLI está en `~/.local/bin/gh` y autenticado como `alexfloresmorales26-cmyk`; el push HTTPS ya usa esas credenciales.
- Verificar un despliegue así (esperar **~240 s / 4 min** tras el push; con 45 s el build suele seguir en curso):
  1. `gh api repos/alexfloresmorales26-cmyk/Proyecto-Pi/commits/<sha>/status --jq '.state'` → debe dar `success`
  2. `curl -s "https://mi-proyecto-wheat-five.vercel.app/js/app.js?z=$(date +%s)" | grep <texto-nuevo>` — el parámetro `?z=` evita la caché de borde; comparar también la cabecera `last-modified`
  3. Si el dominio sigue anclado a un build viejo: commit vacío (`git commit --allow-empty -m "Reactivar despliegue"` + push), esperar 4 min y volver a verificar. Este fix ya resolvió el problema dos veces.

## Gotchas

- Los archivos de trabajo llevan CRLF; git avisará "CRLF will be replaced by LF" al hacer `add` — es normal, no intentar "arregarlo".
- No agregar herramientas de build ni dependencias: el proyecto es estático a propósito.
- Los nombres personales (integrantes) fueron eliminados a pedido del usuario: UI, README y LICENSE usan solo "Proyecto Integrador" e "Isma_1"; no reintroducirlos.
- Al activar un modal nuevo, seguir el patrón existente: `<div class="modal-overlay" id="modal-...">` + `app.openModal(id)` y el botón `✕` con `app.closeModal(id)`.
