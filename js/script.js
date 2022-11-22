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
		tasks.forEach((task) => renderTask(task));
	}

	checkEmptyList();

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

		if (taskText) {
			tasks.push(newTask);
			checkEmptyList();
		}

		taskInput.value = '';
		taskInput.focus();

		saveToLocalStorage();
		renderTask(newTask);
	}

	function deleteTask(e) {
		if (e.target.dataset.action === 'delete') {
			const parentNode = e.target.closest('li');

			const id = +parentNode.id;

			const index = tasks.findIndex((task) => task.id === id);

			tasks.splice(index, 1);
			parentNode.remove();

			checkEmptyList();
		}

		saveToLocalStorage();
	}

	function doneTask(e) {
		try {
			const target = e.target;
			if (target.tagName === 'LI') {
				e.target.classList.toggle('done');

				const id = Number(target.id);
				const task = tasks.find((task) => task.id === id);

				task.done = !task.done;
				saveToLocalStorage();
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	function renderTask(task) {
		const cssClass = task.done ? 'todos__item done' : 'todos__item';

		let taskHTML = `
		<li id="${task.id}" class="${cssClass}"><span class="todos-trash"><i data-action="delete" class="fas fa-trash-alt"></i></span><span
		class="todos-text">${task.text}</span>
		</li>
		`;

		if (task.text) {
			todos.insertAdjacentHTML('beforeend', taskHTML);
		}
	}

	function checkEmptyList() {
		if (tasks.length === 0) {
			const emptyListHTML = `
			<li id="emtyList" class="todos__item"><span class="todos-trash"><i data-action="delete"
					class="fas fa-trash-alt"></i></span><span class="todos-text">Добавьте задачу</span>
			</li>
			`;
			todos.insertAdjacentHTML('afterbegin', emptyListHTML);
		}

		if (tasks.length > 0) {
			const emptyListElement = document.querySelector('#emtyList');
			emptyListElement ? emptyListElement.remove() : null;
		}
	}

	function saveToLocalStorage() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

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

	taskInput.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			createTask();
		}
	});

	buttonSave.addEventListener('click', createTask);

	todos.addEventListener('click', deleteTask);

	todos.addEventListener('click', doneTask);

	clearButton.addEventListener('click', () => {
		todos.innerHTML = '';
		localStorage.clear();
		location.reload();
	});

	showTipsButton.addEventListener('click', () => {
		overlay.classList.add('overlay__show');
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
