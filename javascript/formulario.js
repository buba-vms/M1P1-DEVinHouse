import {
  criarCard,
  createCardDeleteBtn,
  createCardEditBtn,
  autoFillForm,
  editContent,
  toggleVideoButton,
} from './cards.js';

import { atualizarEstatisticas } from './estatisticas.js';

import { searchCard, cleanSearch } from './barradepesquisa.js';

// VARIAVEIS
let cards;
const btnSalvar = document.querySelector('.btn-salvar');
const btnLimpar = document.querySelector('.btn-limpar');
const btnEditar = document.querySelector('.btn-editar');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnPesquisar = document.querySelector('.procurar');
const btnLimparPesquisa = document.querySelector('.limpar-pesquisa');
const formulario = document.querySelector('#formulario');
const cardsCenter = document.querySelector('.cards-center');

// INICIO DA APLICAÇÂO
startSite();

// EVENTOS

btnSalvar.addEventListener('click', (e) => {
  e.preventDefault();
  const card = getCardData();
  if (card === undefined) {
    return;
  }

  //save card
  saveDataToLocalStorage(card);
  //create card
  cardsCenter.innerHTML += criarCard(card);
  createCardEditBtn();
  createCardDeleteBtn();
  toggleVideoButton();

  formulario.reset();
  atualizarEstatisticas();
});

btnLimpar.addEventListener('click', (e) => {
  e.preventDefault();
  formulario.reset();
});

btnEditar.addEventListener('click', (e) => {
  e.preventDefault();
  let index = JSON.parse(localStorage.getItem(`indexProv`));
  editContent(index);
});

btnCancelar.addEventListener('click', (e) => {
  e.preventDefault();
  let index = JSON.parse(localStorage.getItem(`indexProv`));
  let cards = JSON.parse(localStorage.getItem('cards'));
  toogleHideBtn(cards[index]);

  formulario.reset();
});

btnPesquisar.addEventListener('click', () => {
  searchCard();
});

btnLimparPesquisa.addEventListener('click', cleanSearch);

//FUNÇÕES
function startSite() {
  // Confere se cards já existe no localStorage
  if (localStorage.getItem('cards')) {
    cards = JSON.parse(localStorage.getItem('cards'));

    cards.forEach((card) => {
      cardsCenter.innerHTML += criarCard(card);
    });

    createCardEditBtn();
    createCardDeleteBtn();
    toggleVideoButton();
    atualizarEstatisticas();
  } else {
    cards = [];
  }
}

export function getCardData() {
  const titulo = document.querySelector('#titulo');
  const skill = document.querySelector('#skill');
  const categoria = document.querySelector('#categoria');
  const descricao = document.querySelector('#descricao');
  const urlVideo = document.querySelector('#video-url');
  urlVideo.type = 'url';
  //   adicionar verificação de dados
  if (titulo.value.length < 8 || titulo.value.length > 64) {
    alert('O título deve conter entre 8 e 64 caracteres');
    return;
  } else if (skill.value.length < 3 || skill.value.length > 16) {
    alert('A Skill deve conter entre 3 e 16 caracteres');
    return;
  } else if (categoria.value === 'selecionar') {
    alert('Você deve selecionar uma categoria');
    return;
  } else if (descricao.value.length < 32 || descricao.value.length > 512) {
    alert('A Descrição deve conter entre 32 e 512 caracteres');
    return;
  } else if (!urlVideo.checkValidity()) {
    alert('você deve inserir uma URL Valida');
  } else {
    return {
      titulo: titulo.value,
      skill: skill.value,
      categoria: categoria.value,
      descricao: descricao.value,
      url: urlVideo.value,
    };
  }
}

function saveDataToLocalStorage(card = {}) {
  cards.push(card);
  localStorage.setItem('cards', JSON.stringify(cards));
}

export function toogleHideBtn(selectedCard) {
  const actionBtns = document.querySelectorAll('.action-btns');

  actionBtns.forEach((item) => {
    // modifica o formulario
    if (
      item.classList.contains('edit-mode') &&
      item.classList.contains('hide-card')
    ) {
      autoFillForm(selectedCard);
    } else if (
      item.classList.contains('default-mode') &&
      item.classList.contains('hide-card')
    ) {
      formulario.reset();
    }
    //adiciona e remove botoes do formulário
    if (item.classList.contains('hide-card')) {
      item.classList.remove('hide-card');
    } else {
      item.classList.add('hide-card');
    }
  });
}
