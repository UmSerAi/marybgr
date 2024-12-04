let isInInitialSection = true; // Controla se estamos na seção inicial
let isScrolling = false; // Flag para impedir detecção durante a animação
const threshold = window.innerHeight * 0.99; // Limiar em pixels para detectar o retorno

// Função para habilitar a rolagem e ir para uma seção específica
function enableScrollAndGoToContent(targetId) {
    // Ativar a rolagem e garantir que a rolagem horizontal seja desativada
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden"; // Desativa a rolagem horizontal

    // Desativar a detecção temporariamente durante o movimento
    isScrolling = true;
    isInInitialSection = false;

    // Identificar a seção alvo dinamicamente pelo ID
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        // Rolar suavemente para a seção correspondente
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Após a animação, reativar a detecção
    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Tempo para completar a animação (ajustável)
}

  

// Função para detecção de rolagem para a seção inicial
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;

  // Se a flag de animação estiver ativa, não faça nada
  if (isScrolling) return;

  // Detecta se o usuário voltou para a seção inicial
  if (scrollTop <= threshold && !isInInitialSection) {
    // Bloquear rolagem e voltar ao comportamento inicial
    document.body.style.overflow = "hidden";
    isInInitialSection = true;

    // Rolar suavemente para a seção inicial
    document.querySelector('.full-screen').scrollIntoView({
      behavior: 'smooth'
    });
  }
});

window.addEventListener('load', () => {
    // Volta para a seção inicial ao recarregar a página
    const initialSection = document.querySelector('.full-screen');
    if (initialSection) {
      initialSection.scrollIntoView({ behavior: 'smooth' });
    }
  
    // Bloqueia a rolagem se estiver na tela inicial
    document.body.style.overflow = "hidden";
    isInInitialSection = true;
  });
  
