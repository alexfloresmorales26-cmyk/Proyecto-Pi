/**
 * DATA.JS - Contenido educativo basado en el documento "Proyecto Integrador Isma_1"
 * Temas: Medición, Números y operaciones, Cálculo mental, Geometría, Álgebra y Proporcionalidad.
 */

const APP_DATA = {
  // Información del proyecto y créditos oficiales
  projectInfo: {
    title: "Matemática Básica",
    subtitle: "Guía Interactiva de Matemáticas de Primaria",
    group: "Isma_1",
    authorList: [
      "Milton Rodrigo Cahuich Avilez",
      "Karla Ivette Guendulain Cruz",
      "Alejandro Flores Morales",
      "Axel Haziel Aranda Espinosa",
      "Loreley Azul Curiel Arias",
      "Roman Hilario Pool Chable",
      "Cesar Augusto Jimenez Ramirez",
      "Sergio Guillermo Velasco",
      "Aymar Lilibeth Damian Lira"
    ]
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
      badge: "Página 4",
      description: "Medir significa comparar algo con una unidad. Conoce el metro, gramo, litro y tiempo.",
      lesson: {
        intro: "Niños, medir significa comparar algo con una unidad conocida. Cuando medimos longitudes usamos milímetros, centímetros, metros y kilómetros.",
        keyPoints: [
          {
            title: "📏 Longitud (Distancia)",
            text: "Los objetos pequeños se miden en centímetros (cm) y las distancias largas en kilómetros (km).",
            formula: "1 metro (m) = 100 centímetros (cm) | 1 kilómetro (km) = 1,000 metros (m)"
          },
          {
            title: "⚖️ Peso (Masa)",
            text: "Para objetos ligeros usamos gramos (g) y para objetos pesados usamos kilogramos (kg).",
            formula: "1 kilogramo (kg) = 1,000 gramos (g)"
          },
          {
            title: "🥛 Capacidad (Líquidos)",
            text: "Para medir líquidos usamos mililitros (mL) y litros (L).",
            formula: "1 litro (L) = 1,000 mililitros (mL)"
          },
          {
            title: "⏱️ Tiempo",
            text: "Medimos el tiempo en segundos, minutos y horas.",
            formula: "1 hora = 60 minutos | 1 minuto = 60 segundos"
          }
        ],
        interactiveType: "measurement-tool"
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
      badge: "Páginas 5-6",
      description: "Aprende los números naturales, suma, resta, multiplicación, división y orden de operaciones.",
      lesson: {
        intro: "Los números naturales (1, 2, 3, 4...) nos sirven para contar objetos de nuestro alrededor.",
        keyPoints: [
          {
            title: "🔢 Conteo y Comparación",
            text: "Comparamos números usando los símbolos: > (mayor que), < (menor que) e = (igual). Ejemplo: 8 > 5.",
            formula: "8 > 5 (Ocho es mayor que cinco)"
          },
          {
            title: "➕ Suma y Resta",
            text: "La suma junta cantidades. La resta quita o halla la diferencia entre cantidades.",
            formula: "8 + 5 = 13  |  13 - 5 = 8"
          },
          {
            title: "✖️ Multiplicación y División",
            text: "Multiplicar es sumar varias veces el mismo número. Dividir es repartir en partes iguales.",
            formula: "4 × 3 = 12 (tres veces cuatro) | 12 ÷ 3 = 4"
          },
          {
            title: "🧠 Jerarquía de Operaciones",
            text: "En operaciones combinadas, el orden es: 1º Paréntesis, 2º Multiplicaciones y Divisiones, 3º Sumas y Restas.",
            formula: "Ejemplo: 2 + (3 × 4) = 2 + 12 = 14"
          }
        ],
        interactiveType: "operations-tool"
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
      badge: "Páginas 7-8",
      description: "Descubre figuras planas, perímetro, área, ángulos rectos y figuras en 3D.",
      lesson: {
        intro: "La geometría estudia las formas de nuestro entorno: lados, esquinas (vértices) y ángulos.",
        keyPoints: [
          {
            title: "🟩 Figuras Geométricas Básicas",
            text: "Cuadrado (4 lados iguales), Rectángulo (lados opuestos iguales), Triángulo (3 lados) y Círculo (curva sin esquinas).",
            formula: "Cuadrado = 4 lados | Triángulo = 3 lados"
          },
          {
            title: "📏 Perímetro",
            text: "Es la medida del contorno o la cerca de una figura. Se obtiene sumando todos sus lados.",
            formula: "Perímetro = Lado + Lado + Lado + Lado"
          },
          {
            title: "🟦 Área",
            text: "Es la cantidad de espacio que ocupa una figura en una superficie.",
            formula: "Área de un rectángulo = Largo × Ancho"
          },
          {
            title: "📐 Ángulos y Cuerpos 3D",
            text: "Ángulo recto (90°, forma una 'L'). Cuerpos 3D como cubo, esfera, cilindro, cono y prisma tienen largo, ancho y alto.",
            formula: "Ángulo Agudo (<90°) | Recto (90°) | Obtuso (>90°)"
          }
        ],
        interactiveType: "geometry-tool"
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
      badge: "Páginas 4 y 10",
      description: "Aprende a comparar cantidades con razones, regla de tres, porcentajes y gráficas.",
      lesson: {
        intro: "A veces las cantidades cambian manteniendo una relación. La proporcionalidad nos permite predecir resultados.",
        keyPoints: [
          {
            title: "✏️ Razón y Proporción",
            text: "Una razón compara dos cantidades, por ejemplo: 2 lápices por cada 1 borrador. Una proporción indica que dos razones son equivalentes.",
            formula: "2 lápices / 1 borrador = 4 lápices / 2 borradores"
          },
          {
            title: "💯 Porcentajes",
            text: "Un porcentaje nos indica partes de un total de 100. El 50% significa la mitad (50 de cada 100).",
            formula: "50% = 50 / 100 = 1/2"
          },
          {
            title: "✖️ Regla de Tres Simple",
            text: "Nos ayuda a encontrar un dato desconocido multiplicando en cruz y dividiendo.",
            formula: "Si 1 cuaderno cuesta $10, ¿cuánto cuestan 3? (3 × 10) ÷ 1 = $30"
          },
          {
            title: "📊 Gráficas de Barras",
            text: "Representan información con barras para ver rápidamente cuál opción tiene más o menos votos.",
            formula: "Visualizar datos facilita comparar resultados."
          }
        ],
        interactiveType: "stats-tool"
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
      badge: "Páginas 6-7",
      description: "Descubre las partes de un todo con fracciones propias, impropias, equivalentes y números decimales.",
      lesson: {
        intro: "Las fracciones representan partes iguales de un todo (como una pizza o un pastel).",
        keyPoints: [
          {
            title: "🍕 Fracción y Decimal",
            text: "Una fracción indica cuántas partes tomamos (numerador arriba) de un total (denominador abajo).",
            formula: "1/2 = 0.5 (la mitad) | 1/4 = 0.25 (un cuarto)"
          },
          {
            title: "🍰 Fracción Propia e Impropia",
            text: "Propia: el numerador es menor (ej. 2/5). Impropia: el numerador es mayor o igual que el denominador (ej. 7/4).",
            formula: "2/5 es Propia | 7/4 es Impropia"
          },
          {
            title: "🤝 Fracciones Equivalentes",
            text: "Son fracciones diferentes que valen exactamente lo mismo. Ejemplo: 1/2 es igual a 2/4.",
            formula: "1/2 = 2/4 = 4/8"
          },
          {
            title: "🔢 Suma con mismo denominador",
            text: "Si los denominadores son iguales, se suman directamente los numeradores.",
            formula: "1/4 + 2/4 = 3/4"
          }
        ],
        interactiveType: "fraction-tool"
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
      badge: "Página 5",
      description: "El álgebra usa letras como 'x' para representar cantidades secretas que debemos descubrir.",
      lesson: {
        intro: "El álgebra es como resolver un juego de detectives usando letras para representar números desconocidos.",
        keyPoints: [
          {
            title: "🔍 Patrones y Sucesiones",
            text: "Una secuencia de números que sigue una regla. Por ejemplo: 2, 4, 6, 8... (suma 2 cada vez).",
            formula: "Patrón: +2 en cada salto"
          },
          {
            title: "❓ La Letra x (La Incógnita)",
            text: "Usamos letras como 'x' para representar un número secreto que aún no conocemos.",
            formula: "x = número secreto"
          },
          {
            title: "⚖️ La Igualdad es una Balanza",
            text: "El signo '=' indica que ambos lados de la balanza tienen el mismo valor exacto.",
            formula: "x + 5 = 12"
          },
          {
            title: "🎯 Resolver la Ecuación",
            text: "Para encontrar 'x', despejamos restando 5 a ambos lados: x = 12 - 5, entonces x = 7.",
            formula: "7 + 5 = 12 ✔️"
          }
        ],
        interactiveType: "algebra-tool"
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
        }
      ]
    }
  ]
};
