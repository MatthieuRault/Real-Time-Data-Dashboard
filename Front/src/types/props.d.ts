import { Crypto } from "./crypto";
import { Dashboard, Widget } from "./dashboard";

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

export interface CryptoListProps {
  type: "top" | "single";
  cryptoName?: string;
}

export interface WeatherWidgetProps {
  city?: string;
}

export interface WidgetListProps {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, type: string) => void;
}

export interface WidgetComponentProps {
  widget: Widget;
}
