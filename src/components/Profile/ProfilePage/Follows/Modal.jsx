const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with inline rgba for semi-transparent black */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.50)" }}
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative w-80 bg-[#262626] rounded-xl shadow-lg p-6 max-h-[70vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          aria-label="Close modal"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;