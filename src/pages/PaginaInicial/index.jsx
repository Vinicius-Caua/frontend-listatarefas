import { useState } from "react";
// import "./index.css";
import "react-tooltip/dist/react-tooltip.css";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import CreateTaskModal from "../../components/CreateTaskModal";
import Tasks from "../../components/Tasks";

function PaginaInicial() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      nome: "Fazer o L",
      descricao: "Teste do teste",
      realizada: true,
      custo: 345.87,
      dataLimite: "2024-11-05",
    },
    {
      id: 2,
      nome: "Pagar Marcelly Autopecas Marcelly",
      descricao:
        "Teste do teste2Teste do teste2Teste do teste2Teste do teste2Teste do teste2Teste do teste2Teste do teste2Teste do teste2Teste do teste2Teste do teste2",
      realizada: false,
      custo: 700.87,
      dataLimite: "2024-11-05",
    },
    {
      id: 3,
      nome: "Comer Strogonoff",
      descricao: "Teste do teste3",
      realizada: false,
      custo: 2456.87,
      dataLimite: "2024-11-05",
    },
  ]);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  function onAddTaskSubimit(nome, descricao, custo, dataLimite) {
    const newTask = {
      id: tasks.length + 1,
      nome: nome,
      descricao: descricao,
      custo: custo,
      realizada: false,
      dataLimite: dataLimite,
    };
    setTasks([...tasks, newTask]);
  }

  function onDeleteTaskClick(taskId) {
    setTaskToDelete(tasks.find((task) => task.id === taskId)); // Define a tarefa a ser excluída
  }

  function handleDelete(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    setModalOpen(false); // Fecha o modal após excluir
  }

  function handleCancel() {
    setModalOpen(false); // Fecha o modal sem excluir
    setTaskToDelete(null); // Limpa a tarefa a ser excluída
  }

  function handleCreate() {
    setCreateModalOpen(true);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, realizada: !task.realizada };
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center items-center p-6 bg-gradient-to-b from-indigo-500 to-blue-300">
      <div className="flex flex-col items-center space-y-4">
        {/* Container que envolve o título */}
        <div className="w-[500px] text-center">
          <div className="bg-yellow-400 text-3xl text-black font-bold py-4 rounded-lg shadow-md">
            <h1>Lista Tarefas</h1>
          </div>
        </div>

        {/* Container das tarefas */}
        <div className="flex">
          <div className="w-[500px] bg-yellow-100 rounded-3xl p-4 flex flex-col items-center space-y-4">
            <Tasks
              tasks={tasks}
              onTaskClick={onTaskClick}
              onDeleteTaskClick={onDeleteTaskClick}
              onAddTaskSubimit={onAddTaskSubimit}
            />

            <div className="w-[200px] mt-4">
              <button
                className="w-full text-xl text-black font-bold text-center bg-green-600 p-4 rounded-lg shadow-md"
                onClick={handleCreate}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrando o modal de confirmação */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        task={taskToDelete}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />

      <CreateTaskModal isOpen={isCreateModalOpen} />
    </div>
  );
}

export default PaginaInicial;
