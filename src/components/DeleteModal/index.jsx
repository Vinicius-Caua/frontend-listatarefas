import Modal from "../Modal";

function DeleteModal({ isOpen, task, onCancel }) {
  // Não renderiza nada se o modal não estiver aberto

  if (!isOpen) return null;

  return (
    <Modal titulo="Deseja excluir esta tarefa?">
      <h2>Você realmente deseja excluir esta tarefa?</h2>
      {task && (
        <>
          <h3 className="text-xl font-semibold">{task.nome}</h3>
          <p className="text-sm">Custo: R$ {task.custo.toFixed(2)}</p>
          <p className="text-sm">Data Limite: {task.dataLimite}</p>
          <span className="font-semibold italic">{task.descricao}</span>
        </>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          // onClick={onClick}
        >
          Excluir
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
