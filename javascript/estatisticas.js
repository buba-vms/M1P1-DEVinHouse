export function atualizarEstatisticas() {
  const total = document.querySelector('.total');
  const frontEnd = document.querySelector('.front-end');
  const backEnd = document.querySelector('.back-end');
  const fullStack = document.querySelector('.fullstack');
  const softSkill = document.querySelector('.soft-skill');
  console.log(total, frontEnd, backEnd, fullStack, softSkill);
  let totalValue = 0;
  let frontEndValue = 0;
  let backEndValue = 0;
  let fullStackValue = 0;
  let softSkillValue = 0;

  let cards = JSON.parse(localStorage.getItem('cards'));
  cards = cards.map((card) => {
    if (card.categoria === 'front-end') {
      frontEndValue += 1;
      totalValue += 1;
    } else if (card.categoria === 'back-end') {
      backEndValue += 1;
      totalValue += 1;
    } else if (card.categoria === 'fullstack') {
      fullStackValue += 1;
      totalValue += 1;
    } else if (card.categoria === 'comportamental') {
      softSkillValue += 1;
      totalValue += 1;
    }
  });

  total.textContent = totalValue;
  frontEnd.textContent = frontEndValue;
  backEnd.textContent = backEndValue;
  fullStack.textContent = fullStackValue;
  softSkill.textContent = softSkillValue;
}
