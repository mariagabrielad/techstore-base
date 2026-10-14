# Changelog

## 1.5.0 (outubro de 2026)

### Correções
- Ajuste no cálculo do total do carrinho para evitar valores inconsistentes quando o preço está ausente ou inválido.
- Produtos sem preço definido deixam de ser vendidos até que o valor seja informado pelo time de suprimentos.
- Correção da regra do cupom `PRIMEIRACOMPRA` para permitir uso apenas por clientes sem pedidos anteriores.
- Produtos esgotados deixam de aparecer na loja e passam a exibir fluxo de lista de espera.

### Melhorias
- Criação de painel interno do lojista com visão por categoria, valor em estoque, fila de espera e itens aguardando preço.
- Organização visual da área interna para melhor acompanhamento da operação da loja.
- Validação final da aplicação com build de produção confirmado.

## 1.4.0 (setembro de 2026)

### Novidades
- Novo visual do card de produto na lista, com avaliação e selos.
- Preço original riscado nos produtos em promoção.

## 1.3.0 (agosto de 2026)

### Ajustes
- Cupom `PRIMEIRACOMPRA` passa a valer somente para clientes sem pedidos anteriores.
- Seletor de cliente de teste no rodapé para validar regras que dependem do cliente.

## 1.2.0 (maio de 2026)

### Novidades
- Página interna `/estoque` para o time de estoque.
- Selo "Esgotado" nos produtos sem unidades.

## 1.1.0 (abril de 2026)

### Novidades
- Seção "Você também pode gostar" no carrinho.
- Produtos relacionados na página do produto.

## 1.0.0 (março de 2026)

### Lançamento
- Lançamento inicial da loja TechStore.
