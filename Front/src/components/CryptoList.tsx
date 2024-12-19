import { FC, useState, useEffect } from "react";
import { getCryptoList } from "../services/cryptoService";
import Modal from "./Modal";
import CryptoCard from "./CryptoCard";
import CryptoDetails from "./CryptoDetails";
import { Crypto } from "../types/crypto.d";

export const CryptoList: FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [selectedCryptoId, setSelectedCryptoId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const data = await getCryptoList();
        setCryptos(data);
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

    fetchCryptos();
  }, []);

  const handleCryptoClick = (id: string) => {
    console.log("Clicked on crypto with id:", id); // Log ici
    setSelectedCryptoId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log("Updated selectedCryptoId:", selectedCryptoId); // Log de l'état
  }, [selectedCryptoId]);

  useEffect(() => {
    console.log("isModalOpen:", isModalOpen); // Log pour l'ouverture de la modale
  }, [isModalOpen]);

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
