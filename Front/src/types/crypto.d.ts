export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  market_cap: number;
}

export interface CryptoDetails extends Omit<Crypto, "current_price"> {
  current_price: {
    eur: number;
    usd: number;
  };
  description?: string;
}
