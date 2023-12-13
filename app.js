const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { Pool } = require('pg');
const PORTA = 3001;
let NovoCodigoInterno = 0;
const app = express()
app.use(express.json())
app.use(cors())
var fs = require('fs');
let client = '';

let produtosPrincipais = '';
let produtosExportados = '';
let produtosEmComum = [];
let produtosDivergentes = [];
let produtosEmpresaDivergentes = [];
let empareamentoDosGrupos = [];


app.listen(PORTA, () => {
    comunicacao = true
    // console.log(`conectado back-end`, PORTA)
})

function PrincipalBD(local) {
    if (local) {
        client = new Pool({
            database: process.env.ONE_DB,
            user: process.env.ONE_USER,
            password: process.env.ONE_PASSWORD,
            port: process.env.ONE_PORT,
            host: process.env.ONE_HOST
        })
    } else {
        client = new Pool({
            database: process.env.EXP_DB,
            user: process.env.EXP_USER,
            password: process.env.EXP_PASSWORD,
            port: process.env.EXP_PORT,
            host: process.env.EXP_HOST
        })

    }

}

initDonwloadBD()

async function initDonwloadBD() {
    await PrincipalConsult()
    await ExportConsult()
    
}

async function ExportConsult() {
    PrincipalBD(false)
    try {
        const result1 = await client.query(`SELECT * FROM produtos `)
        produtosExportados = result1.rows
        const result2 = await client.query(`SELECT produtos.cod_barras, produtos.descricao, produtos_empresa.*
        FROM produtos_empresa
        INNER JOIN produtos ON produtos.codigo = produtos_empresa.cod_produto; `)
        produtosEmpresaExportados = result2.rows
        const result3 = await client.query(`SELECT * FROM grupos order by codigo`)
        const result4 = await client.query(`SELECT * FROM subgrupos order by codigo`)
        gruposExportados = result3.rows
        subgruposExportados = result4.rows
        const result5 = await client.query(`select * from departamentos order by codigo`)
        departamentosExportados = result5.rows
        // console.log('passou')
    } catch {
        // console.log('errou no principal')
        // return console.log(result1)

    }
}

async function PrincipalConsult() {
    PrincipalBD(true)
    try {
        const result1 = await client.query(`SELECT * FROM produtos`)
        // console.table(result1.rows)
        produtosPrincipais = result1.rows
        // console.log('passou')
        const result3 = await client.query(`SELECT * FROM grupos order by codigo  `)
        const result4 = await client.query(`SELECT * FROM subgrupos order by codigo `)
        gruposPrincipal = result3.rows
        subgruposPrincipal = result4.rows
        const result5 = await client.query(`select * from departamentos order by codigo`)
        departamentosExportados = result5.rows
       
    } catch {
        // console.log('errou no principal')
        // return console.log(result1)
    }
}

app.get('/grupos', async (req, res) => {
    try {
        const rows = [gruposExportados, subgruposExportados, gruposPrincipal, subgruposPrincipal]
        return res.status(200).send(rows)
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

app.post('/grupos', async (req, res) => {
    try {
        // console.log('post chegou')
        // console.log(req.body)
        empareamentoDosGrupos = req.body
        let resposta = {message:'deu certo'}
        atualizando()
        res.status(200).send(resposta);
    } catch (err) {
        return res.status(400).send(err);
    }
});


async function atualizando() {
    // console.log('atualizando')

    produtosExportados.forEach((idProdutosExportados) => {
        let encontrado = false;

        produtosPrincipais.filter((idProdutosPrincipais) => {
            if (idProdutosPrincipais.cod_barras == idProdutosExportados.cod_barras) {

             if(idProdutosPrincipais.descricao == idProdutosExportados.descricao){

                let log = `${idProdutosPrincipais.descricao} analisar esses produto`
                // console.log(log)
                fs.appendFile('exportacao/Verificar.csv', String(log), function (err) {
                  if (err) throw err;
                  // console.log('Salvo os produtos em Comum');
              });
              }

                idProdutosExportados.Novo_codigo = idProdutosPrincipais.codigo
                produtosEmComum.push(idProdutosExportados)
                // console.log('produto em comum')
                encontrado = true;
              }
              
            }
            )
            if (!encontrado) {
              
              if (NovoCodigoInterno == 0) {
                NovoCodigoInterno = produtosPrincipais.length;
              }
              NovoCodigoInterno++
              idProdutosExportados.codigo = '0000000' + NovoCodigoInterno
              idProdutosExportados.cod_marca = '0001'
              
              let novoSubGrupo = empareamentoDosGrupos.find(x => x.subgruposExportadosOriginal == idProdutosExportados.cod_subgrupo)
              // console.log(novoSubGrupo.subgruposExportadosSubstituido)
              idProdutosExportados.cod_subgrupo = novoSubGrupo.subgruposExportadosSubstituido;
              idProdutosExportados.cod_grupo = novoSubGrupo.subgruposExportadosSubstituido.slice(0,2)
              // console.log(idProdutosExportados.descricao,idProdutosExportados.cod_grupo,idProdutosExportados.cod_subgrupo)
              // console.log('produto em Divergente')
              produtosDivergentes.push(idProdutosExportados)
              
              
              produtosEmpresaExportados.forEach((pee) => {
                pee.cod_depto = '002'
                if (pee.cod_barras == idProdutosExportados.cod_barras) {
                  pee.cod_produto = idProdutosExportados.codigo
                  pee.cod_fornecedor = '0001'
                  produtosEmpresaDivergentes.push(pee)
                  
                  // console.log('pee adicionado', pee.cod_produto, 'cod de barras', pee.cod_barras)
                }
              })
              
            // console.log( NovoCodigoInterno , typeof NovoCodigoInterno)
        }
    }
    )



    let DadosProdutosDivergentes = `cod_barras,descricao, novo Codigo interno\n`;
    let DadosProdutosEmComum = `cod_barras,descricao,codigo,Novo_codigo\n`;

    produtosEmComum.forEach((id) => {
        DadosProdutosEmComum += `${id.cod_barras},${id.descricao},${id.codigo},${id.Novo_codigo}\n`;
    })

    produtosDivergentes.forEach((id) => {
        DadosProdutosDivergentes += `${id.cod_barras},${id.descricao},${id.novoCodigoTestado}\n`;
    })

    fs.appendFile('exportacao/emComum.csv', String(DadosProdutosEmComum), function (err) {
        if (err) throw err;
        // console.log('Salvo os produtos em Comum');
    });

    fs.appendFile('exportacao/Divergentes.csv', String(DadosProdutosDivergentes), function (err) {
        if (err) throw err;
        // console.log('Salvo os produtos divergentes');
    });
    // console.log(produtosEmComum)
    //console.table('So pra separa dos produtos divergentes')
    // console.table(produtosDivergentes.length);

    

    MakeInsert()
    ProdutosEmpresaMakeInsert(produtosEmpresaExportados)
}



function MakeInsert() {

    let comando = ''
    let colunas = Object.keys(produtosDivergentes[0])
    array = colunas.filter(item => item !== 'codigoxx');
    // console.log(String(array)); 

    produtosDivergentes.forEach((produtoComando, idc) => {

        let valoresItens = '';
        array.forEach((valorProduto, idx) => {

            if (idx !== 0) { valoresItens += ',' }      
                  if(produtoComando[valorProduto] === null){
                    valoresItens += `0`;
                  }else{
                    valoresItens += `'${produtoComando[valorProduto]}'`;
                  }
           
        })
        comando += `INSERT INTO produtos(${array}) values (${valoresItens});\n`
        // console.log(idc, `${produtosDivergentes.length}`)
    })

    fs.appendFile('exportacao/Isert_divergentes.txt', String(comando), function (err) {
        if (err) throw err;
        // console.log('Salvo o Insert');
    });


}



function ProdutosEmpresaMakeInsert(entrada) {

    let comando = ''
    let colunas = Object.keys(entrada[0])
    array = colunas.filter(item => item !== 'cod_barras' && item !== 'descricao');
    // console.log(String(array)); 
    // console.log(array[0], typeof array[0])

    entrada.forEach((produtoComando, idc) => {
        delete produtoComando.cod_barras;
        delete produtoComando.descricao;

        let valoresItens = '';
        array.forEach((valorProduto, idx) => {
            if (idx !== 0) { valoresItens += ',' }
              
          
            if(produtoComando[valorProduto] === null){
              valoresItens += `NULL`;
            }else {
              console.log(produtoComando[valorProduto].length, typeof produtoComando[valorProduto])
              valoresItens += `'${produtoComando[valorProduto]}'`;
            }
        })

        comando += `INSERT INTO produtos_empresa(${array}) values (${valoresItens});\n`
                // console.log(idc, `${entrada.length}`)
    })

    fs.appendFile('exportacao/Isert_divergentespee.txt', String(comando), function (err) {
        if (err) throw err;
        // console.log('Salvo o Insert dos Produtos empresa');
    });


}


