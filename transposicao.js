class CaixaDaLanchonete {

    //Atributo que contem códigos e valores para a solução
    //array dos itens que serão comprados
    cardapio = [
        { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
        { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
        { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
        { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
        { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
        { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    ];

    //Calcular Desconto ou Taxa de acordo com o metodo de pagamento
    descontarOuTaxar(totalDebito, metodoDePagamento) {
        if (metodoDePagamento === 'dinheiro') {
            return totalDebito * 0.95;
        } else if (metodoDePagamento === 'credito') {
            return totalDebito * 1.03;
        } else if (metodoDePagamento === 'debito') {
            return totalDebito;
        }
    }

    //Verificar se o item principal está no pedido ao tentar comprar o item extra
    verificarCafeNoPedido(itens) {
        //cafe está incluso em algum dos itens do pedido?
        return itens.some(item => item.includes('cafe'));
    }

    verificarSanduicheNoPedido(itens) {
        return itens.some(item => item.includes('sanduiche'));
    }

    //Metodo principal para a execução dos testes
    calcularValorDaCompra(metodoDePagamento, itens) {
        //Regras de validação
        //Alguma das 3 opções está definida na forma de pagamento?
        //"sendo o primeiro uma string com os possíveis valores válidos"
        if (!['debito', 'credito', 'dinheiro'].includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        //Existe algum item no pedido?
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        //Valor total do pedido sem taxas
        let totalDebito = 0;



        return "";
    }

}

export { CaixaDaLanchonete };

for (const itemComprado of itens) {
    const [codigoDoItem, quantidade] = itemComprado.split(",");
    const cardapioItem = this.cardapio.find(cardapioItem => cardapioItem.codigo === codigoDoItem);
