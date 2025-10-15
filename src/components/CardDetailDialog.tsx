import { Card } from "@/utils/csvParser";
import { getRarityLabel } from "@/utils/csvParser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Hash, Star } from "lucide-react";

interface CardDetailDialogProps {
  card: Card | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CardDetailDialog({ card, open, onOpenChange }: CardDetailDialogProps) {
  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-2" style={{
        borderColor: `hsl(var(--rarity-${card.rarity.toLowerCase()}))`,
      }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6" style={{ color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))` }} />
            {card.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Card image placeholder */}
          <div 
            className="w-full aspect-[3/4] rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.2), hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.4))`,
            }}
          >
            <Sparkles 
              className="w-24 h-24 opacity-40"
              style={{ color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))` }}
            />
          </div>
          
          {/* Card details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Hash className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Code</p>
                <p className="text-lg font-mono font-bold">{card.code}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Rarity</p>
                <p 
                  className="text-lg font-bold"
                  style={{ color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))` }}
                >
                  {getRarityLabel(card.rarity)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
