export function formatRate(rate) {
  const [integerPart = '0', decimalPart = '0'] = String(rate).split('.');
  return `${integerPart}.${decimalPart}`;
}

export function getStarsString(starAmount) {
  const roundedStarAmount = Math.round(starAmount);
  const hollowStarAmount = 5 - roundedStarAmount;
  return '★'.repeat(roundedStarAmount) + '☆'.repeat(hollowStarAmount);
}
