import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { getRarityLabel } from "@/utils/csvParser";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRarity: string;
  onRarityChange: (value: string) => void;
  rarities: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedRarity,
  onRarityChange,
  rarities,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search cards by name or code..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 h-12 bg-card border-border"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Rarity filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedRarity === "" ? "default" : "secondary"}
            onClick={() => onRarityChange("")}
            className="transition-all duration-200"
          >
            All Cards
          </Button>
          {rarities.map((rarity) => (
            <Button
              key={rarity}
              variant={selectedRarity === rarity ? "default" : "secondary"}
              onClick={() => onRarityChange(rarity)}
              className="transition-all duration-200"
              style={
                selectedRarity === rarity
                  ? {
                      backgroundColor: `hsl(var(--rarity-${rarity.toLowerCase()}))`,
                      color: 'hsl(var(--background))',
                    }
                  : {}
              }
            >
              {getRarityLabel(rarity)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
