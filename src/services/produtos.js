import { get } from './api'
import { normalizarPreco } from '../utils/carrinho'

export function buscarProdutos() {
  return get('/products.json').then((produtos) =>
    produtos.map((produto) => ({
      ...produto,
      price: normalizarPreco(produto.price),
      precoOriginal:
        produto.precoOriginal != null
          ? normalizarPreco(produto.precoOriginal)
          : undefined,
    }))
  )
}