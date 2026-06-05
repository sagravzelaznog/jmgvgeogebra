/**
 * Curso GeoGebra - Módulo Principal (Refactorizado con ES6+)
 * Incluye delegación de eventos y API moderna de portapapeles.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar tooltips de Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));

    // 2. Delegación de eventos centralizada para clics interactivos
    document.body.addEventListener('click', (e) => {
        // A. Mostrar/Ocultar soluciones
        if (e.target.matches('.mostrar-solucion')) {
            const btn = e.target;
            const solucion = btn.nextElementSibling;
            if (!solucion || !solucion.classList.contains('solucion')) return;

            const isVisible = solucion.style.display === 'block';
            solucion.style.display = isVisible ? 'none' : 'block';
            btn.textContent = isVisible ? 'Mostrar solución' : 'Ocultar solución';
            solucion.classList.toggle('animate-fade-in');
        }

        // B. Navegación suave para anclas (Scroll Smooth)
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Compensa el Navbar fijo
                    behavior: 'smooth'
                });
            }
        }
    });

    // 3. Manejo de Applets de GeoGebra
    const loadGeoGebra = (appletId, filename) => {
        const applet = document.getElementById(appletId);
        if (!applet) return;
        
        // Placeholder para la librería de GeoGebra
        console.log(`[GeoGebra] Preparando applet: ${filename} en contenedor #${appletId}`);
    };

    document.querySelectorAll('[data-geogebra]').forEach(applet => {
        const filename = applet.dataset.geogebra;
        loadGeoGebra(applet.id, filename);
    });

    // 4. Manejo unificado de envío de formularios
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(`Formulario #${form.id || 'sin-id'} enviado correctamente.`);
        });
    });

    // 5. Inicializar el Modo Oscuro al cargar
    initDarkMode();
});

/**
 * Copia el código al portapapeles usando la API moderna (Async/Await)
 * @param {string} elementId - ID del elemento que contiene el texto a copiar
 */
window.copyToClipboard = async (elementId) => {
    const codeElement = document.getElementById(elementId);
    if (!codeElement) return;

    try {
        await navigator.clipboard.writeText(codeElement.textContent);
        alert('¡Código copiado al portapapeles! ✅');
    } catch (err) {
        console.error('Error al copiar el texto: ', err);
        alert('No se pudo copiar el código. ❌');
    }
};

/**
 * Manejador del Tema Oscuro (Dark Mode)
 */
window.toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeIcon(isDarkMode);
};

const initDarkMode = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeIcon(isDarkMode);
};

const updateDarkModeIcon = (isDarkMode) => {
    const icon = document.getElementById('dark-mode-icon');
    if (icon) {
        icon.className = isDarkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
};
