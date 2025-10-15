import { Card } from "@/utils/csvParser";
import { Layers, Sparkles } from "lucide-react";

interface StatsBarProps {
  totalCards: number;
  filteredCards: number;
  rarityBreakdown: Record<string, number>;
}

export function StatsBar({ totalCards, filteredCards, rarityBreakdown }: StatsBarProps) {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filteredCards}</span> of{" "}
              <span className="font-bold text-foreground">{totalCards}</span> cards
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {Object.entries(rarityBreakdown).map(([rarity, count]) => (
            <div key={rarity} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(var(--rarity-${rarity.toLowerCase()}))` }}
              />
              <span className="text-sm text-muted-foreground">
                {rarity}: <span className="font-bold text-foreground">{count}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
