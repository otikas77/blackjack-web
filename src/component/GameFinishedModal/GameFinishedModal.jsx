import { useContext, useMemo } from "react";

import "./GameFinishedModal.css";
import context from "../../context";

export const GameFinishedModal = ({ type, callback }) => {
  const { setModalElement } = useContext(context);

  const title = useMemo(() => {
    switch (type) {
      case "blackjack":
        return "IT IS BLACKJACK!!! 🥳";
      case "lose":
        return "You lose 😢";
      case "won":
        return "Congratulations, you won! 🥳";
      case "draw":
      default:
        return "You've played well. But it's draw.";
    }
  }, [type]);

  const text = useMemo(() => {
    if (type === "won" || type === "blackjack") return "Play again!";

    return "But you always can play again!";
  }, [type]);

  const onClickHandler = () => {
    callback();
    setModalElement(null);
  };

  return (
    <div className="game-finished-modal">
      <h2>{title}</h2>
      <button onClick={onClickHandler}>{text}</button>
    </div>
  );
};
