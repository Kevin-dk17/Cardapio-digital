document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        var btn = document.querySelector("#btenv")
      
      btn.click()
    
    }
  })

if (itemGet('breakpoint')) {
    localStorage.removeItem("breakpoint");
}
var itens = [];
var preco = [];
var quant = [];
var resumo = [];

function enviar() {

    var sms = document.getElementById('msg')
    var txt = document.getElementById('txtm').value
    var txtres = ''
    var cardapio = [
        {
            codigo: 100,
            item: 'Cachorro-Quente',
            preço: 9.00
        },
        {
            codigo: 101,
            item: 'Cachorro-Quente Duplo',
            preço: 11.00
        },
        {
            codigo: 102,
            item: 'X-Egg',
            preço: 12.00
        },
        {
            codigo: 103,
            item: 'X-Salada',
            preço: 13.00
        },
        {
            codigo: 104,
            item: 'X-Bacon',
            preço: 14.00
        },
        {
            codigo: 105,
            item: 'X-Tudo',
            preço: 17.00
        },
        {
            codigo: 200,
            item: 'Refigerante Lata',
            preço: 5.00
        },
        {
            codigo: 201,
            item: 'Chá Gelado',
            preço: 4.00
        }
    ]

    

    if (txt == 0) {
        window.alert('Mensagem Inválida!!!')
    } else {
        document.getElementById('msg').appendChild(balao2(txt))

        var breakpoint = itemGet('breakpoint')

        if (breakpoint == null) {
            if (txt == 'Pedido' || txt == 'Fazer pedido' || txt == 'Quero pedir') {
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Bem vindo à DK Hamburgueria!!!'))
                }, 900);
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Digite o código do item desejado:'))
                }, 1100);
                document.getElementById('txtm').value = ''
    
                itemSet('breakpoint-1');
            }
        }
        
        if (breakpoint == 'breakpoint-1') {
            if (txt == '100' || txt == '101' || txt == '102' || txt == '103' || txt == '104' || txt == '105' || txt == '200' || txt == '201') {
                var select = cardapio.filter(item => item.codigo == txt)[0]
                itens.push(select.item)
                preco.push(select.preço)
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = `${select.item} R$ ${select.preço},00`)) 
                    sms.scrollTop = sms.scrollHeight
                }, 900);
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Digite a quantidade desejada:'))
                    sms.scrollTop = sms.scrollHeight
                }, 1100);
                document.getElementById('txtm').value = ''



                itemSet('breakpoint-2');
            } else {
                document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Código inválido, digite uma opção válida:'))
                document.getElementById('txtm').value = ''
            }
        }

        if (breakpoint == 'breakpoint-2') {
            quant.push(Number(txt))
            if (Number(txt)) {
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Deseja mais algum item?\n 1-Sim\n 2-Não'))
                    sms.scrollTop = sms.scrollHeight
                }, 900);
                document.getElementById('txtm').value = ''
    
                itemSet('breakpoint-3');
            }
        }

        if (breakpoint == 'breakpoint-3') {
            if (txt == '1') {
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Digite o código do item desejado:'))
                    sms.scrollTop = sms.scrollHeight
                }, 900);
                document.getElementById('txtm').value = ''
    
                itemSet('breakpoint-1');
            }
            if (txt == '2') {

                for (i = 0; i < preco.length; i++) {
                    resumo.push(preco[i]*quant[i])
                }

                let confirm = ''

                for (var i = 0; i < itens.length; i++){
                    confirm += `${quant[i]} x ${itens[i]} - R$ ${resumo[i]},00\n`
                }

                let total = 0

                for (i = 0; i < resumo.length; i++) {
                    total += resumo[i]
                }

                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = `Resumo do pedido:\n\n ${confirm}\n ---------------------------------------\n Valor total:  R$ ${total},00\n\n Confirmar pedido?\n 1-Sim\n 2-Não`))
                    sms.scrollTop = sms.scrollHeight
                }, 900);

                document.getElementById('txtm').value = ''

                itemSet('breakpoint-4')
            }
        }

        if (breakpoint == 'breakpoint-4') {
            if (txt == '1') {
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Muito obrigado pela preferência!\n Seu pedido já está sendo preparado.'))
                    sms.scrollTop = sms.scrollHeight
                }, 900);    
            }

            if (txt == '2') {
                setTimeout(() => {
                    document.getElementById('msg').appendChild(balao1(txtres.innerText = 'Que pena, seu pedido foi cancelado!\n Esperamos que volte para um novo pedido.'))
                    sms.scrollTop = sms.scrollHeight
                }, 900);
            }

            document.getElementById('txtm').value = ''
        }
    }

    sms.scrollTop = sms.scrollHeight
}

function balao1 (txtres) {
    const conv = document.createElement('div')
    conv.classList.add('txtcon')
    conv.innerText = txtres
    return conv
}

function balao2 (txt) {
    const resp = document.createElement('div')
    resp.classList.add('txtres')
    resp.innerText = txt
    return resp
}

function itemSet(msg) {
    localStorage.setItem("breakpoint", msg);
}

function itemGet() {
    return localStorage.getItem("breakpoint");
}

function limpar() {
    itens.splice(0, itens.length)
    preco.splice(0, preco.length)
    quant.splice(0, quant.length)
    resumo.splice(0, resumo.length)

    document.getElementById('msg').innerHTML = ''

    localStorage.removeItem("breakpoint");
}

