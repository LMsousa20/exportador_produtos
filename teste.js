
app.get('/', (req, res) => { console.log('Olá mundo') })

app.get('/users', async (req, res) => {
    try {
        const { rows } = await client.query(`SELECT * FROM cliente`)
        return res.status(200).send(rows)
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

app.get('/users/:idclient', async (req, res) => {
    var client = req.params.idclient;
    console.log(client)

    try {
        const retorno = await client.query(`SELECT * FROM cliente WHERE cpf_cnpj = '${client}'`)
        var reposta = res.status(200).send(testeNaTela(retorno.rows[0].qntd_pontos))

        return reposta
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

INSERT INTO produtos_empresa(cod_empresa,cod_produto,cod_depto,cod_aliquota,cod_fornecedor,cod_ult_compra,ativo,preco,desconto,margem,markup,comissao,tipo_comissao,estoque_minimo,estoque_ideal,custo_semenc,custo_comenc,custo_medio,cod_contabil,id_concentrador,dotz_forma_pontuacao,dotz_fator_pontuacao,dotz_qtd_pontos,md5_preco,composto,usa_componentes_nota,qtd_componentes_opc,fina_dn_tipo_acresdesc,fina_dn_valor_acresdesc,fina_cv_tipo_acresdesc,fina_cv_valor_acresdesc,fina_cp_tipo_acresdesc,fina_cp_valor_acresdesc,fina_cc_tipo_acresdesc,fina_cc_valor_acresdesc,fina_cd_tipo_acresdesc,fina_cd_valor_acresdesc,fina_tk_tipo_acresdesc,fina_tk_valor_acresdesc,fina_vf_tipo_acresdesc,fina_vf_valor_acresdesc,fina_tipo_cashback,fina_valor_cashback,preco_nivel_1,preco_nivel_2,dt_ini_validade,dt_fim_validade,dt_cadastro,dt_alteracao,cod_shell,shell_status,shell_produto_tipo,fina_pix_tipo_acresdesc,fina_pix_valor_acresdesc,fina_qr_tipo_acresdesc,fina_qr_valor_acresdesc,qtd_preco_nivel_1,qtd_preco_nivel_2,valor_pmpf,cod_prog_fidelidade,vibra_codigo_produto,fina_pef_tipo_acresdesc,fina_pef_valor_acresdesc,forma_venda) values ('01','00005556','010','03','0025','00004971','S','85.990','0.00','50.18','100.72','0.00','P','0','0','42.8400000000','42.8400000000','42.1594000000','4055',' ',null,null,null,null,'N','N','0','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','P','0.00','0.000','0.000',null,null,'Tue Oct 25 2022 12:07:45 GMT-0300 (Horário Padrão de Brasília)',null,'',' ','N','D','0.000000','D','0.000000','0','0','0.00',null,null,'D','0.000000','U');
INSERT INTO produtos_empresa(cod_empresa,cod_produto,cod_depto,cod_aliquota,cod_fornecedor,cod_ult_compra,ativo,preco,desconto,margem,markup,comissao,tipo_comissao,estoque_minimo,estoque_ideal,custo_semenc,custo_comenc,custo_medio,cod_contabil,id_concentrador,dotz_forma_pontuacao,dotz_fator_pontuacao,dotz_qtd_pontos,md5_preco,composto,usa_componentes_nota,qtd_componentes_opc,fina_dn_tipo_acresdesc,fina_dn_valor_acresdesc,fina_cv_tipo_acresdesc,fina_cv_valor_acresdesc,fina_cp_tipo_acresdesc,fina_cp_valor_acresdesc,fina_cc_tipo_acresdesc,fina_cc_valor_acresdesc,fina_cd_tipo_acresdesc,fina_cd_valor_acresdesc,fina_tk_tipo_acresdesc,fina_tk_valor_acresdesc,fina_vf_tipo_acresdesc,fina_vf_valor_acresdesc,fina_tipo_cashback,fina_valor_cashback,preco_nivel_1,preco_nivel_2,dt_ini_validade,dt_fim_validade,dt_cadastro,dt_alteracao,cod_shell,shell_status,shell_produto_tipo,fina_pix_tipo_acresdesc,fina_pix_valor_acresdesc,fina_qr_tipo_acresdesc,fina_qr_valor_acresdesc,qtd_preco_nivel_1,qtd_preco_nivel_2,valor_pmpf,cod_prog_fidelidade,vibra_codigo_produto,fina_pef_tipo_acresdesc,fina_pef_valor_acresdesc,forma_venda) values ('01','00005557','010','03','0025','00005868','S','32.990','0.00','54.62','120.37','0.00','P','0','0','14.9700000000','14.9700000000','14.8412000000','4056',' ',null,null,null,null,'N','N','0','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','P','0.00','0.000','0.000',null,null,'Tue Oct 25 2022 12:09:25 GMT-0300 (Horário Padrão de Brasília)',null,'',' ','N','D','0.000000','D','0.000000','0','0','0.00',null,null,'D','0.000000','U');
INSERT INTO produtos_empresa(cod_empresa,cod_produto,cod_depto,cod_aliquota,cod_fornecedor,cod_ult_compra,ativo,preco,desconto,margem,markup,comissao,tipo_comissao,estoque_minimo,estoque_ideal,custo_semenc,custo_comenc,custo_medio,cod_contabil,id_concentrador,dotz_forma_pontuacao,dotz_fator_pontuacao,dotz_qtd_pontos,md5_preco,composto,usa_componentes_nota,qtd_componentes_opc,fina_dn_tipo_acresdesc,fina_dn_valor_acresdesc,fina_cv_tipo_acresdesc,fina_cv_valor_acresdesc,fina_cp_tipo_acresdesc,fina_cp_valor_acresdesc,fina_cc_tipo_acresdesc,fina_cc_valor_acresdesc,fina_cd_tipo_acresdesc,fina_cd_valor_acresdesc,fina_tk_tipo_acresdesc,fina_tk_valor_acresdesc,fina_vf_tipo_acresdesc,fina_vf_valor_acresdesc,fina_tipo_cashback,fina_valor_cashback,preco_nivel_1,preco_nivel_2,dt_ini_validade,dt_fim_validade,dt_cadastro,dt_alteracao,cod_shell,shell_status,shell_produto_tipo,fina_pix_tipo_acresdesc,fina_pix_valor_acresdesc,fina_qr_tipo_acresdesc,fina_qr_valor_acresdesc,qtd_preco_nivel_1,qtd_preco_nivel_2,valor_pmpf,cod_prog_fidelidade,vibra_codigo_produto,fina_pef_tipo_acresdesc,fina_pef_valor_acresdesc,forma_venda) values ('01','00005558','001','03','0564','00005789','S','4.000','0.00','75.00','300.00','0.00','P','0','0','1.0000000000','1.0000000000','1.0865000000','4057',' ',null,null,null,null,'N','N','0','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','D','0.000000','P','0.00','0.000','0.000',null,null,'Tue Oct 25 2022 12:13:41 GMT-0300 (Horário Padrão de Brasília)',null,'',' ','N','D','0.000000','D','0.000000','0','0','0.00','','','D','0.000000','U');


// Exemplo de array de objetos
let arrayDeObjetos = [
    { id: 1, propriedadeAlvo: 'valor1' },
    { id: 2, propriedadeAlvo: 'valor2' },
    { id: 3, propriedadeAlvo: 'valor3' }
  ];
  
  // Valor que você está procurando na propriedadeAlvo
  let valorProcurado = ;
  
  // Usando o método find para buscar o objeto
  let objetoEncontrado = arrayDeObjetos.find(objeto => objeto.propriedadeAlvo === valorProcurado);
  
  // Verificando se o objeto foi encontrado
  if (objetoEncontrado) {
    console.log('Objeto encontrado:', objetoEncontrado);
  } else {
    console.log('Objeto não encontrado');
  }