// Jogo da Velha - JavaScript puro
// Este script demonstra uso de:
// - variáveis, constantes
// - estruturas condicionais (if / else)
// - estruturas de repetição (for, forEach)
// - alteração de HTML e CSS via DOM
// - criação dinâmica de elementos
// - manipulação de classes (add/remove/toggle)

const boardElement = document.getElementById('board');
const statusEl = document.getElementById('status');
const currentPlayerEl = document.getElementById('currentPlayer');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreEmpateEl = document.getElementById('scoreEmpate');
const btnReset = document.getElementById('btnReset');
const btnNovaPartida = document.getElementById('btnNovaPartida');

let board = ['', '', '', '', '', '', '', '', '']; // 9 posições
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, Empates: 0 };

// combinações vencedoras (índices)
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// cria as 9 células dinamicamente
function createBoard(){
  boardElement.innerHTML = ''; // limpa antes
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', 'célula ' + (i+1));
    cell.addEventListener('click', onCellClick);
    boardElement.appendChild(cell);
  }
}

// quando o jogador clica numa célula
function onCellClick(e){
  const index = Number(e.currentTarget.getAttribute('data-index'));

  // validação: célula já ocupada ou jogo parado
  if (!gameActive) return;
  if (board[index] !== '') {
    // exemplo de alteração visual via JS: adiciona classe temporária
    const cell = e.currentTarget;
    cell.classList.add('taken');
    setTimeout(() => cell.classList.remove('taken'), 300);
    return;
  }

  // marcar no array e no HTML
  board[index] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.classList.add('taken');

  // checar se houve vitória ou empate
  const result = checkResult();
  if (result === 'win') {
    // atualizar placar e exibir resultado
    scores[currentPlayer] += 1;
    updateScoreboard();
    statusEl.innerHTML = 'Vitória! Jogador <strong>' + currentPlayer + '</strong> venceu!';
    gameActive = false;
    return;
  } else if (result === 'draw') {
    scores.Empates += 1;
    updateScoreboard();
    statusEl.innerHTML = 'Empate! Ninguém venceu.';
    gameActive = false;
    return;
  }

  // alternar jogador
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  currentPlayerEl.textContent = currentPlayer;
  statusEl.textContent = 'Jogador atual: ';
  statusEl.appendChild(currentPlayerEl);
}

// checar vitória ou empate
function checkResult(){
  // checa cada combinação vencedora com um laço
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    // estruturas condicionais
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      // marca as células vencedoras com uma classe CSS
      highlightWin(winningCombos[i]);
      return 'win';
    }
  }

  // se não houver espaços vazios -> empate
  let vazio = false;
  for (let j = 0; j < board.length; j++) {
    if (board[j] === '') { vazio = true; break; }
  }
  if (!vazio) return 'draw';

  return 'continue';
}

// destaca as células da combinação vencedora
function highlightWin(combo){
  combo.forEach(idx => {
    const cell = boardElement.querySelector('[data-index="' + idx + '"]');
    if (cell) cell.classList.add('win');
  });
}

// atualiza placar no HTML
function updateScoreboard(){
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreEmpateEl.textContent = scores.Empates;
}

// reinicia apenas o tabuleiro (mantendo placar)
function resetBoard(){
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  currentPlayerEl.textContent = currentPlayer;
  statusEl.textContent = 'Jogador atual: ';
  statusEl.appendChild(currentPlayerEl);
  createBoard();
}

// zera todo o placar e reinicia
function novaPartida(){
  scores = { X: 0, O: 0, Empates: 0 };
  updateScoreboard();
  resetBoard();
}

// eventos dos botões
btnReset.addEventListener('click', resetBoard);
btnNovaPartida.addEventListener('click', novaPartida);

// inicialização
createBoard();
updateScoreboard();
