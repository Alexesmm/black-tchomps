// efeito de fade-in ao rolar a página
function revealOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Revela o elemento um pouco antes de ele atingir o meio da tela
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);

// scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o efeito de fade-in nos elementos q ja estavam visiveis
  revealOnScroll();

  // Ano automático no rodapé
  const anoSpan = document.getElementById('ano');
  if (anoSpan) anoSpan.textContent = new Date().getFullYear();

  // Formulário de contato (simulação)
  const formContato = document.getElementById('formContato');
  if(formContato){
      formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        const msgDiv = document.getElementById('contatoMsg');
        msgDiv.innerText = "Mensagem enviada! (apenas demonstração)";
        msgDiv.style.color = "var(--verde-destaque)";
        this.reset();
        setTimeout(() => { msgDiv.innerText = ""; }, 3000); // limpa a mensagem dps de 3 segundos
      });
  }


  // ---- CARROSSEL DE PRODUTOS CORRIGIDO ----
  const track = document.getElementById("carouselTrack");
  if (track) {
    const cards = track.querySelectorAll(".product-card");
    const btnPrev = document.getElementById("prevProduto");
    const btnNext = document.getElementById("nextProduto");
    let currentIndex = 0;
    const totalItems = cards.length;

    function updateCarousel() {
      // Pega a largura do contêiner "viewport"
      const itemWidth = track.parentElement.clientWidth;
      // Move o trilho para a esquerda baseado no índice atual
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

      // Habilita/desabilita botões
      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === totalItems - 1;
    }

    btnNext.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    btnPrev.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Atualiza o carrossel se a janela for redimensionada
    window.addEventListener('resize', updateCarousel);
    // Inicializa o carrossel
    updateCarousel();
  }
});