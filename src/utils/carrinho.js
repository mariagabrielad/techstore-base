export function normalizarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return null
  }

  let texto = String(valor)
    .trim()
    .replace(/R\$/gi, '')
    .replace(/\s/g, '')

  if (!texto || texto === 'null' || texto === 'undefined') {
    return null
  }

  if (texto.includes(',') && texto.includes('.')) {
    if (texto.lastIndexOf(',') > texto.lastIndexOf('.')) {
      // Ex.: 1.299,90
      texto = texto.replace(/\./g, '').replace(',', '.')
    } else {
      // Ex.: 1,299.90
      texto = texto.replace(/,/g, '')
    }
  } else if (texto.includes(',')) {
    // Ex.: 299,90
    texto = texto.replace(',', '.')
  } else if (texto.includes('.')) {
    const partes = texto.split('.')

    if (
      partes.length > 2 ||
      (partes[partes.length - 1].length === 3 &&
        partes[0].length > 0)
    ) {
      // Ex.: 1.299
      texto = texto.replace(/\./g, '')
    }
  }

  const valorNumerico = Number(texto)

  return Number.isFinite(valorNumerico) && valorNumerico >= 0
    ? valorNumerico
    : null
}

export function temPrecoValido(produto) {
  if (!produto) return false

  const preco = normalizarPreco(produto.price)
  return preco !== null && preco > 0
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    if (!temPrecoValido(produto)) {
      return total
    }

    return total + normalizarPreco(produto.price)
  }, 0)
}

export function agruparItens(carrinho) {
  const itens = []

  carrinho.forEach((produto) => {
    if (!temPrecoValido(produto)) {
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

export function temEstoque(produto) {
  return Boolean(
    produto &&
    produto.stock !== null &&
    produto.stock !== undefined &&
    produto.stock !== '' &&
    Number(produto.stock) > 0
  )
}