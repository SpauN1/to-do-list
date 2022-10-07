'use strict';

window.addEventListener('DOMContentLoaded', () => {
	const taskInput = document.querySelector('.input');
	const buttonSave = document.querySelector('.button__save');
	const todos = document.querySelector('.todos');

	function createTask() {
		let taskText = taskInput.value;

		let taskHtml = `
		<li><span class="todo-text">${taskText}</span><span class="todo-trash"><span
		class="fas fa-trash-alt"></span></span>
		</li>
		`;

		todos.insertAdjacentHTML('beforeend', taskHtml);

		taskInput.value = '';
		taskInput.focus();
	}

	taskInput.addEventListener('keydown', (event) => {
		if (event.code === 'Enter') {
			createTask();
		}
	});

	buttonSave.addEventListener('click', createTask);
});
