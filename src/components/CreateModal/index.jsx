import { useEffect, useState, useRef } from "react";
import api from "../../api";
import Modal from "../Modal";

function CreateModal({ isOpen, onCancel }) {
  // Referências para os campos do formulário (create)
  const inputNome = useRef();
  const inputDescricao = useRef();
  const inputCusto = useRef();
  const inputDataLimite = useRef();
  const realizada = false;

  // Estado para mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Foca automaticamente no campo "Nome" quando o modal é aberto
  useEffect(() => {
    if (isOpen && inputNome.current) {
      inputNome.current.focus();
    }
  }, [isOpen]);

  async function createTarefas(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setErrorMessage(""); // Reseta a mensagem de erro ao tentar criar

    // Validação no frontend
    const custo = parseFloat(inputCusto.current.value);
    if (isNaN(custo) || custo < 0) {
      setErrorMessage("Erro: O custo não pode ser negativo.");
      return; // Interrompe o envio do formulário
    }

    try {
      await api.post("/tarefas", {
        nome: inputNome.current.value,
        descricao: inputDescricao.current.value,
        realizada: realizada,
        custo: parseFloat(custo.toFixed(2)), // Garante o envio com no máximo 2 casas decimais
        dataLimite: new Date(inputDataLimite.current.value),
      });

      // Recarrega a página após a criação bem-sucedida
      window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao criar a tarefa. Tente novamente.");
    }
  }

  if (!isOpen) return null; // Não renderiza nada se o modal não estiver aberto

  return (
    // Modal de criação de tarefas
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
            step="0.01" // Incrementos permitidos de duas casas decimais
            onInput={(e) => {
              // Limita o comprimento do valor total
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }

              // Limita a entrada a no máximo 2 casas decimais
              const value = e.target.value;
              const decimalIndex = value.indexOf(".");
              if (decimalIndex !== -1 && value.length - decimalIndex > 3) {
                e.target.value = parseFloat(value).toFixed(2);
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
            className="content-center"
            ref={inputDescricao}
            maxLength={35}
          ></textarea>
        </div>

        {/* Exibe a mensagem de erro */}
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
