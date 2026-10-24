# Proyecto-Pi: Matemática Básica (Primaria)

Este proyecto está enfocado en el desarrollo del aprendizaje de las matemáticas básicas para niños de educación primaria,  **Proyecto Integrador (Equipo Isma_1)**.

---

## 🚀 ¿Cómo abrir y usar la aplicación?

La aplicación está construida con tecnologías web estándar (HTML5, CSS3 y JavaScript ES6) con **cero dependencias externas**, por lo que funciona al 100% de manera local y offline.

### Opción 1: Abrir directamente (Recomendado)
- Simplemente haz doble clic en el archivo [`index.html`](file:///c:/Users/alexf/OneDrive/Desktop/Pi/index.html) para abrirlo en tu navegador favorito (Google Chrome, Microsoft Edge, Firefox, Safari) O Desde nuestra paguina wed.

### Opción 2: Usar un servidor local con Python
Si prefieres servirla vía HTTP:
```bash
python -m http.server 8000
```
Luego abre en tu navegador: [http://localhost:8000](http://localhost:8000)

---

## 🎨 Correspondencia con el Documento

### 1. Diseño de Interfaz (Página 10)
- **Barra Superior**:
  - Menú hamburguesa (☰) con acceso a los créditos de los 9 integrantes y ajustes de sonido.
  - Insignia de estrella con **Nivel 1** y barra de experiencia dinámica.
  - Avatar del estudiante con acceso a sus estadísticas y logros.
- **Título**: Letras grandes y amigables **"MATEMATICA BASICA"**.
- **Hero Card (Izquierda)**:
  - Mascota dinosaurio verde amigable 🦕 con globo de pensamiento `"3+1"`.
  - Saludo `"¡Hola, pequeño matematico! Aprende, practica y avanza."`.
  - Botón `"Comenzar a aprender"`.
  - Selector de grado escolar (*1º a 6º de Primaria*).
- **Tarjetas de Temas (Derecha)**:
  - 📏 **Mediciones** (Amarillo): Longitud, peso, tiempo, capacidad y conversiones.
  - ➕ **Operaciones** (Verde): Sumas, restas, multiplicación, división y jerarquía de operaciones.
  - 📐 **Geometría** (Morado): Figuras geométricas, cálculo interactivo de perímetro/área, ángulos y cuerpos 3D.
  - 📊 **Estadística y Proporción** (Rosa/Salmón): Razones, porcentajes, regla de tres y gráficas.
  - 🍕 **Cálculo Mental y Fracciones** (Celeste): Fracciones de un todo, equivalencias y decimales.
  - 🧩 **Álgebra Divertida** (Naranja): Patrones, incógnitas y balanza de equilibrio ($x + 5 = 12$).
- **Tarjeta Inferior "¿Sabías que...?"**:
  - Bombilla luminosa 💡 con la curiosidad: *"La suma de los primeros 10 números naturales (1+2+3+...+10) es igual a 55"*, y botón para rotar más datos interesantes.

---

### 2. Diagrama de Flujo (Página 9)
La aplicación implementa con exactitud cada bifurcación del flujo:
1. **Abrir aplicación** ➡️ Pregunta **"¿Ya eres usuario?"**:
   - *Sí* ➡️ Carga el perfil, nivel y avances guardados en `localStorage`.
   - *No* ➡️ Permite registrar el nombre, grado escolar y elegir un avatar animado (o continuar en modo invitado).
2. **Mostrar temas de matemáticas** ➡️ Selección de tema con retroalimentación visual.
3. **Lección interactiva** ➡️ Explicaciones paso a paso con vocabulario infantil y simuladores interactivos (regla deslizante, reparto de manzanas, visor geométrico, rebanadas de pizza y balanza con incógnitas).
4. **Cuestionario o Reto práctico** ➡️ Preguntas interactivas con sonido, opciones múltiples ilustradas y feedback inmediato.
5. **Verificar respuestas** ➡️ Bifurcación **¿Aprobó?** ($\ge 70\%$):
   - **SÍ APROBÓ**:
     - Lanza animación de confeti festivo.
     - Reproduce melodía triunfal con `Web Audio API`.
     - Otorga puntos de experiencia (+100 XP), sube de nivel y guarda el tema como completado.
     - Pregunta: *"¿Deseas iniciar otro tema?"* (Sí ➡️ regresa al menú de temas / No ➡️ vuelve al inicio).
   - **NO APROBÓ**:
     - Mensaje motivador y cálido.
     - **Mostrar errores y dar sugerencias**: Desglosa cada pregunta fallada, mostrando la respuesta del alumno (❌), la correcta (✔️) y una **sugerencia didáctica paso a paso**.
     - Pregunta: *"¿Intentar de nuevo?"* (Sí ➡️ reintentar reto o repasar lección / No ➡️ guardar intento y volver al inicio).

---

## 👥 Créditos del Proyecto Integrador (Página 1)
**Grupo: Isma_1**
1. Milton Rodrigo Cahuich Avilez
2. Karla Ivette Guendulain Cruz
3. Alejandro Flores Morales
4. Axel Haziel Aranda Espinosa
5. Loreley Azul Curiel Arias
6. Roman Hilario Pool Chable
7. Cesar Augusto Jimenez Ramirez
8. Sergio Guillermo Velasco
9. Aymar Lilibeth Damian Lira

---

## 📄 Licencia y Derechos de Autor

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

**Copyright (c) 2026 Alejandro Flores Morales**. Todos los derechos reservados.

