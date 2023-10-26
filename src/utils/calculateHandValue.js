export const calculateHandValue = (drawnCards) => {
  let value = 0;

  // Sort all "Ace" cards to end of the list;
  const sortedHand = [...drawnCards].sort(({ value }) => (value === "Ace" ? 1 : -1));

  for (const card of sortedHand) {
    if (card.value === "Ace") {
      const minAceValue = card.points[0];
      const maxAceValue = card.points[1];

      if (value + maxAceValue <= 21) {
        value += maxAceValue;
      } else {
        value += minAceValue;
      }
    } else {
      value += card.points;
    }
  }

  return value;
};
