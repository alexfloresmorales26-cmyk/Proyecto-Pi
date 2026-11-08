# Proyecto-Pi: Matemática Básica (Primaria)

Este proyecto ayuda a que niños y niñas de primaria aprendan matemáticas básicas. **Proyecto Integrador (Equipo Isma_1)**.

**🌐 Sitio en línea:** [https://mi-proyecto-wheat-five.vercel.app/](https://mi-proyecto-wheat-five.vercel.app/)

---

## 🚀 ¿Cómo abrir y usar la aplicación?

La aplicación está hecha con HTML, CSS y JavaScript, sin instalar nada y sin librerías externas. Funciona sin conexión: solo el ranking global necesita internet.

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
- 🎭 **12 avatares** para elegir, de dinosaurio a estrella ⭐.
- 🚶 **Modo Invitado**: solo permite mirar; para jugar hay que crear un perfil.
- 🏫 **Selector de grado escolar** (1º a 6º de Primaria): ajusta el contexto de las estadísticas.
- 🎯 **10 preguntas por tema**: retos interactivos con sonido y retroalimentación inmediata.
- 📝 **Repaso automático de errores**: si fallas una pregunta, el reto salta solo a la siguiente (sin quedarte atascado) y al terminar te pide repasar **solo las que fallaste**; si las aciertas en el repaso, cuentan para tu puntaje final.
- 🔥 **Barra de racha estilo arcade**: estrellas ⭐ que marcan tus aciertos seguidos durante el reto.
- 🏅 **Mejor racha guardada**: tu récord histórico de aciertos seguidos, visible en el Perfil y en el modal de Nivel.
- 🎁 **Recompensas por nivel**: 7 insignias desbloqueables (desde 🥉 Medalla de Bronce hasta 🌟 Superestrella Matemática) con celebración de confeti y sonido.
- 💡 **Consejos para aprender** en el inicio y **consejos de resolución** durante cada reto.
- ℹ️ **Info extra en los apartados de la lección**: cada tarjeta (Longitud, Peso, Fracciones, etc.) revela un dato adicional al pasar el ratón (computadora) o al tocarla (celular). El texto vive en la propiedad `extra` de cada `keyPoint` en `js/data.js`.
- 🎓 **Modo Práctica**: botón "Practicar sin puntuar" en cada lección. Repite el reto (incluso los ya superados) sin sumar XP, sin generar historial y sin enviar nada al ranking global.
- 📊 **Estadísticas por grado**: porcentaje de aciertos por grado escolar en el Perfil.
- 🔊 **Efectos de sonido** generados con Web Audio API (sin archivos de audio externos).
- 🔥 **Racha de días**: cada día que practicas suma un día a tu racha 📅 (visible en el header, en tu Perfil y en el ranking). Si dejas de venir, la racha se reinicia.
- 🏆 **Ranking global de jugadores**: los puntajes se guardan en una base de datos en la nube, así que cada quien aparece con un alias y compite con los demás; mira el Top 10 en el menú ☰ (ver [Ranking global](#-ranking-global)).
- 📱 **Diseño responsivo**: la app se adapta al celular (header compacto, textos grandes, botones anchos y tabla del ranking con scroll).
- 🔒 **Privacidad por diseño**: por defecto el ranking muestra un **alias inventado** (nunca tu nombre real) y **tu grado escolar no sale del dispositivo**. Tienes interruptores para mostrar tu apodo, no aparecer en el ranking o **borrar tu registro de la nube** (ver [Política de Privacidad y Uso](#-política-de-privacidad-y-uso)).

---

## 🔒 Política de Privacidad y Uso

Texto completo: **[POLITICA.md](POLITICA.md)** (v1.0 · 08-11-2026). También se puede leer desde la app: menú ☰ → **🔒 Privacidad y Uso**.

**Resumen en 30 segundos:**

| Pregunta | Respuesta |
|----------|-----------|
| ¿Guardan mi nombre real? | ❌ No, solo un alias inventado (🕶️) |
| ¿Guardan mi grado escolar? | ❌ No, se queda en el dispositivo |
| ¿Qué se envía al ranking? | Alias, avatar, nivel, XP, rachas y último puntaje |
| ¿Hay publicidad, rastreo o analítica? | ❌ No |
| ¿Necesito cuenta o contraseña? | ❌ No |
| ¿Puedo borrarlo todo? | ✅ Sí: datos locales y registro en la nube |
| ¿Funciona sin internet? | ✅ Sí (solo el ranking lo necesita) |

**Controles disponibles en la app (☰ → 🔒 Privacidad y Uso):**
- **👀 Mostrar mi apodo en el ranking** — desactivado por defecto.
- **🙈 No aparecer en el ranking global** — no se envía nada a la nube.
- **🗑️ Borrar mi registro del ranking** — eliminación real de tu fila en la nube.

> ⚠️ El almacén del ranking es un servicio público de práctica **sin autenticación**; por eso la app recomienda usar un apodo inventado y nunca datos personales reales.

---

## 🏆 Ranking global

Al terminar un reto (aprobado con **≥ 70%** del puntaje final), el perfil del jugador se registra automáticamente en una base de datos en la nube compartida:

- **Qué se guarda**: **alias** (por defecto) o apodo (solo si el niño lo activa), avatar, nivel, puntos de experiencia (XP), mejor racha de aciertos seguidos, **racha de días 📅**, retos superados y el puntaje del último intento. **El grado escolar nunca se envía.**
- **Dónde se ve**: barra del menú ☰ → "Proyecto Integrador" → botón **🏆 Ranking Global de Jugadores** (tabla Top 10 por XP con medallas 🥇🥈🥉, columna 📅 de días seguidos y tu fila resaltada; los alias llevan el distintivo 🕶️).
- **Puntaje final**: cuenta los aciertos de la primera ronda **más** las preguntas que se repararon en el repaso, de modo que fallar y corregir no penaliza en el ranking.
- **Modo Invitado**: no juega ni registra puntajes (solo explora).
- **Modo Práctica**: los entrenamientos no se envían (no cuentan para el ranking).
- **Privacidad**: interruptores y borrado del registro en ☰ → 🔒 Privacidad y Uso (ver [Política de Privacidad y Uso](#-política-de-privacidad-y-uso)).
- La conexión a la base de datos vive en `js/firebase-config.js` (constante `CLOUD_DB`: endpoint y `objectId` de un almacén JSON público) y la lógica de envío/lectura en la sección "RANKING GLOBAL" de `js/app.js`.
- ⚠️ Requiere conexión a internet (todo lo demás funciona sin conexión).

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
  - Menú hamburguesa (☰) con acceso a los créditos, la información del proyecto y el ranking global.
  - Insignia de nivel 🔥 con la barra de experiencia dinámica y la insignia 📅 con la racha de días practicando.
  - Avatar del estudiante con acceso a sus estadísticas y avances.
- **Hero Card (Izquierda)**:
  - Mascota dinosaurio verde amigable 🦕 con globo de pensamiento `"3+1"`.
  - Saludo `"¡Hola, pequeño matematico!"` (dividido en varias líneas).
  - Carrusel rotativo de **consejos para aprender** 💡.
  - Botón `"Comenzar a aprender"` y selector de grado escolar (*1º a 6º de Primaria*).
- **Tarjetas de Temas (Derecha)**: las 6 tarjetas de color listadas arriba.
- **Tarjeta Inferior `"¿Sabias que...?"`**: bombilla luminosa 💡 con datos curiosos rotativos (por ejemplo: *"La suma de los primeros 10 números naturales (1+2+3+...+10) es igual a 55"*).

---

## 🔀 Diagrama de Flujo (Página 9 del documento)

La aplicación sigue el flujo del diagrama paso a paso:

1. **Abrir aplicación** ➡️ Pregunta **"¿Ya eres usuario?"**:
   - *Sí* ➡️ Carga el perfil, nivel y avances guardados en `localStorage`.
   - *No* ➡️ Permite registrar nombre, grado escolar y avatar (o continuar en Modo Invitado, solo visualización).
2. **Mostrar temas de matemáticas** ➡️ Selección de tema con retroalimentación visual.
3. **Lección interactiva** ➡️ Explicaciones paso a paso con vocabulario infantil y simuladores interactivos.
4. **Cuestionario o Reto práctico** ➡️ 10 preguntas interactivas con sonido, opciones múltiples ilustradas y feedback inmediato. Si fallas en la primera ronda, la pregunta se anota, muestra su pista y **el reto salta solo a la siguiente** (nunca te quedas atascado). Al terminar, se repasa **solo lo que fallaste** y ahí sí puedes reintentar hasta acertar.
   - **🎓 Modo Práctica** (opcional): repite cualquier reto, incluso los ya superados, sin sumar XP, sin historial y sin enviar nada al ranking.
5. **Verificar respuestas** ➡️ Bifurcación **¿Aprobó?** (≥ 70% del puntaje final: aciertos de la primera ronda + preguntas reparadas en el repaso):
   - **SÍ APROBÓ**:
     - Lanza animación de confeti festivo y melodía triunfal.
     - Otorga puntos de experiencia (+100 XP), sube de nivel y guarda el tema como completado.
     - Desbloquea la **recompensa del nivel** alcanzado (insignia con celebración).
     - Envía el puntaje al **ranking global** (excepto en Modo Práctica).
     - Pregunta: *"¿Deseas iniciar otro tema?"* (Sí ➡️ regresa al menú de temas / No ➡️ vuelve al inicio).
   - **NO APROBÓ**:
     - Mensaje motivador y cálido.
     - **Mostrar errores y dar sugerencias**: desglosa cada pregunta fallada en la primera ronda, mostrando tu respuesta (❌), la correcta (✔️) y una sugerencia didáctica; las que reparaste en el repaso aparecen marcadas en verde ✅.
     - Pregunta: *"¿Intentar de nuevo?"* (Sí ➡️ reintentar reto o repasar lección / No ➡️ guardar intento y volver al inicio).

---

## 📁 Estructura del proyecto

```
Proyecto-Pi/
├── index.html      # Vistas, modales y navegación (HTML5)
├── css/
│   └── styles.css  # Estilos globales, animaciones y bloque responsive (celular)
├── js/
│   ├── data.js     # APP_DATA: temas, lecciones, retos, tips y recompensas
│   ├── app.js      # Lógica de la aplicación (clase MathApp) — ver el MAPA al inicio
│   ├── audio.js    # Efectos de sonido (Web Audio API)
│   └── firebase-config.js  # CLOUD_DB: conexión con la base de datos en la nube (ranking)
├── assets/
│   └── dino.png    # Mascota dinosaurio
├── AGENTS.md       # Guía del repositorio para agentes de código
├── POLITICA.md     # Política de Privacidad y Uso (v1.0)
├── LICENSE         # Licencia MIT
└── README.md       # Documentación
```

---

## 👥 Créditos

**Proyecto Integrador** — Grupo: **Isma_1**

---

## 📄 Licencia y Derechos de Autor

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

**Copyright (c) 2026 Proyecto Integrador**. Licencia MIT: puedes usar, modificar y compartir el proyecto siempre que cites la autoría.
