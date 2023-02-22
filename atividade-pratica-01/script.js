(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    form.classList.add('was-validated')
                } else {
                    inserir()
                    form.classList.remove('was-validated')
                    form.reset()
                }
                event.preventDefault()
                event.stopPropagation()
            }, false)
        })
})()


function getLocalStorage() {
    return JSON.parse(localStorage.getItem('bd_monitor')) ?? [];
}

function setLocalStorage(bd_monitor) {
    localStorage.setItem('bd_monitor', JSON.stringify(bd_monitor));
}

function limparTabela() {
    var elemento = document.querySelector("#tabela>tbody");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function atualizarTabela() {
    limparTabela();
    const bd_monitor = getLocalStorage();
    let index = 0;
    for (monitor of bd_monitor) {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${monitor.nome}</td>
        <td>${monitor.marca}</td>
        <td>${monitor.serial}</td>
        <td>${monitor.cor}</td>
        <td>${monitor.tamanho}</td>
        <td>${monitor.valor}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
        document.querySelector('#tabela>tbody').appendChild(novaLinha)
        index++;
    }
}

function inserir() {
    const monitor = {
        nome: document.getElementById('nome').value,
        marca: document.getElementById('marca').value,
        serial: document.getElementById('serial').value,
        cor: document.getElementById('cor').value,
        tamanho: document.getElementById('tamanho').value,
        valor: document.getElementById('valor').value
    }
    const bd_monitor = getLocalStorage();
    bd_monitor.push(monitor);
    setLocalStorage(bd_monitor);
    atualizarTabela();
}

function excluir(index) {
    const bd_monitor = getLocalStorage();
    bd_monitor.splice(index, 1);
    setLocalStorage(bd_monitor);
    atualizarTabela();
}

function validarSerial() {
    const bd_monitor = getLocalStorage();
    for (monitor of bd_monitor) {
        if (serial.value == monitor.serial) {
            serial.setCustomValidity("Este número de serial já existe!");
            feedbackserial.innerText = "Este número de serial já existe!";
            return false;
        } else {
            serial.setCustomValidity("");
            feedbackserial.innerText = "Informe o serial corretamente.";
        }
    }
}

atualizarTabela();
const serial = document.getElementById("serial");
const feedbackserial = document.getElementById("feedbackserial");
serial.addEventListener('input', validarSerial);