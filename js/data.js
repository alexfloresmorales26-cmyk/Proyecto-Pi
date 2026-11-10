/**
 * DATA.JS - Contenido educativo basado en el documento "Proyecto Integrador Isma_1"
 * Temas: Medición, Números y operaciones, Cálculo mental, Geometría, Álgebra y Proporcionalidad.
 *
 * ============================================================================
 *  MAPA DEL ARCHIVO (todo el contenido de la app vive aquí, no en el HTML)
 * ============================================================================
 *  topics[]           -> 6 temas, cada uno con:
 *                        lesson.keyPoints[]  -> tarjetas de la lección
 *                                              (title, text, formula y "extra":
 *                                               el dato curioso del tooltip)
 *                        lesson.intro         -> introducción de la lección
 *                        quiz[]               -> 10 preguntas (options, correctIndex,
 *                                               hint y explanation)
 *  quizTips[]         -> consejos de resolución que rotan durante el reto
 *  funFacts[]         -> datos curiosos de la pantalla de inicio
 *  studyTips[]        -> consejos de aprendizaje del hero
 *  levelRewards[]     -> insignias que se desbloquean al subir de nivel
 * ============================================================================
 */

const APP_DATA = {
  // Información del proyecto y créditos oficiales
  projectInfo: {
    title: "Matemática Básica",
    subtitle: "Guía Interactiva de Matemáticas de Primaria",
    group: "Isma_1"
  },

  // Datos curiosos para "¿Sabías que...?"
  funFacts: [
    "La suma de los primeros 10 números naturales (1+2+3+...+10) es igual a 55.",
    "El número cero (0) fue desarrollado de forma muy avanzada por la civilización Maya.",
    "Un kilómetro equivale a 1,000 metros. ¡Eso es caminar unas 10 cuadras grandes!",
    "Las fracciones equivalentes como 1/2 y 2/4 representan exactamente la misma cantidad: ¡media pizza!",
    "El triángulo es la figura geométrica más resistente en la construcción de puentes y techos.",
    "Un litro de agua pura pesa exactamente 1 kilogramo (1,000 gramos).",
    "La palabra 'Álgebra' proviene del árabe 'al-ŷabr' que significa 'reconstrucción o equilibrio'."
  ],

  // Consejos para aprender (hero, rotativos)
  studyTips: [
    "Practica un poco todos los días: ¡10 minutos constantes valen más que una sola sesión larga!",
    "Cuenta con objetos reales: lápices, juguetes o frutas. Tocar y ver ayuda a entender mucho mejor.",
    "No tengas miedo de equivocarte: cada error te enseña algo nuevo. ¡Así aprenden los matemáticos!",
    "Lee los problemas dos veces antes de responder y descubre qué te están pidiendo.",
    "Divide los problemas grandes en pasos pequeños: ¡todo se vuelve más fácil paso a paso!",
    "Dibuja lo que piensas: una suma o una resta también puede verse como un dibujo divertido.",
    "Explícale a alguien lo que aprendiste: repetir en voz alta ayuda a que no se te olvide.",
    "Descansa y juega entre retos: tu cerebro aprende mejor cuando está feliz y relajado."
  ],

  // Recompensas desbloqueables al subir de nivel
  levelRewards: [
    { level: 2, id: "medalla-bronce", icon: "🥉", name: "Medalla de Bronce", description: "¡Tu primera insignia! Ya empezaste; sigue con un ratito de práctica cada día." },
    { level: 3, id: "mago-numeros", icon: "🧙", name: "Mago de los Números", description: "Las sumas y las restas ya no te dan guerra. ¡Vas bien!" },
    { level: 4, id: "cohete-matematico", icon: "🚀", name: "Cohete Matemático", description: "Los problemas más largos ya no te asustan. ¡Sigue así!" },
    { level: 5, id: "medalla-oro", icon: "🥇", name: "Medalla de Oro", description: "¡Nivel 5! Cada día entiendes un poquito mejor las cosas." },
    { level: 6, id: "corona-real", icon: "👑", name: "Corona Real", description: "Te falta poco para el trofeo. ¡No te rindas!" },
    { level: 8, id: "trofeo-maestro", icon: "🏆", name: "Trofeo Maestro", description: "Resuelves casi todos los retos sin ayuda. ¡Impresionante!" },
    { level: 10, id: "superestrella", icon: "🌟", name: "Superestrella Matemática", description: "¡Nivel 10! Ya puedes ayudar a tus compañeros cuando no entienden un problema." }
  ],

  // Consejos de resolución para la vista de quiz
  quizTips: [
    "Lee la pregunta completa dos veces antes de ver las opciones: a veces la respuesta está en la misma pregunta.",
    "Descarta primero las respuestas que sabes que son imposibles. ¡Las opciones falsas se quedan solas!",
    "Si puedes, haz un dibujo o cuento con los dedos: pensar con imágenes hace todo más fácil.",
    "Cuida las preguntas de palabras clave: 'cuántos más' pide una resta, 'repartir' pide una división.",
    "En operaciones combinadas, recuerda el orden: primero paréntesis, luego × y ÷, y al final + y -.",
    "Si la respuesta no es la que esperabas, revisa si se te fue una unidad de medida: cm, m, kg o mL.",
    "No respondas corriendo: respira, piensa y elige con calma. ¡La prisa es enemiga de la precisión!",
    "Equivocarse es parte del juego: después del reto puedes leer la explicación de cada respuesta."
  ],

  // Temas del currículo oficial del documento
  topics: [
    {
      id: "medicion",
      title: "Mediciones",
      subtitle: "Longitud, peso, tiempo y más",
      colorClass: "card-yellow",
      accentColor: "#F59E0B",
      bgColor: "#FEF08A",
      textColor: "#854D0E",
      icon: "📏",
      badge: "Tema 1",
      description: "Medir significa comparar algo con una unidad. Conoce el metro, gramo, litro y tiempo.",
      lesson: {
        intro: "Niños, medir significa comparar algo con una unidad conocida. Cuando medimos longitudes usamos milímetros, centímetros, metros y kilómetros.",
        keyPoints: [
          {
            title: "📏 Longitud (Distancia)",
            text: "Los objetos pequeños se miden en centímetros (cm) y las distancias largas en kilómetros (km).",
            formula: "1 metro (m) = 100 centímetros (cm) | 1 kilómetro (km) = 1,000 metros (m)",
            extra: "La regla de tu cuaderno mide 30 cm y un pasillo de la escuela mide unos 10 metros. ¡Los milímetros (mm) son tan pequeños que 10 caben en 1 solo centímetro!"
          },
          {
            title: "⚖️ Peso (Masa)",
            text: "Para objetos ligeros usamos gramos (g) y para objetos pesados usamos kilogramos (kg).",
            formula: "1 kilogramo (kg) = 1,000 gramos (g)",
            extra: "Una manzana pesa unos 200 gramos, así que 5 manzanas juntas pesan casi 1 kilo. ¡Y 1,000 gramos es lo mismo que llenar la balanza con 1,000 semillitas de igual peso!"
          },
          {
            title: "🥛 Capacidad (Líquidos)",
            text: "Para medir líquidos usamos mililitros (mL) y litros (L).",
            formula: "1 litro (L) = 1,000 mililitros (mL)",
            extra: "Una cucharada tiene unos 5 mL y una botella de refresco suele traer 2 L. Si llenas una taza de 250 mL cuatro veces, ¡tienes un litro entero!"
          },
          {
            title: "⏱️ Tiempo",
            text: "Medimos el tiempo en segundos, minutos y horas.",
            formula: "1 hora = 60 minutos | 1 minuto = 60 segundos",
            extra: "Un parpadeo dura cerca de 1 segundo; lavarte las manos, 1 minuto; y una película, unas 2 horas. ¡Un día completo tiene 24 horas!"
          }
        ],
        interactiveType: "measurement-tool"
      dailyRecommendations: ['💡 Consejo diario: Mide objetos de tu casa con una regla o una balanza. 💡 Convierte unidades: gramos/mililitros. 💡 Observa la hora: minutos y segundos.'],

      },
      quiz: [
        {
          id: "m1",
          question: "¿Cuántos centímetros (cm) hay en 1 metro (m)?",
          options: ["10 cm", "100 cm", "1,000 cm", "50 cm"],
          correctIndex: 1,
          hint: "Recuerda la regla de la escuela: un metro completo tiene 100 centímetros.",
          explanation: "¡Correcto! 1 metro equivale exactamente a 100 centímetros (100 cm = 1 m)."
        },
        {
          id: "m2",
          question: "Si una bolsa de manzanas pesa 2 kilogramos (kg), ¿cuántos gramos son?",
          options: ["200 gramos", "500 gramos", "2,000 gramos", "1,000 gramos"],
          correctIndex: 2,
          hint: "Cada kilogramo tiene 1,000 gramos. Si tienes 2 kg, multiplica 2 x 1,000.",
          explanation: "¡Excelente! Como 1 kg = 1,000 g, entonces 2 kg = 2,000 g."
        },
        {
          id: "m3",
          question: "¿Qué unidad usarías para medir la distancia entre dos ciudades?",
          options: ["Milímetros", "Centímetros", "Kilómetros", "Gramos"],
          correctIndex: 2,
          hint: "Las distancias muy largas en carreteras se miden en kilómetros.",
          explanation: "¡Muy bien! Las distancias largas entre ciudades o pueblos se miden en kilómetros (km)."
        },
        {
          id: "m4",
          question: "¿Cuántos mililitros (mL) tiene 1 litro de leche?",
          options: ["100 mL", "500 mL", "1,000 mL", "2,000 mL"],
          correctIndex: 2,
          hint: "La palabra 'mili' viene de mil.",
          explanation: "¡Correcto! 1 litro (L) equivale a 1,000 mililitros (mL)."
        },
        {
          id: "m5",
          question: "¿Qué herramienta usarías para medir la longitud de tu mesa?",
          options: ["Un vaso medidor", "Una regla o cinta de medir", "Una báscula", "Un reloj"],
          correctIndex: 1,
          hint: "Para medir longitudes (qué tan largo o corto algo) usamos instrumentos con marcas de cm y m.",
          explanation: "¡Muy bien! La regla o la cinta de medir son los instrumentos correctos para longitudes."
        },
        {
          id: "m6",
          question: "¿Cuántos metros (m) hay en 3 kilómetros (km)?",
          options: ["30 metros", "300 metros", "3,000 metros", "300 gramos"],
          correctIndex: 2,
          hint: "Cada kilómetro tiene 1,000 metros. Multiplica 3 x 1,000.",
          explanation: "¡Correcto! 3 km = 3 x 1,000 m = 3,000 metros."
        },
        {
          id: "m7",
          question: "¿Cuál unidad es la más adecuada para pesar un elefante?",
          options: ["Gramos", "Kilogramos", "Mililitros", "Centímetros"],
          correctIndex: 1,
          hint: "Un elefante es muy pesado. Necesitamos la unidad de peso más grande de las opciones.",
          explanation: "¡Excelente! Los animales grandes se pesan en kilogramos (kg); los gramos serían muy pequeños."
        },
        {
          id: "m8",
          question: "Si bebes medio litro (1/2 L) de jugo, ¿cuántos mililitros (mL) tomaste?",
          options: ["50 mL", "250 mL", "500 mL", "1,000 mL"],
          correctIndex: 2,
          hint: "1 litro tiene 1,000 mL. La mitad de 1,000 es... ¡la mitad!",
          explanation: "¡Correcto! Medio litro = 500 mL, porque 1,000 ÷ 2 = 500."
        },
        {
          id: "m9",
          question: "¿Cuántas horas (h) tiene un día completo?",
          options: ["12 horas", "24 horas", "60 horas", "100 horas"],
          correctIndex: 1,
          hint: "El día y la noche juntos forman un ciclo que se repite cada 24 horas.",
          explanation: "¡Muy bien! Un día completo tiene 24 horas (12 de día y 12 de noche)."
        },
        {
          id: "m10",
          question: "Un lápiz nuevo mide aproximadamente:",
          options: ["17 centímetros", "17 metros", "17 kilómetros", "17 litros"],
          correctIndex: 0,
          hint: "Piensa en tu regla escolar: un lápiz cabe dentro de ella casi totalmente.",
          explanation: "¡Exacto! Un lápiz mide alrededor de 17 cm. Los metros y kilómetros son demasiado grandes."
        }
      ]
    },
    {
      id: "operaciones",
      title: "Operaciones",
      subtitle: "Sumas, restas, multiplicación y división",
      colorClass: "card-green",
      accentColor: "#10B981",
      bgColor: "#BBF7D0",
      textColor: "#166534",
      icon: "➕",
      badge: "Tema 2",
      description: "Aprende los números naturales, suma, resta, multiplicación, división y orden de operaciones.",
      lesson: {
        intro: "Los números naturales (1, 2, 3, 4...) nos sirven para contar objetos de nuestro alrededor.",
        keyPoints: [
          {
            title: "🔢 Conteo y Comparación",
            text: "Comparamos números usando los símbolos: > (mayor que), < (menor que) e = (igual). Ejemplo: 8 > 5.",
            formula: "8 > 5 (Ocho es mayor que cinco)",
            extra: "Truco del cocodrilo 🐊: siempre abre la boca hacia el número más grande. Así, 12 < 20 porque el cocodrilo prefiere comer 20."
          },
          {
            title: "➕ Suma y Resta",
            text: "La suma junta cantidades. La resta quita o halla la diferencia entre cantidades.",
            formula: "8 + 5 = 13  |  13 - 5 = 8",
            extra: "Al sumar, el orden no importa: 5 + 3 es igual que 3 + 5. ¡Pero en la resta sí importa el orden, porque 5 - 3 y 3 - 5 dan resultados distintos!"
          },
          {
            title: "✖️ Multiplicación y División",
            text: "Multiplicar es sumar varias veces el mismo número. Dividir es repartir en partes iguales.",
            formula: "4 × 3 = 12 (tres veces cuatro) | 12 ÷ 3 = 4",
            extra: "Multiplicar es sumar en grupos: 3 × 4 son tres grupos de 4 cositas. División es lo contrario: repartir 12 entre 3 amigos y a cada uno le tocan 4."
          },
          {
            title: "🧠 Jerarquía de Operaciones",
            text: "En operaciones combinadas, el orden es: 1º Paréntesis, 2º Multiplicaciones y Divisiones, 3º Sumas y Restas.",
            formula: "Ejemplo: 2 + (3 × 4) = 2 + 12 = 14",
            extra: "Memoriza la regla PEMA: Paréntesis primero, Exponentes (potencias), Multiplicación y División, y al final Adición (suma) y Sustracción (resta)."
          }
        ],
        interactiveType: "operations-tool"
      dailyRecommendations: ['💡 Suma matrículas de autos. 💡 Practica tablas de multiplicar. 💡 Si tienes 3 manzanas y comes 1, cuántas quedan.'],

      },
      quiz: [
        {
          id: "op1",
          question: "¿Cuál símbolo completa correctamente la expresión: 15 ___ 9?",
          options: ["< (menor que)", "> (mayor que)", "= (igual)", "+ (más)"],
          correctIndex: 1,
          hint: "La boca del cocodrilo siempre se come al número más grande.",
          explanation: "¡Exacto! El número 15 es mayor que 9, por lo tanto se escribe 15 > 9."
        },
        {
          id: "op2",
          question: "Si tienes 4 cajas y cada una tiene 5 lápices, ¿cuántos lápices tienes en total?",
          options: ["9 lápices", "15 lápices", "20 lápices", "25 lápices"],
          correctIndex: 2,
          hint: "Multiplica la cantidad de cajas por los lápices de cada caja: 4 x 5.",
          explanation: "¡Correcto! 4 cajas × 5 lápices = 20 lápices en total."
        },
        {
          id: "op3",
          question: "Queremos repartir 18 caramelos entre 3 amigos en partes iguales. ¿Cuántos le tocan a cada uno?",
          options: ["5 caramelos", "6 caramelos", "7 caramelos", "8 caramelos"],
          correctIndex: 1,
          hint: "Divide 18 entre 3: ¿qué número multiplicado por 3 da 18?",
          explanation: "¡Excelente! 18 ÷ 3 = 6 caramelos para cada amigo."
        },
        {
          id: "op4",
          question: "¿Cuál es el resultado de la operación combinada: 10 + (2 × 5)?",
          options: ["60", "20", "25", "17"],
          correctIndex: 1,
          hint: "Primero resuelve lo que está dentro del paréntesis (2 × 5), y luego súmalo a 10.",
          explanation: "¡Perfecto! Primero hacemos el paréntesis: 2 × 5 = 10. Luego sumamos: 10 + 10 = 20."
        },
        {
          id: "op5",
          question: "¿Cuál es el resultado de 47 + 28?",
          options: ["65", "70", "75", "85"],
          correctIndex: 2,
          hint: "Suma las unidades primero: 7 + 8 = 15. Anota 5 y lleva 1. Luego 4 + 2 + 1.",
          explanation: "¡Correcto! 47 + 28 = 75. Las unidades dan 15 (escribes 5 y llevas 1) y 4 + 2 + 1 = 7."
        },
        {
          id: "op6",
          question: "¿Cuál es el resultado de 52 - 17?",
          options: ["35", "45", "34", "42"],
          correctIndex: 0,
          hint: "Como no puedes quitar 7 a 2, pide prestada una decena: 12 - 7 = 5, y 4 - 1 = 3.",
          explanation: "¡Muy bien! 52 - 17 = 35. Pides prestada una decena para hacer 12 - 7 = 5."
        },
        {
          id: "op7",
          question: "¿Cuál es el resultado de 6 × 7?",
          options: ["36", "42", "48", "13"],
          correctIndex: 1,
          hint: "Recuerda la tabla del 7: 7, 14, 21, 28, 35, 42...",
          explanation: "¡Excelente! 6 × 7 = 42. Puedes verlo como seis veces siete o siete veces seis."
        },
        {
          id: "op8",
          question: "Si 24 dulces se reparten entre 4 niños en partes iguales, ¿cuántos dulces le tocan a cada uno?",
          options: ["4 dulces", "6 dulces", "8 dulces", "12 dulces"],
          correctIndex: 1,
          hint: "Divide 24 entre 4: ¿cuántas veces cabe el 4 en el 24?",
          explanation: "¡Correcto! 24 ÷ 4 = 6 dulces para cada niño."
        },
        {
          id: "op9",
          question: "¿Cuál es el resultado de 3 × 2 + 4?",
          options: ["14", "10", "20", "24"],
          correctIndex: 1,
          hint: "Sin paréntesis, primero va la multiplicación: 3 × 2 = 6. Después suma el 4.",
          explanation: "¡Perfecto! Por la jerarquía: 3 × 2 = 6, y luego 6 + 4 = 10."
        },
        {
          id: "op10",
          question: "Tienes 35 estampas y regalas 12 a tu mejor amigo. ¿Cuántas te quedan?",
          options: ["23 estampas", "27 estampas", "22 estampas", "33 estampas"],
          correctIndex: 0,
          hint: "La palabra 'regalas' significa que debes restar: 35 - 12.",
          explanation: "¡Muy bien! 35 - 12 = 23 estampas en tu colección."
        }
      ]
    },
    {
      id: "geometria",
      title: "Geometría",
      subtitle: "Figuras, formas y espacios",
      colorClass: "card-purple",
      accentColor: "#8B5CF6",
      bgColor: "#E9D5FF",
      textColor: "#5B21B6",
      icon: "📐",
      badge: "Tema 3",
      description: "Descubre figuras planas, perímetro, área, ángulos rectos y figuras en 3D.",
      lesson: {
        intro: "La geometría estudia las formas de nuestro entorno: lados, esquinas (vértices) y ángulos.",
        keyPoints: [
          {
            title: "🟩 Figuras Geométricas Básicas",
            text: "Cuadrado (4 lados iguales), Rectángulo (lados opuestos iguales), Triángulo (3 lados) y Círculo (curva sin esquinas).",
            formula: "Cuadrado = 4 lados | Triángulo = 3 lados",
            extra: "El círculo no tiene lados ni esquinas: todo su borde es curva. ¿Y un hexágono? Tiene 6 lados, igual que los panales de las abejas 🐝."
          },
          {
            title: "📏 Perímetro",
            text: "Es la medida del contorno o la cerca de una figura. Se obtiene sumando todos sus lados.",
            formula: "Perímetro = Lado + Lado + Lado + Lado",
            extra: "Si caminas pegadito al borde de una cancha vuelta completa, la distancia que recorriste es exactamente su perímetro."
          },
          {
            title: "🟦 Área",
            text: "Es la cantidad de espacio que ocupa una figura en una superficie.",
            formula: "Área de un rectángulo = Largo × Ancho",
            extra: "El área se mide en unidades cuadradas (cm², m²), como si contarás cuántas baldositas cuadradas caben dentro de la figura."
          },
          {
            title: "📐 Ángulos y Cuerpos 3D",
            text: "Ángulo recto (90°, forma una 'L'). Cuerpos 3D como cubo, esfera, cilindro, cono y prisma tienen largo, ancho y alto.",
            formula: "Ángulo Agudo (<90°) | Recto (90°) | Obtuso (>90°)",
            extra: "La esquina de una hoja de papel es un ángulo recto perfecto de 90°. Las agujas del reloj también lo forman cuando marcan 3 en punto."
          }
        ],
        interactiveType: "geometry-tool"
      dailyRecommendations: ['💡 Busca objetos cuadrados en casa. 💡 Cuenta lados de muebles. 💡 Observa ángulos de la puerta.'],

      },
      quiz: [
        {
          id: "g1",
          question: "¿Cuántos lados iguales tiene un cuadrado?",
          options: ["2 lados", "3 lados", "4 lados", "5 lados"],
          correctIndex: 2,
          hint: "Un cuadrado tiene todas sus orillas del mismo tamaño.",
          explanation: "¡Muy bien! El cuadrado tiene 4 lados y todos son de la misma medida."
        },
        {
          id: "g2",
          question: "Un rectángulo mide 6 cm de largo y 4 cm de ancho. ¿Cuál es su área?",
          options: ["10 cm²", "20 cm²", "24 cm²", "12 cm²"],
          correctIndex: 2,
          hint: "La fórmula del área del rectángulo es largo multiplicado por ancho (6 x 4).",
          explanation: "¡Correcto! Área = 6 cm × 4 cm = 24 cm²."
        },
        {
          id: "g3",
          question: "Si sumamos la longitud de todos los lados de un triángulo, estamos calculando su:",
          options: ["Área", "Perímetro", "Volumen", "Peso"],
          correctIndex: 1,
          hint: "El contorno de una figura se llama perímetro.",
          explanation: "¡Exacto! El perímetro es la suma de todos los lados que forman el contorno de una figura."
        },
        {
          id: "g4",
          question: "¿Cuál de estos cuerpos geométricos es redondo en 3 dimensiones como una pelota?",
          options: ["Cubo", "Prisma", "Esfera", "Pirámide"],
          correctIndex: 2,
          hint: "Piensa en el planeta Tierra o un balón de fútbol.",
          explanation: "¡Excelente! La esfera es un cuerpo geométrico perfectamente redondo en 3D."
        },
        {
          id: "g5",
          question: "¿Cuántos grados (°) mide un ángulo recto?",
          options: ["45°", "60°", "90°", "180°"],
          correctIndex: 2,
          hint: "El ángulo recto tiene forma de 'L', como la esquina de una hoja de papel.",
          explanation: "¡Correcto! Un ángulo recto mide exactamente 90°, como las esquinas de una hoja."
        },
        {
          id: "g6",
          question: "Un cuadrado tiene lados de 5 cm. ¿Cuál es su perímetro?",
          options: ["10 cm", "20 cm", "25 cm", "15 cm"],
          correctIndex: 1,
          hint: "El perímetro es la cerca completa: suma sus 4 lados iguales (5 + 5 + 5 + 5).",
          explanation: "¡Muy bien! Perímetro = 5 + 5 + 5 + 5 = 20 cm."
        },
        {
          id: "g7",
          question: "¿Qué figura tiene exactamente 3 lados y 3 vértices (esquinas)?",
          options: ["Cuadrado", "Rectángulo", "Triángulo", "Círculo"],
          correctIndex: 2,
          hint: "Su nombre empieza con 'tri', que significa tres.",
          explanation: "¡Exacto! El triángulo tiene 3 lados y 3 esquinas. 'Tri' significa tres."
        },
        {
          id: "g8",
          question: "¿Cómo se llama el ángulo que mide más de 90°?",
          options: ["Ángulo agudo", "Ángulo recto", "Ángulo obtuso", "Ángulo plano"],
          correctIndex: 2,
          hint: "Es más abierto y ancho que la esquina de una hoja (90°).",
          explanation: "¡Correcto! El ángulo obtuso es más abierto que 90°, como una puerta que abre mucho."
        },
        {
          id: "g9",
          question: "¿Cuántas caras tiene un cubo, como un dado de juego?",
          options: ["4 caras", "6 caras", "8 caras", "12 caras"],
          correctIndex: 1,
          hint: "Piensa en un dado: cuenta cuántas superficies planas tiene (donde puede apoyarse).",
          explanation: "¡Excelente! El cubo tiene 6 caras cuadradas iguales, como un dado."
        },
        {
          id: "g10",
          question: "Un cuadrado tiene lados de 3 cm. ¿Cuál es su área?",
          options: ["6 cm²", "9 cm²", "12 cm²", "3 cm²"],
          correctIndex: 1,
          hint: "Área = largo × ancho. Como todos los lados miden 3: 3 × 3.",
          explanation: "¡Muy bien! Área = 3 cm × 3 cm = 9 cm²."
        }
      ]
    },
    {
      id: "estadistica",
      title: "Estadística y Proporción",
      subtitle: "Datos, gráficas y regla de tres",
      colorClass: "card-peach",
      accentColor: "#F43F5E",
      bgColor: "#FECDD3",
      textColor: "#9F1239",
      icon: "📊",
      badge: "Tema 4",
      description: "Aprende a comparar cantidades con razones, regla de tres, porcentajes y gráficas.",
      lesson: {
        intro: "A veces las cantidades cambian manteniendo una relación. La proporcionalidad nos permite predecir resultados.",
        keyPoints: [
          {
            title: "✏️ Razón y Proporción",
            text: "Una razón compara dos cantidades, por ejemplo: 2 lápices por cada 1 borrador. Una proporción indica que dos razones son equivalentes.",
            formula: "2 lápices / 1 borrador = 4 lápices / 2 borradores",
            extra: "Las recetas de cocina están llenas de proporciones: si 2 tazas de harina dan 8 galletas, con 4 tazas saldrán 16 galletas ricas, ricas."
          },
          {
            title: "💯 Porcentajes",
            text: "Un porcentaje nos indica partes de un total de 100. El 50% significa la mitad (50 de cada 100).",
            formula: "50% = 50 / 100 = 1/2",
            extra: "El 100% es todo el pastel, el 50% es la mitad, el 25% un cuarto. Cuando tu videojuego dice 75% de vida, ¡ya casi estás al tope!"
          },
          {
            title: "✖️ Regla de Tres Simple",
            text: "Nos ayuda a encontrar un dato desconocido multiplicando en cruz y dividiendo.",
            formula: "Si 1 cuaderno cuesta $10, ¿cuánto cuestan 3? (3 × 10) ÷ 1 = $30",
            extra: "La regla de tres se usa para todo: precios de dulces, distancia del papel de la bici ¡y hasta para trío de recetas! Multiplica en cruz y divide."
          },
          {
            title: "📊 Gráficas de Barras",
            text: "Representan información con barras para ver rápidamente cuál opción tiene más o menos votos.",
            formula: "Visualizar datos facilita comparar resultados.",
            extra: "En una gráfica de barras, la barra más alta siempre gana. La gráfica circular (de pastel 🥧) sirve para mostrar porcentajes."
          }
        ],
        interactiveType: "stats-tool"
      dailyRecommendations: ['💡 Haz una encuesta familiar. 💡 Crea una gráfica de barras. 💡 Observa el clima semanal.'],

      },
      quiz: [
        {
          id: "st1",
          question: "Si 1 paleta cuesta $5 pesos, ¿cuánto costarán 4 paletas?",
          options: ["$10 pesos", "$15 pesos", "$20 pesos", "$25 pesos"],
          correctIndex: 2,
          hint: "Multiplica el precio de 1 paleta ($5) por las 4 paletas.",
          explanation: "¡Muy bien! Con una proporción directa: 4 paletas × $5 = $20 pesos."
        },
        {
          id: "st2",
          question: "¿Qué fracción o parte representa el 50% de un pastel?",
          options: ["Todo el pastel", "La mitad (1/2)", "Un cuarto (1/4)", "Una rebanadita"],
          correctIndex: 1,
          hint: "50 de 100 es exactamente la mitad.",
          explanation: "¡Correcto! El 50% representa exactamente la mitad de cualquier cantidad total (50/100 = 1/2)."
        },
        {
          id: "st3",
          question: "En una receta se usan 2 tazas de harina por 1 taza de leche. Si usamos 4 tazas de harina, ¿cuánta leche se necesita?",
          options: ["1 taza", "2 tazas", "3 tazas", "4 tazas"],
          correctIndex: 1,
          hint: "Si duplicamos la harina (2 a 4), también debemos duplicar la leche.",
          explanation: "¡Excelente! Al mantener la proporción, si ponemos el doble de harina (4), usamos el doble de leche: 2 tazas."
        },
        {
          id: "st4",
          question: "¿Para qué sirve principalmente una gráfica de barras en estadística?",
          options: ["Para dibujar paisajes", "Para organizar y comparar datos fácilmente", "Para medir la temperatura", "Para sumar fracciones"],
          correctIndex: 1,
          hint: "Las barras permiten ver a simple vista qué opción ganó o tiene más frecuencia.",
          explanation: "¡Exacto! Las gráficas de barras nos ayudan a interpretar datos y comparar cantidades rápidamente."
        },
        {
          id: "st5",
          question: "¿Qué parte de una pizza representa el 25%?",
          options: ["Todo el pastel", "La mitad", "Un cuarto (1/4)", "Casi nada"],
          correctIndex: 2,
          hint: "25 de cada 100. Si divides el total en 4 partes iguales, cada parte es 25%.",
          explanation: "¡Correcto! 25% = 25/100 = 1/4, es decir, un cuarto del total."
        },
        {
          id: "st6",
          question: "Si 2 lápices cuestan $8 pesos, ¿cuánto costarán 6 lápices?",
          options: ["$16 pesos", "$20 pesos", "$24 pesos", "$48 pesos"],
          correctIndex: 2,
          hint: "Con 2 lápices cuesta $8. Para llegar a 6 necesitas 3 grupos de 2. Multiplica $8 × 3.",
          explanation: "¡Muy bien! 6 lápices son 3 grupos de 2, entonces $8 × 3 = $24 pesos."
        },
        {
          id: "st7",
          question: "El 75% de un pastel es lo mismo que:",
          options: ["La mitad (1/2)", "Tres cuartas partes (3/4)", "Un cuarto (1/4)", "Todo el pastel"],
          correctIndex: 1,
          hint: "75 es 50 + 25. O piensa: ¿cuántas veces cabe 25% en 75%?",
          explanation: "¡Exacto! 75% = 75/100 = 3/4, tres cuartas partes del pastel."
        },
        {
          id: "st8",
          question: "En una gráfica de barras sobre frutas favoritas, ¿qué significa que la barra de manzana sea la más alta?",
          options: ["Que nadie la eligió", "Que es la fruta más votada", "Que es la más barata", "Que se acabó en la tienda"],
          correctIndex: 1,
          hint: "En una gráfica de barras, más altura significa más veces elegida (más frecuencia).",
          explanation: "¡Correcto! La barra más alta muestra la opción con más votos o frecuencia."
        },
        {
          id: "st9",
          question: "Si una docena de huevos cuesta $30 pesos, ¿cuánto costarán 2 docenas?",
          options: ["$45 pesos", "$60 pesos", "$55 pesos", "$90 pesos"],
          correctIndex: 1,
          hint: "Es una proporción: si duplicas la cantidad, duplicas el precio ($30 × 2).",
          explanation: "¡Excelente! 2 docenas cuestan el doble: $30 × 2 = $60 pesos."
        },
        {
          id: "st10",
          question: "En una encuesta, 10 niños eligieron perro y solo 4 eligieron gato. ¿Cuántos más votaron por perro que por gato?",
          options: ["6 más", "5 más", "14 más", "4 más"],
          correctIndex: 0,
          hint: "La palabra 'cuántos más' indica una resta: 10 - 4.",
          explanation: "¡Muy bien! 10 - 4 = 6 niños más votaron por el perro."
        }
      ]
    },
    {
      id: "calculo-mental",
      title: "Cálculo Mental y Fracciones",
      subtitle: "Fracciones, decimales y equivalencias",
      colorClass: "card-blue",
      accentColor: "#0284C7",
      bgColor: "#BAE6FD",
      textColor: "#075985",
      icon: "🍕",
      badge: "Tema 5",
      description: "Descubre las partes de un todo con fracciones propias, impropias, equivalentes y números decimales.",
      lesson: {
        intro: "Las fracciones representan partes iguales de un todo (como una pizza o un pastel).",
        keyPoints: [
          {
            title: "🍕 Fracción y Decimal",
            text: "Una fracción indica cuántas partes tomamos (numerador arriba) de un total (denominador abajo).",
            formula: "1/2 = 0.5 (la mitad) | 1/4 = 0.25 (un cuarto)",
            extra: "Las fracciones viven en el dinero: 50 centavos son la mitad de un peso (1/2 = 0.5) y 25 centavos son un cuarto (1/4 = 0.25)."
          },
          {
            title: "🍰 Fracción Propia e Impropia",
            text: "Propia: el numerador es menor (ej. 2/5). Impropia: el numerador es mayor o igual que el denominador (ej. 7/4).",
            formula: "2/5 es Propia | 7/4 es Impropia",
            extra: "7/4 vale más que una pizza entera: equivale a 1 pizza y 3/4. Se dice ¡una y tres cuartos! 🍕"
          },
          {
            title: "🤝 Fracciones Equivalentes",
            text: "Son fracciones diferentes que valen exactamente lo mismo. Ejemplo: 1/2 es igual a 2/4.",
            formula: "1/2 = 2/4 = 4/8",
            extra: "Si cortas una pizza en 4 y te comes 2 pedazos, comiste la mitad. Lo mismo que si la cortas en 8 y te comes 4. ¡Dos caminos, mismo resultado!"
          },
          {
            title: "🔢 Suma con mismo denominador",
            text: "Si los denominadores son iguales, se suman directamente los numeradores.",
            formula: "1/4 + 2/4 = 3/4",
            extra: "Es como juntar pedazos del mismo tamaño: si tienes 2 octavos y te dan 3 octavos más, en total tienes 5 octavos de la merienda."
          }
        ],
        interactiveType: "fraction-tool"
      dailyRecommendations: ['💡 Suma dígitos de teléfono mentalmente. 💡 Resta comidas para próximo día festivo. 💡 Multiplica: 4×5, 6×3 con el reloj.'],

      },
      quiz: [
        {
          id: "cm1",
          question: "¿A qué número decimal equivale la fracción 1/2?",
          options: ["0.2", "0.5", "1.2", "0.05"],
          correctIndex: 1,
          hint: "Divide 1 entre 2: la mitad de 1 es medio punto.",
          explanation: "¡Correcto! 1 dividido entre 2 es igual a 0.5 (medio)."
        },
        {
          id: "cm2",
          question: "¿Cuál de las siguientes es una fracción equivalente a 1/2?",
          options: ["1/4", "2/4", "3/4", "2/3"],
          correctIndex: 1,
          hint: "Si multiplicas el de arriba y el de abajo por 2, obtienes 2/4.",
          explanation: "¡Excelente! 1/2 y 2/4 representan exactamente la misma porción."
        },
        {
          id: "cm3",
          question: "¿Cuál es el resultado de sumar: 2/5 + 1/5?",
          options: ["3/10", "3/5", "2/5", "1/5"],
          correctIndex: 1,
          hint: "Cuando tienen el mismo denominador (5), solo sumas los números de arriba (2 + 1).",
          explanation: "¡Muy bien! Como el denominador es igual, sumamos 2 + 1 = 3, quedando 3/5."
        },
        {
          id: "cm4",
          question: "En la fracción 7/4, ¿qué tipo de fracción es?",
          options: ["Fracción Propia", "Fracción Impropia", "Número Decimal", "Fracción Negativa"],
          correctIndex: 1,
          hint: "Observa: el número de arriba (7) es mayor que el de abajo (4).",
          explanation: "¡Correcto! Es impropia porque el numerador (7) es mayor que el denominador (4)."
        },
        {
          id: "cm5",
          question: "¿A qué número decimal equivale la fracción 1/4?",
          options: ["0.4", "0.25", "0.75", "0.14"],
          correctIndex: 1,
          hint: "Divide 1 entre 4 con calculadora mental: la mitad de la mitad de 1 (0.5 ÷ 2).",
          explanation: "¡Correcto! 1 ÷ 4 = 0.25 (un cuarto de entero)."
        },
        {
          id: "cm6",
          question: "¿Cuál de estas fracciones es propia (el de arriba es menor que el de abajo)?",
          options: ["7/4", "5/3", "2/5", "9/8"],
          correctIndex: 2,
          hint: "Busca la fracción donde el numerador (arriba) es más pequeño que el denominador (abajo).",
          explanation: "¡Muy bien! En 2/5 el numerador (2) es menor que el denominador (5): es una fracción propia."
        },
        {
          id: "cm7",
          question: "¿Cuál es el resultado de 3/4 + 1/4?",
          options: ["4/8", "1 entero (4/4)", "3/8", "4/16"],
          correctIndex: 1,
          hint: "Suma los numeradores: 3 + 1 = 4. ¿Qué fracción con denominador 4 vale 4/4?",
          explanation: "¡Excelente! 3/4 + 1/4 = 4/4, que es exactamente 1 entero (o sea la pizza completa)."
        },
        {
          id: "cm8",
          question: "Si tienes 10 galletas y te comes la mitad (1/2), ¿cuántas te quedan?",
          options: ["2 galletas", "5 galletas", "8 galletas", "10 galletas"],
          correctIndex: 1,
          hint: "La mitad significa dividir en 2 partes iguales: 10 ÷ 2.",
          explanation: "¡Correcto! La mitad de 10 es 5; te comiste 5 y te quedan 5 galletas."
        },
        {
          id: "cm9",
          question: "¿Cuál fracción representa una porción más grande de pastel: 1/2 o 1/4?",
          options: ["1/4", "1/2", "Valen lo mismo", "Ninguna se puede comer"],
          correctIndex: 1,
          hint: "Imagina una pizza: en cuántos trozos la divides. ¿Es más trozo una de 2 partes o una de 4?",
          explanation: "¡Exacto! 1/2 es más grande que 1/4, porque entre menos partes, cada parte es mayor."
        },
        {
          id: "cm10",
          question: "¿Cuál es el resultado de 0.5 + 0.5?",
          options: ["0.10", "2.5", "1 entero", "0.55"],
          correctIndex: 2,
          hint: "0.5 es la mitad de un entero. Dos mitades juntas forman...",
          explanation: "¡Correcto! 0.5 + 0.5 = 1. Dos mitades hacen un entero completo."
        }
      ]
    },
    {
      id: "algebra",
      title: "Introducción al Álgebra",
      subtitle: "Patrones, incógnitas y ecuaciones",
      colorClass: "card-orange",
      accentColor: "#EA580C",
      bgColor: "#FFEDD5",
      textColor: "#9A3412",
      icon: "🧩",
      badge: "Tema 6",
      description: "El álgebra usa letras como 'x' para representar cantidades secretas que debemos descubrir.",
      lesson: {
        intro: "El álgebra es como resolver un juego de detectives usando letras para representar números desconocidos.",
        keyPoints: [
          {
            title: "🔍 Patrones y Sucesiones",
            text: "Una secuencia de números que sigue una regla. Por ejemplo: 2, 4, 6, 8... (suma 2 cada vez).",
            formula: "Patrón: +2 en cada salto",
            extra: "Los patrones también viven en la naturaleza: 2, 4, 8, 16 (duplicando cada salto) y hasta en los pétalos de muchas flores."
          },
          {
            title: "❓ La Letra x (La Incógnita)",
            text: "Usamos letras como 'x' para representar un número secreto que aún no conocemos.",
            formula: "x = número secreto",
            extra: "En los videojuegos las incógnitas están en todos lados: si te faltan corazones para llegar a 10, esa cantidad desconocida es la x. ❤️ + ¿? = 10"
          },
          {
            title: "⚖️ La Igualdad es una Balanza",
            text: "El signo '=' indica que ambos lados de la balanza tienen el mismo valor exacto.",
            formula: "x + 5 = 12",
            extra: "La igualdad es una balanza ⚖️: si quitas peso de un plato, debes quitar exactamente lo mismo del otro para que siga balanceada."
          },
          {
            title: "🎯 Resolver la Ecuación",
            text: "Para encontrar 'x', despejamos restando 5 a ambos lados: x = 12 - 5, entonces x = 7.",
            formula: "7 + 5 = 12 ✔️",
            extra: "Truco de detectives: al final, sustituye tu respuesta en la ecuación original. Si la balanza queda pareja, ¡resolviste el caso!"
          }
        ],
        interactiveType: "algebra-tool"
      dailyRecommendations: ['💡 Busca patrones: 2,4,6,8... 💡 Resuelve incógnitas: si como 2 me quedan 4, ¿cuántas tenía? 💡 Observa sucesiones en la naturaleza.'],

      },
      quiz: [
        {
          id: "alg1",
          question: "En la sucesión: 3, 6, 9, 12... ¿qué número sigue?",
          options: ["13", "14", "15", "16"],
          correctIndex: 2,
          hint: "La regla va sumando de 3 en 3: 12 + 3 = ?",
          explanation: "¡Excelente! Cada término suma 3, por lo tanto 12 + 3 = 15."
        },
        {
          id: "alg2",
          question: "Si x + 5 = 12, ¿cuál es el valor secreto de x?",
          options: ["5", "7", "12", "17"],
          correctIndex: 1,
          hint: "¿Qué número sumado con 5 te da 12? (12 - 5)",
          explanation: "¡Correcto! Si restamos 5 de 12 nos da 7. Comprobamos: 7 + 5 = 12."
        },
        {
          id: "alg3",
          question: "En una balanza en equilibrio, del lado izquierdo hay un paquete misterioso x y 3 pesas de 1 kg. Del lado derecho hay 10 pesas de 1 kg (x + 3 = 10). ¿Cuánto pesa x?",
          options: ["3 kg", "7 kg", "10 kg", "13 kg"],
          correctIndex: 1,
          hint: "Quita 3 pesas de ambos lados para dejar a la x sola.",
          explanation: "¡Muy bien! x = 10 - 3 = 7 kg."
        },
        {
          id: "alg4",
          question: "¿Para qué se usan las letras como x o y en álgebra?",
          options: ["Para escribir palabras en matemáticas", "Para representar cantidades desconocidas o incógnitas", "Solo para decorar los libros", "Para contar del 1 al 10"],
          correctIndex: 1,
          hint: "Representan un valor numérico que queremos descubrir.",
          explanation: "¡Exacto! Las letras representan cantidades desconocidas que descubrimos resolviendo la ecuación."
        },
        {
          id: "alg5",
          question: "En la sucesión: 5, 10, 15, 20... ¿qué número sigue?",
          options: ["22", "25", "24", "30"],
          correctIndex: 1,
          hint: "Observa los saltos: cada número suma 5 (de 5 en 5).",
          explanation: "¡Correcto! La regla es contar de 5 en 5: 20 + 5 = 25."
        },
        {
          id: "alg6",
          question: "Si x - 4 = 6, ¿cuál es el valor secreto de x?",
          options: ["2", "8", "10", "24"],
          correctIndex: 2,
          hint: "Para despejar x, suma 4 a ambos lados: x = 6 + 4.",
          explanation: "¡Muy bien! x = 6 + 4 = 10. Comprobamos: 10 - 4 = 6."
        },
        {
          id: "alg7",
          question: "Si 2 × x = 8 (dos veces x da 8), ¿cuánto vale x?",
          options: ["2", "4", "6", "16"],
          correctIndex: 1,
          hint: "¿Qué número multiplicado por 2 da como resultado 8?",
          explanation: "¡Excelente! 2 × 4 = 8, por lo tanto x = 4."
        },
        {
          id: "alg8",
          question: "En la sucesión: 1, 2, 4, 8... cada número se duplica. ¿Qué número sigue?",
          options: ["10", "12", "14", "16"],
          correctIndex: 3,
          hint: "La regla secreta es 'por 2': 8 × 2 = ?",
          explanation: "¡Correcto! Cada término se duplica: 8 × 2 = 16."
        },
        {
          id: "alg9",
          question: "Si sabemos que x = 5, ¿cuánto vale la expresión x + 3?",
          options: ["3", "8", "15", "53"],
          correctIndex: 1,
          hint: "Reemplaza la x por su valor: 5 + 3.",
          explanation: "¡Exacto! Si x = 5, entonces x + 3 = 5 + 3 = 8."
        },
        {
          id: "alg10",
          question: "Si 3 × x = 15, ¿cuál es el valor de x?",
          options: ["5", "3", "12", "18"],
          correctIndex: 0,
          hint: "Piensa en la tabla del 3: ¿por cuál número multiplicas 3 para obtener 15?",
          explanation: "¡Muy bien! 3 × 5 = 15, entonces x = 5."
        }
      ]
    }
  ]
};
