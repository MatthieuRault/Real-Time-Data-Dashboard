import { FC, useState, useEffect } from "react";
import { CryptoDetailsProps } from "../../../types/props.d";
import { CryptoDetails as ICryptoDetails } from "../../../types/crypto.d";
import { getCryptoById } from "../../../services/cryptoService";

export const CryptoDetails: FC<CryptoDetailsProps> = ({ id }) => {
  const [crypto, setCrypto] = useState<ICryptoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCryptoById(id);
        setCrypto(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
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
