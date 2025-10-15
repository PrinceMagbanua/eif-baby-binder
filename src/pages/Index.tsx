import { useState, useEffect, useMemo } from "react";
import { parseCSV, Card } from "@/utils/csvParser";
import { HeroSection } from "@/components/HeroSection";
import { FilterBar } from "@/components/FilterBar";
import { StatsBar } from "@/components/StatsBar";
import { CardGrid } from "@/components/CardGrid";
import { CardDetailDialog } from "@/components/CardDetailDialog";
import cardsCSV from "@/data/cards.csv?raw";

const Index = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const parsedCards = parseCSV(cardsCSV);
    setCards(parsedCards);
  }, []);

  const rarities = useMemo(() => {
    const uniqueRarities = Array.from(new Set(cards.map((card) => card.rarity)));
    return uniqueRarities.sort();
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        searchQuery === "" ||
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRarity = selectedRarity === "" || card.rarity === selectedRarity;

      return matchesSearch && matchesRarity;
    });
  }, [cards, searchQuery, selectedRarity]);

  const rarityBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    filteredCards.forEach((card) => {
      breakdown[card.rarity] = (breakdown[card.rarity] || 0) + 1;
    });
    return breakdown;
  }, [filteredCards]);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRarity={selectedRarity}
        onRarityChange={setSelectedRarity}
        rarities={rarities}
      />
      
      <StatsBar
        totalCards={cards.length}
        filteredCards={filteredCards.length}
        rarityBreakdown={rarityBreakdown}
      />
      
      <CardGrid cards={filteredCards} onCardClick={handleCardClick} />
      
      <CardDetailDialog
        card={selectedCard}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      
      {filteredCards.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            No cards found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
