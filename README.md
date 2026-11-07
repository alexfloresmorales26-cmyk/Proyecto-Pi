# Proyecto-Pi: Matemática Básica (Primaria)

Este proyecto está enfocado en el desarrollo del aprendizaje de las matemáticas básicas para niños de educación primaria. **Proyecto Integrador (Equipo Isma_1)**.

**🌐 Sitio en línea:** [https://mi-proyecto-wheat-five.vercel.app/](https://mi-proyecto-wheat-five.vercel.app/)

---

## 🚀 ¿Cómo abrir y usar la aplicación?

La aplicación está construida con tecnologías web estándar (HTML5, CSS3 y JavaScript ES6) con **cero dependencias externas**, por lo que funciona al 100% de manera local y offline.

### Opción 1: Abrir la página web (Recomendado)

Visita el sitio en línea desplegado en Vercel: **[https://mi-proyecto-wheat-five.vercel.app/](https://mi-proyecto-wheat-five.vercel.app/)**

### Opción 2: Abrir directamente en tu equipo

Haz doble clic en el archivo `index.html` para abrirlo en tu navegador favorito (Google Chrome, Microsoft Edge, Firefox o Safari).

### Opción 3: Usar un servidor local con Python

Si prefieres servirla vía HTTP:

```bash
python -m http.server 8000
```

Luego abre en tu navegador: [http://localhost:8000](http://localhost:8000)

---

## ✨ Características principales

- 👤 **Perfiles con avatar**: la sesión se guarda en `localStorage` (nombre, avatar, grado, nivel y avances).
- 🎭 **12 avatares** para elegir, de dinosaurio a superestrella.
- 👀 **Modo Invitado**: solo visualización; para jugar se necesita crear un perfil.
- 🏫 **Selector de grado escolar** (1º a 6º de Primaria): ajusta el contexto de las estadísticas.
- 🎯 **10 retos por tema**: preguntas interactivas con sonido y retroalimentación inmediata.
- 🔒 **No avanzar hasta acertar**: al fallar, la opción se bloquea con una pista y puedes reintentar con el botón **🔁 Reintentar**. El puntaje se calcula con el primer intento de cada pregunta (aprobar requiere ≥ 70%).
- 🔥 **Barra de racha estilo arcade**: estrellas ⭐ que marcan tus aciertos seguidos durante el reto.
- 🏅 **Mejor racha guardada**: tu récord histórico de aciertos seguidos, visible en el Perfil y en el modal de Nivel.
- 🎁 **Recompensas por nivel**: 7 insignias desbloqueables (desde 🥉 Medalla de Bronce hasta 🌟 Superestrella Matemática) con celebración de confeti y sonido.
- 💡 **Consejos para aprender** en el inicio y **consejos de resolución** durante cada reto.
- ℹ️ **Info extra en los apartados de la lección**: cada tarjeta (Longitud, Peso, Fracciones, etc.) revela un dato adicional al pasar el ratón (computadora) o al tocarla (celular). El texto vive en la propiedad `extra` de cada `keyPoint` en `js/data.js`.
- 📊 **Estadísticas por grado**: porcentaje de aciertos por grado escolar en el Perfil.
- 🔊 **Efectos de sonido** generados con Web Audio API (sin archivos de audio externos).
- 🏆 **Ranking global de jugadores**: los puntajes se guardan en una base de datos en la nube, así que todos los usuarios quedan registrados y compiten; mira el Top 10 en el menú ☰ (ver [Ranking global](#-ranking-global)).

---

## 🏆 Ranking global

Al aprobar cualquier reto (≥ 70%), el perfil de la/el jugador se registra automáticamente en una base de datos en la nube compartida:

- **Qué se guarda**: nombre, avatar, grado escolar, nivel, puntos de experiencia (XP), mejor racha de aciertos seguidos, retos superados y el puntaje del último intento.
- **Dónde se ve**: barra del menú ☰ → "Proyecto Integrador" → botón **🏆 Ranking Global de Jugadores** (tabla Top 10 por XP con medallas 🥇🥈🥉 y tu fila resaltada).
- **Modo Invitado**: no juega ni registra puntajes (solo explora).
- La conexión a la base de datos vive en `js/firebase-config.js` (`CLOUD_DB`) y la lógica de envío/lectura en la sección "RANKING GLOBAL" de `js/app.js`.

---

## 📚 Temas de estudio

| Tema | Color | Contenido |
|------|-------|-----------|
| 📏 Mediciones | Amarillo | Longitud, peso, tiempo, capacidad y conversiones |
| ➕ Operaciones | Verde | Sumas, restas, multiplicación, división y jerarquía de operaciones |
| 📐 Geometría | Morado | Figuras, perímetro, área, ángulos y cuerpos 3D |
| 📊 Estadística y Proporción | Rosa | Razones, porcentajes, regla de tres y gráficas |
| 🍕 Cálculo Mental y Fracciones | Celeste | Fracciones, equivalencias y decimales |
| 🧩 Introducción al Álgebra | Naranja | Patrones, incógnitas y balanza de equilibrio (x + 5 = 12) |

Cada tema incluye una **lección interactiva** con simuladores (regla deslizante, reparto de manzanas, visor geométrico, rebanadas de pizza y balanza con incógnitas).

---

## 🎨 Diseño de Interfaz (Página 10 del documento)

- **Barra Superior**:
  - Menú hamburguesa (☰) con acceso a los créditos y la información del proyecto.
  - Insignia de estrella con el **Nivel** actual y barra de experiencia dinámica.
  - Avatar del estudiante con acceso a sus estadísticas y avances.
- **Hero Card (Izquierda)**:
  - Mascota dinosaurio verde amigable 🦕 con globo de pensamiento `"3+1"`.
  - Saludo `"¡Hola, pequeño matematico! Aprende, practica y avanza."`.
  - Carrusel rotativo de **consejos para aprender** 💡.
  - Botón `"Comenzar a aprender"` y selector de grado escolar (*1º a 6º de Primaria*).
- **Tarjetas de Temas (Derecha)**: las 6 tarjetas de color listadas arriba.
- **Tarjeta Inferior `"¿Sabías que...?"`**: bombilla luminosa 💡 con datos curiosos rotativos (por ejemplo: *"La suma de los primeros 10 números naturales (1+2+3+...+10) es igual a 55"*).

---

## 🔀 Diagrama de Flujo (Página 9 del documento)

La aplicación implementa con exactitud cada bifurcación del flujo:

1. **Abrir aplicación** ➡️ Pregunta **"¿Ya eres usuario?"**:
   - *Sí* ➡️ Carga el perfil, nivel y avances guardados en `localStorage`.
   - *No* ➡️ Permite registrar nombre, grado escolar y avatar (o continuar en Modo Invitado, solo visualización).
2. **Mostrar temas de matemáticas** ➡️ Selección de tema con retroalimentación visual.
3. **Lección interactiva** ➡️ Explicaciones paso a paso con vocabulario infantil y simuladores interactivos.
4. **Cuestionario o Reto práctico** ➡️ 10 preguntas interactivas con sonido, opciones múltiples ilustradas y feedback inmediato. Si fallas, no avanzas hasta acertar (con pista y botón de reintento).
5. **Verificar respuestas** ➡️ Bifurcación **¿Aprobó?** (≥ 70% del primer intento):
   - **SÍ APROBÓ**:
     - Lanza animación de confeti festivo y melodía triunfal.
     - Otorga puntos de experiencia (+100 XP), sube de nivel y guarda el tema como completado.
     - Desbloquea la **recompensa del nivel** alcanzado (insignia con celebración).
     - Pregunta: *"¿Deseas iniciar otro tema?"* (Sí ➡️ regresa al menú de temas / No ➡️ vuelve al inicio).
   - **NO APROBÓ**:
     - Mensaje motivador y cálido.
     - **Mostrar errores y dar sugerencias**: desglosa cada pregunta fallada en el primer intento, mostrando tu respuesta (❌), la correcta (✔️) y una sugerencia didáctica paso a paso.
     - Pregunta: *"¿Intentar de nuevo?"* (Sí ➡️ reintentar reto o repasar lección / No ➡️ guardar intento y volver al inicio).

---

## 📁 Estructura del proyecto

```
Proyecto-Pi/
├── index.html      # Vistas, modales y navegación (HTML5)
├── css/
│   └── styles.css  # Estilos globales y animaciones
├── js/
│   ├── data.js     # APP_DATA: temas, lecciones, retos, tips y recompensas
│   ├── app.js      # Lógica de la aplicación (clase MathApp)
│   └── audio.js    # Efectos de sonido (Web Audio API)
├── assets/
│   └── dino.png    # Mascota dinosaurio
├── AGENTS.md       # Guía del repositorio para agentes de código
├── LICENSE         # Licencia MIT
└── README.md       # Documentación
```

---

## 👥 Créditos

**Proyecto Integrador** — Grupo: **Isma_1**

---

## 📄 Licencia y Derechos de Autor

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

**Copyright (c) 2026 Proyecto Integrador**. Todos los derechos reservados.
