// Configuración de Firebase para CDN (Compat)
const firebaseConfig = {
    apiKey: window.ENV ? window.ENV.FIREBASE_API_KEY : "",
    authDomain: "acceso-a-cursos-4a314.firebaseapp.com",
    projectId: "acceso-a-cursos-4a314",
    storageBucket: "acceso-a-cursos-4a314.firebasestorage.app",
    messagingSenderId: "851856735092",
    appId: "1:851856735092:web:04290714cb63e4244c4a21",
    measurementId: "G-ZG280G922Y"
};

let db = null;

try {
    // Inicializar Firebase usando el objeto global `firebase` inyectado por los CDNs
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("Firebase inicializado correctamente con tus credenciales.");
} catch (error) {
    console.error("Error inicializando Firebase:", error);
}

/**
 * Guarda el resultado del quiz en Firebase Firestore
 * @param {string} userName - Nombre del estudiante
 * @param {number} sessionNum - Número de la sesión
 * @param {number} score - Calificación obtenida
 * @param {number} totalQuestions - Total de preguntas
 * @param {Array} resultsData - Array con el desglose de preguntas
 */
const saveResultToDatabase = async (userName, sessionNum, score, totalQuestions, resultsData) => {
    if (!db) {
        console.warn("No se puede guardar el resultado: Firebase no está configurado o falló al iniciar.");
        return;
    }

    try {
        await db.collection("resultados_quiz").add({
            nombreUsuario: userName,
            sesion: sessionNum,
            puntaje: score,
            totalPreguntas: totalQuestions,
            detalles: resultsData,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Resultado guardado en la base de datos con éxito.");
    } catch (e) {
        console.error("Error al guardar en la base de datos (revisa las reglas de Firestore): ", e);
    }
};
