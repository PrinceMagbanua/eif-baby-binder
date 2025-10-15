import { Card } from "@/utils/csvParser";
import { getRarityColor } from "@/utils/csvParser";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

interface CollectionCardProps {
  card: Card;
  onClick: () => void;
}

export function CollectionCard({ card, onClick }: CollectionCardProps) {
  const rarityColor = getRarityColor(card.rarity);
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Trigger shine animation only once when card enters view
  if (isInView && !hasAnimated) {
    setHasAnimated(true);
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        mass: 0.5
      }}
    >
      <motion.button
        onClick={onClick}
        className="group relative overflow-hidden rounded-xl bg-card border-2 w-full transition-all duration-300"
        style={{
          borderColor: `hsl(var(--rarity-${card.rarity.toLowerCase()}))`,
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 10 
          }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine effect on scroll into view */}
        {hasAnimated && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              delay: 0.1,
            }}
            style={{
              background: `linear-gradient(90deg, transparent, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.4), transparent)`,
              transform: "skewX(-20deg)",
            }}
          />
        )}

        {/* Hover shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.3), transparent)`,
            transform: "skewX(-20deg)",
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "easeInOut",
          }}
        />
      
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
          style={{
            background: `radial-gradient(circle at center, hsl(var(--rarity-${card.rarity.toLowerCase()})), transparent 70%)`,
          }}
        />
        
        {/* Card content */}
        <div className="relative p-6 flex flex-col items-center gap-4">
          {/* Card image */}
          <motion.div 
            className="w-full aspect-[3/4] rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              background: card.imageUrl ? 'transparent' : `linear-gradient(135deg, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.1), hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.3))`,
            }}
            whileHover={{
              boxShadow: `0 0 30px hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.4)`,
            }}
          >
            {card.imageUrl ? (
              <img 
                src={card.imageUrl} 
                alt={card.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Sparkles 
                className="w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{ color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))` }}
              />
            )}
            
            {/* Rarity badge */}
            <motion.div 
              className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
              style={{
                backgroundColor: `hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.2)`,
                color: `hsl(var(--rarity-${card.rarity.toLowerCase()}))`,
                border: `1px solid hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.4)`,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: `hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.4)`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {card.rarity}
            </motion.div>

            {/* Holographic shimmer overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.1) 10px,
                    hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.1) 20px
                  )
                `,
                animation: "shimmer 3s infinite linear",
              }}
            />
          </motion.div>
          
          {/* Card info */}
          <div className="w-full text-center space-y-1">
            <p className="text-xs text-muted-foreground font-mono">{card.code}</p>
            <h3 className="text-lg font-bold text-foreground">{card.name}</h3>
          </div>
        </div>
        
        {/* Animated border gradient on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, hsl(var(--rarity-${card.rarity.toLowerCase()}) / 0.3) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s infinite',
          }}
        />
      </motion.button>
    </motion.div>
  );
}

