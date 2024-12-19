const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
