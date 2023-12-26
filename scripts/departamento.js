let DepartamentoExportados = ''
let DepartamentoPrincipal = ''

async function buscarDepartamento() {
    let rep1 = await fetch(`http://localhost:3001/departamento`)
    let rep2 = await rep1.json()
    console.log(rep2)
    DepartamentoExportados = rep2[0]
    DepartamentoPrincipal = rep2[1]
     montegemDepartamento()
}

async function montegemDepartamento() {

 
    let opt = `<option value=""> - - </option>`;

    DepartamentoPrincipal.forEach((itens) => {
        document.getElementById('Departamento-principal').innerHTML += `

        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="${itens.descricao}" aria-label="${itens.descricao}" 
        aria-describedby="basic-addon1" id='subGrupoExportados_${itens.codigo}' disabled>
        </div> `;
        opt += `<option value="${itens.codigo}">${itens.descricao} | Departamento Fiscal
        </span> </option>`;
    })

    DepartamentoExportados.forEach((itens) => {
        document.getElementById('Departamento-exportados').innerHTML += `
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

    let mySelectDepto = document.getElementsByTagName('select')
    for (let i = 0; i < mySelectDepto.length; i++) {
        let optSelect = mySelectDepto[i].children
        // console.log(optSelect)
        for (let c = 0; c < optSelect.length; c++) {
            if (mySelectDepto[i].id == optSelect[c].value) {
                // console.log('achou', mySelectDepto[i], optSelect[c])
                optSelect[c].selected = true;
                // mySelectDepto[i].className += 'is-valid';
            }
        }
    }

    
}

async function enviarDepartamento(){
   let dadosPost =[];
   let liberadoEnvio = true;

    let mySelectDepto = idDepartamento.getElementsByTagName('select')
    for (let i = 0; i < mySelectDepto.length; i++) {
        let optSelectDepto = mySelectDepto[i]
        if(optSelectDepto.value ===''){
            console.log(optSelectDepto.parentNode.children[0].textContent)
            let subDepartamentoInvalido = optSelectDepto.parentNode.children[0].textContent;
            optSelectDepto.parentNode.innerHTML += `<br> <h5 style='
            color: red;'>ESSE CAMPO NÃO PODE SER VAZIO  </h5>`;
            
            
            
            liberadoEnvio = false;

        }
        // else{
        //     optSelectDepto.parentNode.style.display = "none";
        // }
        console.log(optSelectDepto.id, optSelectDepto.value)
        dadosPost.push(
            {            
                DepartamentoExportadosOriginal: optSelectDepto.id,
                DepartamentoExportadosSubstituido: optSelectDepto.value
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

    await fetch(`http://localhost:3001/departamento`, options).then(response => {
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
    alert(`Falta preenche os Sub Departamento `)
}

}