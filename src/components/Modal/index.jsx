function Modal({ titulo, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-10 w-90">
        <h2 className="text-3xl font-bold mb-4">{titulo}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
