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

	let tasks = [];

	function createTask() {
		let taskText = taskInput.value;

		if (taskText.length >= 27) {
			taskText = `${taskText.substring(0, 27)}...`;
		}

		const newTask = {
			id: Date.now(),
			text: taskText,
			done: false,
		};

		tasks.push(newTask);

		const cssClass = newTask.done ? 'todos__item done' : 'todos__item"';

		let taskHtml = `
		<li id="${newTask.id}" class="${cssClass}"><span class="todos-trash"><i data-action="delete" class="fas fa-trash-alt"></i></span><span
		class="todos-text">${newTask.text}</span>
		</li>
		`;

		if (taskText) {
			todos.insertAdjacentHTML('beforeend', taskHtml);
		}

		taskInput.value = '';
		taskInput.focus();
	}

	function deleteTask(e) {
		if (e.target.dataset.action === 'delete') {
			const parentNode = e.target.closest('li');

			const id = +parentNode.id;
      
			const index = tasks.findIndex((task) => task.id === id)

			tasks.splice(index, 1);
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

	showTipsButton.addEventListener('click', () => {
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

	function doneTask(e) {
		const target = e.target;
		if (target.tagName === 'LI') {
			e.target.classList.toggle('done');
		}
	
		const id = Number(target.id);
		const task = tasks.find(function (task) {
			if (task.id === id) {
				return true;
			}
		});
		task.done = !task.done;
	}

	todos.addEventListener('click', doneTask);
});
