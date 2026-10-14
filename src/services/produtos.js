import { get } from './api'
import { normalizarPreco } from '../utils/carrinho'

// Formato dos produtos documentado em docs/api.md
export function buscarProdutos() {
  return get('/products.json').then((produtos) =>
    produtos.map((produto) => ({
      ...produto,
      price: normalizarPreco(produto.price),
      precoOriginal: produto.precoOriginal ? normalizarPreco(produto.precoOriginal) : undefined,
    }))
  )
}
