import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { temPrecoValido } from '../utils/carrinho'

export default function PaginaProduto({ produtos, onAdicionar, onRegistrarListaEspera }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const precoValido = temPrecoValido(produto)
  const esgotado = Number(produto.estoque ?? 0) === 0
  const relacionados = produtos
    .filter(
      (item) =>
        item.category === produto.category &&
        item.id !== produto.id &&
        Number(item.estoque ?? 0) > 0 &&
        temPrecoValido(item)
    )
    .slice(0, 4)

  function handleListaEspera(event) {
    event.preventDefault()

    if (!onRegistrarListaEspera || !nome.trim() || !email.trim()) {
      return
    }

    onRegistrarListaEspera(produto.id, nome.trim(), email.trim())
    setNome('')
    setEmail('')
    setMensagem('Você entrou na lista de espera para receber um aviso quando o produto voltar.')
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">R$ {Number(produto.price).toFixed(2).replace('.', ',')}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{Number(produto.estoque ?? 0)} unidades disponíveis</p>

          {esgotado ? (
            <form onSubmit={handleListaEspera} className="lista-espera">
              <h2>Produto esgotado</h2>
              <p>Receba um aviso quando ele voltar ao estoque.</p>
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Seu nome"
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Seu e-mail"
              />
              <button type="submit" className="botao botao-secundario">
                Avise-me
              </button>
              {mensagem && <p className="aviso">{mensagem}</p>}
            </form>
          ) : (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={!precoValido}
            >
              {precoValido ? 'Adicionar ao carrinho' : 'Preço indisponível'}
            </button>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <article key={item.id} className="card">
            <Link to={`/produto/${item.id}`} className="card-link">
              <div className="card-imagem-moldura">
                <img src={item.image} alt={item.title} className="card-imagem" />
              </div>
              <h3 className="card-titulo">{item.title}</h3>
            </Link>
            <p className="preco">R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
            <button className="botao" onClick={() => onAdicionar(item)}>
              Adicionar ao carrinho
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
