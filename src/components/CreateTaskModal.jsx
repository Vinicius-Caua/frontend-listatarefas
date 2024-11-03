import Modal from "./Modal";

function CreateTaskModal({ isOpen, onCreate, onCancel }) {
  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    <Modal
      titulo="Criar Nova Tarefa"
      subTitulo="Preencha os detalhes da nova tarefa:"
      onClick={onCreate}
      onCancel={onCancel}
    >
      <form>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea name="descricao" required></textarea>
        </div>
        <div>
          <label>Custo:</label>
          <input type="number" name="custo" required />
        </div>
        <div>
          a<label>Data Limite:</label>
          <input type="date" name="dataLimite" required />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Criar
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateTaskModal;
