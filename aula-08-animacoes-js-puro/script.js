// IMPORTANTE: copie as funções/estilos de ../aula-01-animacoes-css-puro para continuar

// Exemplo: Quadrado "caindo" com requestAnimationFrame
const box = document.createElement('div');
box.className = 'box';
document.querySelector('main').appendChild(box);

let posY = 0;
function animarQueda() {
  if (posY < 300) {
    posY += 4;
    box.style.top = posY + 'px';
    requestAnimationFrame(animarQueda);
  }
}
box.addEventListener('click', () => {
  posY = 0;
  box.style.top = '0px';
  animarQueda();
});

// Exercício 1: Contador animado (0 → 100)
const counter = document.createElement('div');
counter.className = 'counter';
counter.textContent = '0';
document.querySelector('main').appendChild(counter);

const btnContar = document.createElement('button');
btnContar.textContent = 'Iniciar Contador';
document.querySelector('main').appendChild(btnContar);

btnContar.addEventListener('click', () => {
  let n = 0;
  counter.textContent = '0';
  const interval = setInterval(() => {
    n++;
    counter.textContent = n;
    if (n >= 100) clearInterval(interval);
  }, 1000);
});

// Exercício 2: Slider de imagens animado
const slider = document.createElement('div');
slider.className = 'slider';
document.querySelector('main').appendChild(slider);

const imgs = ['https://placekitten.com/320/180', 'https://placebear.com/320/180', 'https://placehold.co/320x180'];
let idx = 0;
imgs.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.style.left = (i === 0 ? '0' : '320') + 'px';
  slider.appendChild(img);
});

const btnNext = document.createElement('button');
btnNext.textContent = 'Próxima imagem';
document.querySelector('main').appendChild(btnNext);

btnNext.addEventListener('click', () => {
  const images = slider.querySelectorAll('img');
  const prev = idx;
  idx = (idx + 1) % imgs.length;
  let pos = 0;
  function slide() {
    pos += 16;
    images[prev].style.left = -pos + 'px';
    images[idx].style.left = (320 - pos) + 'px';
    if (pos < 320) {
      requestAnimationFrame(slide);
    } else {
      images[prev].style.left = '320px';
      images[idx].style.left = '0px';
    }
  }
  slide();
});

// Exercício 3: Parallax simples ao scroll
const parallax = document.createElement('div');
parallax.className = 'parallax';
document.querySelector('main').appendChild(parallax);
parallax.textContent = 'Parallax: role a página!';

window.addEventListener('scroll', () => {
  try {
    const y = window.scrollY;
    parallax.style.transform = `translateY(${y * 0.3}px)`;
  } catch (e) {
    console.error('Erro no parallax:', e);
  }
});

// Desafio: Loader animado
// Copilot: Implemente um loader que desaparece após 2s
