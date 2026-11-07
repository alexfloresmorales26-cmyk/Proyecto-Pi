# AGENTS.md — Matemática Básica (Proyecto-Pi)

Guía para agentes de código que trabajan en este repositorio.

## Proyecto

App educativa de matemáticas para primaria. **Sitio 100% estático**: HTML + CSS + JS vanilla (ES6+ + funciones flecha). No hay bundler, gestor de paquetes (`package.json`), tests, lint ni CI. La máquina **no tiene Node.js instalado**, así que no se puede usar `node --check`; verificar sintaxis revisando el código o eligiendo el archivo desplegado.

## Estructura

- `index.html` — entrada única; contiene todas las vistas y los modales (bienvenida, perfil, nivel/estadísticas, créditos, cookies).
- `js/data.js` — `APP_DATA`: temas (lecciones y cuestionarios), `funFacts`, `studyTips`, datos del proyecto. La UI carga todo desde aquí; no duplicar contenido en HTML.
- `js/app.js` — clase `MathApp` (`app`, global): render, navegación de vistas (`showView`), cuestionarios, persistencia. Patrón de listeners: `document.getElementById("id")?.addEventListener(...)` dentro de `setupEventListeners()`.
- `js/audio.js` — efectos de sonido vía `sound.playClick()` / `playCorrect()` / `playVictory()`.
- `css/styles.css` — estilos globales; pasar por hover/clic en badges clickeables.

## Convenciones y datos

- Todo el texto de UI va en español. Los `<h2>/<h3>` del HTML omiten acentos ("matematico", "Sabias que"); los textos en `data.js` sí suelen llevar acentos — imitar el estilo del archivo editado.
- Mensajes de commit cortos y en español. El usuario también habla español.
- Sesión del usuario en `localStorage` (si se agregan dimensiones de almacenamiento nuevo, documentarlo y ajustar el modal de Cookies):
  - `matematica_basica_user` (perfil: name, avatar, grade, level, xp, completedTopics, history)
  - `matematica_basica_visited`
  - `matematica_basica_cookies_accepted`
- Historial de cuestionarios (`user.history[]`): guardar también `grade` del usuario en el momento del intento. Los intentos previos a esta convención no lo traen.
- Reglas de barra de progreso: aprobar un cuestionario requiere **>= 70%** y otorga **+100 XP**; nivel = `floor(xp / 100) + 1`.

## Despliegue (Git + Vercel)

- Remoto: `https://github.com/alexfloresmorales26-cmyk/Proyecto-Pi.git`, rama `main`.
- **Cada push a `main` despliega automáticamente en Vercel** (proyecto "prende-jugando", cuenta `alejandro-0456`). Considerar los pushes como despliegues.
- URL en vivo que usa el usuario: `https://mi-proyecto-wheat-five.vercel.app/` (ojo: `prende-jugando.vercel.app` da 404).
- `gh` CLI está en `~/.local/bin/gh` y autenticado como `alexfloresmorales26-cmyk`; el push HTTPS ya usa esas credenciales.
- Verificar un despliegue así (esperar ~45s tras el push):
  1. `gh api repos/alexfloresmorales26-cmyk/Proyecto-Pi/commits/<sha>/status --jq '.state'`
  2. `curl -s https://mi-proyecto-wheat-five.vercel.app/ | grep <texto-nuevo>` — la caché de borde de Vercel puede servir la versión anterior durante minutos; comparar `last-modified` / cabecera `age` antes de asumir que algo falló.

## Gotchas

- Los archivos de trabajo llevan CRLF; git avisará "CRLF will be replaced by LF" al hacer `add` — es normal, no intentar "arregarlo".
- No agregar herramientas de build ni dependencias: el proyecto es estático a propósito.
- Los nombres personales (integrantes) fueron eliminados a pedido del usuario: UI, README y LICENSE usan solo "Proyecto Integrador" e "Isma_1"; no reintroducirlos.
- Al activar un modal nuevo, seguir el patrón existente: `<div class="modal-overlay" id="modal-...">` + `app.openModal(id)` y el botón `✕` con `app.closeModal(id)`.
