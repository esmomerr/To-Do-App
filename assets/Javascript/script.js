import { saveToLocalStorage } from "../modules/localStorage.js";

const addToDoForm = document.querySelector("#addToDoForm");
const todoList = document.querySelector("#todoList");
const date = new Date();

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function createUniqueId(){
    let id = 1;
    for (const todoId of todos) {
        if(todoId.id === id){
            id += 1;
        }
    }
    return id++
}

addToDoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Tirnak icerisinde yer alan todo ve endDate Html de bulunan name'den geliyor.
    const todo = formData.get("todo");
    const endDate = formData.get("endDate");
    const finallyEndDate = endDate.replaceAll("-", ".").split(".").reverse().join(".");

    const newTodo = {
        id: createUniqueId(),
        todo,
        starDate: date.toLocaleDateString(),
        finallyEndDate,
        isCompleted: false
    }

    todos.push(newTodo);
    saveToLocalStorage(todos, "todos");
    e.target.reset();
    toDoApp();
})


function toDoApp(){
    todoList.innerHTML = "";
    todos.forEach(task => {
        todoList.innerHTML += 
        `
            <li id="${task.id}" class="todo-item">
                <div class="task">
                    ${task.todo} 
                    <br><br>
                    Son Tarih: ${task.finallyEndDate}
                </div>
                <div class="buttons">
                    <button class="completedBtns btns"><img src="assets/img/clipboard-checklist.png" alt="" style="width: 35px"></button>
                    <button class="editBtns btns"><img src="assets/img/edit.png" alt="" style="width: 35px"></button>
                    <button class="deleteBtns btns"><img src="assets/img/delete.png" alt="" style="width: 35px"></button>
                </div>
            </li>
        `
    });
    bindDeleteBtns();
    bindEditBtns();
}


function bindDeleteBtns(){
    const deleteBtns = document.querySelectorAll(".deleteBtns");
    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener("click", function(){
            console.log(this.parentElement.parentElement);
            const index = todos.findIndex((todo) => Number(todo.id) === Number(this.parentElement.parentElement.id));
            if(index !== -1){
                todos.splice(index, 1);
            }
            saveToLocalStorage(todos, "todos")
            toDoApp();
        })
    }
}

function bindEditBtns(){
    const editBtns = document.querySelectorAll(".editBtns");
    for (const editBtn of editBtns) {
        editBtn.addEventListener("click", function(){
            let pro = prompt("Görevinizi değiştirmek üzeresiniz.")
            for (const editTodo of todos) {
                if(Number(editTodo.id) === Number(this.parentElement.parentElement.id)){
                    console.log(editTodo);
                    editTodo.todo = pro
                }
            }
            this.parentElement.previousElementSibling.textContent = pro
            console.log(pro);     
            saveToLocalStorage(todos, "todos");
            toDoApp();
        })
    }
}

toDoApp();