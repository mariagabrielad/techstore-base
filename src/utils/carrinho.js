// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return 0
  }

  const texto = String(valor).trim().replace('R$', '').replace('.', '').replace(',', '.')
  const valorNumerico = Number(texto)
  return Number.isFinite(valorNumerico) ? valorNumerico : 0
}

export function temPrecoValido(produto) {
  return Boolean(produto) && normalizarPreco(produto.price) > 0
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    if (!produto || !temPrecoValido(produto)) {
      return total
    }

    return total + normalizarPreco(produto.price)
  }, 0)
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    if (!produto || !temPrecoValido(produto)) {
      return
    }

    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}

normalizarPreco("89") // 89
normalizarPreco("299,90") // 299.9
normalizarPreco("1.299,00") // 1299
