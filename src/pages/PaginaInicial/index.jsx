import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import CreateModal from "../../components/CreateModal";
import TaskCard from "../../components/TaskCard";

function PaginaInicial() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para fechar o modal
  function handleCancel() {
    setIsModalOpen(false); // Fecha o modal sem excluir
  }

  // Função para abrir o create modal
  function handleCreate() {
    setIsModalOpen(true);
  }

  // Camada anterior as tasks
  return (
    <div className="flex flex-col items-center gap-1 w-1/2 h-[770px] bg-note-pad bg-no-repeat bg-contain bg-center my-6 mx-auto">
      <div className="mt-28 mb-6">
        <h1 className="text-4xl font-bold	font-main text-dark">
          Lista de Tarefas
        </h1>
      </div>
      <div className="h-[490px] overflow-y-auto">
        <TaskCard />
      </div>
      {
        <div className="w-32 mt-4">
          <button
            className="w-full text-xl text-dark font-bold text-center bg-green-500 p-2 rounded-lg shadow-md"
            onClick={handleCreate}
          >
            Criar
          </button>
        </div>
      }

      <div>
        <CreateModal isOpen={isModalOpen} onCancel={handleCancel} />
      </div>
    </div>
  );
}

export default PaginaInicial;
