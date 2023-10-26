import { B2 } from "../../assets/icons";

import "./GameStarterComponent.css";

export const GameStarterComponent = ({
  startGameHandler,
  showGameBoardHandler,
}) => {

  const onClick = async () => {
    await startGameHandler();
    showGameBoardHandler();
  };

  return (
    <div className="game-starter-component">
      <B2 />
      <button className="game-starter-component__button" onClick={onClick}>
        Start game
      </button>
    </div>
  );
};
