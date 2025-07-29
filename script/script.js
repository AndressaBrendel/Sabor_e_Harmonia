document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica Comum para Ambas as Páginas ---

  // Suaviza a transição para a página de login
  const userIcon = document.querySelector(".user-icon");
  if (userIcon) {
    userIcon.addEventListener("click", function (e) {
      e.preventDefault();
      setTimeout(() => {
        window.location.href = this.href;
      }, 300);
    });
  } else {
    console.warn(
      "Ícone de usuário (.user-icon) não encontrado. A transição suave para login pode não funcionar."
    );
  }

  // Lógica do Carrossel de Avaliações (presente apenas em index.html, mas o JS não dará erro em index_pag2.html)
 const track = document.querySelector(".review .box-container");
    const items = document.querySelectorAll(".review .box-content");
    const prevBtn = document.querySelector(".review .nav-arrow.left");
    const nextBtn = document.querySelector(".review .nav-arrow.right");
    
    if (track && items.length > 0) {
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth;
        const gap = 20; // Ajuste conforme o gap no CSS
        
        function updateCarousel() {
            const scrollPosition = currentIndex * (itemWidth + gap);
            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // Atualiza estado dos botões
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
            prevBtn.style.cursor = currentIndex === 0 ? "not-allowed" : "pointer";
            
            nextBtn.style.opacity = currentIndex >= items.length - 1 ? "0.5" : "1";
            nextBtn.style.cursor = currentIndex >= items.length - 1 ? "not-allowed" : "pointer";
        }
        
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener("click", () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Inicializa
        updateCarousel();
    };


  // Lógica para o menu hamburguer (se houver, não vi o '#menu-btn' no HTML fornecido)
  const menuBtn = document.querySelector("#menu-btn"); // Verifique se este ID existe no seu HTML
  const navbar = document.querySelector(".navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navbar.classList.toggle("active");
    });

    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("active")) {
          menuBtn.classList.remove("active");
          navbar.classList.remove("active");
        }
      });
    });
  } else {
    console.warn(
      "Elementos do menu hamburguer (ID #menu-btn) não encontrados. Verifique as IDs/classes HTML."
    );
  }

  // Lógica de rolagem suave para links da navbar (home.html)
  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Verifica se é um link interno (para âncora) e não um link externo ou para outra página HTML
      if (
        targetId &&
        targetId.startsWith("#") &&
        targetId.length > 1 &&
        window.location.pathname.endsWith("index.html")
      ) {
        e.preventDefault(); // Impede o comportamento padrão apenas para links internos na index.html

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        } else {
          console.warn(
            `Elemento com ID "${targetId}" não encontrado para rolagem suave.`
          );
        }
      }
      // Se for um link de navegação para outra página (ex: index_pag2.html), o comportamento padrão de navegação funcionará.
      // Se for um link de volta para index.html de outra página, o JS de seleção de dieta cuidará disso se for um 'dieta-btn'.

      // Fecha o menu hamburguer, se estiver aberto
      if (menuBtn && navbar && menuBtn.classList.contains("active")) {
        menuBtn.classList.remove("active");
        navbar.classList.remove("active");
      }
    });
  });

  // --- Lógica Específica para a Página Inicial (index.html) ---
  // Detecta se estamos na página inicial para adicionar listeners de dieta
  if (
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("/index.html")
  ) {
    const botoesDieta = document.querySelectorAll(".dieta-btn"); // Seleciona os botões de dieta

    botoesDieta.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link

        const dietaSelecionada = this.dataset.dieta; // Pega o valor do atributo data-dieta
        const targetPage = this.dataset.targetPage; // Pega a página de destino

        if (dietaSelecionada && targetPage) {
          localStorage.setItem("dietaEscolhida", dietaSelecionada); // Salva a escolha
          // Adiciona um pequeno atraso para efeito visual, como já faz com o user-icon
          setTimeout(() => {
            window.location.href = targetPage;
          }, 200);
        } else {
          console.error(
            "Botão de dieta sem 'data-dieta' ou 'data-target-page' configurado.",
            this
          );
        }
      });
    });
    console.log("Lógica da página inicial (seleção de dieta) carregada.");

    // Este bt de cardápio na home leva ao menu, mas não seleciona dieta.
    // Se você quiser que ele leve para a pag2 sem filtro, pode manter o href direto.
    // Se quiser que ele peça para selecionar uma dieta ou leve para um padrão, o JS precisaria de mais lógica.
    const conhecaCardapioBtn = document.querySelector("#home .btn");
    if (conhecaCardapioBtn) {
      conhecaCardapioBtn.addEventListener("click", function (e) {
        // Limpa a dieta para garantir que nada seja pré-selecionado se o usuário for por aqui.
        localStorage.removeItem("dietaEscolhida");
      });
    }
  }

  // --- Lógica Específica para a Página do Cardápio (index_pag2.html) ---
  // Detecta se estamos na página index_pag2.html para aplicar a filtragem
  if (window.location.pathname.includes("index_pag2.html")) {
    const dietaEscolhida = localStorage.getItem("dietaEscolhida");
    const todosOsCards = document.querySelectorAll(".box-container .box"); // Seleciona todos os cards de comida
    const botoesDeCard = document.querySelectorAll(".card-btn"); // Seleciona os botões de PDF dentro dos cards

    // Exibe a dieta selecionada (opcional, para feedback ao usuário)
    const tituloDieta = document.createElement("h3");
    tituloDieta.style.textAlign = "center";
    tituloDieta.style.marginTop = "20px";

    if (dietaEscolhida) {
      tituloDieta.textContent = `Você está vendo opções ${dietaEscolhida.replace(
        "_",
        " "
      )}:`; // ex: "Opções vegano"
      document.querySelector(".menu_cafe").prepend(tituloDieta); // Adiciona antes do título do Café da Manhã

      // 1. Mostrar/Esconder Cards baseados na dieta
      todosOsCards.forEach((card) => {
        const dietasPermitidas = card.dataset.dietas
          ? card.dataset.dietas.split(",")
          : [];

        if (!dietasPermitidas.includes(dietaEscolhida)) {
          card.style.display = "none"; // Esconde o card
        } else {
          card.style.display = ""; // Garante que o card seja visível
        }
      });

      // 2. Ajustar os links dos PDFs nos botões dos cards
      botoesDeCard.forEach((botao) => {
        const menuTipo = botao.dataset.menuTipo; // ex: 'salgados', 'doces'
        let pdfPath = "#"; // Fallback se não encontrar PDF ou não houver dieta

        if (menuTipo) {
          // Constrói o caminho do PDF dinamicamente
          // Exemplo: ./pdf_menus/salgados_vegano.pdf
          pdfPath = `../pdf_menus/${menuTipo}_${dietaEscolhida}.pdf`; // Ajustado para '..'
        }

        botao.href = pdfPath;
        botao.target = "_blank"; // Abre em nova aba
      });

      console.log(
        `Lógica da página de cardápio carregada. Dieta selecionada: ${dietaEscolhida}`
      );
    } else {
      // Se nenhuma dieta foi escolhida (usuário acessou a página diretamente)
      // Você pode decidir se mostra tudo, esconde tudo, ou redireciona.
      // Por padrão, vou mostrar tudo, mas os PDFs serão genéricos ou levarão a #
      console.warn(
        "Nenhuma dieta selecionada no LocalStorage. Mostrando todos os cards, mas links de PDF podem ser genéricos."
      );
      tituloDieta.textContent =
        "Selecione uma dieta na página inicial para filtros específicos.";
      document.querySelector(".menu_cafe").prepend(tituloDieta);

      // Garante que todos os cards estejam visíveis (no caso de um retorno sem dieta)
      todosOsCards.forEach((card) => {
        card.style.display = "";
      });

      // PDFs sem dieta podem apontar para # ou para uma versão padrão se existir
      botoesDeCard.forEach((botao) => {
        const menuTipo = botao.dataset.menuTipo;
        if (menuTipo) {
          // Exemplo: se não tem dieta, talvez um PDF padrão?
          botao.href = `../pdf_menus/${menuTipo}_padrao.pdf`; // Crie esses PDFs se for usar!
          botao.target = "_blank";
        } else {
          botao.href = "#"; // Ou apenas um link vazio
        }
      });
    }
  }
});