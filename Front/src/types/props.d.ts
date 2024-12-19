import { Crypto } from "./crypto";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface CryptoCardProps {
  crypto: Crypto;
  onClick: () => void;
}

export interface CryptoDetailsProps {
  id: string;
}
