document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica para Alternar entre Formulários de Login e Cadastro ---
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");

  const mensagemCadastro = document.getElementById("mensagemCadastro");

  const registerEmail = document.getElementById("registerEmail");
  const confirmEmail = document.getElementById("confirmEmail");
  const registerCpf = document.getElementById("registerCpf");
  const registerPhone = document.getElementById("registerPhone");
  const registerBirthDate = document.getElementById("registerBirthDate");
  const registerPassword = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const termsCheckbox = document.getElementById("termsCheckbox");

  // --- Funções para Exibir/Esconder Mensagens de Feedback ---
  function showMessage(message, type) {
    if (!mensagemCadastro) {
      console.warn(
        "Elemento 'mensagemCadastro' não encontrado. Não é possível exibir a mensagem."
      );
      return;
    }
    mensagemCadastro.textContent = message;
    mensagemCadastro.className = "mensagem-cadastro";
    mensagemCadastro.classList.add("show", type);
    mensagemCadastro.style.display = "block";

    const tempoMensagemVisivel = 1000; // 1 segundo

    setTimeout(() => {
      mensagemCadastro.classList.remove("show");

      if (showLoginLink) {
        showLoginLink.click();
      } else {
        console.warn(
          "Link 'showLogin' não encontrado para redirecionar após o cadastro."
        );
      }

      setTimeout(() => {
        mensagemCadastro.textContent = "";
        mensagemCadastro.className = "mensagem-cadastro";
        mensagemCadastro.style.display = "none";
      }, 400);
    }, tempoMensagemVisivel);
  }

  function hideMessage() {
    if (!mensagemCadastro) return;
    mensagemCadastro.classList.remove("show");
    setTimeout(() => {
      mensagemCadastro.textContent = "";
      mensagemCadastro.className = "mensagem-cadastro";
      mensagemCadastro.style.display = "none";
    }, 400);
  }

  // Alternar entre login e cadastro
  if (loginForm && registerForm && showRegisterLink && showLoginLink) {
    showRegisterLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.remove("form-active");
      loginForm.classList.add("form-hidden");
      registerForm.classList.remove("form-hidden");
      registerForm.classList.add("form-active");
      hideMessage();
    });

    showLoginLink.addEventListener("click", function (e) {
      e.preventDefault();
      registerForm.classList.remove("form-active");
      registerForm.classList.add("form-hidden");
      loginForm.classList.remove("form-hidden");
      loginForm.classList.add("form-active");
      hideMessage();
    });
  } else {
    console.warn(
      "Elementos do formulário de login/cadastro não encontrados."
    );
  }

  // Menu hambúrguer
  const menuBtn = document.querySelector("#menu-btn");
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
      "Elementos do menu hamburguer não encontrados."
    );
  }

  // Links do cabeçalho
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetUrl = this.getAttribute("href");

      if (targetUrl) {
        window.location.href = targetUrl;
      } else {
        console.warn(`Link inválido: "${targetUrl}"`);
      }

      if (menuBtn && navbar && menuBtn.classList.contains("active")) {
        menuBtn.classList.remove("active");
        navbar.classList.remove("active");
      }
    });
  });

  // Envio do formulário de cadastro
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      hideMessage();

      const emailValue = registerEmail.value;
      const confirmEmailValue = confirmEmail.value;
      const passwordValue = registerPassword.value;
      const confirmPasswordValue = confirmPassword.value;
      const termsAccepted = termsCheckbox.checked;

      if (emailValue !== confirmEmailValue) {
        showMessage("Os e-mails não coincidem!", "erro");
        return;
      }

      if (passwordValue !== confirmPasswordValue) {
        showMessage("As senhas não coincidem!", "erro");
        return;
      }

      if (!termsAccepted) {
        showMessage(
          "Você deve aceitar os Termos de Uso para se cadastrar.",
          "erro"
        );
        return;
      }

      const cadastro = {
        email: emailValue,
        cpf: registerCpf.value,
        telefone: registerPhone.value,
        dataNascimento: registerBirthDate.value,
        senha: passwordValue,
      };

      localStorage.setItem(`cadastro-${emailValue}`, JSON.stringify(cadastro));

      const sucesso = Math.random() > 0.1;

      if (sucesso) {
        showMessage("Cadastro efetuado com sucesso!", "sucesso");
        registerForm.reset();
      } else {
        showMessage("Erro ao efetuar o cadastro. Tente novamente.", "erro");
      }
    });
  }

  // Envio do formulário de login
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("password").value;

      const dadosCadastrais = JSON.parse(localStorage.getItem(`cadastro-${email}`));

      if (dadosCadastrais) {
        if (dadosCadastrais.senha === senha) {
          localStorage.setItem("autenticado", true);
          window.location.href = "../pages/index.html";
        } else {
          document.getElementById("modalSenhaErrada").style.display = "flex";
        }
      } else {
        document.getElementById("modalCadastroNaoEncontrado").style.display = "flex";
      }
    });
  }
});

// Função para fechar modais
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Event listeners para fechar modais
document.querySelectorAll(".close-button, .modal-button").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = this.dataset.modalId;
    closeModal(modalId);
  });
});

// Fecha modal clicando fora do conteúdo
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target.id);
  }
});

// *** Link do "Esqueci a senha" corrigido ***
const linkRecuperacao = document.getElementById("recuperacaosenha");

if (linkRecuperacao) {
  linkRecuperacao.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "recupera_senha.html"; // Ajuste para o caminho correto da página de recuperação
  });
}
