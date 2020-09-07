const toDoForm = document.querySelector(".js-toDoForm"),    
    input = document.querySelector(".js-add-to-do"),
    list = document.querySelector(".js-toDoList");


let toDos = [];

function persistToDos() {
    const stringToDo = JSON.stringify(toDos);
    localStorage.setItem("toDos", stringToDo);
}

function saveToDos(text){
    const toDoObject = {
        id: toDos.length +1,
        value: text
    };
    toDos.push(toDoObject);
    persistToDos();
}

function deleteTodo(event){
    const target = event.target;
    const li = target.parentElement;
    const ul = li.parentElement;
    const toDoId = li.id;
    ul.removeChild(li);
    toDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(toDoId);
    });
    persistToDos();
}


function addToDo(text){
    const toDo = document.createElement("li");
    toDo.className = "toDo";
    toDo.id = toDos.length + 1;
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "❌";
    deleteBtn.className = "toDo__button";
    deleteBtn.addEventListener("click", deleteTodo);
    const label = document.createElement("label");
    label.innerHTML = text
    toDo.appendChild(deleteBtn);
    toDo.appendChild(label);
    list.appendChild(toDo);
    saveToDos(text);
}


function handleSubmit(event){
    event.preventDefault();
    const value = input.value; 
    input.value = "";
    addToDo(value);
}


function loadToDos(){
    const loadedToDos = localStorage.getItem("toDos");
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            addToDo(toDo.value);
        });
    }
    return;
}

function init() {
    loadToDos();
}
toDoForm.addEventListener("submit", handleSubmit);

init();