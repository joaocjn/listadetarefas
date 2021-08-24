const seletorInput = document.querySelector('.novaTarefa-input');
const seletorButton = document.querySelector('.novaTarefa-button');
const seletorTarefas = document.querySelector('.section-tarefas');
const seletorApagarTarefas = document.querySelector('.apagarTarefas');

let contadorLi = 0;

function criarLi(){
    const li = document.createElement('li');
    return li;
}

function criarDivTexto(li){
    const divTexto = document.createElement('div');
    divTexto.classList.add('divTexto')
    li.appendChild(divTexto);
}

function limparInput(){
    seletorInput.value = '';
    seletorInput.focus();
}

function criarClassImagem(seletorImagem){
    for(let i = 0; i < seletorImagem.length; i++){
        seletorImagem[i].setAttribute('class','imagem');
    }
}

function criarBotaoApagar(li){
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = '<img src="imagem/iconeX.png">';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criarTarefa(textoInput){
    const li = criarLi();
    seletorTarefas.appendChild(li); 
    criarDivTexto(li);
    const divTexto = document.querySelectorAll('.section-tarefas div');       
    divTexto[contadorLi].innerText = textoInput;
    criarBotaoApagar(li);   
    limparInput();
    salvarTarefas();
    contadorLi += 1;
    const seletorImagem = document.querySelectorAll('img');
    criarClassImagem(seletorImagem);
}


seletorButton.addEventListener('click', function(){
    if(!seletorInput.value) return;
    criarTarefa(seletorInput.value);
});

seletorInput.addEventListener('keypress', function(evento){
    if(evento.keyCode === 13){
        if(!seletorInput.value) return;
        criarTarefa(seletorInput.value);
    }
});

seletorApagarTarefas.addEventListener('click', function(){
    const liTarefas = seletorTarefas.querySelectorAll('li');
    
    for(let i of liTarefas){
        seletorTarefas.removeChild(i);
    }
    contadorLi = 0; 
    salvarTarefas();
});

document.addEventListener('click', function(evento){
    const elemento = evento.target;

    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove();
        contadorLi -= 1;
        salvarTarefas();
    }

    if(elemento.classList.contains('imagem')){
        elemento.parentElement.parentElement.remove();
        contadorLi -= 1;
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = seletorTarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let i of liTarefas){
        let tarefaTexto = i.innerText;    
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefasJson', tarefasJSON);
}

function adicionarTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefasJson');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let i of listaDeTarefas){
        criarTarefa(i);
    }
}
adicionarTarefasSalvas();