import { useState, useEffect, useRef } from "react";
import api from "../../api";
import Modal from "../Modal";

function EditModal({ isOpen, task, onCancel }) {
  const [formValues, setFormValues] = useState({
    id: 0,
    nome: "",
    descricao: "",
    custo: "",
    dataLimite: "",
    realizada: false,
    ordemApresentacao: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [custoError, setCustoError] = useState(""); // Estado para mensagem de erro do custo
  const inputNome = useRef();

  useEffect(() => {
    if (isOpen && task) {
      const formattedDate = new Date(task.dataLimite).toISOString().split("T")[0];
      const formattedCusto = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
        .format(task.custo)
        .replace("R$", "") // Remove o símbolo "R$"
        .trim();

      setFormValues({
        id: task.id,
        nome: task.nome || "",
        descricao: task.descricao || "",
        custo: formattedCusto,
        dataLimite: formattedDate,
        realizada: task.realizada || false,
        ordemApresentacao: task.ordemApresentacao || 0,
      });

      if (inputNome.current) {
        inputNome.current.focus();
      }
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "custo") {
      setCustoError(""); // Limpa a mensagem de erro ao digitar novamente

      const numericValue = value
        .replace(/\./g, "") // Remove pontos
        .replace(",", ".") // Substitui vírgula por ponto para cálculos
        .replace(/[^0-9.]/g, ""); // Remove caracteres inválidos

      // Limite de 11 dígitos (incluindo centavos)
      if (numericValue.length > 11) {
        setCustoError("O custo só pode receber até 10 dígitos no total.");
        return;
      }

      const formattedValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
        .format(numericValue || 0)
        .replace("R$", "") // Remove "R$"
        .trim();

      setFormValues((prevValues) => ({
        ...prevValues,
        custo: formattedValue,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  async function handleEdit(e) {
    e.preventDefault();
    setErrorMessage("");

    const custo = parseFloat(
      formValues.custo
        .replace(/\./g, "") // Remove os pontos
        .replace(",", ".") // Substitui vírgula por ponto
    );

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
        custo,
        dataLimite: new Date(formValues.dataLimite),
        ordemApresentacao: formValues.ordemApresentacao,
      };

      await api.put(`/tarefas/${formValues.id}`, requestData);

      window.location.reload();
    } catch (error) {
      console.error(
        "Erro ao editar a tarefa:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Erro ao editar a tarefa. Tente novamente.");
    }
  }

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
            ref={inputNome}
            value={formValues.nome}
            onChange={handleChange}
            maxLength={27}
          />
        </div>
        <div>
          <label className="font-bold">Custo: </label>
          <input
            type="text"
            name="custo"
            required
            value={formValues.custo}
            onChange={handleChange}
          />
          {custoError && (
            <p className="text-red-500 text-sm mt-1">{custoError}</p>
          )}
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
