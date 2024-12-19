import { CryptoCardProps } from "../types/props.d";

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto, onClick }) => (
  <div
    className="border p-4 rounded cursor-pointer hover:bg-gray-50"
    onClick={onClick}
  >
    <h3 className="font-bold">
      Cryptomonnaie : {crypto.name} ({crypto.symbol})
    </h3>
    <p>Prix actuel : {crypto.current_price} €</p>
    <p>Variation sur 24h : {crypto.price_change_24h}%</p>
  </div>
);

export default CryptoCard;
