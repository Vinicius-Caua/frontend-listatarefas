function ConfirmDeleteModal({ isOpen, task, onDelete, onCancel }) {
  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-10 w-90">
        <h2 className="text-3xl font-bold mb-4">Deseja mesmo excluir?</h2>
        <p>Você realmente deseja excluir a tarefa:</p>
        <h3 className=" text-xl font-semibold">{task.nome}</h3>
        <p className="text-sm">Custo: R$ {task.custo.toFixed(2)}</p>
        <p className="text-sm">Data Limite: {task.dataLimite}</p>
        <span className="font-semibold italic">{task.descricao}</span>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => onDelete(task.id)}
          >
            Excluir
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
