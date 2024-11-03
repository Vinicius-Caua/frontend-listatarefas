import { Check, Pencil, Trash2 } from "lucide-react";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  return (
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
                  onClick={() => onDeleteTaskClick(task.id)}
                >
                  <Trash2 />
                </button>
                <button
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md"
                  onClick={() => onTaskClick(task.id)}
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
              Descrição:
              <span className="font-semibold italic">{task.descricao}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
