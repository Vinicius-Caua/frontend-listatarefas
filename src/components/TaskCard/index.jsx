import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, Pencil, Trash2 } from "lucide-react";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";
import api from "../../api";
import { formatarData } from "../../utils";

function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Define o sensor com um delay para ativação do evento de drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Delay para começar o drag após mover 5px
      },
    })
  );

  // Busca as tarefas da API (GET)
  async function getTarefas() {
    const tarefasFromApi = await api.get("/tarefas");
    setTasks(tarefasFromApi.data);
  }

  useEffect(() => {
    getTarefas();
  }, []);

  // Alterna o status de realização de uma tarefa
  async function handleToggleComplete(taskId) {
    try {
      const taskToToggle = tasks.find((task) => task.id === taskId);

      const updatedTask = {
        ...taskToToggle,
        realizada: !taskToToggle.realizada,
      };

      await api.put(`/tarefas/${taskId}`, updatedTask);
      getTarefas();
    } catch (error) {
      console.error(error);
    }
  }

  // Abre o modal de edição de tarefas
  function handleAlterTarefas(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskToEdit(taskToEdit);
    setIsEditModalOpen(true);
  }

  // Abre o modal de confirmação de exclusão
  function handleDeleteClick(taskId) {
    setIsDeleteModalOpen(true);
    setTaskToDelete(taskId);
  }

  // Fecha os modais de edição e exclusão
  function handleCancel() {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setTaskToDelete(null);
  }

  // Função para reordenar as tarefas após o drag
  async function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((task) => task.id === active.id);
        const newIndex = items.findIndex((task) => task.id === over.id);
        const reorderedTasks = arrayMove(items, oldIndex, newIndex);

        // Atualiza a ordemApresentacao para cada tarefa no novo array
        const updatedTasks = reorderedTasks.map((task, index) => ({
          ...task,
          ordemApresentacao: index + 1, // começa em 1
        }));

        // Envia a nova ordem para o backend
        updateTaskOrderOnBackend(updatedTasks);

        return updatedTasks;
      });
    }
  }

  // Função para atualizar a ordem das tarefas no backend
  async function updateTaskOrderOnBackend(tasks) {
    try {
      // Envia uma requisição PUT para cada tarefa com seu respectivo ID
      await Promise.all(
        tasks.map((task) =>
          api.put(`/tarefas/${task.id}`, {
            ...task,
            ordemApresentacao: task.ordemApresentacao,
          })
        )
      );
      getTarefas();
    } catch (error) {
      console.error("Erro ao atualizar a ordem das tarefas:", error);
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter} // Detecta o centro do elemento
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-4 w-96">
          {tasks.map((task) => (
            <SortableTaskItem
              key={task.id}
              task={task}
              onEdit={() => handleAlterTarefas(task.id)}
              onDelete={() => handleDeleteClick(task.id)}
              onToggleComplete={() => handleToggleComplete(task.id)}
            />
          ))}
        </ul>

        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onCancel={handleCancel}
            task={tasks.find((task) => task.id === taskToDelete)}
          />
        )}
        {isEditModalOpen && (
          <EditModal
            isOpen={isEditModalOpen}
            onCancel={handleCancel}
            task={taskToEdit}
          />
        )}
      </SortableContext>
    </DndContext>
  );
}

// Renderiza cada item da lista de tarefas que pode ser reordenado com drag-and-drop
function SortableTaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 shadow-md flex justify-between items-start ${
        task.custo >= 1000 ? "bg-red-300" : "bg-yellow-400"
      }`}
    >
      {/* Título da tarefa e Id */}
      <div className="flex-grow">
        <h2 className="text-lg font-bold flex justify-between items-center">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {task.nome}
          </span>
          <span className="italic text-sm font-light text-right">
            Id: {task.id}
          </span>
        </h2>
        {/* Status da tarefa */}
        <div className="flex justify-between items-center mt-2">
          <span
            className={`text-sm ${
              task.realizada ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {task.realizada ? "Concluída" : "Pendente"}
          </span>
          <div className="flex space-x-2">
            <button
              className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center shadow-md"
              onClick={onEdit}
            >
              <Pencil />
            </button>
            <button
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md"
              onClick={onDelete}
            >
              <Trash2 />
            </button>
            <button
              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md"
              onClick={onToggleComplete}
            >
              <Check />
            </button>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-2">
          <p className="text-sm font-semibold">
            Custo:
            <span className="text-sm font-normal">
              R$ {task.custo.toFixed(2)}
            </span>
          </p>
          <div className="mt-2">
            <p className="text-sm font-semibold">
              Data Limite:
              <span className="text-sm"> {formatarData(task.dataLimite)}</span>
            </p>
          </div>
          <div className="inline-flex items-center gap-1">
            <p className="text-sm font-semibold mt-1">Descrição:</p>
            <span className="text-sm italic"> {task.descricao}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TaskCard;
