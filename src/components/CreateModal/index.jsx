import api from "../../api";
import Modal from "../Modal";
import { useRef } from "react";

function CreateModal({ isOpen, onCancel }) {
  // Referências para os campos do formulário (create)
  const inputNome = useRef();
  const inputDescricao = useRef();
  const inputCusto = useRef();
  const inputDataLimite = useRef();
  const realizada = false;

  async function createTarefas(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await api.post("/tarefas", {
        nome: inputNome.current.value,
        descricao: inputDescricao.current.value,
        realizada: realizada,
        custo: parseFloat(inputCusto.current.value),
        dataLimite: new Date(inputDataLimite.current.value),
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    // Modal de criação de tarefas
    <Modal titulo="Criar Nova Tarefa">
      <h1>Preencha os detalhes da nova tarefa:</h1>
      <form onSubmit={createTarefas}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            required
            ref={inputNome}
            maxLength={27}
          />
        </div>
        <div>
          <label>Custo:</label>
          <input
            type="number"
            name="custo"
            required
            ref={inputCusto}
            onInput={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
            }}
          />
        </div>
        <div>
          <label>Data Limite:</label>
          <input type="date" name="dataLimite" required ref={inputDataLimite} />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            required
            className="content-center"
            ref={inputDescricao}
            maxLength={35}
          ></textarea>
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

export default CreateModal;
