import { useContext, useMemo, useState } from "react";
import "./App.css";

import { Card } from "./component/Card/Card";
import { GameFinishedModal } from "./component/GameFinishedModal/GameFinishedModal";
import { GameStarterComponent } from "./component/GameStarterComponent/GameStarterComponent";

import context from "./context";
import { startNewGame, drawCard, dealerTurn } from "./store/api";
import { calculateHandValue } from "./utils/calculateHandValue";

function App() {
  const { setModalElement } = useContext(context);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const [cardDeck, setCardDeck] = useState([]);
  const [userHand, setUserHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const userPoints = useMemo(() => calculateHandValue(userHand), [userHand]);
  const dealerPoints = useMemo(
    () => calculateHandValue(dealerHand),
    [dealerHand]
  );

  const startNewGameHandler = async () => {
    const { dealerHand, userHand, remainingCardDeck } = await startNewGame();

    // Restart game with new cardDeck and userHand/DealerHand;
    setDealerHand(dealerHand);
    setUserHand(userHand);
    setCardDeck(remainingCardDeck);
    setIsGameFinished(false);

    // Check if the user won from the first hand of cards;
    const userPoints = calculateHandValue(userHand);
    if (userPoints === 21) {
      const dealerPoints = calculateHandValue(dealerHand);

      const gameResult = dealerPoints === userPoints ? "draw" : "blackjack";
      finishGame(gameResult);
    }
  };

  const takeMoreHandler = async () => {
    const { drawnCard, status } = await drawCard(cardDeck, userHand);

    setUserHand((state) => [...state, drawnCard]);

    // Finish game if user got 21 or more than 21;
    if (status.isFinished) {
      return finishGame(status.reason === "bust" ? "lose" : "blackjack");
    }

    setCardDeck(filterCardDeck(drawnCard));
  };

  const standHandler = async () => {
    // After Stand click dealer will take additional cards if 
    // He deems it necessary (BE logic) or opens up
    const hand = await dealerTurn(cardDeck, dealerHand);

    setDealerHand(hand);

    let gameResult = "draw";
    const dealerPoints = calculateHandValue(hand);

    switch (true) {
      case userPoints > dealerPoints:
      case dealerPoints > 21:
        gameResult = "won";
        break;
      case dealerPoints > userPoints:
        gameResult = "lose";
        break;
      default:
        break;
    }

    finishGame(gameResult);
  };

  function showGameBoard() {
    setIsGameStarted(true);
  }

  function finishGame(gameResult) {
    setModalElement(
      <GameFinishedModal type={gameResult} callback={startNewGameHandler} />
    );
    setIsGameFinished(true);
  }

  function filterCardDeck(drawnCard) {
    return (state) => state.filter(({ id }) => id !== drawnCard.id);
  }

  if (!isGameStarted) {
    return (
      <div className="home">
        <GameStarterComponent
          startGameHandler={startNewGameHandler}
          showGameBoardHandler={showGameBoard}
        />
      </div>
    );
  }

  return (
    <div className="home">
      <div>
        <div className="board dealer">
          {dealerHand.map(({ id }, index) => (
            <Card key={id} id={id} isHidden={!isGameFinished && index > 0} />
          ))}
        </div>
        {isGameFinished && (
          <p className="points">Dealer points: {dealerPoints}</p>
        )}
      </div>

      <div className="center">
        <div className="buttonBlock">
          <button onClick={takeMoreHandler} className="buttonBlock__takeMore">
            <Card isHidden={true} hiddenType="hidden2" />
          </button>
          <button onClick={standHandler}>Stand</button>
        </div>
      </div>

      <div>
        <p className="points">Your points: {userPoints}</p>
        <div className="board user">
          {userHand.map(({ id }) => (
            <Card key={id} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
