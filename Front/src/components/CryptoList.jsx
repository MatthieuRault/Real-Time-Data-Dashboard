import { useState, useEffect } from "react";
import { getCryptoList } from "../services/cryptoService";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const data = await getCryptoList();
        setCryptos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-bold mb-4">
        Les 10 Cryptomonnaies les plus populaires du moment
      </h2>

      {loading && <p>Chargement des cryptomonnaies, merci de patienter...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="border p-4 rounded">
            <h3 className="font-bold">
              Cryptomonnaie : {crypto.name} ({crypto.symbol})
            </h3>
            <p>Prix actuel : {crypto.current_price} €</p>
            <p>Variation sur 24h : {crypto.price_change_24h}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
