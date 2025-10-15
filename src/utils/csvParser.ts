export interface Card {
  rarity: string;
  code: string;
  name: string;
}

export function parseCSV(csvText: string): Card[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return {
      rarity: values[0],
      code: values[1],
      name: values[2],
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
