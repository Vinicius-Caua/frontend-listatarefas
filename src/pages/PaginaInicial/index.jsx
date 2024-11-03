import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import CreateModal from "../../components/CreateModal";
import TaskCard from "../../components/TaskCard";

function PaginaInicial() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCancel() {
    setIsModalOpen(false); // Fecha o modal sem excluir
  }

  function handleCreate() {
    setIsModalOpen(true);
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
            <TaskCard />
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

      <CreateModal isOpen={isModalOpen} onCancel={handleCancel} />
    </div>
  );
}

export default PaginaInicial;
