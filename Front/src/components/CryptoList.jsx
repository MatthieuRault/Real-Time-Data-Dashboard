import { useState, useEffect } from "react";
import { getCryptoList } from "../services/cryptoService";
import Modal from "./Modal";
import CryptoCard from "./CryptoCard";
import CryptoDetails from "./CryptoDetails";

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCryptoId, setSelectedCryptoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCryptoClick = (id) => {
    setSelectedCryptoId(id);
    setIsModalOpen(true);
  };

  if (loading) return <p>Chargement des cryptomonnaies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Top 10 Cryptomonnaies</h2>

      <div className="space-y-4">
        {cryptos.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            onClick={() => handleCryptoClick(crypto.id)}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCryptoId && <CryptoDetails id={selectedCryptoId} />}
      </Modal>
    </div>
  );
};

export default CryptoList;
