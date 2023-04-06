"use strict";

// Variables
const btn = document.querySelector(".form-btn");
const input = document.querySelector(".form-input");
const todosContainer = document.querySelector(".todos");
console.log("render");

let todos = [];

// Functions
const renderTodo = (todo) => {
  const html = `<li class="todo" data-id="${todo.id}">
    <p class="todo__text" style="text-decoration: ${
      todo.isDone ? "line-through" : ""
    }">${todo.value}</p>
    <button class="todo__done-btn">done</button>
    <button class="todo__delete-btn">delete</button>
    </li>`;
  todosContainer.insertAdjacentHTML("beforeend", html);
};

const addTodo = (e) => {
  e.preventDefault();
  const value = input.value;

  if (value !== "") {
    const todo = {
      id: Math.floor(Math.random() * 10000),
      value: value,
      isDone: false,
    };

    renderTodo(todo);

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    input.value = "";
  }
};

const actionForTodo = (e) => {
  if (e.target.classList.contains("todo__done-btn")) doneTodo(e);
  if (e.target.classList.contains("todo__delete-btn")) deleteTodo(e);
};

const doneTodo = (e) => {
  const tergetedTodo = e.target.closest(".todo");
  const todoText = [...e.target.closest(".todo").children].find((children) =>
    children.classList.contains("todo__text")
  );

  const foundTodo = todos.find(
    (todo) => todo.id === Number(tergetedTodo.dataset.id)
  );
  foundTodo.isDone = true;
  localStorage.setItem("todos", JSON.stringify(todos));

  todoText.style.textDecoration = "line-through";
};

const deleteTodo = (e) => {
  const tergetedTodo = e.target.closest(".todo");
  todos = todos.filter((todo) => todo.id !== Number(tergetedTodo.dataset.id));
  localStorage.setItem("todos", JSON.stringify(todos));
  tergetedTodo.remove();
};

// Event handlers
btn.addEventListener("click", addTodo);
todosContainer.addEventListener("click", actionForTodo);

if (localStorage.length) {
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => renderTodo(todo));
}
