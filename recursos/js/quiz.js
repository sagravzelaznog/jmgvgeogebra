/**
 * Motor del Quiz Interactivo (Estilo Kahoot)
 * Integrado con PDF y Firebase Auth
 */

document.addEventListener('DOMContentLoaded', () => {
    // Determinar el nivel actual basado en la URL
    const path = window.location.pathname;
    let currentLevel = null;
    if (path.includes('basico')) currentLevel = 'basico';
    else if (path.includes('intermedio')) currentLevel = 'intermedio';
    else if (path.includes('avanzado')) currentLevel = 'avanzado';

    if (currentLevel && typeof QUIZ_DATA !== 'undefined') {
        initQuiz(currentLevel);
    }
});

let currentQuizData = [];
let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];

const BTN_COLORS = ['btn-red', 'btn-blue', 'btn-yellow', 'btn-green'];
const SHAPES = [
    '<div class="shape-triangle"></div>',
    '<div class="shape-diamond"></div>',
    '<div class="shape-circle"></div>',
    '<div class="shape-square"></div>'
];

function initQuiz(level) {
    currentQuizData = QUIZ_DATA[level] || [];
    if (currentQuizData.length === 0) return;

    // Asegurarse de que el contenedor exista
    let container = document.getElementById('quiz-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'quiz-container';
        container.className = 'mt-5 mb-5';
        document.querySelector('.col-lg-8').appendChild(container); // Inyectar al final del contenido principal
    }

    container.innerHTML = `
        <div class="card shadow-sm border-primary">
            <div class="card-header bg-primary text-white text-center py-3">
                <h3 class="mb-0">Evaluación del Nivel</h3>
                <p class="mb-0 text-white-50">Demuestra lo que has aprendido</p>
            </div>
            <div class="card-body p-4" id="quiz-body">
                <div class="text-center">
                    <button id="start-quiz-btn" class="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold" style="font-size: 1.2rem;">
                        <i class="bi bi-play-circle-fill me-2"></i> Comenzar Evaluación
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        userResponses = [];
        loadQuestion();
    });
}

function loadQuestion() {
    const quizBody = document.getElementById('quiz-body');
    const questionData = currentQuizData[currentQuestionIndex];

    let html = `
        <div class="quiz-header text-center mb-4">
            <span class="badge bg-secondary mb-2">Pregunta ${currentQuestionIndex + 1} de ${currentQuizData.length}</span>
            <h3 class="fw-bold">${questionData.question}</h3>
        </div>
        <div class="btn-grid">
    `;

    questionData.answers.forEach((answer, index) => {
        html += `
            <button class="btn-kahoot ${BTN_COLORS[index]}" onclick="selectAnswer(${index})">
                <span class="shape-container">${SHAPES[index]}</span>
                <span class="answer-text">${answer.text}</span>
            </button>
        `;
    });

    html += `</div>`;
    quizBody.innerHTML = html;
}

window.selectAnswer = (selectedIndex) => {
    const questionData = currentQuizData[currentQuestionIndex];
    const isCorrect = questionData.answers[selectedIndex].correct;
    
    // Guardar respuesta
    userResponses.push({
        question: questionData.question,
        selected: questionData.answers[selectedIndex].text,
        correctText: questionData.answers.find(a => a.correct).text,
        isCorrect: isCorrect
    });

    if (isCorrect) score++;

    // Deshabilitar botones para evitar clics dobles
    const buttons = document.querySelectorAll('.btn-kahoot');
    buttons.forEach(btn => btn.disabled = true);

    // Animación visual rápida (opcional) o pasar a la siguiente
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 500);
};

function showResults() {
    const quizBody = document.getElementById('quiz-body');
    const percentage = Math.round((score / currentQuizData.length) * 100);
    let message = percentage >= 80 ? '¡Excelente trabajo!' : 'Sigue practicando, puedes mejorar.';
    let iconColor = percentage >= 80 ? 'text-success' : 'text-warning';

    quizBody.innerHTML = `
        <div class="text-center animate-fade-in">
            <i class="bi bi-trophy-fill ${iconColor}" style="font-size: 4rem;"></i>
            <h2 class="mt-3">Resultados Finales</h2>
            <p class="lead">${message}</p>
            <div class="display-4 fw-bold mb-4">${score} / ${currentQuizData.length}</div>
            <p>Porcentaje de acierto: <strong>${percentage}%</strong></p>
            
            <button id="download-pdf-btn" class="btn btn-danger btn-lg mt-3 me-2">
                <i class="bi bi-file-earmark-pdf-fill me-2"></i> Descargar Constancia PDF
            </button>
            <button class="btn btn-outline-primary btn-lg mt-3" onclick="initQuiz(window.location.pathname.split('/').slice(-2)[0] || 'basico')">
                <i class="bi bi-arrow-clockwise me-2"></i> Repetir Evaluación
            </button>
        </div>
    `;

    document.getElementById('download-pdf-btn').addEventListener('click', generatePDF);

    // Guardar en Firebase (función expuesta globalmente en firebase-config.js)
    if (typeof window.saveResultToDatabase === 'function') {
        const user = firebase.auth().currentUser;
        const studentName = user ? (user.displayName || user.email) : 'Anónimo';
        
        // Obtener el nivel limpiamente
        const pathSegments = window.location.pathname.split('/');
        // Filtrar vacíos
        const validSegments = pathSegments.filter(s => s.length > 0 && s !== 'index.html');
        const level = validSegments[validSegments.length - 1] || 'GeoGebra';

        window.saveResultToDatabase(studentName, `Nivel ${level.toUpperCase()}`, score, currentQuizData.length, userResponses);
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const user = firebase.auth().currentUser;
    const studentName = user ? (user.displayName || user.email) : 'Estudiante';
    
    const pathSegments = window.location.pathname.split('/');
    const validSegments = pathSegments.filter(s => s.length > 0 && s !== 'index.html');
    const level = validSegments[validSegments.length - 1] || 'GeoGebra';
    
    // Título y encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(13, 110, 253); // Azul primary
    doc.text("Reporte de Evaluación - GeoGebra", 14, 25);
    
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text(`Nivel: ${level.toUpperCase()}`, 14, 35);
    
    // Datos del alumno
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Alumno: ${studentName}`, 14, 45);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 52);
    
    // Resultado final
    doc.setFont("helvetica", "bold");
    doc.text(`Puntuación Final: ${score} de ${currentQuizData.length}`, 14, 62);
    
    // Generar tabla detallada
    const tableData = userResponses.map((r, i) => [
        i + 1,
        r.question,
        r.selected,
        r.correctText,
        r.isCorrect ? "Correcto" : "Incorrecto"
    ]);

    doc.autoTable({
        startY: 70,
        head: [['#', 'Pregunta', 'Tu Respuesta', 'Respuesta Correcta', 'Estado']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [13, 110, 253] },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 60 },
            2: { cellWidth: 45 },
            3: { cellWidth: 45 },
            4: { cellWidth: 25 }
        },
        didParseCell: function(data) {
            if (data.section === 'body' && data.column.index === 4) {
                if (data.cell.raw === 'Correcto') {
                    data.cell.styles.textColor = [40, 167, 69]; // Verde
                    data.cell.styles.fontStyle = 'bold';
                } else {
                    data.cell.styles.textColor = [220, 53, 69]; // Rojo
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        }
    });
    
    // Descargar el archivo
    doc.save(`GeoGebra_Reporte_${level}_${studentName.replace(/\\s+/g, '_')}.pdf`);
}
