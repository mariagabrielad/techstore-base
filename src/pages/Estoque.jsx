import { formatarPreco } from '../utils/formatarPreco'

const CATEGORIAS = ['roupas', 'eletronicos', 'acessorios', 'casa']

export default function Estoque({ produtos, listaEspera = [] }) {
  const ordenados = produtos
    .slice()
    .sort((a, b) => Number(a.estoque ?? 0) - Number(b.estoque ?? 0))

  const produtosComEstoque = produtos.filter((produto) => Number(produto.estoque ?? 0) > 0)
  const produtosSemPreco = produtos.filter(
    (produto) => Number(produto.estoque ?? 0) > 0 && (!produto.price || Number(produto.price) <= 0)
  )
  const totalEmEstoque = produtosComEstoque.reduce((total, produto) => {
    const preco = Number(produto.price ?? 0)
    return total + preco * Number(produto.estoque ?? 0)
  }, 0)

  const totalEsperandoRetorno = produtosSemPreco.reduce(
    (total, produto) => total + Number(produto.estoque ?? 0),
    0
  )

  const clientesEsperando = listaEspera.length

  const resumoPorCategoria = CATEGORIAS.map((categoria) => {
    const itens = produtos.filter((produto) => produto.category === categoria)
    const valorEmEstoque = itens.reduce((total, produto) => {
      const preco = Number(produto.price ?? 0)
      return total + preco * Number(produto.estoque ?? 0)
    }, 0)

    const produtosSemPrecoCategoria = itens.filter(
      (produto) => Number(produto.estoque ?? 0) > 0 && (!produto.price || Number(produto.price) <= 0)
    )

    const filaCategoria = itens.reduce((total, produto) => {
      return total + listaEspera.filter((cliente) => cliente.produtoId === produto.id).length
    }, 0)

    const lucroEstimado = itens.reduce((total, produto) => {
      const estoque = Number(produto.estoque ?? 0)
      const preco = Number(produto.price ?? 0)
      const margem = produto.precoOriginal ? Math.max(0, Number(produto.precoOriginal) - preco) : preco * 0.3
      return total + estoque * margem
    }, 0)

    return {
      categoria,
      valorEmEstoque,
      filaCategoria,
      produtosSemPrecoCategoria: produtosSemPrecoCategoria.length,
      lucroEstimado,
    }
  })

  return (
    <section className="painel-lojista">
      <p className="sobretitulo">Painel do lojista</p>
      <h1>Área interna</h1>

      <div className="painel-resumo">
        <article className="resumo-card resumo-card-principal">
          <span>Valor em estoque</span>
          <strong>{formatarPreco(totalEmEstoque)}</strong>
          <small>{produtosComEstoque.length} produtos disponíveis hoje</small>
        </article>

        <article className="resumo-card">
          <span>Esperando preço</span>
          <strong>{totalEsperandoRetorno}</strong>
          <small>unidades sem preço definido</small>
        </article>

        <article className="resumo-card">
          <span>Na fila de espera</span>
          <strong>{clientesEsperando}</strong>
          <small>clientes aguardando retorno</small>
        </article>
      </div>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Valor em estoque</th>
              <th>Esperando preço</th>
              <th>Clientes na fila</th>
              <th>Lucro estimado</th>
            </tr>
          </thead>
          <tbody>
            {resumoPorCategoria.map((linha) => (
              <tr key={linha.categoria}>
                <td>{linha.categoria}</td>
                <td>{formatarPreco(linha.valorEmEstoque)}</td>
                <td>{linha.produtosSemPrecoCategoria}</td>
                <td>{linha.filaCategoria}</td>
                <td>{formatarPreco(linha.lucroEstimado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="painel-grid">
        <div className="tabela-moldura">
          <h2>Produtos esperando preço</h2>
          {produtosSemPreco.length === 0 ? (
            <p className="aviso painel-vazio">Nenhum item parado esperando o time de suprimentos.</p>
          ) : (
            <table className="tabela tabela-simples">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Estoque</th>
                </tr>
              </thead>
              <tbody>
                {produtosSemPreco.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.title}</td>
                    <td>{produto.estoque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="tabela-moldura">
          <h2>Lista de espera</h2>
          {listaEspera.length === 0 ? (
            <p className="aviso painel-vazio">Nenhum cliente aguardando retorno no momento.</p>
          ) : (
            <ul className="lista-espera-painel">
              {listaEspera.map((item) => {
                const produto = produtos.find((produtoAtual) => produtoAtual.id === item.produtoId)

                return (
                  <li key={item.id}>
                    <strong>{item.nome}</strong>
                    <span>{item.email}</span>
                    <small>{produto ? produto.title : 'Produto removido'}</small>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="tabela-moldura">
        <h2>Resumo de estoque</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {Number(produto.estoque ?? 0) === 0 && (
                    <span className="selo selo-esgotado">Esgotado</span>
                  )}
                  {Number(produto.estoque ?? 0) > 0 && Number(produto.estoque ?? 0) < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {Number(produto.estoque ?? 0) >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
