'use strict';

window.addEventListener('DOMContentLoaded', () => {
	const taskInput = document.querySelector('.input'),
		buttonSave = document.querySelector('.button__save'),
		todos = document.querySelector('.todos'),
		clearButton = document.querySelector('.button__clear'),
		showTipsButton = document.querySelector('.button__show-tips'),
		closeTipsButton = document.querySelector('.overlay__close-tips'),
		overlay = document.querySelector('.overlay'),
		pencil = document.querySelector('#pensil');

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

	taskInput.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			createTask();
		}
	});

	buttonSave.addEventListener('click', createTask);

	todos.addEventListener('click', deleteTask);

	clearButton.addEventListener('click', () => {
		todos.innerHTML = '';
	});

	showTipsButton.addEventListener('click', function () {
		overlay.classList.add('overlay__show');
	});

	function closeTips() {
		overlay.classList.remove('overlay__show');
	}

	closeTipsButton.addEventListener('click', () => {
		closeTips();
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			closeTips();
		}
	});

	pencil.addEventListener('click', () => {
		pencil.classList.toggle('on');

		if (pencil.classList.contains('on')) {
			taskInput.classList.add('input__hide');
			taskInput.classList.remove('input__show');
		} else {
			taskInput.classList.remove('input__hide');
			taskInput.classList.add('input__show');
		}
	});
});
