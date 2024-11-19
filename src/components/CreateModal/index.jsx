import { useEffect, useState, useRef } from "react";
import api from "../../api";
import Modal from "../Modal";

function CreateModal({ isOpen, onCancel }) {
  // Referências para os campos do formulário
  const inputNome = useRef();
  const inputDescricao = useRef();
  const inputCusto = useRef();
  const inputDataLimite = useRef();
  const realizada = false;

  // Estado para mensagens de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Foca automaticamente no campo "Nome" quando o modal é aberto
  useEffect(() => {
    if (isOpen && inputNome.current) {
      inputNome.current.focus();
    }
  }, [isOpen]);

  async function createTarefas(e) {
    e.preventDefault();
    setErrorMessage(""); // Reseta mensagens de erro

    // Validação do custo
    const custo = parseFloat(inputCusto.current.value);
    if (isNaN(custo) || custo < 0) {
      setErrorMessage("Erro: O custo não pode ser negativo.");
      return;
    }

    try {
      await api.post("/tarefas", {
        nome: inputNome.current.value.trim(),
        descricao: inputDescricao.current.value.trim(),
        realizada,
        custo: parseFloat(custo.toFixed(2)), // Garante no máximo 2 casas decimais
        dataLimite: new Date(inputDataLimite.current.value),
      });

      // Recarrega a página após sucesso
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      setErrorMessage("Erro ao criar a tarefa. Tente novamente.");
    }
  }

  if (!isOpen) return null;

  return (
    <Modal titulo="Criar Nova Tarefa">
      <h1>Preencha os detalhes da nova tarefa:</h1>
      <form onSubmit={createTarefas}>
        <div>
          <label className="font-bold">Nome: </label>
          <input
            type="text"
            name="nome"
            required
            ref={inputNome}
            maxLength={27}
          />
        </div>
        <div>
          <label className="font-bold">Custo: </label>
          <input
            type="number"
            name="custo"
            required
            ref={inputCusto}
            step="0.01"
            onInput={(e) => {
              const value = e.target.value;
              if (value.length > 10) {
                e.target.value = value.slice(0, 10); // Limita a 10 caracteres
              }
            }}
          />
        </div>
        <div>
          <label className="font-bold">Data Limite: </label>
          <input type="date" name="dataLimite" required ref={inputDataLimite} />
        </div>
        <div>
          <label className="font-bold">Descrição: </label>
          <textarea
            name="descricao"
            required
            ref={inputDescricao}
            maxLength={35}
          ></textarea>
        </div>

        {/* Exibe mensagens de erro */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

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
