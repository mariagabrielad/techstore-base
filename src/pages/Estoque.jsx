// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, listaEspera = [] }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos
    .slice()
    .sort((a, b) => Number(a.estoque ?? 0) - Number(b.estoque ?? 0))

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
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
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tabela-moldura">
        <h2>Lista de espera</h2>
        {produtos.filter((produto) => Number(produto.estoque ?? 0) === 0).map((produto) => {
          const clientesEsperando = listaEspera.filter((item) => item.produtoId === produto.id)

          return (
            <div key={produto.id} className="card card-lista-espera">
              <h3>{produto.title}</h3>
              {clientesEsperando.length === 0 ? (
                <p>Nenhum cliente aguardando.</p>
              ) : (
                <ul>
                  {clientesEsperando.map((cliente) => (
                    <li key={cliente.id}>
                      {cliente.nome} - {cliente.email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
