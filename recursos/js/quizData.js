const QUIZ_DATA = {
    "basico": [
        { question: "¿Qué herramienta te permite dibujar un segmento entre dos puntos en GeoGebra?", answers: [{text: "Herramienta Polígono", correct: false}, {text: "Herramienta Recta", correct: false}, {text: "Herramienta Segmento", correct: true}, {text: "Herramienta Intersección", correct: false}] },
        { question: "¿En qué vista puedes introducir ecuaciones matematicas manualmente?", answers: [{text: "Vista Gráfica", correct: false}, {text: "Barra de Entrada", correct: true}, {text: "Barra de Herramientas", correct: false}, {text: "Vista 3D", correct: false}] },
        { question: "¿Qué tecla debes mantener presionada al mover un punto para que solo se desplace horizontal o verticalmente?", answers: [{text: "Shift", correct: false}, {text: "Alt", correct: false}, {text: "Ctrl", correct: true}, {text: "Tab", correct: false}] },
        { question: "¿Cuál es el comando correcto para graficar una parábola simple?", answers: [{text: "y = x*2", correct: false}, {text: "y = x^2", correct: true}, {text: "y(x) = 2", correct: false}, {text: "parabola(x)", correct: false}] },
        { question: "En la Vista Algebraica, ¿qué se muestra principalmente?", answers: [{text: "Los botones de colores", correct: false}, {text: "Las figuras geométricas pintadas", correct: false}, {text: "La página web oficial", correct: false}, {text: "Las coordenadas y ecuaciones de los objetos gráficos", correct: true}] }
    ],
    "intermedio": [
        { question: "¿Qué función se usa en GeoGebra para encontrar la derivada de una función f(x)?", answers: [{text: "Derivative(f(x))", correct: false}, {text: "Derivada(f)", correct: true}, {text: "f'(x) o Derivada(f)", correct: true}, {text: "Integral(f)", correct: false}] },
        { question: "¿Para qué sirve la herramienta 'Deslizador' (Slider)?", answers: [{text: "Para borrar el pizarrón", correct: false}, {text: "Para cambiar dinámicamente el valor de un parámetro", correct: true}, {text: "Para deslizar la pantalla hacia abajo", correct: false}, {text: "Para guardar el archivo", correct: false}] },
        { question: "¿Qué comando dibuja una curva rellenando el área bajo la curva f(x) desde a hasta b?", answers: [{text: "Integral(f, a, b)", correct: true}, {text: "Area(f)", correct: false}, {text: "Fill(f, a, b)", correct: false}, {text: "Rellenar(f, a, b)", correct: false}] },
        { question: "¿Qué herramienta te permite reflejar un objeto respecto a una recta?", answers: [{text: "Simetría Axial", correct: true}, {text: "Rotación", correct: false}, {text: "Traslación", correct: false}, {text: "Homotecia", correct: false}] },
        { question: "¿Qué sucede si cambias un punto libre que fue usado para construir una circunferencia?", answers: [{text: "La circunferencia se borra", correct: false}, {text: "Aparece un error en rojo", correct: false}, {text: "La circunferencia cambia de tamaño o posición dinámicamente", correct: true}, {text: "La ecuación se bloquea", correct: false}] }
    ],
    "avanzado": [
        { question: "¿Cuál es la principal diferencia al trabajar en la Vista Gráfica 3D?", answers: [{text: "Se utiliza el eje Z además del X y el Y", correct: true}, {text: "El fondo siempre es negro", correct: false}, {text: "No se pueden ingresar ecuaciones", correct: false}, {text: "Requiere gafas especiales", correct: false}] },
        { question: "¿Qué herramienta crea un sólido base extruyendo un polígono en la Vista 3D?", answers: [{text: "Prisma o Cilindro desde su base", correct: true}, {text: "Desarrollo", correct: false}, {text: "Simetría Especular", correct: false}, {text: "Esfera con Centro", correct: false}] },
        { question: "¿Qué comando sirve para calcular la media de una lista de datos estadísticos 'L1'?", answers: [{text: "Promedio(L1)", correct: false}, {text: "Media(L1)", correct: true}, {text: "Mean(L1)", correct: false}, {text: "Estadistica(L1)", correct: false}] },
        { question: "En GeoGebra, ¿cómo defines una matriz A de 2x2?", answers: [{text: "A = [ [1, 2], [3, 4] ]", correct: false}, {text: "A = {(1, 2), (3, 4)}", correct: false}, {text: "A = {{1, 2}, {3, 4}}", correct: true}, {text: "Matriz(1,2,3,4)", correct: false}] },
        { question: "¿Qué es el 'Rastro' (Trace) de un objeto en GeoGebra?", answers: [{text: "Un archivo de log de errores", correct: false}, {text: "La huella gráfica que deja un objeto animado al moverse", correct: true}, {text: "La sombra 3D del objeto", correct: false}, {text: "El color del borde", correct: false}] }
    ]
};
