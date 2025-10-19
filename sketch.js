// --- VARIABLES GLOBALES ---

// Estado para controlar qué página se muestra ('landing' o 'demo')
let estado = 'landing'; 

// Variables para las imágenes
let img1, img2, img3, img4;

// Variables para el video de introducción
let introVideo;
let videoIsPlaying = false;

// Paleta de colores para consistencia
const colorFondo = 255;      // Blanco
const colorTexto = '#333333';  // Gris oscuro
const colorPrincipal = '#007BFF'; // Azul
const colorGrisClaro = '#F8F9FA'; // Gris muy claro para fondos

// --- CICLO DE VIDA DE P5.JS ---

function preload() {
  // Carga todas las imágenes desde la carpeta 'assets'
  img1 = loadImage('assets/indice.png');     // Para 'Quiénes somos'
  img2 = loadImage('assets/conocenos.png');   // Para 'Conócenos'
  img3 = loadImage('assets/politicas.png');  // Para 'Políticas de Privacidad'
  img4 = loadImage('assets/contacto.png');    // Para 'Regístrate'
}

function setup() {
  // Crea un canvas que ocupe toda la ventana
  createCanvas(windowWidth, windowHeight);
  
  // Configuración de texto por defecto
  textAlign(CENTER, CENTER);
  
  // Carga el video, lo oculta por defecto y asigna una función para cuando termine
  introVideo = createVideo(['assets/tulana.mp4']);
  introVideo.hide();
  introVideo.onended(videoFinished); 
}

function draw() {
  // --- LÓGICA DE VISUALIZACIÓN ---
  
  if (videoIsPlaying) {
    // 1. Si el video se está reproduciendo, mostrarlo en toda la pantalla
    background(0); // Fondo negro
    image(introVideo, 0, 0, width, height);
  } else {
    // 2. Si no, mostrar la página correspondiente al estado actual
    if (estado === 'landing') {
      drawLandingPage();
    } else if (estado === 'demo') {
      drawDemoPage();
    }
  }
}

// Función para ajustar el canvas si cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --- FUNCIONES DE DIBUJO DE PÁGINAS ---

function drawLandingPage() {
  background(colorFondo);
  
  // Título principal
  fill(colorTexto);
  textSize(width * 0.1 > 80 ? 80 : width * 0.1); // Tamaño de texto responsive
  text('TuLana', width / 2, height / 3);

  // Botón "Go"
  let btnW = 200;
  let btnH = 60;
  let btnX = width / 2 - btnW / 2;
  let btnY = height / 2;
  
  // Efecto hover para el botón
  if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
    fill(colorPrincipal);
    cursor(HAND);
  } else {
    fill(colorTexto);
    cursor(ARROW);
  }
  
  noStroke();
  rect(btnX, btnY, btnW, btnH, 10); // Botón con esquinas redondeadas
  
  // Texto del botón
  fill(colorFondo);
  textSize(24);
  text('GO', width / 2, btnY + btnH / 2);
}

function drawDemoPage() {
  background(colorGrisClaro);

  // --- Dibuja las 4 imágenes demo y sus textos ---
  // Lógica responsiva: se apilan en móvil, se alinean en escritorio
  if (width < 768) { // VISTA MÓVIL
    let imgSize = width * 0.4;
    let spacing = height * 0.05;
    let startY = height * 0.1;
    
    image(img1, width/2 - imgSize/2, startY, imgSize, imgSize);
    text('Quiénes somos', width/2, startY + imgSize + 15);
    
    image(img2, width/2 - imgSize/2, startY + imgSize + spacing, imgSize, imgSize);
    text('Conócenos', width/2, startY + imgSize * 2 + spacing + 15);

    // ... (Se pueden agregar las demás imágenes siguiendo el patrón)

  } else { // VISTA ESCRITORIO
    let numImages = 4;
    let padding = width * 0.1;
    let totalContentWidth = width - (padding * 2);
    let spacing = 40;
    let imgW = (totalContentWidth - (spacing * (numImages - 1))) / numImages;
    let imgH = imgW;
    let startX = padding;
    let startY = height * 0.25;
    let labels = ['Quiénes somos', 'Conócenos', 'Políticas', 'Regístrate'];
    let images = [img1, img2, img3, img4];

    for (let i = 0; i < numImages; i++) {
      let currentX = startX + i * (imgW + spacing);
      image(images[i], currentX, startY, imgW, imgH);
      fill(colorTexto);
      textSize(18);
      text(labels[i], currentX + imgW / 2, startY + imgH + 25);
    }
  }

  // --- Botón para ver la introducción ---
  let introBtnW = 250;
  let introBtnH = 50;
  let introBtnX = width / 2 - introBtnW / 2;
  let introBtnY = height * 0.8;
  
  if (mouseX > introBtnX && mouseX < introBtnX + introBtnW && mouseY > introBtnY && mouseY < introBtnY + introBtnH) {
    fill(colorPrincipal);
    cursor(HAND);
  } else {
    fill(colorTexto);
  }
  
  noStroke();
  rect(introBtnX, introBtnY, introBtnW, introBtnH, 10);
  
  fill(colorFondo);
  textSize(20);
  text('Ver Intro', width / 2, introBtnY + introBtnH / 2);
}

// --- MANEJO DE INTERACCIONES ---

function mousePressed() {
  if (estado === 'landing') {
    // Lógica del botón "Go" en la landing page
    let btnW = 200;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2;
    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
      estado = 'demo'; // Cambia a la página demo
    }
  } else if (estado === 'demo') {
    // Lógica del botón "Ver Intro" en la página demo
    let introBtnW = 250;
    let introBtnH = 50;
    let introBtnX = width / 2 - introBtnW / 2;
    let introBtnY = height * 0.8;
    if (mouseX > introBtnX && mouseX < introBtnX + introBtnW && mouseY < introBtnY + introBtnH) {
      if (!videoIsPlaying) {
        introVideo.play();
        videoIsPlaying = true;
      }
    }
  }
}

// Función que se llama automáticamente cuando el video termina
function videoFinished() {
  videoIsPlaying = false;
  cursor(ARROW); // Restaura el cursor por si acaso
}
