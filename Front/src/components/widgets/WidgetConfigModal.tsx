import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface WidgetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetType: "weather" | "crypto";
  onConfirm: (config: {
    city?: string;
    type?: "top" | "single";
    name?: string;
  }) => void;
}

const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({
  isOpen,
  onClose,
  widgetType,
  onConfirm,
}) => {
  const [city, setCity] = React.useState("");
  const [cryptoType, setCryptoType] = React.useState<"top" | "single">("top");
  const [cryptoName, setCryptoName] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (widgetType === "weather") {
      onConfirm({ city });
    } else {
      onConfirm({
        type: cryptoType,
        name: cryptoType === "single" ? cryptoName : undefined,
      });
    }
    setCity("");
    setCryptoName("");
    setCryptoType("top");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">
          <Dialog.Title className="mb-4 text-xl font-bold">
            {widgetType === "weather"
              ? "Menu de Configuration Météo"
              : "Menu de Configuration Crypto"}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {widgetType === "weather" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Ville</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="Entrez le nom de la ville"
                  required
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={cryptoType}
                    onChange={(e) =>
                      setCryptoType(e.target.value as "top" | "single")
                    }
                    className="w-full rounded border p-2"
                  >
                    <option value="top">Top 10 Cryptos</option>
                    <option value="single">Sélectionner une crypto</option>
                  </select>
                </div>

                {cryptoType === "single" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom de la Crypto
                    </label>
                    <input
                      type="text"
                      value={cryptoName}
                      onChange={(e) => setCryptoName(e.target.value)}
                      className="w-full rounded border p-2"
                      placeholder="Ex: bitcoin"
                      required
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded px-4 py-2 border hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Confirmer
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WidgetConfigModal;
