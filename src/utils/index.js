// Função para formatar a data para "dd/mm/aaaa"
export function formatarData(data) {
  const ano = data[0];
  const mes = data[1];
  const dia = data[2];

  return data ? `${dia}/${mes}/${ano}` : "";
}
