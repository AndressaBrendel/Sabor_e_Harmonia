document.addEventListener('DOMContentLoaded', function() {

    // Helper function for navigation (already in your script)
    function navigateTo(url) {
        window.location.href = url;
    }

    const loginCadastroIcon = document.querySelector('.icons a[href="/login_cadastro/cadastro.html"]');
    if (loginCadastroIcon) {
        loginCadastroIcon.addEventListener('click', function(event) {
            event.preventDefault();
            navigateTo('/login_cadastro/cadastro.html');
        });
    }


    // --- Diet Filtering and PDF Linking Logic for index_pag2.html ---
    const dietaEscolhida = localStorage.getItem('dietaEscolhida'); // Get selected diet from localStorage
    const todosOsCards = document.querySelectorAll('.box-container .box'); // Select all food cards
    const botoesDeCard = document.querySelectorAll('.card-btn'); // Select all 'card-btn' links (PDF buttons)

    // Optional: Display selected diet to the user
    const dietaDisplayArea = document.createElement('div'); // Create a container for the message
    dietaDisplayArea.classList.add('dieta-display-message'); // Add a class for potential styling
    dietaDisplayArea.style.textAlign = 'center';
    dietaDisplayArea.style.marginTop = '20px';
    dietaDisplayArea.style.marginBottom = '20px';
    dietaDisplayArea.style.fontSize = '1.2em'; // Adjust size as needed

    const firstSection = document.querySelector('.menu_cafe'); // Or any suitable place to insert the message
    if (firstSection) {
        firstSection.prepend(dietaDisplayArea); // Add the message container before the menu content
    }

    // Por padrão, todos os cards devem estar visíveis.
    // Apenas escondemos se uma dieta específica for selecionada E o card não pertencer a ela.
    todosOsCards.forEach(card => {
        card.style.display = ''; // Garante que todos os cards estejam visíveis inicialmente
    });

    if (dietaEscolhida) {
        // Se uma dieta específica foi selecionada, filtra os cards
        dietaDisplayArea.innerHTML = `<p>Você está vendo opções de cardápio para: <strong>${dietaEscolhida.replace(/_/g, ' ')}</strong></p>`;

        todosOsCards.forEach(card => {
            const dietasPermitidas = card.dataset.dietas ? card.dataset.dietas.split(',') : [];

            if (!dietasPermitidas.includes(dietaEscolhida)) {
                card.style.display = 'none'; // Esconde o card se não pertencer à dieta selecionada
            }
            // Se pertencer, ele já está visível por conta do "display = '';" acima
        });

        // Ajustar os links dos PDFs para a dieta específica
        botoesDeCard.forEach(botao => {
            const menuTipo = botao.dataset.menuTipo;
            let pdfPath = '#';

            if (menuTipo) {
                // Constrói o caminho do PDF dinamicamente: ../pdf_menus/[tipo]_[dieta].pdf
                pdfPath = `../pdf_menus/${menuTipo}_${dietaEscolhida}.pdf`;
            }

            botao.href = pdfPath;
            botao.target = '_blank';
        });

        console.log(`Cardápio filtrado para a dieta: ${dietaEscolhida}`);

    } else {
        // Se nenhuma dieta foi escolhida (usuário acessou a página diretamente ou clicou no "Conheça Nosso Cardápio" na Home sem selecionar dieta)
        dietaDisplayArea.innerHTML = `<h2>Exibindo todas as opções de cardápio. <br>Selecione uma dieta na <a href="index.html#menu">página inicial</a> para ver opções filtradas.</h2>`;

        // Garante que todos os cards estejam visíveis (já feito acima, mas reforça)
        todosOsCards.forEach(card => {
            card.style.display = '';
        });

        // Para links de PDF, você pode decidir entre:
        // 1. Apontar para um PDF padrão genérico (se você criar, ex: salgados_padrao.pdf)
        // 2. Apontar para '#' (não abrir nada)
        // 3. Apontar para a versão "carnívora" como um padrão se essa for a mais comum
        botoesDeCard.forEach(botao => {
            const menuTipo = botao.dataset.menuTipo;
            if (menuTipo) {
                // Exemplo: Apontar para uma versão 'padrao' se existir, ou 'carnivoro' como fallback
                botao.href = `../pdf_menus/${menuTipo}_padrao.pdf`; // <<--- CRIE ESTES PDFs SE FOR USAR!
                // Ou: botao.href = `../pdf_menus/${menuTipo}_carnivoro.pdf`; // Exemplo de fallback para 'carnivoro'
                // Ou: botao.href = '#'; // Se não houver um PDF genérico
                botao.target = '_blank';
            } else {
                botao.href = '#';
            }
        });

        console.warn("Nenhuma dieta selecionada. Mostrando todos os cards. Links de PDF tentarão usar versão 'padrao'.");
    }
});