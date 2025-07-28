// Verifica se o usuário está logado antes de acessar a página de reserva
function verificarLogin() {
  const logado = localStorage.getItem("autenticado"); // busca se o status de "logado" está salvo
  console.log(logado);
  if (logado == false || logado == null) {
    // alert("Você precisa estar logado para acessar essa página.");
    // window.location.href = "cadastro.html"; // redireciona para a tela de login
    document.getElementById("reservaForm").style.display = "none";
  } else {
    document.querySelector(".alerta-login").style.display = "none";
    document.querySelector(".btn-fazer-login").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  verificarLogin();
  const reservaForm = document.getElementById("reservaForm");
  if (reservaForm) {
    reservaForm.addEventListener("submit", enviarReserva);
  }
});

function enviarReserva() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const pessoas = document.getElementById("pessoas").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const obs = document.getElementById("obs").value;

  localStorage.setItem(
    "dadosReservaConfirmada",
    JSON.stringify({ nome, email, pessoas, data, hora, obs })
  );
}

// confirmacao
document.addEventListener("DOMContentLoaded", function () {
  const dadosReservaString = localStorage.getItem("dadosReservaConfirmada");
  if (dadosReservaString) {
    const dadosReserva = JSON.parse(dadosReservaString);
    // Preencher o campos com os dados da reserva
    document.getElementById("confirm-nome").textContent = dadosReserva.nome;
    document.getElementById("confirm-email").textContent = dadosReserva.email;
    document.getElementById("confirm-pessoas").textContent =
      dadosReserva.pessoas;
    document.getElementById("confirm-data").textContent = dadosReserva.data;
    document.getElementById("confirm-hora").textContent = dadosReserva.hora;
    document.getElementById("confirm-obs").textContent =
      dadosReserva.obs || "Nenhuma observação.";
  }
});
