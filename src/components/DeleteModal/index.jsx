import Modal from "../Modal";
import api from "../../api";
import { formatarData } from "../../utils";

function DeleteModal({ isOpen, task, onCancel }) {
  // Função para deletar a tarefa
  function handleDelete() {
    const taskId = task.id;

    onDelete(taskId);
  }

  // Função para deletar a tarefa
  function onDelete(taskId) {
    try {
      api.delete(`/tarefas/${taskId}`);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  if (!isOpen) return null;

  return (
    // Modal de confirmação de exclusão
    <Modal titulo="Deseja excluir esta tarefa?">
      <h2>Você realmente deseja excluir esta tarefa?</h2>
      {task && (
        <>
          <p className="text-xl font-semibold">
            {" "}
            {task.nome.length > 30
              ? `${task.nome.substring(0, 30)}...`
              : task.nome}
          </p>
          <p className="text-sm">Custo: R$ {task.custo.toFixed(2)}</p>
          <p className="text-sm">
            Data Limite: {formatarData(task.dataLimite)}
          </p>
          <span className="font-semibold italic">
            {task.descricao.length > 30
              ? `${task.descricao.substring(0, 30)}...`
              : task.descricao}
          </span>
        </>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDelete}
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