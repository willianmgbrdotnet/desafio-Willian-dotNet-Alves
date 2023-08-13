class CaixaDaLanchonete {
    //Atributo que contem Dados dos itens para desenvolver a solução
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

    //Método que calcula Desconto ou Taxa de acordo com o metodo de pagamento
    descontarOuTaxar(totalDebito, metodoDePagamento) {
        if (metodoDePagamento === 'dinheiro') {
            return totalDebito * 0.95;
        } else if (metodoDePagamento === 'credito') {
            return totalDebito * 1.03;
        } else if (metodoDePagamento === 'debito') {
            return totalDebito;
        }
    }
    
    //Método que verifica se o item principal está no pedido ao tentar comprar o item extra
    verificarCafeNoPedido(itens) {
        //Em algum dos itens que serão comprados está incluso o código café?
        return itens.some(codigoDoItem => codigoDoItem.includes('cafe'));
    }
    //O mesmo acima
    verificarSanduicheNoPedido(itens) {        
        return itens.some(codigoDoItem => codigoDoItem.includes('sanduiche'));
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
        //Valor total do pedido sem taxas ou desconto
        let totalDebito = 0;

        //"O segundo parâmetro contém um array dos itens que serão comprados."(vide README)
        for (const itemComprado of itens) {
            /*Cada item "comprado" é uma string contendo o código do item e a quantidade do mesmo separados por uma vírgula.
            Exemplo: ['cafe,1','chantily,1']"(vide README)*/
            const [codigoDoItem, quantidade] = itemComprado.split(",");

            //Verifica se o código do item informado é um item do cardápio
            const itemEscolhidoDoCardapio = this.cardapio.find(
                //item do cardápio cujo o código do item do cardápio seja IGUAL ao código do item comprado
                itemEscolhidoDoCardapio => itemEscolhidoDoCardapio.codigo === codigoDoItem
                );            
            //Verificar se o item do pedido está no Cardápio
            if (!itemEscolhidoDoCardapio) {
                return 'Item inválido!';
            }
            //Verifica se a quantidade é pelo menos 1 unidade
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }
            //O item principal está no pedido ao comprar o extra?
            if (codigoDoItem === 'chantily' && !this.verificarCafeNoPedido(itens)) {
                return 'Item extra não pode ser pedido sem o principal';
            }
            //O item principal está no pedido ao comprar o extra?
            if (codigoDoItem === 'queijo' && !this.verificarSanduicheNoPedido(itens)) {
                return 'Item extra não pode ser pedido sem o principal';
            }
            //Impedindo o Combo de validar a compra do item EXTRA
            if ((codigoDoItem === 'combo1' || codigoDoItem === 'combo2') &&
                (itens.includes('chantily') || itens.includes('queijo'))
            ) {
                return 'Os combos não permitem a venda de chantily ou queijo.';
            }
            //Dessa forma irá somar cada item comprado no pedido(carrinho de compras)
            //totalDebito = totalDebido + (itemEscolhidoDoCardapio.valor * quantidade);
            totalDebito += itemEscolhidoDoCardapio.valor * quantidade;
        }
        /*A variável "totalFinal" recebe o valor da variável "totalDebito"
        para ser feita a Formatação*/
        let totalFinal = totalDebito;
        //Calculo do Desconto
        if (metodoDePagamento === 'dinheiro') {
            totalFinal = this.descontarOuTaxar(totalDebito, metodoDePagamento);
        //Calculo da Taxa
        } else if (metodoDePagamento === 'credito') {
            totalFinal = this.descontarOuTaxar(totalDebito, metodoDePagamento);
        }
        //Formatação para retornar o padrão Real Brasileiro
        return `R$ ${totalFinal.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };