/* ==========================================================================
   BASE DE DATOS EN LA NUBE - RANKING GLOBAL
   ==========================================================================
   Almacenamiento compartido en la nube via API publica de restful-api.dev
   (sin cuentas ni claves). Guarda el registro de todos los jugadores en un
   solo objeto JSON ("data.players").

   NOTA: esta API es de practica, por lo que los datos podrian limpiarse
   en cupos largos de tiempo. Si algun dia hay que migrar (ej. a Firebase
   Realtime Database), solo cambia `endpoint`, `objectId` y las llamadas de
   app.js en la seccion RANKING GLOBAL.
   ========================================================================== */

const CLOUD_DB = {
  endpoint: "https://api.restful-api.dev",
  objectId: "ff808181a09d98f701a1b7ab2c0a5f2c",
  prefix: "mb-rank-"
};

// Bandera global para que la app sepa que hay almacenamiento en la nube
window.cloudConfigured = !!(CLOUD_DB && CLOUD_DB.endpoint && CLOUD_DB.objectId);
