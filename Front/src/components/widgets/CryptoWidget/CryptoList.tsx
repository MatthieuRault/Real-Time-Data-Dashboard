import { FC, useState, useEffect } from "react";
import { getCryptoList } from "../../../services/cryptoService";
import Modal from "../../ui/Modal";
import CryptoCard from "./CryptoCard";
import CryptoDetails from "./CryptoDetails";
import { Crypto } from "../../../types/crypto.d";
import { CryptoListProps } from "../../../types/props";

export const CryptoList: FC<CryptoListProps> = () => {
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
