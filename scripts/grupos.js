let gruposExportados = ''
let subgruposExportados = ''
let gruposPrincipal = ''
let subgruposPrincipal = ''

async function buscarGrupos() {
    let rep1 = await fetch(`http://localhost:3001/grupos`)
    let rep2 = await rep1.json()
    console.log(rep2)
    gruposExportados = rep2[0]
    subgruposExportados = rep2[1]
    gruposPrincipal = rep2[2]
    subgruposPrincipal = rep2[3]
    montegemGrupos()
}

async function montegemGrupos() {
    gruposExportados.forEach(element => {
        document.getElementById('grupos-exportados').innerHTML += `      
        <div id='exportados_${element.codigo}'> <h3>${element.descricao}
        </h3></div>
    `;
    });

    gruposPrincipal.forEach(element => {
        document.getElementById('grupos-principal').innerHTML += `<div id='principal_${element.codigo}'> <h3>${element.descricao}
        </h3></div>
    `;
    });

    await montegemSubGrupos()

}

async function montegemSubGrupos() {

    function BuscarGrupoItens(entrada) {
        let resultado = gruposPrincipal.find(x => x.codigo === entrada)
        console.log(resultado.descricao)
        return resultado.descricao
    }

    let opt = `<option value=""> - - </option>`;

    subgruposPrincipal.forEach((itens) => {
        document.getElementById(`principal_${itens.cod_grupo}`).innerHTML += `

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="${itens.descricao}" aria-label="${itens.descricao}" 
        aria-describedby="basic-addon1" id='subGrupoExportados_${itens.codigo}' disabled>
        </div> `;
        opt += `<option value="${itens.codigo}">${itens.descricao} |<span style="font-weight: bold;" class='gp_select'> GRUPO ${BuscarGrupoItens(itens.cod_grupo)}
        </span> </option>`;
    })

    subgruposExportados.forEach((itens) => {
        document.getElementById(`exportados_${itens.cod_grupo}`).innerHTML += `
        <div class="input-group mb-3">
        <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">${itens.descricao}</label>
        </div>
        <select class="custom-select" id="${itens.codigo}">
                 ${opt}
        </select>
        </div>
    `;
    })

    let mySelect = document.getElementsByTagName('select')
    for (let i = 0; i < mySelect.length; i++) {
        let optSelect = mySelect[i].children
        // console.log(optSelect)
        for (let c = 0; c < optSelect.length; c++) {
            if (mySelect[i].id == optSelect[c].value) {
                // console.log('achou', mySelect[i], optSelect[c])
                optSelect[c].selected = true;
                // mySelect[i].className += 'is-valid';
            }
        }
    }

    
}

async function enviarGrupo(){
   let dadosPost =[];
   let liberadoEnvio = true;

    let mySelect = idGrupos.getElementsByTagName('select')
    for (let i = 0; i < mySelect.length; i++) {
        let optSelect = mySelect[i]
        if(optSelect.value ===''){
            console.log(optSelect.parentNode.children[0].children[0].textContent)
            let subGrupoInvalido = optSelect.parentNode.children[0].children[0].textContent;
            optSelect.parentNode.innerHTML += `<br> <h5 style='
            color: red;'>ESSE CAMPO NÃO PODE SER VAZIO  </h5>`;
            
            
            
            liberadoEnvio = false;

        }
        // else{
        //     optSelect.parentNode.style.display = "none";
        // }
        console.log(optSelect.id, optSelect.value)
        dadosPost.push(
            {            
                subgruposExportadosOriginal: optSelect.id,
                subgruposExportadosSubstituido: optSelect.value
            }
        )
        
    }
    console.log(dadosPost)
    

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indica que você está enviando JSON no corpo da solicitação
          // Adicione quaisquer outros cabeçalhos necessários
        },
        body: JSON.stringify(dadosPost) // Converte o objeto para uma string JSON
      }


if(liberadoEnvio === true){

    await fetch(`http://localhost:3001/grupos`, options).then(response => {
        // Verifica se a solicitação foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na solicitação');
        }
        // Trata a resposta
        return response.json(); // ou response.text() se a resposta não for JSON
    })
    .then(data => {
        // Manipula os dados da resposta
        console.log('Resposta do servidor:', data);
    })
    .catch(error => {
        // Manipula erros de rede ou erros na solicitação
        console.error('Erro na solicitação:', error.message);
    });

    alert('ENVIADO COM SUCESSO')
} else{
    alert(`Falta preenche os Sub Grupos `)
}

}