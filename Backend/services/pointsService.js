export const calculateItemPoints = (condition) => {
  switch (condition) {
    case 'Poor': return 30;
    case 'Good': return 60;
    case 'Very Good': return 100;
    case 'Excellent': return 150;
    default: return 0;
  }
};

export const calculateExchangeBonus = () => {
  // Bonus points for successfully completing an exchange
  return 50;
};
