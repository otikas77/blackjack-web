import axios from "../services/axios";

export const startNewGame = async () => {
  const { data } = await axios.get("/blackjack/start-new-game");

  return data;
};

export const drawCard = async (cardDeck, hand) => {
  const { data } = await axios.post("/blackjack/drawCard", {
    cardDeck,
    hand,
  });

  return data;
};

export const dealerTurn = async (cardDeck, hand) => {
  const { data } = await axios.post("/dealer", {
    cardDeck,
    hand,
  });

  return data;
};
