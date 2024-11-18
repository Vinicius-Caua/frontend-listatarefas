import { useState, useEffect, useRef } from "react";
import api from "../../api";
import Modal from "../Modal";

function EditModal({ isOpen, task, onCancel }) {
  // Estado para armazenar os valores do formulário
  const [formValues, setFormValues] = useState({
    id: 0,
    nome: "",
    descricao: "",
    custo: "",
    dataLimite: "",
    realizada: false,
    ordemApresentacao: 0,
  });

  // Estado para mensagens de erro
  const [errorMessage, setErrorMessage] = useState("");

  // Referência para o campo "Nome"
  const inputNome = useRef();

  // Atualiza os valores do formulário quando o modal é aberto
  useEffect(() => {
    if (isOpen && task) {
      // Converte a dataLimite para o formato correto (YYYY-MM-DD)
      const formattedDate = new Date(task.dataLimite).toISOString().split('T')[0]; // 'en-CA' retorna no formato ISO 'YYYY-MM-DD'
      console.log('Data Limite original:', task.dataLimite);
      console.log('Data Limite formatada:', formattedDate);
      setFormValues({
        id: task.id,
        nome: task.nome || "",
        descricao: task.descricao || "",
        custo: task.custo.toFixed(2), // Limita a exibição a duas casas decimais
        dataLimite: formattedDate,
        realizada: task.realizada || false,
        ordemApresentacao: task.ordemApresentacao || 0,
      });

      // Foca no campo "Nome" ao abrir o modal
      if (inputNome.current) {
        inputNome.current.focus();
      }
    }
  }, [task, isOpen]);

  // Atualiza o estado ao alterar valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Função para enviar as alterações ao backend
  async function handleEdit(e) {
    e.preventDefault();
    setErrorMessage(""); // Limpa mensagem de erro

    // Validação do custo
    const custo = parseFloat(formValues.custo);
    if (isNaN(custo) || custo < 0) {
      setErrorMessage("Erro: O custo não pode ser negativo.");
      return;
    }

    try {
      const requestData = {
        id: formValues.id,
        nome: formValues.nome,
        descricao: formValues.descricao,
        realizada: formValues.realizada,
        custo: custo,
        dataLimite: new Date(formValues.dataLimite),
        ordemApresentacao: formValues.ordemApresentacao,
      };

      // Atualiza a tarefa via API
      await api.put(`/tarefas/${formValues.id}`, requestData);

      // Recarrega a página após a edição
      window.location.reload();
    } catch (error) {
      console.error(
        "Erro ao editar a tarefa:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Erro ao editar a tarefa. Tente novamente.");
    }
  }

  // Não renderiza o modal se ele estiver fechado ou não houver tarefa
  if (!isOpen || !task) return null;

  return (
    <Modal titulo="Editar Tarefa">
      <h1>Edite os detalhes da tarefa:</h1>
      <span className="font-bold">Id: {task.id}</span>
      <form onSubmit={handleEdit}>
        <div>
          <label className="font-bold">Nome: </label>
          <input
            type="text"
            name="nome"
            required
            ref={inputNome} // Conecta a referência ao campo
            value={formValues.nome}
            onChange={handleChange}
            maxLength={27}
          />
        </div>
        <div>
          <label className="font-bold">Custo: </label>
          <input
            type="number"
            name="custo"
            required
            value={formValues.custo}
            onChange={handleChange}
            step="0.01" // Permite incrementos de duas casas decimais
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
          <input
            type="date"
            name="dataLimite"
            required
            value={formValues.dataLimite}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-bold">Descrição: </label>
          <textarea
            name="descricao"
            value={formValues.descricao}
            onChange={handleChange}
            maxLength={35}
          ></textarea>
        </div>

        {/* Mensagem de erro */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Salvar
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

export default EditModal;
