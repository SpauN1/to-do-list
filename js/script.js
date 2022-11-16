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

	if (localStorage.getItem('tasks')) {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task) => {
		const cssClass = task.done ? 'todos__item done' : 'todos__item"';

		let taskHTML = `
		<li id="${task.id}" class="${cssClass}"><span class="todos-trash"><i data-action="delete" class="fas fa-trash-alt"></i></span><span
		class="todos-text">${task.text}</span>
		</li>
		`;

		if (task.text) {
			todos.insertAdjacentHTML('beforeend', taskHTML);
		}
	});

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

		const cssClass = newTask.done ? 'todos__item done' : 'todos__item"';

		let taskHTML = `
		<li id="${newTask.id}" class="${cssClass}"><span class="todos-trash"><i data-action="delete" class="fas fa-trash-alt"></i></span><span
		class="todos-text">${newTask.text}</span>
		</li>
		`;

		if (taskText) {
			tasks.push(newTask);
			todos.insertAdjacentHTML('beforeend', taskHTML);
		}

		taskInput.value = '';
		taskInput.focus();

		saveToLocalStorage();
	}

	function deleteTask(e) {
		if (e.target.dataset.action === 'delete') {
			const parentNode = e.target.closest('li');

			const id = +parentNode.id;

			const index = tasks.findIndex((task) => task.id === id);

			tasks.splice(index, 1);
			parentNode.remove();
		}

		saveToLocalStorage();
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
		localStorage.clear();
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
		const task = tasks.find((task) => task.id === id);

		task.done = !task.done;
	}

	todos.addEventListener('click', doneTask);

	function saveToLocalStorage() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
});
