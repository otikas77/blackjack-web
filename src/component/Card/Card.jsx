import "./Card.css";
import { Cards_Icons } from "../../constants/cardsIcons";

export const Card = ({ id, isHidden = false, hiddenType = "hidden1" }) => {
  const renderIcon = (id) => {
    const Icon = Cards_Icons[id];

    if (!Icon) return null;

    return <Icon size={100} className="card_icon" />;
  };

  return (
    <div>
      {isHidden ? renderIcon(hiddenType) : renderIcon(id)}
    </div>
  );
};
