var elementos = document.getElementsByTagName('*');
document.write("Quantidade de elementos: " + elementos.length);

var todosElementos = "";

for (let e of elementos) {
    todosElementos = todosElementos + "<br>" + e.tagName;
}

document.write(todosElementos);