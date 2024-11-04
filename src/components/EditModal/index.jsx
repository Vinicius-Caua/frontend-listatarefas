import { useState, useEffect } from "react";
import api from "../../api";
import Modal from "../Modal";
import { formatarData } from "../../utils";

function EditModal({ isOpen, task, onCancel }) {
  const [formValues, setFormValues] = useState({
    // Inicializa o estado com valores padrão
    id: 0,
    nome: "",
    descricao: "",
    custo: "",
    dataLimite: "",
    realizada: false,
    ordemApresentacao: 0,
  });

  useEffect(() => {
    const [year, month, day] = task.dataLimite;
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    if (isOpen && task) {
      setFormValues({
        id: task.id,
        nome: task.nome || "",
        descricao: task.descricao || "",
        custo: task.custo || "",
        dataLimite: formattedDate,
        realizada: task.realizada || false,
        ordemApresentacao: task.ordemApresentacao || 0,
      });
    }
  }, [task, isOpen]);

  // Atualiza o estado com os valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Função chamada ao submeter o formulário
  function handleEdit(e) {
    e.preventDefault();

    const taskId = formValues.id;

    onEdit(taskId);
  }
  // Função que faz a requisição para editar a tarefa
  async function onEdit(taskId) {
    try {
      const requestData = {
        id: taskId,
        nome: formValues.nome,
        descricao: formValues.descricao,
        realizada: formValues.realizada || false,
        custo: parseFloat(formValues.custo) || 0,
        dataLimite: new Date(formValues.dataLimite),
        ordemApresentacao: formValues.ordemApresentacao || 0,
      };

      await api.put(`/tarefas/${taskId}`, requestData);

      window.location.reload(); // Recarrega a página para atualizar a lista de tarefas
    } catch (error) {
      console.error(
        "Erro ao editar a tarefa:",
        error.response ? error.response.data : error.message
      );
    }
  }

  if (!isOpen || !task) return null;

  return (
    // Modal de edição de tarefa
    <Modal titulo="Editar Tarefa">
      <h1>Edite os detalhes da tarefa:</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            required
            value={formValues.nome}
            onChange={handleChange}
            maxLength={27}
          />
        </div>
        <div>
          <label>Custo:</label>
          <input
            type="number"
            name="custo"
            required
            value={formValues.custo}
            onChange={handleChange}
            onInput={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
            }}
          />
        </div>
        <div>
          <label>Data Limite:</label>
          <input
            type="date"
            name="dataLimite"
            required
            value={formValues.dataLimite}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formValues.descricao}
            onChange={handleChange}
            maxLength={35}
          ></textarea>
        </div>
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
