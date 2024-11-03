import Modal from "./Modal";

function ConfirmDeleteTaskModal({ isOpen }) {
  // Não renderiza nada se o modal não estiver aberto

  if (!isOpen) return null;

  return (
    <Modal
      titulo="Deseja excluir esta tarefa?"
      // subTitulo="Você realmente deseja excluir esta tarefa?"
      // onClick={() => onDelete(task.id)}
      // onCancel={onCancel}
      // task={task} // Passa a tarefa como prop
    >
      <h2>Modal de deletar</h2>
    </Modal>
  );
}

export default ConfirmDeleteTaskModal;
// function ConfirmDeleteTaskModal({ isOpen, task, onDelete, onCancel }) {
//   // Não renderiza nada se o modal não estiver aberto

//   if (!isOpen) return null;

//   return (
//     <Modal
//       titulo="Deseja excluir esta tarefa?"
//       subTitulo="Você realmente deseja excluir esta tarefa?"
//       onClick={() => onDelete(task.id)}
//       onCancel={onCancel}
//       task={task} // Passa a tarefa como prop
//     />
//   );
// }

// export default ConfirmDeleteTaskModal;
