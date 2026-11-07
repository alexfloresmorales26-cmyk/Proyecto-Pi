/* ==========================================================================
   CONFIGURACION DE FIREBASE - RANKING GLOBAL (Realtime Database)
   ==========================================================================

   PASOS PARA ACTIVAR EL RANKING (gratis):
   1) Entra a https://console.firebase.google.com con tu cuenta de Google y
      crea un proyecto (por ejemplo: "matematica-basica-ranking").
   2) En el panel izquierdo: Build -> Realtime Database -> "Create Database"
      -> elige una region cercana (ej. us-central1) -> modo "Start in test
      mode" (permite lectura y escritura publica) -> Enable.
   3) Copia la "databaseURL" que te muestra (ejemplo:
      https://matematica-basica-ranking-default-rtdb.firebaseio.com/)
   4) (Opcional) En Project settings -> "Your apps" -> agrega una app Web </>
      para copiar los demas valores (apiKey, projectId...).
   5) Pega los valores abajo y recarga la pagina. Mientras queden los textos
      "PEGA_AQUI", el ranking queda desactivado y no molesta en la app.
   ========================================================================== */

const FIREBASE_CONFIG = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  databaseURL: "PEGA_AQUI_TU_DATABASE_URL",
  projectId: "PEGA_AQUI_TU_PROJECT_ID"
};

// Bandera global: true solo cuando ya pegaste los valores reales de Firebase
window.firebaseConfigured = !String(FIREBASE_CONFIG.databaseURL).includes("PEGA_AQUI");
