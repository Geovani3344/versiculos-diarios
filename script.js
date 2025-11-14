let clickCount = 0;


let messages = [];
// Carrega os versículos do JSON
  fetch('versiculos.json')
  .then(response => response.json())
  .then(data => {
    messages = data;
  })
  .catch(error => {
    console.error('Erro ao carregar versículo:', error); 
  });

function showMessage() {
    const lastClick = localStorage.getItem("lastClickTime");
    const oneMinute= 60 * 1000;
    const now = new Date().getTime();
    if (lastClick && now - lastClick < oneMinute){
        alert("Volte amanhã para mais um versículo diário!");
        return;
    }
    // Salva o horário do clique atual
    localStorage.setItem("lastClickTime", now);

    const messageElement = document.getElementById("message");
    
    // Sorteia uma mensagem aleatória
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.innerHTML = messages[randomIndex];
    messageElement.style.display = "block";
    // Adiciona o versículo ao historíco 
    const historico = document.getElementById("historico");
    const dataHoje = new Date().toLocaleDateString("pt-BR");
    historico.innerHTML += `<p><strong>${dataHoje} : </strong>${messages[randomIndex]}</p>`;
    // Remove a classe se já exister para reiniciar a animação
    messageElement.classList.remove("fade");
    void messageElement.offsetWidth; // Força o reflow
    messageElement.classList.add("fade");
}