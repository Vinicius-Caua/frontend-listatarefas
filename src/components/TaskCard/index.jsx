// src/components/TaskCard.js

import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import DeleteModal from "../DeleteModal";

function TaskCard() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Alterna o status de realização de uma tarefa
  function handleToggleComplete(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, realizada: !task.realizada } : task
      )
    );
  }

  // Abre o modal de exclusão
  function handleDeleteClick(taskId) {
    setIsModalOpen(true);
    setTaskToDelete(taskId);
  }

  // Confirma a exclusão de uma tarefa
  function handleDeleteConfirm() {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete)
    );
    setIsModalOpen(false);
    setTaskToDelete(null);
  }

  // Fecha o modal sem excluir
  function handleCancel() {
    setIsModalOpen(false);
    setTaskToDelete(null);
  }

  return (
    <>
      <ul className="space-y-4 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 rounded-lg shadow-md flex justify-between items-start ${
              task.custo >= 1000 ? "bg-red-300" : "bg-yellow-400"
            }`}
          >
            <div className="flex-grow">
              <h2
                className="text-lg font-bold flex-grow overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                data-tip={task.nome}
                data-for={`task-tooltip-${task.id}`}
              >
                {task.nome}
              </h2>

              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-sm ${
                    task.realizada ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Status: {task.realizada ? "Concluída" : "Pendente"}
                </span>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center shadow-md">
                    <Pencil />
                  </button>
                  <button
                    className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md"
                    onClick={() => handleDeleteClick(task.id)}
                  >
                    <Trash2 />
                  </button>
                  <button
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    <Check />
                  </button>
                </div>
              </div>
              <p className="text-sm font-semibold">
                Custo: R$ {task.custo.toFixed(2)}
              </p>
              <p className="text-sm">Data Limite: {task.dataLimite}</p>
              <p className="text-sm whitespace-normal break-words">
                Descrição:{" "}
                <span className="font-semibold italic">{task.descricao}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de exclusão */}
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onCancel={handleCancel}
          onConfirm={handleDeleteConfirm}
          task={tasks.find((task) => task.id === taskToDelete)}
        />
      )}
    </>
  );
}

export default TaskCard;
