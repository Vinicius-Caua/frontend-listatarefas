// Função para formatar a data para "dd/mm/aaaa"
export function formatarData(data) {
  if (!data) return ""; // Retorna vazio se não houver data

  const date = new Date(data); // Cria um objeto Date a partir da string
  const dia = String(date.getDate()).padStart(2, "0"); // Obtém o dia com zero à esquerda
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Obtém o mês (0-11) e adiciona 1
  const ano = date.getFullYear(); // Obtém o ano

  return `${dia}/${mes}/${ano}`; // Retorna a data formatada
}
