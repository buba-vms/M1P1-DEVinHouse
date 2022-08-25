import { toogleHideBtn, getCardData } from './formulario.js';

import { atualizarEstatisticas } from './estatisticas.js';

export function criarCard(card = {}) {
  return `
    <div class="card">
        <h4>${card.titulo}</h4>
        <div class="card-data">
            <h5 class="skill-card"><b>Linguagem/Skill:</b> ${card.skill}</h5>
            <h5 class="category-card"><b>Categoria:</b> ${card.categoria}</h5>
            <p>
              ${card.descricao}
            </p>
        </div>
        <div class="card-buttons">
            <i class="fa-solid fa-trash card-delete"></i>
            <i class="fa-solid fa-pen-to-square card-edit"></i>
            <a href="${card.url}" target="_blank"><i class="fa-solid fa-video card-video"></i></a>
        </div>
    </div>
    `;
}

function editarCard(card = {}) {
  return `
          <h4>${card.titulo}</h4>
        <div class="card-data">
            <h5 class="skill-card"><b>Linguagem/Skill:</b> ${card.skill}</h5>
            <h5 class="category-card"><b>Categoria:</b> ${card.categoria}</h5>
            <p>
              ${card.descricao}
            </p>
        </div>
        <div class="card-buttons">
            <i class="fa-solid fa-trash card-delete"></i>
            <i class="fa-solid fa-pen-to-square card-edit"></i>
            <a href="${card.url}" target="_blank"><i class="fa-solid fa-video card-video"></i></a>
        </div>`;
}

export function createCardDeleteBtn() {
  const deleteBtns = document.querySelectorAll('.card-delete');
  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener('click', () => {
      if (confirm('você tem certeza que deseja deletar o cartão?')) {
        debugger;
        deleteBtns[index].parentElement.parentElement.remove();
        removeCardFromLocalStorage(index);
        atualizarEstatisticas();
      }
    });
  });
}

function removeCardFromLocalStorage(index) {
  let cards = JSON.parse(localStorage.getItem('cards'));
  cards = cards.filter((item) => {
    return item != cards[index];
  });
  localStorage.setItem('cards', JSON.stringify(cards));
}

export function createCardEditBtn() {
  const editBtns = document.querySelectorAll('.card-edit');

  editBtns.forEach((editBtn, index) => {
    let cards = JSON.parse(localStorage.getItem('cards'));
    editBtn.addEventListener('click', () => {
      //acessar objeto da card clicada
      const selectedCard = cards[index];
      localStorage.setItem(`indexProv`, JSON.stringify(index));

      toogleHideBtn(selectedCard);
    });
  });
}

export function autoFillForm(selectedCard = {}) {
  const titulo = document.querySelector('#titulo');
  const skill = document.querySelector('#skill');
  const categoria = document.querySelector('#categoria');
  const descricao = document.querySelector('#descricao');
  const urlVideo = document.querySelector('#video-url');

  titulo.value = selectedCard.titulo;
  skill.value = selectedCard.skill;
  categoria.value = selectedCard.categoria;
  descricao.value = selectedCard.descricao;
  urlVideo.value = selectedCard.url;
}

export function editContent(index) {
  let cards = JSON.parse(localStorage.getItem('cards'));
  cards[index] = getCardData();
  if (cards[index] === undefined) {
    return;
  }
  console.log(cards);
  localStorage.setItem('cards', JSON.stringify(cards));

  const cardsDiv = document.querySelectorAll('.card');
  cardsDiv[index].innerHTML = editarCard(cards[index]);
  createCardEditBtn();
  createCardDeleteBtn();
  toggleVideoButton();
  toogleHideBtn(cards[index]);
  atualizarEstatisticas();
}

export function toggleVideoButton() {
  let cards = JSON.parse(localStorage.getItem('cards'));
  const cardsVideoBtns = document.querySelectorAll('.card-video');

  cardsVideoBtns.forEach((cardVideoBtn, index) => {
    console.log(cardVideoBtn);
    if (cards[index].url === '') {
      cardVideoBtn.classList.add('hide-card');
    }
  });
}
