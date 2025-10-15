export interface Card {
  rarity: string;
  code: string;
  name: string;
  imageUrl?: string;
}

// Import card images
const cardImages: Record<string, string> = {
  'SSR-004': new URL('../assets/SSR-004.jpg', import.meta.url).href,
  'HR-003': new URL('../assets/HR-003.jpg', import.meta.url).href,
};

export function parseCSV(csvText: string): Card[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const code = values[1];
    return {
      rarity: values[0],
      code: code,
      name: values[2],
      imageUrl: cardImages[code],
    };
  });
}

export function getRarityColor(rarity: string): string {
  const rarityMap: Record<string, string> = {
    QR: 'rarity-qr',
    HR: 'rarity-hr',
    SR: 'rarity-sr',
    SSR: 'rarity-ssr',
    GR: 'rarity-gr',
  };
  return rarityMap[rarity] || 'rarity-qr';
}

export function getRarityLabel(rarity: string): string {
  const labels: Record<string, string> = {
    QR: 'Quick Rare',
    HR: 'Hyper Rare',
    SR: 'Super Rare',
    SSR: 'Super Super Rare',
    GR: 'God Rare',
  };
  return labels[rarity] || rarity;
}
