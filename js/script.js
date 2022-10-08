'use strict';

window.addEventListener('DOMContentLoaded', () => {
	const taskInput = document.querySelector('.input');
	const buttonSave = document.querySelector('.button__save');
	const todos = document.querySelector('.todos');
	const clearButton = document.querySelector('.button__clear');

	function createTask() {
		let taskText = taskInput.value;

		let taskHtml = `
		<li><span class="todo-text">${taskText}</span><span class="todo-trash"><span
		data-action="delete" class="fas fa-trash-alt"></span></span>
		</li>
		`;

		todos.insertAdjacentHTML('beforeend', taskHtml);

		taskInput.value = '';
		taskInput.focus();
	}

	function deleteTask(event) {
		if (event.target.dataset.action === 'delete') {
			const parentNode = event.target.closest('li');
			parentNode.remove();
		}
	}

	taskInput.addEventListener('keydown', (event) => {
		if (event.code === 'Enter') {
			createTask();
		}
	});

	buttonSave.addEventListener('click', createTask);

	todos.addEventListener('click', deleteTask);

	clearButton.addEventListener('click', () => {
		todos.innerHTML = '';
	});
});
