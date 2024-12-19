import { useState, useEffect } from "react";
import { getCryptoById } from "../services/cryptoService";

const CryptoDetails = ({ id }) => {
  const [crypto, setCrypto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCryptoById(id);
        setCrypto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!crypto) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Détails de {crypto.name}</h2>
      <p>Symbole : {crypto.symbol}</p>
      <p>Prix (EUR) : {crypto.current_price?.eur} €</p>
      <p>Prix (USD) : {crypto.current_price?.usd} $</p>
      <p>Capitalisation : {crypto.market_cap} €</p>
      <p>Variation sur 24h : {crypto.price_change_24h}%</p>
    </div>
  );
};

export default CryptoDetails;
