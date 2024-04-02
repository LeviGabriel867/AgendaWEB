var buttonNovoEvento = document.getElementById('butonNovoEvento');
var buttonCancelar = document.getElementById('butonCancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNovoEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var divMensagemErro = document.getElementById('mensagemErro');
var tabelaEventos = document.getElementById('tabelaEventos');
var listaEventos = [];

function removerEvento(event){
  var posicao = event.target.getAttribute('data-evento')
  listaEventos.splice(posicao, 1);
  atualizarTabelaEvento();
}
function editarEvento(event) {
  var posicao = event.target.getAttribute('data-evento');
  var evento = listaEventos[posicao];

  // Cria um novo elemento <tr> para o evento a ser editado
  var linhaEdicao = document.createElement('tr');

  // Cria um novo elemento <td> para o nome do evento editável
  var celulaNomeEdicao = document.createElement('td');
  var inputNomeEdicao = document.createElement('input');
  inputNomeEdicao.type = 'text';
  inputNomeEdicao.value = evento.nome; // Preenche o input com o nome atual do evento
  celulaNomeEdicao.appendChild(inputNomeEdicao);
  linhaEdicao.appendChild(celulaNomeEdicao);

  // Cria um novo elemento <td> para a data do evento editável
  var celulaDataEdicao = document.createElement('td');
  var inputDataEdicao = document.createElement('input');
  inputDataEdicao.type = 'datetime-local';
  inputDataEdicao.value = evento.data.toISOString().split('T')[0]; // Preenche o input com a data atual do evento
  celulaDataEdicao.appendChild(inputDataEdicao);
  linhaEdicao.appendChild(celulaDataEdicao);

  // Cria um novo elemento <td> para os botões de ação
  var celulaAcoesEdicao = document.createElement('td');
  var botaoSalvarEdicao = document.createElement('button');
  botaoSalvarEdicao.innerText = 'Salvar';
  botaoSalvarEdicao.classList.add('btn', 'btn-primary', 'btn-sm');
  botaoSalvarEdicao.addEventListener('click', function() {
      // Atualiza os dados do evento na lista com os valores dos inputs de edição
      evento.nome = inputNomeEdicao.value;
      evento.data = new Date(inputDataEdicao.value);
      // Atualiza a tabela de eventos
      atualizarTabelaEvento();
  });
  celulaAcoesEdicao.appendChild(botaoSalvarEdicao);
  linhaEdicao.appendChild(celulaAcoesEdicao);

  // Substitui a linha atual do evento pela linha de edição
  var linhaEvento = event.target.closest('tr');
  linhaEvento.parentNode.replaceChild(linhaEdicao, linhaEvento);
}




function atualizarTabelaEvento(){
  
    if(listaEventos.length === 0){
      tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td><td colspan="3">Nenhum evento</td></tr>';
      return;
    }
    tabelaEventos.innerHTML = '';
    for(var i = 0; i<listaEventos.length; i++){
      var evento = listaEventos[i];
      var linha = document.createElement('tr');
      var celulaNome = document.createElement('td');
      var celulaData = document.createElement('td');
      var celulaAcoes =  document.createElement('td');
      var botaoExcluir = document.createElement('button');
      botaoExcluir.setAttribute('data-evento', i);
      botaoExcluir.classList.add('btn');
      botaoExcluir.classList.add('btn-danger');
      botaoExcluir.classList.add('btn-sm');
      botaoExcluir.addEventListener('click', removerEvento);
      celulaNome.innerText = evento.nome;
      celulaData.innerText = evento.data;
      botaoExcluir.innerText = "Remover";
      celulaAcoes.appendChild(botaoExcluir);
      var botaoEditar = document.createElement('button');
      botaoEditar.innerText = "Editar";
      botaoEditar.setAttribute('data-evento', i);
      botaoEditar.classList.add('btn');
      botaoEditar.classList.add('btn-warning');
      botaoEditar.classList.add('btn-sm');
      botaoEditar.addEventListener('click', editarEvento);
      celulaAcoes.appendChild(botaoEditar);
      linha.appendChild(celulaNome);
      linha.appendChild(celulaData);
      linha.appendChild(celulaAcoes);
      tabelaEventos.appendChild(linha);

    }
}

function limparNovoEvento(){
    inputDataEvento.value = '';
    inputNovoEvento.value = '';
    inputDataEvento.classList.remove('is-invalid');
    inputNovoEvento.classList.remove('is-invalid');
    divMensagemErro.innerHTML = '';
    
}
function mostrarNovoEvento(){
    novoEvento.classList.remove('d-none');
}


function cancelarNovoEvento(){
    novoEvento.classList.add('d-none');
    limparNovoEvento();
} 

function novoEventoValido(nomeEvento, dataEvento){
  var validacao = true;
  var erro = '';
  if(nomeEvento.trim().length === 0 ){
    erro='Nome do evento é obrigatório';
    inputNovoEvento.classList.add('is-invalid');
    validacao = false;
  }  else{
      inputNovoEvento.classList.remove('is-invalid');

  }
  var timesTampEvento = Date.parse(dataEvento);
  var timesTampAtual = (new Date()).getTime();
  if(isNaN(timesTampEvento) || timesTampEvento < timesTampAtual){
    if(erro.length>0){
      divMensagemErro.classList.remove('d-none');
      erro+='<br>'
    }
    erro +='A data precisa está no futuro!'
    inputDataEvento.classList.add('is-invalid');
    validacao = false;
}else{
  inputDataEvento.classList.remove('is-invalid');
}
if(!validacao){
  divMensagemErro.innerHTML = erro;
  divMensagemErro.classList.remove('d-none');
  

} else{
  divMensagemErro.classList.add('d-none');
}
  return validacao ;

}

function salvarNovoEvento(event){
  event.preventDefault(); /*Permite nao recarregar a pagina pois evita q o formulario seja enviado(seria o paramentro enviado pelo navegador quando o click fosse dado)*/
  var nomeEvento = inputNovoEvento.value;
  var dataEvento = inputDataEvento.value;
  if(novoEventoValido(nomeEvento, dataEvento)){
    console.log('Evento válido!');
    listaEventos.push({
      nome: nomeEvento,
      data: new Date(dataEvento),
    });
    atualizarTabelaEvento();
    cancelarNovoEvento();
  }else{
    console.log('Evento inválido!');
  }

}

buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', cancelarNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);  /*aqui nao pode recarregar a pagina, talves enviando os dados para um formulario/campo dentro de uma div no html der certo*/
window.addEventListener('load', atualizarTabelaEvento);