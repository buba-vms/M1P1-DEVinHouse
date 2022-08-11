export function searchCard() {
  const barraDePesquisa = document.querySelector('#barra-pesquisa');
  const cardsDiv = document.querySelectorAll('.card');
  const cards = JSON.parse(localStorage.getItem('cards'));
  const searchedCard = barraDePesquisa.value.toLowerCase();

  console.log(cardsDiv.length, cards.length);
  cardsDiv.forEach((cardDiv, index) => {
    if (!cards[index].titulo.toLowerCase().includes(searchedCard)) {
      cardDiv.classList.add('hide-card');
    }
  });
}

export function cleanSearch() {
  const cardsDiv = document.querySelectorAll('.card');
  const barraDePesquisa = document.querySelector('#barra-pesquisa');
  cardsDiv.forEach((cardDiv) => {
    barraDePesquisa.value = '';
    if (cardDiv.classList.contains('hide-card')) {
      cardDiv.classList.remove('hide-card');
    }
  });
}
