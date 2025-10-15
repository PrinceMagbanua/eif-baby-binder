import { Card } from "@/utils/csvParser";
import { getRarityColor } from "@/utils/csvParser";
import { Sparkles } from "lucide-react";

interface CollectionCardProps {
  card: Card;
  onClick: () => void;
}

export function CollectionCard({ card, onClick }: CollectionCardProps) {
  const rarityColor = getRarityColor(card.rarity);
  
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-card border-2 transition-all duration-300 hover:scale-105 hover:shadow-card-hover"
      style={{
        borderColor: `hsl(var(--rarity-${card.rarity.toLowerCase()}))`,
      }}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
        style={{
          background: `radial-gradient(circle at center, hsl(var(--rarity-${card.rarity.toLowerCase()})), transparent 70%)`,
        }}
      />
      
      {/* Card content */}
      <div className="relative p-6 flex flex-col items-center gap-4">
        {/* Placeholder for card image */}
        <div 
          className="w-full aspect-[3/4] rounded-lg flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.1), hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.3))`,
          }}
        >
          <Sparkles 
            className="w-16 h-16 opacity-30"
            style={{ color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))` }}
          />
          
          {/* Rarity badge */}
          <div 
            className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
            style={{
              backgroundColor: `hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.2)`,
              color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))`,
              border: `1px solid hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.4)`,
            }}
          >
            {card.rarity}
          </div>
        </div>
        
        {/* Card info */}
        <div className="w-full text-center space-y-1">
          <p className="text-xs text-muted-foreground font-mono">{card.code}</p>
          <h3 className="text-lg font-bold text-foreground">{card.name}</h3>
        </div>
      </div>
      
      {/* Animated border gradient */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.3) 50%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animation: 'shimmer 3s infinite',
        }}
      />
    </button>
  );
}
