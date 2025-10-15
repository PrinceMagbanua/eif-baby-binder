import { Card } from "@/utils/csvParser";
import { CollectionCard } from "./CollectionCard";

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

export function CardGrid({ cards, onCardClick }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {cards.map((card) => (
        <CollectionCard
          key={card.code}
          card={card}
          onClick={() => onCardClick(card)}
        />
      ))}
    </div>
  );
}
