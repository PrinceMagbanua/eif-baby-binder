import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden border-b border-border">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent_50%)]" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Unofficial Collection Showcase</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          EIF Baby Cards
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the complete collection of EIF Baby trading cards. Filter by rarity, search your favorites, and discover the magic.
        </p>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="absolute top-32 right-20 w-3 h-3 rounded-full bg-accent/40 animate-pulse delay-75" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-primary/30 animate-pulse delay-150" />
      </div>
    </div>
  );
}
