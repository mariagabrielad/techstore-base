// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return 0
  }

  let texto = String(valor).trim().replace(/R\$/g, '').replace(/\s/g, '')

  if (!texto || texto === 'null' || texto === 'undefined') {
    return 0
  }

  if (texto.includes(',') && texto.includes('.')) {
    if (texto.lastIndexOf(',') > texto.lastIndexOf('.')) {
      texto = texto.replace(/\./g, '').replace(',', '.')
    } else {
      texto = texto.replace(/,/g, '')
    }
  } else if (texto.includes(',')) {
    texto = texto.replace(',', '.')
  } else if (texto.includes('.')) {
    const partes = texto.split('.')
    if (partes.length > 2 || (partes[partes.length - 1].length === 3 && partes[0].length > 0)) {
      texto = texto.replace(/\./g, '')
    }
  }

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

normalizarPreco('89')
normalizarPreco('299,90')
normalizarPreco('1.299,00')
