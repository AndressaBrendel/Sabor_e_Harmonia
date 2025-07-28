document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailRecuperacao");
  const mensagem = document.getElementById("mensagemRecuperacao");
  const voltarLink = document.getElementById("voltarLogin"); // botão/link para voltar

  if (form && emailInput && mensagem) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (email !== "") {
        mensagem.textContent = `Um link de redefinição de senha foi enviado para ${email}.`;
        mensagem.className = "mensagem-recuperacao sucesso";
        mensagem.style.display = "block";

        form.reset();
      } else {
        mensagem.textContent = `Por favor, insira um e-mail válido.`;
        mensagem.className = "mensagem-recuperacao erro";
        mensagem.style.display = "block";
      }
    });
  } else {
    console.warn("Formulário ou elementos não encontrados no DOM!");
  }

  // Adiciona o comportamento do botão de voltar
  if (voltarLink) {
    voltarLink.addEventListener("click", function (e) {
      e.preventDefault();
      // Redireciona para a página de login - ajuste o caminho conforme sua estrutura
      window.location.href = "/pages/cadastro.html";
    });
  } else {
    console.warn("Botão/Link de voltar não encontrado no DOM!");
  }
});
